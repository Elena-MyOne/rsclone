import { ROUTER_PATH } from "./constants/enums";
import { generateCountryPage, translation } from "./pages/country/country";
import { generateHelpPage } from "./pages/help/help";
import { generateStartPage } from "./pages/start/start";
import { sceneInitStartPage, sceneInitHomePage } from "./components/canvas/SceneInit";
import { generateHeader, setRegistrationHeaderLink } from "./components/header/header";
import { generateError404Page } from "./pages/error404/error404";
import { generateHomePage } from "./pages/home/home";
import { generateRegistrationPage } from "./pages/registration/registration";
import { handlers, initTheme } from "./pages/home/home-page-handlers";
import { changeAvatarHandler, generateProfilePage } from "./pages/profile/profile";


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
  setRegistrationHeaderLink();
  translation();
  initTheme();

  if (hash === ROUTER_PATH.START || hash === '') {
    sceneInitStartPage();
  }

  if (hash === ROUTER_PATH.HOME) {
    handlers();
  }
  
  if (hash === ROUTER_PATH.PROFILE) {
    changeAvatarHandler();
  }
}
