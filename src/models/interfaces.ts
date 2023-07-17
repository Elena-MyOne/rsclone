export interface Country {
  name: string,
  nameEN: string,
  langCode: string,
  capital: string,
  animalName: string,
  language: string,
  cities: City[],
  places: Places[],
  phrases: string[],
  comments: string[]
}

interface City {
  city: string,
  coordinates: string
}

interface Places {
  name: string,
  location: string,
  description: string
}

export interface CountryComment {
  name: string,
  comment: string,
  avatar: string
}

export interface UserInfo {
  id: string,
  name: string,
  email: string,
  password?: string,
  avatar: string,
  countryQuiz: QuizInfo
}

interface QuizInfo {
  [key: number]: string
}

export interface QuizInfoInputs {
  capital: string,
  language: string,
}

export interface QuizInfoCheckboxes {
  flag: string,
  symbol: string,
}