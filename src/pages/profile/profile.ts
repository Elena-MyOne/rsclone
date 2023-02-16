import { translation } from "../country/country";
import { initIcon } from "../home/home-page-handlers";

export function generateProfilePage(): HTMLElement {
  const profileBlock = document.createElement('section');
  profileBlock.className = 'profile container';
  profileBlock.innerHTML = `<div class="profile__header">
      <div class="profile__personal">
        <div class="profile__avatar">
          <div class="photo"><img class="photo__img" src="./assets/images/avatars/avatar1.jpg" alt="Avatar"></div>
          <button data-i18="btnAvatar" class="btn btn-info photo__select">Выбрать аватар</button>
        </div>
        <h1 class="profile__name">Name</h1>
      </div>
      <div class="profile__settings">
        <div class="select_container">
          <select class="form-select lang_select">
            <option class="lang-option" value="EN">EN</option>
            <option class="lang-option" value="BE">BE</option>
            <option class="lang-option" value="RU">RU</option>
          </select>
        </div>
        <div class="theme_container">
          <button type="button" class="button theme-button" id="themeSwitch"></button>
        </div>
      </div>
    </div>
    <div class="profile__body">
      <h3 data-i18="profileProgress" class="profile__progress"></h3>
      <div class="profile__country country-list">
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressAustralia"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-i18="profileVisit" class="country-list__visit btn btn-info col"></button>
        </div>
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressBrazil"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-i18="profileVisit" class="country-list__visit btn btn-info col"></button>
        </div>
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressChina"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-i18="profileVisit" class="country-list__visit btn btn-info col"></button>
        </div>
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressRussia"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-i18="profileVisit" class="country-list__visit btn btn-info col"></button>
        </div>
        <div class="country-list__item row">
          <h4 class="country-list__name col" data-i18="progressUsa"></h4>
          <span class="country-list__percent col">0%</span>
          <button data-i18="profileTest" class="country-list__quiz col btn btn-info"></button>
          <button data-i18="profileVisit" class="country-list__visit btn btn-info col"></button>
        </div>
      </div>
    </div>
    ${generateAvatarsPopup()}`;
    
  // initIcon();
  return profileBlock;
}

translation();

function generateAvatarsPopup() {
  return `<div class="change-avatar">
    <div class="change-avatar__block">
      <button type="button" class="btn-close change-avatar__close" aria-label="Close"></button>
      <div class="card-img-top change-avatar__list">
        <div class="change-avatar__item">
        <input name="avatar" id="avatar1" type="radio">
        <label for="avatar1">
        <div class="change-img"><img src="./assets/images/avatars/avatar1.jpg" class="change-img__photo avatar_1" alt="Animal"></div>
          </label>
        </div>
        <div class="change-avatar__item">
        <input name="avatar" id="avatar2" type="radio">
        <label for="avatar2">
        <div class="change-img"><img src="./assets/images/avatars/avatar2.jpg" class="change-img__photo avatar_1" alt="Animal"></div>
          </label>
        </div>
        <div class="change-avatar__item">
        <input name="avatar" id="avatar3" type="radio">
        <label for="avatar3">
        <div class="change-img"><img src="./assets/images/avatars/avatar3.jpg" class="change-img__photo avatar_1" alt="Animal"></div>
          </label>
        </div>
        <div class="change-avatar__item">
        <input name="avatar" id="avatar4" type="radio">
        <label for="avatar4">
        <div class="change-img"><img src="./assets/images/avatars/avatar4.jpg" class="change-img__photo avatar_1" alt="Animal"></div>
          </label>
        </div>
        <div class="change-avatar__item">
        <input name="avatar" id="avatar5" type="radio">
        <label for="avatar5">
        <div class="change-img"><img src="./assets/images/avatars/avatar5.jpg" class="change-img__photo avatar_1" alt="Animal"></div>
          </label>
        </div>
        <div class="change-avatar__item">
        <input name="avatar" id="avatar6" type="radio">
        <label for="avatar6">
        <div class="change-img"><img src="./assets/images/avatars/avatar6.jpg" class="change-img__photo avatar_2" alt="Animal"></div>
          </label>
        </div>
      </div>
      <div class="card-body avatar__btns">
        <button data-i18="btnAvatarConfirm" class="btn btn-info btn-confirm"></button>
        <button data-i18="btnAvatarCancel" class="btn btn-info btn-cancel"></button>
      </div>
    </div>
    </div>`;
}

function changeAvatar() {
  const btnChangeAvatar = document.querySelector('.photo__select') as HTMLButtonElement;
  const btnClose = document.querySelector('.change-avatar__close') as HTMLButtonElement;
  const avatars = document.querySelector('.change-avatar') as HTMLElement;
  const avatarConfirm = document.querySelector('.btn-confirm') as HTMLButtonElement;
  const avatarCancel = document.querySelector('.btn-cancel') as HTMLButtonElement;
  const userAvatar = document.querySelector('.user avatar') as HTMLImageElement;

  btnChangeAvatar.addEventListener('click', () => {
    avatars.classList.add('change-avatar_active');
  })
  btnClose.addEventListener('click', () => {
    avatars.classList.remove('change-avatar_active');
  })
  avatars.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('change-avatar')) {
      avatars.classList.remove('change-avatar_active');
    }
  })
}


