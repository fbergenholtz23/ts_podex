import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./command.js";

export function cleanInput(input: string): string[] {
    const lower = input.toLowerCase().trim();
    const words = lower.split(" ");
    return words;
}
export function startREPL() {
    const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex> ",
    })

    rl.prompt()
    rl.on("line", (input) => {
        const words = cleanInput(input);
        const commandName = words[0];
        if (words.length === 0)
            rl.prompt();
        const commands = getCommands();
        const cmd = commands[commandName];

        if (cmd)
            cmd.callback(commands);
        else
            console.log("Unknown command");
        
        rl.prompt();
    })
}


export function getCommands(): Record<string, CLICommand> {
    return {
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
}
