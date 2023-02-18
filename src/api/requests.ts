import axios, { AxiosResponse } from "axios";

const baseUrl = 'https://backend-rs-clone-production.up.railway.app';
// const baseUrl = 'http://localhost:3001'; для локального использования бека

//get the right country in the right language
export function getCountry(id: number, lang: string) {
  try {
    return axios.get(`${baseUrl}/country/${id}`, {params: {lang}});
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

//get a list of country names
export function getCountriesNames(lang: string) {
  try {
    return axios.get(`${baseUrl}/countries`, {params: {lang}});
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// отправка комментариев
export function sendComment(name: string, comment: string, avatar: string, id: number) {
  try {
    return axios.post(`${baseUrl}/comments/${id}`, { name, comment, avatar })
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// получение комментариев
export function getComments(countryId: number) {
    try {
      return axios.get(`${baseUrl}/comments/${countryId}`);
    } catch (error) {
      throw new Error('Error: ' + error);
    }
  }
