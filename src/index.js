import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Grass from "./Grass";
import Ball from "./Ball";
import Flag from "./Flag";

import Nx from "../assets/cubemap/nx.png";
import Ny from "../assets/cubemap/ny.png";
import Nz from "../assets/cubemap/nz.png";
import Px from "../assets/cubemap/px.png";
import Py from "../assets/cubemap/py.png";
import Pz from "../assets/cubemap/pz.png";

import ballBumpMap from "../assets/ballBumpMap.jpg";
import ballTexture from "../assets/ballTexture.jpg";
import grassBumpMap from "../assets/grassBumpMap.png";
import grassTexture from "../assets/grassTexture.png";
import pauseScreen from "../assets/pauseScreen.png";

import "./style.css";

let camera, PerspectiveCamera, OrtogonalCamera;
let scene = [];

let renderer;
let clock = new THREE.Clock();
let cameraRatio = 10;

let directionalLight;
let on_off_Directional = 0;
let pointLight;
let on_off_Point;

let allMaterials = [];
let changeWireframe = false;
let changeMesh = false;

let grass;
let grassW = 150;
let grassD = 150;
let ball;
let ball_radius = 3;
let flag;
let stem_base = 1.5;
let stem_height = 30;
let flag_w = 5;
let flag_h = 5;
let flag_d = 1;
let stem_color = new THREE.Color("grey");
let flag_color = new THREE.Color("rgb(254, 90, 6)");

let pause = false;

// Sets the z-axis as the top pointing one
THREE.Object3D.DefaultUp.set(0, 0, 1);

function createSkyBox() {
  let skyboxgeo = new THREE.BoxGeometry(grassW, grassW, grassD);

  let skyboxfaces = [
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(Px),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(Nx),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(Py),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(Ny),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(Pz),
      side: THREE.BackSide,
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(Nz),
      side: THREE.DoubleSide,
    }),
  ];

  let skyboxmesh = new THREE.Mesh(skyboxgeo, skyboxfaces);

  skyboxmesh.position.set(0, 0, grassW / 2 - 1);

  scene[0].add(skyboxmesh);
}

//creates a new scene with Pause Mode
function createPauseMessage() {
  scene[1] = new THREE.Scene();

  let spriteMap = new THREE.TextureLoader().load(pauseScreen);
  let spriteMaterial = new THREE.SpriteMaterial({
    map: spriteMap,
  });
  let message = new THREE.Sprite(spriteMaterial);
  let scaleRatio = (100 * window.innerWidth) / window.innerHeight;
  message.scale.set(scaleRatio, scaleRatio, 0);
  message.visible = true;
  message.position.set(0, 0, 20);

  scene[1].add(message);
}

function createOrtogonalCamera(x, y, z) {
  // Adjusts camera ratio so the scene is totally visible
  // OrthographicCamera( left, right, top, bottom, near, far )
  camera = new THREE.OrthographicCamera(
    window.innerWidth / -(2 * cameraRatio),
    window.innerWidth / (2 * cameraRatio),
    window.innerHeight / (2 * cameraRatio),
    window.innerHeight / -(2 * cameraRatio),
    0,
    1000
  );

  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;
  camera.lookAt(new THREE.Vector3(-x, -y, z));
  return camera;
}

function createPerspectiveCamera(x, y, z) {
  /* PerspectiveCamera(fov, aspect, near, far)
	fov — Camera frustum vertical field of view. 
	aspect — Camera frustum aspect ratio.*/
  camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 1, 2000);
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;
  camera.lookAt(scene[0].position);
  return camera;
}

function createScene() {
  scene[0] = new THREE.Scene();
  createSkyBox();
  // scene.background = new THREE.Color("black");

  // Adds axes to the scene: x-axis is red, y-axis is green, z-axis is blue
  //cene[0].add(new THREE.AxesHelper(30));
  grass = new Grass(0, 0, 0, grassW, grassD, grassTexture, grassBumpMap);
  scene[0].add(grass);

  ball = new Ball(0, 0, ball_radius, ball_radius, ballTexture, ballBumpMap);
  scene[0].add(ball);

  flag = new Flag(
    20,
    0,
    stem_height / 2,
    stem_base,
    stem_height,
    stem_color,
    flag_color,
    flag_w,
    flag_h,
    flag_d
  );
  scene[0].add(flag);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(0, 45, 45);
  scene[0].add(directionalLight);
  let lightHelper = new THREE.DirectionalLightHelper(directionalLight);
  //  scene[0].add(lightHelper);

  pointLight = new THREE.PointLight(0xffffff, 1.2, 1000);
  pointLight.position.set(45, -45, 3);
  scene[0].add(pointLight);

  let sphereSize = 3;
  let pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  //scene[0].add(pointLightHelper);
}

function changeAllWireFrames() {
  ball.changeWireframe();
  flag.changeWireframe();
  grass.changeWireframe();

  changeWireframe = false;
}

const animate = () => {
  // Animation functions

  let angSpeed = 1;

  let velocity = 1;

  let timeDelta = clock.getDelta();

  //Turns on/off the point light
  if (on_off_Point === 1) {
    on_off_Point = 0;
    pointLight.visible = !pointLight.visible;
  }

  // Turns on/off the directional light
  if (on_off_Directional === 1) {
    on_off_Directional = 0;

    directionalLight.visible = !directionalLight.visible;
  }

  if (changeWireframe) {
    changeAllWireFrames();
  }
  if (changeMesh) {
    ball.changeMesh();
    grass.changeMesh();
    flag.changeMesh();
    changeMesh = false;
  }

  if (ball.get_motion() && !pause) {
    ball.move(velocity * timeDelta);
  }

  if (flag.get_motion() && !pause) {
    flag.Rotate(timeDelta * angSpeed);
  }

  render();

  requestAnimationFrame(animate);
};

function render() {
  renderer.autoClear = false;
  renderer.clear();
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  renderer.render(scene[0], PerspectiveCamera);

  if (pause) {
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene[1], OrtogonalCamera);
  }
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight > 0 && window.innerWidth > 0) {
    if (camera === OrtogonalCamera) {
      camera.left = window.innerWidth / -(2 * cameraRatio);
      camera.right = window.innerWidth / (2 * cameraRatio);
      camera.top = window.innerHeight / (2 * cameraRatio);
      camera.bottom = window.innerHeight / -(2 * cameraRatio);
    } else {
      camera.aspect =
        renderer.getSize(new THREE.Vector2()).width /
        renderer.getSize(new THREE.Vector2()).height;
    }
  }
  camera.updateProjectionMatrix();
}

function onKeyDown(e) {
  switch (e.key) {
    case "B": // stops the movement of the ball
    case "b":
      if (!pause) {
        ball.change_motion();
      }
      break;
    case "D":
    case "d":
      on_off_Directional = 1;
      break;
    case "P":
    case "p":
      on_off_Point = 1;
      break;

    case "W": // changes to wireframe
    case "w":
      changeWireframe = true;
      break;
    case "I": // changes the mesh
    case "i":
      changeMesh = true;
      break;
    case "S": // Pause
    case "s":
      pause = !pause;
      break;
    case "R": // Reset
    case "r":
      if (pause) {
        ball.initial_state();
        flag.initial_state();
        grass.initial_state();
      }
      break;
  }
}

const __init__ = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createScene();
  OrtogonalCamera = createOrtogonalCamera(0, 100, 20);
  PerspectiveCamera = createPerspectiveCamera(60, -60, 20);
  createPauseMessage();
  const controls = new OrbitControls(PerspectiveCamera, renderer.domElement);
  controls.update();
  render();
  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);

  animate();
};

__init__();
