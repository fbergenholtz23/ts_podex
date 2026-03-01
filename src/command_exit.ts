import { State } from "./state";

export function commandExit(state: State): void {
    console.log("Closing the Pokedex... Goodbye!");
    state.readline.close()
    process.exit(0);
}