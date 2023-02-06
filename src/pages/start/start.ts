// import * as THREE from 'three';
// import SceneInit from '../../components/canvas/SceneInit';

import { onHelpClick, startPageHandlers } from "./handlers";

export function generateStartPage() {
  const helpBlock = document.createElement('div');
  helpBlock.innerHTML = `
  <canvas class="start-page"></canvas>
  <div class="container py-5 text-center">
    <h1 class="start-page__title display-1 fw-semibold">Amazing Trip</h1>
    <div class="buttons-container container">
    <div class="row">
      <div class="col">
        <button type="button" class="button help-button">
          <img src="./assets/icons/info_white.svg" alt="help">
        </button>
      </div>
      <div class="col">
        <span data-18i="titleStart" class="blink">Press Enter to start the journey</span>
      </div>
    </div>
    </div>
  </div>
`;
  (helpBlock.querySelector('.help-button') as HTMLButtonElement).onclick = onHelpClick;
  startPageHandlers();
  return helpBlock;
}
// export function sceneIninStartPage() {
//   const startPage = new SceneInit('start-page');
//     startPage.initialize();
//     startPage.animate();

//     // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
//     // const boxMaterial = new THREE.MeshNormalMaterial();
//     // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
//     // test.scene.add(boxMesh);

//     const animate = () => {
//       // if (loadedModel) {
//       //   loadedModel.scene.rotation.x += 0.01;
//       //   loadedModel.scene.rotation.y += 0.01;
//       //   loadedModel.scene.rotation.z += 0.01;
//       // }
//       requestAnimationFrame(animate);
//     };
//     animate();
// }