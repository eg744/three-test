import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// dat depreciated
import * as dat from 'dat.gui';
import GUI from 'lil-gui';

const canvas = document.querySelector('canvas.webgl');

// Debug
const gui = new GUI();

// Textures
const textureLoader = new THREE.TextureLoader();
const exampleNormalTexture = textureLoader.load(
	'/static/textures/exampleNormalMap.png'
);

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
	alpha: true,
});
// flat plane
// alpha: transparent bg
// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
// renderer.setClearColor(0xfefefe);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const cubeBasicMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	// wireframe: true,,
	// wireframe: true,
});
const cubeStandardMaterial = new THREE.MeshStandardMaterial();
cubeStandardMaterial.normalMap = exampleNormalTexture;
const cube = new THREE.Mesh(geometryCube, cubeStandardMaterial);
scene.add(cube);

const geometryTorus = new THREE.TorusGeometry(3, 0.5, 100);
const torusMaterial = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true,
});
const torus = new THREE.Mesh(geometryTorus, torusMaterial);
scene.add(torus);

// camera.position.z = 5;

// Light
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 0.2);
pointLight2.position.set(1, 1, 1);
scene.add(pointLight2);

gui.add(pointLight2.position, 'y');

// Sets orbit control to move the camera around
// const orbit = new OrbitControls(camera, renderer.domElement);
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(6, 8, 14);

orbit.update();

// Sets a 12 by 12 grid
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function animate() {
	cube.rotation.x += 0.001;
	cube.rotation.y += 0.001;
	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===========================================
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	window.innerWidth / window.innerHeight,
// 	0.1,
// 	1000
// );

// const renderer = new THREE.WebGL1Renderer({
// 	canvas: document.querySelector('#bg'),
// });

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);

// renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({
// 	color: 0xff6347,
// 	wireframe: true,
// });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// function animate() {
// 	requestAnimationFrame(animate);
// 	renderer.render(scene, camera);
// }
// animate();

// =========================================
// import './style.css';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'dat.gui';

// // Debug
// const gui = new dat.GUI();

// // Canvas
// const canvas = document.querySelector('#bg');

// // Scene
// const scene = new THREE.Scene();

// // Objects
// const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

// // Materials

// const material = new THREE.MeshBasicMaterial();
// material.color = new THREE.Color(0xff0000);

// // Mesh
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

// // Lights

// const pointLight = new THREE.PointLight(0xffffff, 0.1);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// /**
//  * Sizes
//  */
// const sizes = {
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// };

// window.addEventListener('resize', () => {
// 	// Update sizes
// 	sizes.width = window.innerWidth;
// 	sizes.height = window.innerHeight;

// 	// Update camera
// 	camera.aspect = sizes.width / sizes.height;
// 	camera.updateProjectionMatrix();

// 	// Update renderer
// 	renderer.setSize(sizes.width, sizes.height);
// 	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	sizes.width / sizes.height,
// 	0.1,
// 	100
// );
// camera.position.x = 0;
// camera.position.y = 0;
// camera.position.z = 2;
// scene.add(camera);

// // Controls
// // const controls = new OrbitControls(camera, canvas)
// // controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
// 	canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// /**
//  * Animate
//  */

// const clock = new THREE.Clock();

// const tick = () => {
// 	const elapsedTime = clock.getElapsedTime();

// 	// Update objects
// 	sphere.rotation.y = 0.5 * elapsedTime;

// 	// Update Orbital Controls
// 	// controls.update()

// 	// Render
// 	renderer.render(scene, camera);

// 	// Call tick again on the next frame
// 	window.requestAnimationFrame(tick);
// };

// tick();
