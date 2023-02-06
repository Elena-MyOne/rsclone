import { ROUTER_PATH } from "./constants/enums";
import { generateHeader } from "./components/header/header";
import { generateCountryPage } from "./pages/country/country";
import { generateHelpPage } from "./pages/help/help";
import { generateStartPage } from "./pages/start/start";
import { sceneInitStartPage } from "./pages/start/sceneInit";
<<<<<<< HEAD
import { generateHeader } from "./components/header/header";
import { generateError404Page } from "./pages/error404/error404";
=======
import { startPageHandlers } from "./pages/start/handlers";
import { generateHomePage } from "./pages/home/home";
>>>>>>> 2e28adf (add and remove buttoms implement)

export function router() {
  generateContentByHash();
  window.addEventListener('hashchange', () => {
    generateContentByHash();
  })
}

function generateContentByHash() {
  const main = document.querySelector('.root') as HTMLElement;
  const header = document.querySelector('.header') as HTMLElement;
<<<<<<< HEAD
  let contentHeader = generateHeader();
  main.innerHTML = '';
  let contentMain = null;
=======
  let contentMain = '';
  let contentHeader = generateHeader(); // Вставить функцию генерации хедера
>>>>>>> 2e28adf (add and remove buttoms implement)
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
    case ROUTER_PATH.REGISTRATION: contentMain = 'Registration'; // Вставить функцию генерации страницы регистрации
      break;
    case '':
    case ROUTER_PATH.START: {
      contentMain = generateStartPage();
      contentHeader = '';
      setTimeout(() => {
        sceneInitStartPage();
        startPageHandlers();// I really dont know how to use it another way
      }, 0);
      break;
    }
    default: contentMain = generateError404Page();
  }
  header.innerHTML = contentHeader;
<<<<<<< HEAD
  main.append(contentMain);

  if (hash === ROUTER_PATH.START || hash === '') {
    sceneInitStartPage();
  };
=======
  main.innerHTML = contentMain;
>>>>>>> 2e28adf (add and remove buttoms implement)
}
