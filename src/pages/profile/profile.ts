import { generateQuiz } from "../../components/quiz/quiz";
import { ROUTER_PATH } from "../../constants/enums";

export function generateProfilePage(): HTMLElement {
  const profileBlock = document.createElement('section');
  profileBlock.className = 'profile container';
  const avatarNumber = localStorage.getItem('userAvatar') || '7';
  profileBlock.innerHTML = `<div class="profile__header">
      <div class="profile__personal">
        <div class="profile__avatar">
          <div class="photo"><img class="photo__img" src="./assets/images/avatars/avatar${avatarNumber}.jpg" alt="Avatar"></div>
          <button data-i18="btnAvatar" class="btn btn-info photo__select">Выбрать аватар</button>
        </div>
        <h1 class="profile__name">Name</h1>
      </div>
    </div>
    ${generateQuizPopup()}
    <div class="profile__body">
      <h3 data-i18="profileProgress" class="profile__progress"></h3>
      <div class="profile__country country-list">
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressAustralia"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-countryId="1" data-i18="profileVisit" class="country-list__visit button_visit btn btn-info col"></button>
        </div>
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressBrazil"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-countryId="2" data-i18="profileVisit" class="country-list__visit button_visit btn btn-info col"></button>
        </div>
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressChina"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-countryId="3" data-i18="profileVisit" class="country-list__visit button_visit btn btn-info col"></button>
        </div>
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressRussia"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-countryId="4" data-i18="profileVisit" class="country-list__visit button_visit btn btn-info col"></button>
        </div>
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressUsa"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-countryId="5" data-i18="profileVisit" class="country-list__visit button_visit btn btn-info col"></button>
        </div>
      </div>
    </div>
    ${generateAvatarsPopup()}
    `;
  return profileBlock;
}

const numbersAvatar = [1, 2, 3, 4, 5, 6]; // массив для генерации popup с выбором аватарки

// генерация popup с выбором аватарки

function generateAvatarsPopup() {
  return `<div class="change-avatar">
    <div class="change-avatar__block">
      <button type="button" class="btn-close change-avatar__close" aria-label="Close"></button>
      <div class="card-img-top change-avatar__list">
        ${numbersAvatar.map((item) => {
    return `
        <div data-avatar="${item}" class="change-avatar__item">
          <input name="avatar" id="avatar${item}" type="radio">
          <label for="avatar${item}">
            <img src="./assets/images/avatars/avatar${item}.jpg" class="change-img" alt="Avatar">
          </label>
        </div>`}).join('')}
      <div class="card-body avatar__btns">
        <button data-i18="btnAvatarConfirm" class="btn btn-info btn-confirm"></button>
        <button data-i18="btnAvatarCancel" class="btn btn-info btn-cancel"></button>
      </div>
    </div>
    </div>`;
}

// выбор аватарки и закрытие popup

export function changeAvatarHandler() {
  const btnChangeAvatar = document.querySelector('.photo__select') as HTMLButtonElement;
  const btnClose = document.querySelector('.change-avatar__close') as HTMLButtonElement;
  const avatars = document.querySelector('.change-avatar') as HTMLElement;
  const avatarConfirm = document.querySelector('.btn-confirm') as HTMLButtonElement;
  const avatarCancel = document.querySelector('.btn-cancel') as HTMLButtonElement;
  const userAvatar = document.querySelector('.photo__img') as HTMLImageElement;
  const avatarList = document.querySelectorAll('.change-avatar__item') as NodeListOf<HTMLElement>;
  let numberAvatar: string;

  avatarList.forEach(avatar => {
    avatar.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      numberAvatar = target.getAttribute('data-avatar') || '7';
      localStorage.setItem('userAvatar', numberAvatar);
      console.log(numberAvatar);
    })
  })

  avatarConfirm.addEventListener('click', () => {
    userAvatar.src = `./assets/images/avatars/avatar${numberAvatar}.jpg`;
    avatars.classList.remove('change-avatar_active');
  })

  btnChangeAvatar.addEventListener('click', () => {
    avatars.classList.add('change-avatar_active');
  })

  btnClose.addEventListener('click', () => {
    avatars.classList.remove('change-avatar_active');
  })

  avatarCancel.addEventListener('click', () => {
    avatars.classList.remove('change-avatar_active');
  })

  avatars.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('change-avatar')) {
      avatars.classList.remove('change-avatar_active');
    }
  })
}

// генерация popup с квизом

function generateQuizPopup() {
  return `
  <div class="profile__wrapper-quiz">
    <div class="profile__quiz"></div>
  </div>`
}

// вызов и закрытие теста

export function buttonTestHandler() {
  const btnQuiz = document.querySelectorAll('.country-list__quiz') as NodeListOf<HTMLButtonElement>;
  const quiz = document.querySelector('.profile__quiz') as HTMLElement;
  const quizBlock = document.querySelector('.profile__wrapper-quiz') as HTMLElement;

  btnQuiz.forEach((btn) => {
    btn.addEventListener('click', () => {
      quiz.innerHTML = '';
      quiz.append(generateQuiz());
      quizBlock.classList.add('profile__wrapper-quiz_active');
      const btnClose = document.querySelector('.quiz__close') as HTMLButtonElement;
      btnClose.addEventListener('click', () => {
        quizBlock.classList.remove('profile__wrapper-quiz_active');
      })
    })
  })
}

// переход на страницу страны

export function visitCountryFromProfile() {
  const buttonsVisit = document.querySelectorAll('.button_visit') as NodeListOf<HTMLButtonElement>;

  buttonsVisit.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const id = target.getAttribute('data-countryId');
      window.location.hash = ROUTER_PATH.COUNTRY + `/${id}`;
    })
  })
}
