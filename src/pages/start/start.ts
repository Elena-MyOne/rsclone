// import * as THREE from 'three';
// import SceneInit from '../../components/canvas/SceneInit';

export function generateStartPage(): string {
  return `
    <canvas class="start-page"></canvas>
  `
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