import { ROUTER_PATH } from "../../constants/enums";
export function startPageHandlers() {
  const helpButton = document.querySelector('.help-button') as HTMLButtonElement;
  // console.log(helpButton)
  helpButton.addEventListener('click', () => {
    window.location.hash = ROUTER_PATH.HELP;
  });

  window.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
      window.location.hash = ROUTER_PATH.HOME;
    }
  });
}