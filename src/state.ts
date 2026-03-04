import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeobj: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
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
            callback: commandMap
        },
        mapb: {
            name: "mapb",
            description: "Map the 20 previous areas",
            callback: commandMapb
        },
        explore: {
            name: "explore",
            description: "See list of pokemon in given area",
            callback: commandExplore
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
    }
}