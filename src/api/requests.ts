import { Country } from "../models/interfaces";

const baseUrl = 'https://backend-rs-clone-production.up.railway.app';

//get the right country in the right language

export function getCountry(id: number, lang: string) {
  try {
    return fetch(`${baseUrl}/country/${id}?` + new URLSearchParams({ lang })).then((res) => res.json());
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

//get a list of country names

export function getCountriesNames(lang: string) {
  try {
    return fetch(`${baseUrl}/countries?` + new URLSearchParams({ lang })).then((res) => res.json());
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}
