import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    const lower = input.toLowerCase().trim();
    const words = lower.split(" ");
    return words;
}

export function startREPL(state: State) {

    state.readline.prompt()
    state.readline.on("line", (input) => {
        const words = cleanInput(input);
        const commandName = words[0];
        if (words.length === 0)
            state.readline.prompt();
        const commands = state.commands;
        const cmd = commands[commandName];

        if (cmd)
            cmd.callback(state);
        else
            console.log("Unknown command");
        
        state.readline.prompt();
    })
}

