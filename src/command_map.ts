import { State } from "./state.js";

export async function commandMap(state: State) {
    const pokeObj = state.pokeobj;
    const locations = await pokeObj.fetchLocations(
        state.nextLocationsURL ? 
        state.nextLocationsURL : 
        undefined);
    
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous ? locations.previous : null;

    for (const loc of locations.results)
        console.log(loc.name);
}