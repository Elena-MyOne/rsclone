import { ROUTER_PATH } from "./constants/enums";
import { generateCountryPage } from "./pages/country/country";
import { generateHelpPage } from "./pages/help/help";
import { generateStartPage } from "./pages/start/start";
import { sceneInitStartPage, sceneInitHomePage } from "./components/canvas/SceneInit";
import { generateHeader } from "./components/header/header";
import { generateError404Page } from "./pages/error404/error404";
import { generateHomePage } from "./pages/home/home";
import { generateRegistrationPage } from "./pages/registration/registration";

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
    case ROUTER_PATH.COUNTRY: contentMain = generateCountryPage(Number(id));
      break;
    case ROUTER_PATH.HOME: contentMain = generateHomePage(); // Вставить функцию генерации домашней страницы
      break;
    case ROUTER_PATH.PROFILE: contentMain = 'Profile'; // Вставить функцию генерации профиля пользователя
      break;
    case ROUTER_PATH.REGISTRATION: contentMain = generateRegistrationPage(); // Вставить функцию генерации страницы регистрации
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

  if (hash === ROUTER_PATH.START || hash === '') {
    sceneInitStartPage();
  };
  if (hash === ROUTER_PATH.HOME) {
    sceneInitHomePage();
  };
}
