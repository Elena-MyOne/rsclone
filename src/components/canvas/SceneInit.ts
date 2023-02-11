import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader'
import { VerticalBlurShader  } from 'three/examples/jsm/shaders/VerticalBlurShader'



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


  // BLUR
  // const composer = new EffectComposer( renderer );
  // composer.addPass( new RenderPass( scene, camera ) );
  // const hblur = new ShaderPass( HorizontalBlurShader );
  // composer.addPass( hblur );
  // const vblur = new ShaderPass( VerticalBlurShader );
  // vblur.renderToScreen = true;
  // composer.addPass( vblur );
  
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
      // composer.render();

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
  }

  tick()
  // console.log(scene);
}

export function sceneInitHomePage() {
  
  //Canvas
  const canvas = document.querySelector('canvas.home-page') as HTMLCanvasElement;
  // const context = canvas.getContext('3d');
  // console.log(context);
  let topOffset = Number(canvas.offsetTop);
  
  // Scene
  const scene = new THREE.Scene();

  //sizes
  const sizes = {
    width: window.innerWidth,
    height: document.body.clientHeight - topOffset
  }

  window.addEventListener('resize', () =>
  {
    topOffset = Number(canvas.offsetTop);
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight - topOffset

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
  // console.log(renderer.getContext())
  renderer.clear(true);
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.autoClear = true;
  renderer.setClearColor(0x000000, 0.0);
  
  
  // loading
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

  const earth = createPlanet();

  scene.add(earth);
  
  // galaxy geometry
  const starGeometry = new THREE.SphereGeometry(80, 64, 64);

  // galaxy material
  const galaxyTexture = textureLoader.load(
    '../../assets/images/textures/galaxy.png'
  )
  const starMaterial = new THREE.MeshBasicMaterial({
      map : galaxyTexture,
      side: THREE.BackSide
  });

  // galaxy mesh
  const galaxy = new THREE.Mesh(starGeometry, starMaterial);

  scene.add(galaxy);

  //ambient light
  const ambientlight = createAmbientLight();
  scene.add(ambientlight);

  // point light
  const pointLight = new THREE.PointLight(0xffffff, 1, 100) // 5 for night
  pointLight.position.set(5, 3, 5);
  scene.add(pointLight);

  const cities = [
    {
      name: 'Canberra',
      lat: -35.282001,
      lon: 149.128998
    },
    {
      name: 'Brasilia',
      lat: -15.749997,
      lon: -47.9499962
    },
    {
      name: 'Beijing',
      lat: 39.916668,
      lon: 116.383331
    },
    {
      name: 'Moscow',
      lat: 55.751244,
      lon: 37.618423
    },
    {
      name: 'Washington',
      lat: 38.8951100,
      lon: -77.0363700
    },
  ];
  function calcPosFromLatLonRad(lat: number, lon: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(Math.sin(phi) * Math.cos(theta));
    const y = (Math.cos(phi));
    const z = (Math.sin(phi) * Math.sin(theta));

    return {x, y, z}
  }
  const arrOfPins: Array<THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>> = [];
  for (let city of cities) {
    const cityCoordinates = calcPosFromLatLonRad(city.lat, city.lon);
    const pin = createPin();
    pin.name = city.name;
    arrOfPins.push(pin);
    pin.position.set(cityCoordinates.x, cityCoordinates.y, cityCoordinates.z);
    earth.add(pin);
  }

  //Raycaster
  const raycaster = new THREE.Raycaster();
  let intersectedObject: THREE.Object3D | null;


  //handlers
  const mouse = new THREE.Vector2();

  // console.log(canvas.style)

  canvas.addEventListener('click', onCanvasMouseClick, false);
  function onCanvasMouseClick(event: MouseEvent) {
    mouse.x = event.clientX / sizes.width * 2 - 1;
    mouse.y = - ((event.clientY - topOffset) / (sizes.height) * 2) + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(arrOfPins);

    if (intersects.length > 0) {
      intersectedObject = intersects[0].object;
      alert(intersectedObject.name)
    }
  }

  //animation
  const clock = new THREE.Clock();
  const tick = () =>
  {
    const elapsedTime = clock.getElapsedTime();


    galaxy.rotation.y -= 0.002;
    earth.rotation.y -= 0.002;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    //raycaster
    // raycaster.setFromCamera(mouse, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()
}

const createPlanet = () => {
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
  const bumpTexture = textureLoader.load(
    '../../assets/images/textures/elev_bump_8k-min.jpg'
  );
  const borderTexture = textureLoader.load(
    '../../assets/images/textures/boundaries_8k.png'
  );
  const galaxyTexture = textureLoader.load(
    '../../assets/images/textures/galaxy.png'
  );
  let earth: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  const theme = localStorage.getItem("theme") as string;
  switch (theme) {
    case "dark":
      earth = createDarkPlanet(bumpTexture, borderTexture);
      break;

    default:
      earth = createLightPlanet(bumpTexture, borderTexture);
      break;
  }
  return earth;
}

const createDarkPlanet = (bumpTexture: THREE.Texture, borderTexture: THREE.Texture) => {
  const loadingManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(loadingManager);

  const colorTexture = textureLoader.load(
    '../../assets/images/textures/earth_nightlights_10K.jpg'
  )
  const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
  const earthMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFC489,
    emissiveIntensity: 0.3,
    emissive: 0xFFC489,
    map: colorTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.005,
    emissiveMap: borderTexture,
  });
  return new THREE.Mesh(earthGeometry, earthMaterial);
  
}

const createLightPlanet = (bumpTexture: THREE.Texture, borderTexture: THREE.Texture) => {
  const loadingManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(loadingManager);

  const colorTexture = textureLoader.load(
    '../../assets/images/textures/2_no_clouds_8k-min.jpg'
  )
  const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
  const earthMaterial = new THREE.MeshStandardMaterial({
    metalness: 1,
    map: colorTexture,
    bumpMap: bumpTexture,
    bumpScale: 0.005,
    metalnessMap: borderTexture,
  });
  return new THREE.Mesh(earthGeometry, earthMaterial);
}

const createAmbientLight = () => {
  let light: THREE.AmbientLight;
  const theme = localStorage.getItem("theme") as string;
  switch (theme) {
    case "dark":
      light = new THREE.AmbientLight(0x333333, 5);
      break;

    default:
      light = new THREE.AmbientLight(0x333333, 1);
      break;
  }
  return light;
}

const createPin = () => {
  let pin: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  const theme = localStorage.getItem("theme") as string;
  switch (theme) {
    case "dark":
      pin = pin = new THREE.Mesh(
          new THREE.SphereGeometry(0.035, 10, 10),
          new THREE.MeshBasicMaterial({ color: 0xfecd39 })
        );
      break;

    default:
      pin = new THREE.Mesh(
          new THREE.SphereGeometry(0.035, 10, 10),
          new THREE.MeshBasicMaterial({ color: 0x0dcaf0 })
        )
      break;
  }
  return pin;
}