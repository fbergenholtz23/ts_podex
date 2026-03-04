import { State } from "./state"

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (!args[0])
        return;

    const pokeObj = state.pokeobj;
    console.log(`Exploring ${args[0]}...`)
    const location = await pokeObj.fetchLocation(args[0]);
    
    console.log(`Found Pokemon:`)
    for(const obj of location.pokemon_encounters)
        console.log(` - ${obj.pokemon.name}`);

}