import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const starsTexture = new THREE.CubeTextureLoader().load([
  "stars.jpg",
  "stars.jpg",
  "stars.jpg",
  "stars.jpg",
  "stars.jpg",
  "stars.jpg",
]);
const sunTexture = new THREE.TextureLoader().load("sun.jpg");
const mercuryTexture = new THREE.TextureLoader().load("mercury.jpg");
const venusTexture = new THREE.TextureLoader().load("venus.jpg");
const earthTexture = new THREE.TextureLoader().load("earth.jpg");
const marsTexture = new THREE.TextureLoader().load("mars.jpg");
const jupiterTexture = new THREE.TextureLoader().load("jupiter.jpg");
const saturnTexture = new THREE.TextureLoader().load("saturn.jpg");
const uranusTexture = new THREE.TextureLoader().load("uranus.jpg");
const neptuneTexture = new THREE.TextureLoader().load("neptune.jpg");
const plutoTexture = new THREE.TextureLoader().load("pluto.jpg");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  4000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = starsTexture;

// sun
const sunGeo = new THREE.SphereGeometry(30, 30, 30);
const sunMesh = new THREE.MeshStandardMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeo, sunMesh);
scene.add(sun);

// making a function
function makeTheplanets(size, texture, distance) {
  const geometry = new THREE.SphereGeometry(size, 30, 30);
  const mesh = new THREE.MeshStandardMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, mesh);

  planet.position.x += distance;

  // orbits of the planet

  // orbit

  const orbitGeo = new THREE.RingGeometry(distance - 1, distance, 50);
  const orbitMesh = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const orbit = new THREE.Mesh(orbitGeo, orbitMesh);

  orbit.rotation.x = -0.5 * Math.PI;

  scene.add(planet, orbit);
  return planet;
}

const mercury = makeTheplanets(5, mercuryTexture, 50);
const venus = makeTheplanets(8, venusTexture, 100);
const earth = makeTheplanets(15, earthTexture, 180);
const mars = makeTheplanets(8, marsTexture, 250);
const jupiter = makeTheplanets(25, jupiterTexture, 350);
const saturn = makeTheplanets(18, saturnTexture, 400);
const uranus = makeTheplanets(16, uranusTexture, 500);
const neptune = makeTheplanets(18, neptuneTexture, 600);
const pluto = makeTheplanets(18, plutoTexture, 650);

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
controls.update();

function rotateBodiesOnAxis(
  planet,
  xValue = 0.01,
  yValue = 0.01,
  zValue = 0.01
) {
  planet.rotation.x += xValue;
  planet.rotation.x += yValue;
  planet.rotation.z += zValue;
}

function rotatePlanetAlongOrbits(planet, angle = -0.01, orbitRadius = 230) {
  const newX = orbitRadius * Math.cos(angle);
  const newZ = orbitRadius * Math.sin(angle);
  planet.position.set(newX, 0, newZ);
}

let angle = 0;

function animate() {
  requestAnimationFrame(animate);

  rotateBodiesOnAxis(sun);
  rotateBodiesOnAxis(mercury, 0.01, 0.01, 0.01);
  rotateBodiesOnAxis(venus, 0.01, 0.01, 0.01);
  rotateBodiesOnAxis(earth, 0.01, 0.01, 0.01);
  rotateBodiesOnAxis(mars, 0.01, 0.01, 0.01);
  rotateBodiesOnAxis(jupiter, 0.01, 0.01, 0.01);
  rotateBodiesOnAxis(saturn, 0.01, 0.01, 0.01);
  rotateBodiesOnAxis(uranus, 0.01, 0.01, 0.01);
  rotateBodiesOnAxis(neptune, 0.01, 0.01, 0.01);
  rotateBodiesOnAxis(pluto, 0.01, 0.01, 0.01);
  angle -= 0.01;

  rotatePlanetAlongOrbits(mercury, angle - 1, 50);
  rotatePlanetAlongOrbits(venus, angle - 0.1, 100);
  rotatePlanetAlongOrbits(earth, angle - 5, 180);
  rotatePlanetAlongOrbits(mars, angle - 7, 250);
  rotatePlanetAlongOrbits(jupiter, angle - 0.9, 350);
  rotatePlanetAlongOrbits(saturn, angle - 0.1, 400);
  rotatePlanetAlongOrbits(uranus, angle - 0.4, 500);
  rotatePlanetAlongOrbits(neptune, angle - 1, 600);
  rotatePlanetAlongOrbits(pluto, angle - 0.01, 650);

  controls.update();

  renderer.render(scene, camera);
}

animate();

renderer.render(scene, camera);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
