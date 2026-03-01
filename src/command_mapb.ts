import { State } from "./state.js";

export async function commandMapb(state: State) {
    const pokeObj = state.pokeobj;
    if (!state.prevLocationsURL)
    {
        console.log("you're on the first page");
        return;
    }
        
    const locations = await pokeObj.fetchLocations(
        state.prevLocationsURL ? 
        state.prevLocationsURL : 
        undefined);
    
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous ? locations.previous : null;

    for (const loc of locations.results)
        console.log(loc.name);
}