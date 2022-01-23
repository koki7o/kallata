import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(9, 0.1, 30, 200);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const torus = new THREE.Mesh(geometry, material);
//scene.add(torus);

const geometry2 = new THREE.TorusGeometry(7, 0.1, 30, 200);
const material2 = new THREE.MeshStandardMaterial({ color: 0xffffff });
const torus2 = new THREE.Mesh(geometry2, material2);
//scene.add(torus2);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

//const spaceTexture = new THREE.TextureLoader().load("space.jpg");
//scene.background = spaceTexture;

// Avatar

const myTexture = new THREE.TextureLoader().load("koki7o.png");

const me = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: myTexture })
);

//scene.add(me);

// Earth

const earthTexture = new THREE.TextureLoader().load("earth.jpg");
const earthBump = new THREE.TextureLoader().load('bump.jpg');
const earthSpecular = new THREE.TextureLoader().load('specular.jpg');
const specularColor = new THREE.Color('black');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshPhongMaterial({
    map: earthTexture,
    //bumpMap: earthBump,
    //bumpScale: 0.5,
    //specularMap: earthSpecular,
    //specular: specularColor,
    //normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = -5;
earth.position.x = 2;

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    //normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

me.position.z = -5;
me.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
/*   moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05; */

  /* 
  me.rotation.y += 0.01;
  me.rotation.z += 0.01; */

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x += 0.01;
  torus2.rotation.y -= 0.005;
  torus2.rotation.z += 0.01;

  moon.rotation.y += 0.005;
  earth.rotation.y += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
