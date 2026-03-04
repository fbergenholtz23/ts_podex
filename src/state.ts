import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: ((state: State, ...args: string[]) => Promise<void>) | ((state: State) => void);
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeobj: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
    caughtPokemon: Record<string, Pokemon>;
}

export function initState(): State {
    const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex >",
    })

    const registry: Record<string, CLICommand> = {
        exit: {
            name: "exit",
            description: "Exit the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Map 20 pokemon areas",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Map the 20 previous areas",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "See list of pokemon in given area",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Catch a pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Print stats of a pokemon",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "Print pokemon in your pokedex",
            callback: commandPokedex,
        }
            // We can add more commands here
    };

    const pokeObj = new PokeAPI();


    return {
        readline: rl,
        commands: registry,
        pokeobj: pokeObj,
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: {},
        caughtPokemon: {},
    }
}