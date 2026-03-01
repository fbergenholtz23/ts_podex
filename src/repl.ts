import { createInterface } from "node:readline";

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
        if (words.length === 0)
            rl.prompt();

        console.log(`Your command was: ${words[0]}`);
        rl.prompt();
    })
}
