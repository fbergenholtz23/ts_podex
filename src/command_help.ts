import { State } from "./state";

export function commandHelp(state: State) {

    console.log(`Welcome to the Pokedex! 
Usage:

`)
    for (const cmd of Object.values(state.commands))
        console.log(`${cmd.name}: ${cmd.description}`);
}