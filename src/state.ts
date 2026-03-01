import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
}

export function initState(): State {
    const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex> ",
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
        }
            // We can add more commands here
    };

    return {
        readline: rl,
        commands: registry,
    }
}