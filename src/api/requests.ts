const baseUrl = 'https://backend-rs-clone-production.up.railway.app';

export function getCountry(id: number, lang: string) {
  try {
    return fetch(`${baseUrl}/country/${id}?` + new URLSearchParams({lang})).then((res) => res.json());
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}
