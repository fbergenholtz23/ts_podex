import { State } from "./state";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const pokeObj = state.pokeobj;
    if (args.length != 1)
    {
        console.log("Too many or few commands, 1 name of a pokemon is needed");
    }
    if (!args[0])
        return;

    const pokemonName = args[0];
    const pokemon = await pokeObj.fetchPokemon(pokemonName);
    const experience = pokemon.base_experience;

    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    if (Math.random() < (0.5 - (experience / 1000)))
    {
        console.log(`${pokemonName} was caught`);
        if (!(pokemon.name in state.pokedex))
            state.pokedex[pokemon.name] = pokemon; 
        state.caughtPokemon[pokemon.name] = pokemon;
    } else {
        console.log(`${pokemon.name} escaped!`)
    }
}