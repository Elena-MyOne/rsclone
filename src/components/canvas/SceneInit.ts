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

export function sceneInitHomePage() {
  // console.log(1);


  //Canvas
  const canvas = document.querySelector('canvas.home-page') as HTMLElement;
  // console.log(canvas)
  // Scene
  const scene = new THREE.Scene();

  //sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }


  // window.addEventListener('resize', () =>
  // {
  //   // Update sizes
  //   sizes.width = window.innerWidth
  //   sizes.height = window.innerHeight

  //   // Update camera
  //   camera.aspect = sizes.width / sizes.height
  //   camera.updateProjectionMatrix()

  //   // Update renderer
  //   renderer.setSize(sizes.width, sizes.height)
  //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // })

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
  const borderTexture = textureLoader.load(
    '../../assets/images/textures/boundaries_8k.png'
  )
  const galaxyTexture = textureLoader.load(
    '../../assets/images/textures/galaxy.png'
  )
  function createEarth(colorTexture: THREE.Texture, bumpTexture: THREE.Texture) {
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
  const earth = createEarth(colorTexture, bumpTexture);
  scene.add(earth);

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

  const cities = [
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
    const pin = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    )
    pin.name = city.name;
    arrOfPins.push(pin);
    pin.position.set(cityCoordinates.x, cityCoordinates.y, cityCoordinates.z);
    earth.add(pin);
  }

  //Raycaster
  const raycaster = new THREE.Raycaster();
  // let intersects: THREE.Intersection[];
  let intersectedObject: THREE.Object3D | null;
  const originalMaterials: { [id: string]: THREE.Material | THREE.Material[] } =
    {}
  const highlightedMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x00ff00
  })


  //handlers
  const mouse = new THREE.Vector2();
  const topOffset = Number(canvas.offsetTop);
  console.log(top)

  canvas.addEventListener('click', onCanvasMouseClick, false);
  function onCanvasMouseClick(event: MouseEvent) {
    mouse.x = event.clientX / sizes.width * 2 - 1;
    mouse.y = - ((event.clientY) / (sizes.height) * 2) + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(arrOfPins);

    if (intersects.length > 0) {
      intersectedObject = intersects[0].object;
      console.log(intersectedObject.name)
    }
  }


  //animation


  const clock = new THREE.Clock();
  const tick = () =>
  {
    const elapsedTime = clock.getElapsedTime();


    galaxy.rotation.y -= 0.002;
    // earth.rotation.y -= 0.002;

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
  // console.log(scene);
}





// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// export default class SceneInit {
//   scene: THREE.Scene;
//   camera: THREE.PerspectiveCamera;
//   renderer: THREE.WebGLRenderer;
//   fov: number;
//   nearPlane: number;
//   farPlane: number;
//   canvasClassName: string
//   clock: THREE.Clock;
//   controls: OrbitControls;
//   ambientLight: THREE.AmbientLight;
//   directionalLight: THREE.DirectionalLight;
  
//   constructor(canvasClassName: string) {
//     // NOTE: Core components to initialize Three.js app.
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera();
//     this.renderer = new THREE.WebGLRenderer();

//     // NOTE: Camera params;
//     this.fov = 45;
//     this.nearPlane = 1;
//     this.farPlane = 1000;
//     this.canvasClassName = canvasClassName;

//     // NOTE: Additional components.
//     this.clock = new THREE.Clock;
//     this.controls = new OrbitControls(this.camera, this.renderer.domElement);

//     // NOTE: Lighting is basically required.
//     this.ambientLight = new THREE.AmbientLight();
//     this.directionalLight = new THREE.DirectionalLight();
//   }

//   initialize() {
//     this.scene = new THREE.Scene();
//     this.camera = new THREE.PerspectiveCamera(
//       this.fov,
//       window.innerWidth / window.innerHeight,
//       1,
//       1000
//     );
//     this.camera.position.z = 48;

//     // NOTE: Specify a canvas which is already created in the HTML.
//     const canvas = document.querySelector(this.canvasClassName) as HTMLElement;
//     this.renderer = new THREE.WebGLRenderer({
//       canvas,
//       // NOTE: Anti-aliasing smooths out the edges.
//       antialias: true,
//     });
//     this.renderer.setClearColor(0xff0, 0.0);
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//     // this.renderer.shadowMap.enabled = true;
//     document.body.appendChild(this.renderer.domElement);

//     this.clock = new THREE.Clock();
//     this.controls = new OrbitControls(this.camera, this.renderer.domElement);

//     // ambient light which is for the whole scene
//     this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
//     this.ambientLight.castShadow = true;
//     this.scene.add(this.ambientLight);

//     // directional light - parallel sun rays
//     this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//     // this.directionalLight.castShadow = true;
//     this.directionalLight.position.set(0, 32, 64);
//     this.scene.add(this.directionalLight);

//     // if window resizes
//     window.addEventListener('resize', () => this.onWindowResize(), false);

//     // NOTE: Load space background.
//     // this.loader = new THREE.TextureLoader();
//     // this.scene.background = this.loader.load('./pics/space.jpeg');

//     // NOTE: Declare uniforms to pass into glsl shaders.
//     // this.uniforms = {
//     //   u_time: { type: 'f', value: 1.0 },
//     //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
//     //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
//     // };
//   }

//   animate() {
//     // NOTE: Window is implied.
//     // requestAnimationFrame(this.animate.bind(this));
//     window.requestAnimationFrame(this.animate.bind(this));
//     this.render();
//     this.controls.update();
//   }

//   render() {
//     // NOTE: Update uniform data on each render.
//     // this.uniforms.u_time.value += this.clock.getDelta();
//     this.renderer.render(this.scene, this.camera);
//   }

//   onWindowResize() {
//     this.camera.aspect = window.innerWidth / window.innerHeight;
//     this.camera.updateProjectionMatrix();
//     this.renderer.setSize(window.innerWidth, window.innerHeight);
//   }
// }
