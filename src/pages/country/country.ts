import { getCountry } from "../../api/requests";
import { content } from "../../constants/i18n";
import { Country } from "../../models/interfaces";
import { Swiper, Navigation, Autoplay, Keyboard, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const photoNumbers = new Array(15).fill(1); // массив для рендера фотографий в галерее
const audioNumber = new Array(5).fill(1); // массив для функции воспроизведения фраз

export function generateCountryPage(id: number) {
  let lang = localStorage.getItem('language') || 'en';
  setTimeout(() => getCountry(id, lang).then((res: Country) => {
    const { name, nameEN, language, animalName, capital, cities, phrases, places, langCode, comments } = res;
    const main = document.querySelector('.root') as HTMLElement;
    main.innerHTML = `
    <section class="country">
      <div class="country__info info container text-center">
        <div class="info__header row">
          <h1 class="country__name col">${name}</h1>
          <div class="col"><h5 class="col" data-i18="countryCapital">capital</h5><h3 class="country__capital">${capital}</h3></div>
          <div class="country__player player col">
            <h6 data-i18="countryHymn">National Anthem</h6>
            <audio controls class="country__hymn" src="./assets/audio/hymn_${id}.mp3" hidden></audio>
            <div class="player__controls"> 
              <div class="btn-play">
              ${generateSvgPlay('hymn__play')}
              ${generateSvgPause('hymn__pause')}
              </div>
            </div>
          </div>
          <div class="col"><img src="./assets/images/country_flags/${nameEN}_flag.gif" alt="Flag" class="info__flag"></div>
        </div>
        <div class="row info__map-cities">
          <div class="info__map col">
            <img class="map" src="./assets/images/country_maps/${id}.png" alt="Country Map">
            <div class="info__animal">
              <span data-i18="countryAnimal">National symbol</span>
              <button type="button" class="country__animal btn btn-outline-info">${animalName}</button>
              <div class="animal">
              ${generateAnimalsPopup(`./assets/images/country_animals/${nameEN}.jpg`, animalName)}
              </div>
            </div>
          </div>
          <div class="info__cities cities col">
            <h4 class="cities__title" data-i18="countryCities">Cities</h4>
            ${cities.map((item) => `<span class="cities__item">${item.city}</span> <button data-i18="btnLook" type="button" class="btn btn-outline-info btn-sm cities__btn">Show on the map</button>`).join('')}
          </div>
        </div>
        <div class="row">
          <div class="info__language language col">
            <div class="language__lang"><h5 class="language__text" data-i18="countryLanguage">Official language  </h5><h3 class="language__country">${language}</h3></div>
            <div class="language__lesson">
              <h4 data-i18="countryLesson">Language lessons</h4>
              <div class="phrases">
              ${phrases.map((item, i) => `<div class="phrases__item"><span class="phrases__text">${item}</span><audio controls class="country__phrases${i +1}" src="./assets/audio/phrases/${nameEN}_${i + 1}.mp3" hidden></audio><div class="phrases__player"> ${generateSvgPlay(`phrase__play${i + 1}`)} ${generateSvgPause(`phrase__pause${i + 1}`)} ${generateSvgMicro()}</div></div>`).join('')}
              </div>
            </div>
          </div>
          <div class="info__places col">
            <h4 data-i18="countryPlaces">Interesting places to visit</h4>
            <div class="places-list">
            ${places.map((item) => `<button type="button" class="btn btn-outline-info btn-sm">${item.name}</button>`).join('')}
            </div>
          </div>
        </div>
      </div>
      <div class="country__gallery swiper">
        <div class="country__photos swiper-wrapper">
          ${photoNumbers.map((_, i) => generatePhoto(nameEN, i + 1)).join('')}
        </div>
        <div class="arrow">
          ${generateSvgArrowUp()}
          ${generateSvgArrowDown()}
        </div>
      </div>
    </section>`;
    translation();
    openClosePopup();
    playAudio('hymn__play', 'hymn__pause', '.country__hymn');
    audioEnd('hymn__play', 'hymn__pause', '.country__hymn');
    playPhrases();
    endPhrases();
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Autoplay, Keyboard, Mousewheel],
      speed: 800,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      direction: 'vertical',
      loop: true,
      autoplay: {
        delay: 2300,
        disableOnIteration: true,
      },
      slidesPerView: 'auto',
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1
      },
      grabCursor: true,
    });
  }), 1500)
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.innerHTML = `<img src="./assets/images/fly.gif" alt="Plane">`;
  return loading;
}

const lineProgressHymn = document.querySelector('.progress-hymn') as HTMLElement;
const circleHymn = document.querySelector('.circle-hymn') as HTMLElement;
const volumeHymn = document.querySelector('.volume-hymn') as HTMLInputElement;
let timeHymn = 0;
const initialColor = 'linear-gradient(to right, rgb(61, 115, 186) 0%, rgb(105, 159, 190) 0%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%)';

// обработка кликов play/pause

function playAudio(idPlay: string, idPause: string, classAudio: string) {
  const btnPlay = document.getElementById(idPlay) as HTMLElement;
  const btnPause = document.getElementById(idPause) as HTMLElement;
  const audio = document.querySelector(classAudio) as HTMLAudioElement;
  btnPlay.addEventListener('click', () => {
    audio.play();
      btnPlay.classList.add('bi__active');
    })
    btnPause.addEventListener('click', () => {
      audio.pause();
      btnPlay.classList.remove('bi__active');
    })
  }
  function playPhrases() {
    audioNumber.map((_, i) => playAudio(`phrase__play${i + 1}`, `phrase__pause${i + 1}`, `.country__phrases${i + 1}`));
  }

// обработка окончания audio
function audioEnd(idPlay: string, idPause: string, classAudio: string) {  
  const audio = document.querySelector(classAudio) as HTMLAudioElement;
  const btnPlay = document.getElementById(idPlay) as HTMLElement;
  const btnPause = document.getElementById(idPause) as HTMLElement;
  audio.addEventListener('ended', () => {
    btnPause.classList.remove('bi__active');
    btnPlay.classList.remove('bi__active');
  })
}
  function endPhrases() {
    audioNumber.map((_, i) => audioEnd(`phrase__play${i + 1}`, `phrase__pause${i + 1}`, `.country__phrases${i + 1}`));
  }

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

function openClosePopup() {
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
function generateSvgPlay(className: string): string {
  return `<svg id="${className}" xmlns="http://www.w3.org/2000/svg" class="bi bi-play-fill" viewBox="0 0 16 16">
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg>`;
}

function generateSvgPause(className: string): string {
  return `<svg id="${className}" xmlns="http://www.w3.org/2000/svg" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
</svg>`;
}

function generateSvgMicro() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
  <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
</svg>`;
}

function generateSvgArrowUp() {
  return `<svg class="arrow__up swiper-button-prev" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
</svg>`;
}

function generateSvgArrowDown() {
  return `<svg class="arrow__down swiper-button-next" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg>`;
}

// генерация фото для галереи
function generatePhoto(country: string, n: number) {
  return `<figure class="figure swiper-slide photo__slide">
      <img src="./assets/./images/gallery/${country}/img_${n}.jpg" class="figure-img img-fluid rounded" alt="Nice place">
      <figcaption data-i18 ="galleryText" class="figure-caption">click to expand</figcaption>
    </figure>`;
}

// функция перевода контента на всей странице с учетов выбранного пользователем языка
export function translation() {
  const lang = localStorage.getItem('language') || 'en';
  document.querySelectorAll('[data-i18]').forEach((element) => {
    const contentLang = content[lang as keyof typeof content];
    const value = element.getAttribute('data-i18') as keyof typeof contentLang;
    (element as HTMLElement).innerText = contentLang[value];
  });
}
