export interface Country {
  name: string,
  nameEN: string,
  langCode: string,
  capital: string,
  animalName: string,
  language: string,
  cities: City[],
  places: Places[],
  phrases: String[],
  comments: String[]
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