import { ROUTER_PATH } from "../../constants/enums";
export function startPageHandlers() {
  window.addEventListener('keypress', startPageEnter);
}

export function onHelpClick() {
  window.removeEventListener('keypress', startPageEnter);
  window.location.hash = ROUTER_PATH.HELP;
}

export function startPageEnter(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    window.location.hash = ROUTER_PATH.HOME;
    window.removeEventListener('keypress', startPageEnter);
  }
}
