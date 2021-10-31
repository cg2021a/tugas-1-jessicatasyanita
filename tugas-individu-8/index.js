import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js';

/** @type {THREE.OrthographicCamera} */
let camera;
/** @type {THREE.Scene} */
let scene;
/** @type {THREE.WebGLRenderer} */
let renderer;

(function init() {
  // set up three.js scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('lightGray');
  scene.fog = new THREE.Fog(0xffffff, 20, 150);

  //lights
  const ambientLight = new THREE.AmbientLight('white', 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 0.6);
  directionalLight.position.set(2, 3, -2);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(-6, 2, 15);

  //#region  //*=========== Panorama ===========
  const texture = new THREE.TextureLoader().load('image/snowy_field.jpeg');

  const geometry = new THREE.SphereGeometry(20, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  //#endregion  //*======== Panorama ===========

  //#region  //*=========== Reflective ===========
  const textureEquirec = new THREE.TextureLoader().load(
    'image/snowy_field.jpeg'
  );
  textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  textureEquirec.encoding = THREE.sRGBEncoding;

  const refGeometry = new THREE.SphereGeometry(1.5, 32, 32);
  const refMaterial = new THREE.MeshBasicMaterial({
    envMap: textureEquirec,
  });
  const reflective = new THREE.Mesh(refGeometry, refMaterial);

  reflective.castShadow = true;
  reflective.receiveShadow = true;

  reflective.position.set(5, 0, 0);
  scene.add(reflective);
  //#endregion  //*======== Reflective ===========

  //#region  //*=========== Plane ===========
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(13, 8, 100, 100),
    new THREE.MeshPhongMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
  );
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -5;
  plane.position.z = 3;
  scene.add(plane);
  //#endregion  //*======== Plane ===========

  //#region  //*=========== Create sphere1 ===========
  const sphere1Texture = new THREE.TextureLoader().load('image/snow-texture.jpeg');
  const sphere1Geometry = new THREE.SphereGeometry(0.7, 30, 30);
  const sphere1Material = new THREE.MeshPhongMaterial({
    map: sphere1Texture,
  });
  const sphere1 = new THREE.Mesh(sphere1Geometry, sphere1Material);
  sphere1.castShadow = true;
  sphere1.receiveShadow = true;
  scene.add(sphere1);
  //#endregion  //*======== Create sphere1 ===========

  //#region  //*=========== Object ===========
  const objLoader = new OBJLoader();
  objLoader.load('obj/car.obj', (object) => {
    object.position.set(0.2, -3, -2.5);
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);
  });
  //#endregion  //*======== Object ===========

  renderer = new THREE.WebGLRenderer({ antialias: true });
  //#region  //*=========== Orbit ===========
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  //#endregion  //*======== Orbit ===========

  // Render
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);
  document.body.appendChild(renderer.domElement);

  function animation() {
    sphere1.rotation.x += 0.001;
    sphere1.rotation.y += 0.001;
    sphere1.rotation.z += 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  }
  animation();
})();