import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  #cache: Cache;
  

  constructor() {
    this.#cache = new Cache(60000); 
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
    const cached = this.#cache.get<ShallowLocations>(url);

    if (cached)
    {
      return cached;
    }
      

    const data = await fetch(url ,{
        method: "GET",
        mode: "cors",
    });

    if (!data.ok)
       throw new Error("Network Error")

    const result = await data.json()

    this.#cache.add(url, result);

    return result;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`
    const cached = this.#cache.get<Location>(url);
    if (cached)
      return cached;


    const data = await fetch(url ,{
        method: "GET",
        mode: "cors",
    });

    if (!data.ok)
       throw new Error("Network Error");

    const result = await data.json();

    this.#cache.add(url, result);
    
    return result;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`

    const data = await fetch(url, {
      method: "GET",
      mode: "cors",
    });

    if (!data.ok)
      throw new Error("Network Error");

    const result = await data.json();

    return result;
  }
}

export type ShallowLocations = {
  next: string | null;
  previous: string | null;
  results: {name: string}[];
};

export type Location = {
  pokemon_encounters: {
    pokemon: {
      name: string;
    };
  }[];
};

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: {
    base_stat: number,
    stat: {
      name: string,
    }
  }[];
  types: {
    type: {
      name: string;
    }
  }[]

}