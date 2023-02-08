import { getCountry } from "../../api/requests";

export function generateCountryPage(id: number) {
  let lang = localStorage.getItem('language') || 'en';
  getCountry(id, lang).then((res) => {
    const {name, language, animalName, capital, cities, phrases, places, countryCode, comments} = res;
    const main = document.querySelector('.root') as HTMLElement;
    main.innerHTML = `
    <section class="country">
    <div class="info__header">
      <h3 class="country__name">${name}</h3>
      <span data-18i="countryCapital">capital<strong class="country__capital">  ${capital}</strong></span>
      <div class="country__player player">
        <audio controls onended="hymnEnd()" class="country__hymn" src="./assets/audio/hymn_brazil.mp3" hidden></audio>
        <div class="player__controls">
          <div class="btn-play" onclick="playCountryHymn()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill"
              viewBox="0 0 16 16">
              <path
                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          </div>
          <div class="time-bar ">
            <div class="time-bar__progress progress-hymn"></div>
            <div class="time-bar__progress circle-hymn"></div>
            <div class="time-bar__info">
              <div class="time-bar__countdown hymn-countdown">0:0</div>
              <div class="time-bar__duration hymn-duration">0:3</div>
            </div>
          </div>
        </div>
        <input type="range" class="volume-hymn" min="0" step="any" max="1" value="1">
      </div>
      <img src="" alt="" class="info__flag">
    </div>
    <div class="info__map">
      <img class="map" src="./assets/images/country_maps/brazil.png" alt="Country Map">
      <div class="info__animals">
        <p data-18i="countryAnimal">National symbol</p>
        generateBtnAnimals()
      </div>
    </div>
    <div class="info__cities cities">
      <h5 data-18i="countryCities">Cities</h5>
      <p class="cities__item"></p> <button data-18i="btnLook">Show on the map</button>
      <p class="cities__item"></p> <button data-18i="btnLook">Show on the map</button>
      <p class="cities__item"></p> <button data-18i="btnLook">Show on the map</button>
      <p class="cities__item"></p> <button data-18i="btnLook">Show on the map</button>
      <p class="cities__item"></p> <button data-18i="btnLook">Show on the map</button>
    </div>
    <div class="info__language language">
      <h5 data-18i="countryLanguage">Official language <strong class="language__country">Португальский</strong></h5>
      <div class="language__lesson">
        <h5 data-18i="countryLesson">Language lessons</h5>
        <div class="phrases">
          <p class="phrases__item"></p> generateSvgPlay() generateSvgPause() generateSvgMicro()
          <p class="phrases__item"></p> generateSvgPlay() generateSvgPause() generateSvgMicro()
          <p class="phrases__item"></p> generateSvgPlay() generateSvgPause() generateSvgMicro()
          <p class="phrases__item"></p> generateSvgPlay() generateSvgPause() generateSvgMicro()
          <p class="phrases__item"></p> generateSvgPlay() generateSvgPause() generateSvgMicro()
        </div>
      </div>
    </div>
    <div class="info__places">
      <h5 data-18i="countryPlaces">Interesting places to visit</h5>
      <div class="places-list">generatePlacesDesc()</div>
    </div>
  </div>
  <div class="country__gallery">
    generateSvgArrowUp()
    generateSvgArrowDown()
    <div class="gallery-photos">
      generateGallery(country: string)
    </div>
    </section>`;
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
export function playCountryHymn() {
  if (!isHymnPlay) {
    countryHymn.play();
    btnPlayHymn.innerHTML = generateSvgPause();
    isHymnPlay = true;
  } else {
    countryHymn.pause();
    btnPlayHymn.innerHTML = generateSvgPlay();
    isHymnPlay = false;
  }
}

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
export function generateBtnAnimals(img: string, animal: string): string {
  return `<button type="button" class="btn btn-primary places__btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Пятнистый ягуар
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="exampleModalLabel">${animal}</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img src="${img}" class="card-img-top"
          alt="Animal">
      </div>
    </div>
  </div>
</div>`
}

//генерация SVG
export function generateSvgPlay() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg>`;
}

export function generateSvgPause() {
  return `svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
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
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
</svg>`;
}

export function generateSvgArrowDown() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg>`;
}

export function generateGallery(country: string) {
  const numberPhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  numberPhotos.forEach((n) => {
    return `<img src="./assets/./images/gallery/${country}/img_${country}${n}.jpg" alt="Country photo">`;
  })
}

// получение страны


