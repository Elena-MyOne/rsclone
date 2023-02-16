import { getCountry } from "../../api/requests";
import { content } from "../../constants/i18n";
import { Country } from "../../models/interfaces";
import { Swiper, Navigation, Autoplay, Keyboard, Mousewheel, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const photoNumbers = new Array(15).fill(1); // массив для рендера фотографий в галерее
const phraseNumber = new Array(5).fill(1); // массив для функции воспроизведения фраз

export function generateCountryPage(id: number) {
  let lang = localStorage.getItem('language') || 'en';
  setTimeout(() => getCountry(id, lang).then((res: Country) => {
    const { name, nameEN, language, animalName, capital, cities, phrases, places, langCode, comments } = res;
    const main = document.querySelector('.root') as HTMLElement;
    main.innerHTML = `
    <section class="country">
      <div class="country__body">
        <div class="country__info info container text-center">
          <div class="info__header row">
            <h1 class="country__name col">${name}</h1>
            <div class="col"><h5 class="col" data-i18="countryCapital">capital</h5><h3 class="country__capital">${capital}</h3></div>
            <div class="country__player player col">
              <h3 data-i18="countryHymn">National Anthem</h3>
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
              ${cities.map((item, i) => `<span class="cities__item">${item.city}</span> <button data-i18="btnLook" type="button" class="btn btn-outline-info btn-sm cities__btn city_${i + 1}">Show on the map</button>`).join('')}
              ${cities.map((item, i) => generateMapPopup(item.city, i + 1)).join('')}
            </div>
          </div>
          <div class="row row-gallery"><button class="open-gallery btn btn-info" type="button" data-i18="openGallery">Open Gallery</button></div>
          <div class="row">
            <div class="info__language language col">
              <div class="language__lang"><h3 class="language__text" data-i18="countryLanguage">Official language</h3><h3 class="language__country">${language}</h3></div>
              <div class="language__lesson">
                <h4 data-i18="countryLesson">Language lessons</h4>
                <div class="tooltips" target="_blank">${generateSvgMicro(`phrase__micro`)}<span data-i18="tooltipMicro" class="tooltiptext micro">Прослушай запись и попробуй повторить, нажав на микрофон.</span></div>
                <div class="phrases">
                ${phrases.map((item, i) => `<div class="phrases__item"><span class="phrases__text">${item}</span><audio controls class="country__phrases${i + 1}" src="./assets/audio/phrases/${nameEN}_${i + 1}.mp3" hidden></audio><div class="phrases__player"> ${generateSvgPlay(`phrase__play${i + 1}`)} ${generateSvgPause(`phrase__pause${i + 1}`)}</div></div>`).join('')}
                </div>
              </div>
            </div>
            <div class="info__places col">
              <h4 data-i18="countryPlaces">Interesting places to visit</h4>
              <div class="places-list">
              ${places.map((item, i) => `<button type="button" class="btn btn-outline-info btn-sm places-list__item place_${i + 1}">${item.name}</button>`).join('')}
              ${places.map((item, i) => generatePlacesPopup(`./assets/images/places/${nameEN}/${i + 1}.jpg`, item.name, item.description, i + 1, item.location)).join('')}
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
        <div class="big-gallery">
          <div class="big-gallery__swiper swiper">
          <div data-bs-theme="dark"><button type="button" class="btn-close big-gallery__close" aria-label="Close"></button></div>
            <div class="country__big-photos swiper-wrapper">
              ${photoNumbers.map((_, i) => `<img class="swiper-slide" src="./assets/images/gallery/${nameEN}/img_${i + 1}.jpg" alt="Nice place">`).join('')}
            </div>
            <div class="big-arrow">
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="country__comments comments">
        <h5 data-i18="countryComments" class="comments__title">Comments</h5>
        <form class="comments__form">
          <div style="margin-bottom: 0">
            <label for="formGroupExampleInput" data-i18="commentLabel" class="form-label comments__label">Write your review about the country.</label>
            <textarea type="text" class="form-control comments__review" id="formGroupExampleInput"></textarea>
          </div>
          <button type="submit" data-i18="buttonComment" class="btn btn-info comments__btn">Leave a comment</button>
        </form>
        <div class="comments__body">
          <div class="comments__item">
            <div class="comments__avatar"><img class="comments__avatar-img" src="./assets/images/avatars/2.jpg"></div>
            <div class="comments__name">Victoria</div>
            <div class="comments__text">Wonderful country! Very beautiful!</div>
          </div>
          <div class="comments__item">
            <div class="comments__avatar"><img class="comments__avatar-img" src="./assets/images/avatars/4.jpg"></div>
            <div class="comments__name">Martin</div>
            <div class="comments__text">And I didn't like it. It was boring.</div>
          </div>
        </div>
      </div>
    </section>`;
    translation();
    openClosePopupAnimal();
    openClosePopupPlaces();
    openClosePopupMap();
    openGallery();
    playAudio('hymn__play', 'hymn__pause', '.country__hymn');
    audioEnd('hymn__play', 'hymn__pause', '.country__hymn');
    playPhrases();
    endPhrases();
    microHandler();
    cities.map((item, i) => getMap(item.coordinates.split(',').map(Number), i + 1));
    const swiper = new Swiper('.country__gallery', {
      modules: [Navigation, Autoplay, Keyboard, Mousewheel],
      speed: 800,
      slidesPerGroup: 2,
      navigation: {
        nextEl: '.arrow__down',
        prevEl: '.arrow__up',
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
    const swiper2 = new Swiper('.big-gallery__swiper', {
      modules: [Navigation, Keyboard, Pagination],
      speed: 800,
      slidesPerGroup: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      slidesPerView: 1,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoHeight: true,
      grabCursor: true,
    });
  }), 1500)
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.innerHTML = `<img src="./assets/images/fly.gif" alt="Plane">`;
  return loading;
}

// обработка кликов play/pause

export function playAudio(idPlay: string, idPause: string, classAudio: string) {
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
  phraseNumber.map((_, i) => playAudio(`phrase__play${i + 1}`, `phrase__pause${i + 1}`, `.country__phrases${i + 1}`));
}

// обработка окончания audio

export function audioEnd(idPlay: string, idPause: string, classAudio: string) {
  const audio = document.querySelector(classAudio) as HTMLAudioElement;
  const btnPlay = document.getElementById(idPlay) as HTMLElement;
  const btnPause = document.getElementById(idPause) as HTMLElement;
  audio.addEventListener('ended', () => {
    btnPause.classList.remove('bi__active');
    btnPlay.classList.remove('bi__active');
  })
}
function endPhrases() {
  phraseNumber.map((_, i) => audioEnd(`phrase__play${i + 1}`, `phrase__pause${i + 1}`, `.country__phrases${i + 1}`));
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

function openClosePopupAnimal() {
  const btnAnimal = document.querySelector('.country__animal') as HTMLButtonElement;
  const btnClose = document.querySelector('.animal__close') as HTMLButtonElement;
  const animal = document.querySelector('.animal') as HTMLElement;
  btnAnimal.addEventListener('click', () => {
    animal.classList.add('animal_active');
  })
  btnClose.addEventListener('click', () => {
    animal.classList.remove('animal_active');
  })
  animal.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('animal')) {
      animal.classList.remove('animal_active');
    }
  })
}

// popup с интересными местами

function generatePlacesPopup(img: string, name: string, description: string, id: number, location: string) {
  return `<div class="place${id} place">
  <div class="card place__card">
  <button type="button" class="btn-close place__close" aria-label="Close"></button>
                <h3 class="place__title">${name}</h3>
                <img src="${img}" class="card-img-top places__img" alt="Place">
                <div class="card-body place__desc">
                  <span class="place__location">${location}</span>
                  <p class="place__info card-text">${description}</p>
                </div>
              </div>
              </div>`;
}

function openClosePopupPlaces() {
  const btnsPlaces = document.querySelectorAll('.places-list__item') as NodeListOf<HTMLButtonElement>;
  const btnsClose = document.querySelectorAll('.place__close') as NodeListOf<HTMLButtonElement>;
  const placesList = document.querySelectorAll('.place') as NodeListOf<HTMLElement>;

  btnsPlaces.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      placesList[i].classList.add('place_active');
    })
  })

  btnsClose.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      placesList[i].classList.remove('place_active');
    })
  })

  placesList.forEach((place) => {
    place.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('place')) {
        place.classList.remove('place_active');
      }
    })
  })
}

// открытие большой галереи

function openGallery() {
  const images = document.querySelectorAll('.gallery__img') as NodeListOf<HTMLImageElement>;
  const btnClose = document.querySelector('.big-gallery__close') as HTMLButtonElement;
  const bigGallery = document.querySelector('.big-gallery') as HTMLElement;
  const btnOpenGallery = document.querySelector('.open-gallery') as HTMLButtonElement;

  btnOpenGallery.addEventListener('click', () => {
    bigGallery.classList.add('big-gallery_active');
  })

  images.forEach((img, i) => {
    img.addEventListener('click', () => {
      bigGallery.classList.add('big-gallery_active');
    })
  })

  btnClose.addEventListener('click', () => {
    bigGallery.classList.remove('big-gallery_active');
  })

  bigGallery.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('big-gallery')) {
      bigGallery.classList.remove('big-gallery_active');
    }
  })
}

// popup с картой города

function generateMapPopup(city: string, id: number) {
  return `
  <div class="city${id} city">
    <div class="card city__card">
      <button type="button" class="btn-close city__close" aria-label="Close"></button>
      <h3 class="city__title">${city}</h3>
      <div id="map_${id}" style="width: 100%; height: 300px"></div>
      <div class="card-body place__desc"></div>
    </div>
  </div>`;
}

function openClosePopupMap() {
  const btnsCity = document.querySelectorAll('.cities__btn') as NodeListOf<HTMLButtonElement>;
  const btnsClose = document.querySelectorAll('.city__close') as NodeListOf<HTMLButtonElement>;
  const citiesList = document.querySelectorAll('.city') as NodeListOf<HTMLElement>;

  btnsCity.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      citiesList[i].classList.add('city_active');
    })
  })

  btnsClose.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      citiesList[i].classList.remove('city_active');
    })
  })

  citiesList.forEach((city) => {
    city.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('city')) {
        city.classList.remove('city_active');
      }
    })
  })
}

// получение Яндекс карты

function getMap(coordinates: number[], id: number) {
  ymaps.ready().then(() => {
    let myMap = new ymaps.Map(`map_${id}`, {
      center: coordinates,
      zoom: 12,
    });
  });
}

//генерация SVG

export function generateSvgPlay(className: string): string {
  return `<svg id="${className}" xmlns="http://www.w3.org/2000/svg" class="bi bi-play-fill" viewBox="0 0 16 16">
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg>`;
}

export function generateSvgPause(className: string): string {
  return `<svg id="${className}" xmlns="http://www.w3.org/2000/svg" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
</svg>`;
}

function generateSvgMicro(className: string) {
  return `<svg id="${className}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
  <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
</svg>`;
}

function generateSvgArrowUp() {
  return `<svg class="arrow__up swiper-button-prev" xmlns="http://www.w3.org/2000/svg"  class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
</svg>`;
}

function generateSvgArrowDown() {
  return `<svg class="arrow__down swiper-button-next" xmlns="http://www.w3.org/2000/svg"  class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
</svg>`;
}

// генерация фото для галереи

function generatePhoto(country: string, n: number) {
  return `<figure class="figure swiper-slide photo__slide">
      <img src="./assets/./images/gallery/${country}/img_${n}.jpg" class="figure-img img-fluid rounded gallery__img" alt="Nice place">
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

// функция распознавания голоса

function microHandler() {
  const microphone = document.querySelector('.bi-mic-fill') as HTMLElement;
  microphone.addEventListener('click', voice);
}

function voice() {
  let lang = localStorage.getItem('language') || 'en';
  // @ts-ignore
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  // @ts-ignore
  const recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.interimResults = true;
  recognition.start();
  // @ts-ignore
  recognition.addEventListener("result", (e) => {
    try {
      const transcript = Array.from(e.results)
        // @ts-ignore
        .map(result => { return result[0] })
        .map(result => result.transcript)
        .join("");
      if (e.results[0].isFinal) {
        switch (lang) {
          case 'en': alert(`You said "${transcript}" If that's not what you wanted to say, try again.`);
            break;
          case 'ru': alert(`Вы сказали "${transcript}" Если это не то, что Вы хотели сказать, попробуйте еще раз.`);
            break;
          case 'be': alert(`Вы нясеце "${transcript}" Калі ты не думаеш, што вы хочаце, старайцеся.`);
            break;
        }
      }
    } catch {
      switch (lang) {
        case 'en': alert(`It's hard to understand you. Can you repeat again?`);
          break;
        case 'ru': alert(`Получилось неразборчиво. Пожалуйста, повторите.`);
          break;
        case 'be': alert(`Атрымалася неразборлiва. Калi ласка паўторыце.`);
          break;
      }
    }
  })
}
