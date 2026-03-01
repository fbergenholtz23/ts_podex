export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const data = await fetch(pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/` ,{
        method: "GET",
        mode: "cors",
    });

    if (!data.ok)
       throw new Error("Network Error")
        
    return await data.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const data = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}/` ,{
        method: "GET",
        mode: "cors",
    });

    return data;
  }
}

export type ShallowLocations = {
  next: string | null;
  previous: string | null;
  results: {name: string}[];
};

export type Location = {
  
};