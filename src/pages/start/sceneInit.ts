import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



export function sceneInitStartPage() {


  //Canvas
  const canvas = document.querySelector('canvas.start-page') as HTMLElement;

  // Scene
  const scene = new THREE.Scene();

  //sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  window.addEventListener('resize', () =>
  {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  // Base camera
  const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 1000);
  camera.position.y = 0.35;
  camera.position.z = 2;
  scene.add(camera)

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  //renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);


  //loading console.log - debug
  const loadingManager = new THREE.LoadingManager()
  loadingManager.onStart = () =>
  {
      console.log('loadingManager: loading started')
  }
  loadingManager.onLoad = () =>
  {
      console.log('loadingManager: loading finished')
  }
  loadingManager.onProgress = () =>
  {
      console.log('loadingManager: loading progressing')
  }
  loadingManager.onError = () =>
  {
      console.log('loadingManager: loading error')
  }
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const colorTexture = textureLoader.load(
    '../../assets/images/textures/2_no_clouds_8k-min.jpg'
  )
  const bumpTexture = textureLoader.load(
    '../../assets/images/textures/elev_bump_8k-min.jpg'
    )
  const specularTexture = textureLoader.load(
    '../../assets/images/textures/water_8k-min.png'
  )
  const cloudTexture = textureLoader.load(
    '../../assets/images/textures/earthCloud-min.png'
  )
  const galaxyTexture = textureLoader.load(
    '../../assets/images/textures/galaxy.png'
  )
  function createEarth(colorTexture: THREE.Texture, bumpTexture: THREE.Texture) {
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
        // color: null,
        // roughness: 0.6,
        // metalness: 1,
        map: colorTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.0007,
        specularMap: specularTexture,
        specular: new THREE.Color('grey'),
        // metalnessMap: borderTexture,
        // envMapIntensity: 2
    });
    return new THREE.Mesh(earthGeometry, earthMaterial);
  }
  const earth = createEarth(colorTexture, bumpTexture);
  scene.add(earth);

  function createClouds() {
    // cloud Geometry
    const cloudGeometry = new THREE.SphereGeometry(1.005, 32, 32);
    // cloud metarial
    const cloudMetarial = new THREE.MeshStandardMaterial({
        map: cloudTexture,
        transparent: true,
    });
    
    // cloud mesh
    return new THREE.Mesh(cloudGeometry, cloudMetarial);

  }
  const clouds = createClouds();
  scene.add(clouds);

  function createGalaxy() {
    // galaxy geometry
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);

    // galaxy material
    const starMaterial = new THREE.MeshBasicMaterial({
        map : galaxyTexture,
        side: THREE.BackSide
    });

    // galaxy mesh
    return new THREE.Mesh(starGeometry, starMaterial);
}
const galaxy = createGalaxy();
scene.add(galaxy);

  const ambientlight = new THREE.AmbientLight(0x333333, 1); // 5 for night
  scene.add(ambientlight);

  // point light
  const pointLight = new THREE.PointLight(0xffffff, 1, 100) // 5 for night
  pointLight.position.set(5, 3, 5);
  scene.add(pointLight);

//   const helper = new THREE.PointLightHelper(pointLight);
// helper.geometry.setDrawRange(0, 38); //excludes the last few lines from being drawn

// scene.add(helper);


  //animation
  const clock = new THREE.Clock()

  const tick = () =>
  {
      const elapsedTime = clock.getElapsedTime()
      galaxy.rotation.y -= 0.002;
      earth.rotation.y -= 0.0015;
      clouds.rotation.y -= 0.0016;

      // Update controls
      controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
  }

  tick()
  // console.log(scene);
}