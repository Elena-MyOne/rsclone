import { ROUTER_PATH } from "./constants/enums";
import { generateCountryPage } from "./pages/country/country";
import { generateHelpPage } from "./pages/help/help";
import { generateStartPage } from "./pages/start/start";
import { sceneInitStartPage } from "./pages/start/sceneInit";
import { startPageHandlers } from "./pages/start/handlers";
import { generateHeader } from "./components/header/header";

export function router() {
  generateContentByHash();
  window.addEventListener('hashchange', () => {
    generateContentByHash();
  })
}

function generateContentByHash() {
  const main = document.querySelector('.root') as HTMLElement;
  const header = document.querySelector('.header') as HTMLElement;
  let contentMain = '';
  let contentHeader = generateHeader();
  const [hash, id] = window.location.hash.slice(1).split('/');
  switch (hash) {
    case ROUTER_PATH.HELP: contentMain = generateHelpPage();
      break;
    case ROUTER_PATH.COUNTRY: contentMain = generateCountryPage(Number(id));
      break;
    case ROUTER_PATH.HOME: contentMain = 'Home'; // Вставить функцию генерации домашней страницы
      break;
    case ROUTER_PATH.PROFILE: contentMain = 'Profile'; // Вставить функцию генерации профиля пользователя
      break;
    case ROUTER_PATH.REGISTRATION: contentMain = 'Registration'; // Вставить функцию генерации страницы регистрации
      break;
    case '':
    case ROUTER_PATH.START: {
      contentMain = generateStartPage(); // Вставить функцию генерации стартовой страницы
      contentHeader = '';
      break;
    }
    default: contentMain = 'Error: 404'; // Вставить функцию генерации страницы Error
  }
  header.innerHTML = contentHeader;
  main.innerHTML = contentMain;

  sceneInitStartPage();
  startPageHandlers();// I really dont know how to use it another way
}
