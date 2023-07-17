import { ROUTER_PATH } from "./constants/enums";
import { generateCountryPage, translation } from "./pages/country/country";
import { generateHelpPage } from "./pages/help/help";
import { generateStartPage } from "./pages/start/start";
import { sceneInitStartPage } from "./components/canvas/SceneInit";
import { generateHeader, changeHeaderOnSignUp } from "./components/header/header";
import { generateError404Page } from "./pages/error404/error404";
import { generateHomePage } from "./pages/home/home";
import { generateRegistrationPage } from "./pages/registration/registration";
import { header_handlers, changeActiveLink } from "./components/header/header_handlers";
import { buttonTestHandler, changeAvatarHandler, generateProfilePage, visitCountryFromProfile } from "./pages/profile/profile";
import { generateLoginPage } from "./pages/login/login";

export function router() {
  generateContentByHash();
  window.addEventListener('hashchange', () => {
    generateContentByHash();
  })
}

function generateContentByHash() {
  const main = document.querySelector('.root') as HTMLElement;
  const header = document.querySelector('.header') as HTMLElement;
  let contentHeader = generateHeader();
  main.innerHTML = '';
  let contentMain = null;
  const [hash, id] = window.location.hash.slice(1).split('/');
  switch (hash) {
    case ROUTER_PATH.HELP: contentMain = generateHelpPage();
      break;
    case ROUTER_PATH.COUNTRY: contentMain = generateCountryPage(Number(id[0]));
      break;
    case ROUTER_PATH.HOME: contentMain = generateHomePage();
      break;
    case ROUTER_PATH.PROFILE: contentMain = generateProfilePage();
      break;
    case ROUTER_PATH.REGISTRATION: contentMain = generateRegistrationPage();
      break;
    case ROUTER_PATH.LOGIN: contentMain = generateLoginPage();
      break;
    case '':
    case ROUTER_PATH.START: {
      contentMain = generateStartPage();
      contentHeader = '';
      break;
    }
    default: contentMain = generateError404Page();
  }
  header.innerHTML = contentHeader;
  main.append(contentMain);
  changeHeaderOnSignUp();
  changeActiveLink();
  translation();



  if (hash === ROUTER_PATH.START || hash === '') {
    sceneInitStartPage();
  } else {
    header_handlers();
  }
}



