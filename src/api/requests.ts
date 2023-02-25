import axios, { AxiosResponse } from "axios";

// const baseUrl = 'https://backend-rs-clone-production.up.railway.app';
// для локального использования бека
const baseUrl = 'http://localhost:3001'; 

// получение страны по id
export function getCountry(id: number, lang: string) {
  try {
    return axios.get(`${baseUrl}/countries/${id}`, { params: { lang } });
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// получение имен всех стран
export function getCountriesNames(lang: string) {
  try {
    return axios.get(`${baseUrl}/countries`, { params: { lang } });
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// добавление нового комментария
export function sendComment(name: string, comment: string, avatar: string, id: number) {
  try {
    return axios.post(`${baseUrl}/comments/${id}`, { name, comment, avatar });
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

// получить список пользователей
export function getUsers() {
  try {
    return axios.get(`${baseUrl}/users`);
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// регистрация пользователя
export function createUser(name: string, email: string, password: string) {
  try {
    return axios.post(`${baseUrl}/users`, { name, email, password });
  } catch (error) {
    throw new Error('Error: ' + error)
  }
}

// вход с систему для зарегистрированного пользователя
export function setLoginUser(email: string, password: string) {
  try {
    return axios.post(`${baseUrl}/login`, { email, password })
  } catch (error) {
    throw new Error('Error: ' + error)
  }
}

// получение пользователя по id
export function getUser(id: string) {
  try {
    return axios.get(`${baseUrl}/users/${id}`);
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// обновление данных пользователя
export function updateUser(id: string, countryId: string, resultQuiz: string) {
  try {
    return axios.patch(`${baseUrl}/users/${id}`, { countryId, resultQuiz });
  } catch (error) {
    throw new Error('Error: ' + error)
  }
}
