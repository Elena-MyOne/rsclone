import { ROUTER_PATH } from "./constants/enums";
import { generateHelpPage } from "./pages/help/help";

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
  let contentHeader = 'Header'; // Вставить функцию генерации хедера
  const [hash, id] = window.location.hash.slice(1).split('/');
  switch (hash) {
    case ROUTER_PATH.HELP: contentMain = generateHelpPage();
      break;
    case ROUTER_PATH.COUNTRY: contentMain = 'Country'; // TODO Сюда вставить функцию, которая принимает id страны
      break;
    case ROUTER_PATH.HOME: contentMain = 'Home'; // Вставить функцию генерации домашней страницы
      break;
    case ROUTER_PATH.PROFILE: contentMain = 'Profile'; // Вставить функцию генерации профиля пользователя
      break;
    case '':
    case ROUTER_PATH.START: {
      contentMain = 'Start'; // Вставить функцию генерации стартовой страницы
      contentHeader = '';
      break;
    }
    default: contentMain = 'Error: 404'; // Вставить функцию генерации страницы Error
  }
  header.innerHTML = contentHeader;
  main.innerHTML = contentMain;
}
