import { HEADER_PAGES } from "../../constants/enums";
import { content } from "../../constants/i18n";

export function generateHeader(): string {

  return `
      <nav class="header__nav navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid container">
          <a class="header__logo navbar-brand" href="#home">Amazing Trip</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarNav"
            aria-controls="offcanvasDarkNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-top" id="navbarNav">
            <div class="offcanvas-header">
              <a class="header__logo navbar-brand" href="#home">Amazing Trip</a>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close">
              </button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a data-i18="btnHome" class="nav-link active" aria-current="page" href="#home">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link sign-up" href="#registration">Sign up</a>
                </li>
                <li class="nav-item">
                  <a data-i18="btnLogIn" class="nav-link" href="#profile">Log in</a>
                </li>
                <li class="nav-item">
                  <a data-i18="btnHelp" class="nav-link" href="#help">Help</a>
                </li>
              </ul>
              <form class="header-form d-flex">
                <select class="form-select lang_select">
                  <option class="lang-option" value="EN">EN</option>
                  <option class="lang-option" value="BE">BE</option>
                  <option class="lang-option" value="RU">RU</option>
                </select>
                <button type="button" class="button theme-button" id="themeSwitch">
                  </button>
              </form>
            </div>
            
          </div>
        </div>
      </nav>
  `
}

function checkRegistration(): string {
  const signUp = localStorage.getItem('signUp');
  const language = localStorage.getItem('language') || 'en';
  if (signUp) {
    const isSignUp = JSON.parse(signUp);

    if (isSignUp)
      switch(language) {
        case 'ru':
          return content.ru.btnLogOut
        case 'be':
          return content.be.btnLogOut
        default:
          return content.en.btnLogOut
      }
  }
  switch(language) {
    case 'ru':
      return content.ru.btnSignUp
    case 'be':
      return content.be.btnSignUp
    default:
      return content.en.btnSignUp
  }
}

export function setRegistrationHeaderLink(): void {
  const link = document.querySelector('.sign-up');
  if (link) {
    link.innerHTML = checkRegistration();
  }
}