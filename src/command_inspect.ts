import { State } from "./state";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    if (!args[0])
        return;

    const caughtPokemons = state.caughtPokemon;

    const pokemonName = args[0];
    if (pokemonName in caughtPokemons)
    {
        const pokemon = caughtPokemons[pokemonName];
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        console.log("Stats: ");
        for (const stat of pokemon.stats)
            console.log(` -${stat.stat.name}: ${stat.base_stat}`);

        console.log("Types: ")
        for (const type of pokemon.types)
            console.log(` -${type.type.name}`);
    }
}