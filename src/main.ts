import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
    const newState = initState();
    startREPL(newState);
}

main();

