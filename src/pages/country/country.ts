import { getCountry } from "../../api/requests";
import { generatePlacesDesc } from "../../components/places/places";
import { Country } from "../../models/interfaces";


export function generateCountryPage(id: number) {
  let lang = localStorage.getItem('language') || 'ru';
  getCountry(id, lang).then((res: Country) => {
    const { name, nameEN, language, animalName, capital, cities, phrases, places, langCode, comments } = res;
    const main = document.querySelector('.root') as HTMLElement;
    main.innerHTML = `
    <section class="country container">
      <div class="country__info info container text-center">
        <div class="info__header row">
          <h1 class="country__name col">${name}</h1>
          <h4 class="col" data-18i="countryCapital">capital<strong class="country__capital">  ${capital}</strong></h4>
          <div class="country__player player col">
            <h6 data-18i="countryHymn">National Anthem</h6>
            <audio controls onended="hymnEnd()" class="country__hymn" src="./assets/audio/hymn_${id}.mp3" hidden></audio>
            <div class="player__controls"> 
              <div class="btn-play" onclick="playCountryHymn()">
                ${generateSvgPlay()}
                ${generateSvgPause()}
              </div>
              <div class="time-bar ">
                <div class="time-bar__progress progress-hymn"></div>
                <div class="time-bar__progress circle-hymn"></div>
              </div>
            </div>
            <input type="range" class="volume-hymn" min="0" step="any" max="1" value="1">
          </div>
          <div class="col"><img src="./assets/images/country_flags/${nameEN}_flag.jpg" alt="Flag" class="info__flag"></div>
        </div>
        <div class="row">
          <div class="info__map col">
            <img class="map" src="./assets/images/country_maps/${id}.png" alt="Country Map">
            <div class="info__animal">
              <span data-18i="countryAnimal">National symbol</span>
              <button type="button" class="country__animal btn btn-outline-info">${animalName}</button>
              <div class="animal">
              ${generateAnimalsPopup(`./assets/images/country_animals/${nameEN}.jpg`, animalName)}
              </div>
            </div>
          </div>
          <div class="info__cities cities col">
            <h2 class="cities__title" data-18i="countryCities">Cities</h2>
            <span class="cities__item">${cities[0].city}</span> <button data-18i="btnLook" type="button" class="btn btn-outline-info btn-sm cities__btn">Show on the map</button>
            <span class="cities__item">${cities[1].city}</span> <button data-18i="btnLook" type="button" class="btn btn-outline-info btn-sm cities__btn">Show on the map</button>
            <span class="cities__item">${cities[2].city}</span> <button data-18i="btnLook" type="button" class="btn btn-outline-info btn-sm cities__btn">Show on the map</button>
            <span class="cities__item">${cities[3].city}</span> <button data-18i="btnLook" type="button" class="btn btn-outline-info btn-sm cities__btn">Show on the map</button>
            <span class="cities__item">${cities[4].city}</span> <button data-18i="btnLook" type="button" class="btn btn-outline-info btn-sm cities__btn">Show on the map</button>
          </div>
        </div>
        <div class="row">
          <div class="info__language language col">
            <h2 data-18i="countryLanguage">Official language <strong class="language__country">${language}</strong></h2>
            <div class="language__lesson">
              <h2 data-18i="countryLesson">Language lessons</h2>
              <div class="phrases">
                <p class="phrases__item">${phrases[0]}</p> ${generateSvgPlay()} ${generateSvgPause()} ${generateSvgMicro()}
                <p class="phrases__item">${phrases[1]}</p> ${generateSvgPlay()} ${generateSvgPause()} ${generateSvgMicro()}
                <p class="phrases__item">${phrases[2]}</p> ${generateSvgPlay()} ${generateSvgPause()} ${generateSvgMicro()}
                <p class="phrases__item">${phrases[3]}</p> ${generateSvgPlay()} ${generateSvgPause()} ${generateSvgMicro()}
                <p class="phrases__item">${phrases[4]}</p> ${generateSvgPlay()} ${generateSvgPause()} ${generateSvgMicro()}
              </div>
            </div>
          </div>
          <div class="info__places col">
            <h2 data-18i="countryPlaces">Interesting places to visit</h2>
            <div class="places-list">
              ${generatePlacesDesc(`./assets/images/places/${nameEN}/1.jpg`, places[0].name, places[0].description)} 
              ${generatePlacesDesc(`./assets/images/places/${nameEN}/2.jpg`, places[1].name, places[1].description)}
              ${generatePlacesDesc(`./assets/images/places/${nameEN}/3.jpg`, places[2].name, places[2].description)}
              ${generatePlacesDesc(`./assets/images/places/${nameEN}/4.jpg`, places[3].name, places[3].description)}
              ${generatePlacesDesc(`./assets/images/places/${nameEN}/5.jpg`, places[4].name, places[4].description)}
            </div>
          </div>
        </div>
      </div>
      <div class="country__gallery">
        <div class="arrow">
          ${generateSvgArrowUp()}
          ${generateSvgArrowDown()}
        </div>
        <div class="country__photos">
          ${generatePhoto(nameEN, 1)}
          ${generatePhoto(nameEN, 2)}
          ${generatePhoto(nameEN, 3)}
          ${generatePhoto(nameEN, 4)}
          ${generatePhoto(nameEN, 5)}
          ${generatePhoto(nameEN, 6)}
          ${generatePhoto(nameEN, 7)}
          ${generatePhoto(nameEN, 8)}
          ${generatePhoto(nameEN, 9)}
          ${generatePhoto(nameEN, 10)}
          ${generatePhoto(nameEN, 11)}
          ${generatePhoto(nameEN, 12)}
          ${generatePhoto(nameEN, 13)}
          ${generatePhoto(nameEN, 14)}
          ${generatePhoto(nameEN, 15)}
        </div>
      </div>
    </section>`;
   openPopup();
  })
  const loading = document.createElement('div');
  loading.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-airplane-fill" viewBox="0 0 16 16">
  <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"/>
</svg> <span> Летим на самолете...</span>`;
  return loading;
}

const countryHymn = document.querySelector('.country__hymn') as HTMLAudioElement;
const hymnDuration = document.querySelector('.hymn-duration') as HTMLElement;
const countHymn = document.querySelector('.hymn-countdown') as HTMLElement;
const lineProgressHymn = document.querySelector('.progress-hymn') as HTMLElement;
const circleHymn = document.querySelector('.circle-hymn') as HTMLElement;
const volumeHymn = document.querySelector('.volume-hymn') as HTMLInputElement;
const btnPlayHymn = document.querySelector('.btn-play') as HTMLElement;
let isHymnPlay = false;
let timeHymn = 0;
const gradientBlue = 'linear-gradient(to right, rgb(61 115 186) 0%, rgb(105 159 190)';
const gradientGrey = ' rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%';
const initialColor = 'linear-gradient(to right, rgb(61, 115, 186) 0%, rgb(105, 159, 190) 0%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%)';

// регулировка звука
// volumeHymn.onchange = function (e) {
//   const target = e.target as HTMLInputElement
//   countryHymn.volume = Number(target.value);
// };

setInterval(() => {
  if (isHymnPlay) {
    timeHymn++;
    const s = timeHymn % 60;
    const m = Math.floor(timeHymn / 60);
    countHymn.innerHTML = `${m}:${s}`;
    const duration = hymnDuration.innerHTML.split(':')[1];
    circleHymn.style.left = `${100 / Number(duration) * s}%`;
    lineProgressHymn.style.background = `${gradientBlue} ${100 / Number(duration) * s}%, ${gradientGrey}`;
  }
}, 1000);

// обработка кликов play/pause
// export function playCountryHymn() {
//   if (!isHymnPlay) {
//     countryHymn.play();
//     btnPlayHymn.innerHTML = generateSvgPause();
//     isHymnPlay = true;
//   } else {
//     countryHymn.pause();
//     btnPlayHymn.innerHTML = generateSvgPlay();
//     isHymnPlay = false;
//   }
// }

// обработка окончания audio
export function hymnEnd() {
  btnPlayHymn.innerHTML = generateSvgPause();
  isHymnPlay = false;
  circleHymn.style.left = '0px';
  countHymn.innerHTML = '0:0';
  timeHymn = 0;
  lineProgressHymn.style.background = `${initialColor}`;
};


// popup с животным
function generateAnimalsPopup(img: string, animal: string) {
  return `<div class="card animal__card">
  <button type="button" class="btn-close animal__close" aria-label="Close"></button>
                <img src="${img}" class="card-img-top animal__img" alt="Animal">
                <div class="card-body animal__desc">
                  <h5 class="animal__title card-text">${animal}</h5>
                </div>
              </div>`;
}

function openPopup() {
  const btnAnimal = document.querySelector('.country__animal') as HTMLButtonElement;
  const btnClose = document.querySelector('.animal__close') as HTMLButtonElement;
  const animal = document.querySelector('.animal') as HTMLElement;
  btnAnimal.addEventListener('click', () => {
    animal.classList.add('active');
  })
  btnClose.addEventListener('click', () => {
    animal.classList.remove('active');
  })
  animal.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('animal')) {
        animal.classList.remove('active');
    }
})
}

//генерация SVG
export function generateSvgPlay() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg>`;
}

export function generateSvgPause() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
</svg>`;
}

export function generateSvgMicro() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
  <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
</svg>`;
}

export function generateSvgArrowUp() {
  return `<svg class="arrow-up" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
</svg>`;
}

export function generateSvgArrowDown() {
  return `<svg class="arrow-down" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg>`;
}

// генерация фото для галереи
function generatePhoto(country: string, n: number) {
  return `<figure class="figure">
      <img src="./assets/./images/gallery/${country}/img_${n}.jpg" class="figure-img img-fluid rounded" alt="Nice place">
      <figcaption class="figure-caption">click to enlarge</figcaption>
    </figure>`;
}
