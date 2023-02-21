// import * as THREE from 'three';
// import SceneInit from '../../components/canvas/SceneInit';

import { onHelpClick, startPageHandlers } from "./handlers";

export function generateStartPage() {
  const startPage = document.createElement('div');
  startPage.classList.add("start-page")
  startPage.innerHTML = `
  <canvas class="start-page"></canvas>
  <div class="container py-5 text-center">
    <h1 class="start-page__title display-1 fw-semibold">Amazing Trip</h1>
    <div class="buttons-container">
      <div class="row">
        <div class="col">
          <button type="button" class="button help-button">
            <img src="./assets/icons/info_white.svg" alt="help">
          </button>
        </div>
        <div class="col">
          <span data-i18="titleStart" class="blink">Press Enter to start the journey</span>
        </div>
      </div>
    </div>
  </div>
`;
  (startPage.querySelector('.help-button') as HTMLButtonElement).onclick = onHelpClick;
  startPageHandlers();
  return startPage;
}