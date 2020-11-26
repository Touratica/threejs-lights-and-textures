import * as THREE from '../../node_modules/three/build/three.module.js';
import * as ORBIT from '../../node_modules/three/js/controls/OrbitControls.js';
//OrbitControls.js:1 Failed to load resource: the server responded with a status of 404 (Not Found)
//:5500/node_modules/three/src/math/:1 Failed to load module script: 
//The server responded with a non-JavaScript MIME type of "text/html". 
//Strict MIME type checking is enforced for module scripts per HTML spec.
//deu isto xD
import * as MAT from '../../node_modules/three/src/math';
import {Grass} from './Grass.mjs';
import {Ball} from './Ball.mjs';
import {Flag} from './Flag.mjs';


let camera, PerspectiveCamera, OrtogonalCamera;

let scene, renderer;
let clock = new THREE.Clock();
let velocity = 10;
let cameraRatio = 10;

let directionalLight;
let on_off_Directional = 0;
let pointLight;
let on_off_Point;

export let allMaterials = [];
let changeWireframe = false;
let changeMesh = false;


let grass;
let grassW = 150;
let grassD = 150;
let ball;
let ball_radius = 3;
let flag ; 
let stem_base = 1.5;
let stem_height = 30;
let flag_w = 5;
let flag_h= 5;
let flag_d = 1;
let stem_color = new THREE.Color("grey");
let flag_color = new THREE.Color("rgb(254, 90, 6)");

// Sets the z-axis as the top pointing one
THREE.Object3D.DefaultUp.set(0, 0, 1);

// TODO: #5 SkyBox is crooked
function createSkyBox(){

	let skyboxgeo = new THREE.CubeGeometry(grassW,grassW,grassD);

	let skyboxfaces = [
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../media/cubemap/px.png"), side: THREE.BackSide}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../media/cubemap/nx.png"),side: THREE.BackSide}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../media/cubemap/py.png"),side: THREE.BackSide}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../media/cubemap/ny.png"),side: THREE.BackSide}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../media/cubemap/pz.png"),side: THREE.BackSide}),
		new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("../media/cubemap/nz.png"),side: THREE.BackSide})
	];

	let skyboxmaterial = new THREE.MeshFaceMaterial (skyboxfaces);

	let skyboxmesh = new THREE.Mesh(skyboxgeo,skyboxmaterial);

	skyboxmesh.position.set(0,0,grassW/2-1)

	scene.add(skyboxmesh);


	/*
	scene.background = new THREE.CubeTextureLoader()
	.setPath('../media/cubemap/')
	.load([
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
	]);
	*/
}

function rotateAroundFlag( axis, point, angle) {

	ball.position.sub(point); // remove the offset
	ball.position.applyAxisAngle(axis, angle); // rotate the POSITION
	flag.position.add(point); // re-add the offset
  
	ball.rotateOnAxis(axis, angle); // rotate the OBJECT
	rotateAroundAxis(obj, axis, angle);
  }


  let rotationWorldMatrix;

  function rotateAroundAxis( axis, radians) {
	rotationWorldMatrix = new THREE.Matrix4();
	rotationWorldMatrix.makeRotationAxis(axis.normalize(), radians);
	rotationWorldMatrix.multiply(object.matrix);
	ball.matrix = rotationWorldMatrix;
	ball.rotation.setFromRotationMatrix(ball.matrix);
  }
function createOrtogonalCamera(x, y, z) {
	// Adjusts camera ratio so the scene is totally visible 
	// OrthographicCamera( left, right, top, bottom, near, far )
	camera = new THREE.OrthographicCamera(window.innerWidth / -(2 * cameraRatio),
		window.innerWidth / (2 * cameraRatio), window.innerHeight / (2 * cameraRatio),
		window.innerHeight / -(2 * cameraRatio), 0, 1000);

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
	camera = new THREE.PerspectiveCamera(70,innerWidth / innerHeight, 1, 2000);
	camera.position.x = x;
	camera.position.y = y;
	camera.position.z = z;
	camera.lookAt(scene.position);
	return camera;
}

function createScene() {
	scene = new THREE.Scene();
	createSkyBox();
	// scene.background = new THREE.Color("black");
	
	// Adds axes to the scene: x-axis is red, y-axis is green, z-axis is blue
	scene.add(new THREE.AxesHelper(30));
	grass = new Grass(0, 0, 0, grassW, grassD, "../media/grass.png", "../media/grass_bumpMap.png");
	scene.add(grass);

	ball = new Ball(0,0,ball_radius,ball_radius,"../media/ball.jpeg", "../media/bump_ball.jpeg");
	scene.add(ball);

	flag = new Flag(20,0,stem_height/2,stem_base,stem_height,stem_color,flag_color,flag_w,flag_h,flag_d);
	scene.add(flag);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
	directionalLight.position.set(0, 45, 45);
	scene.add(directionalLight);
  	let lightHelper = new THREE.DirectionalLightHelper(directionalLight);
	  scene.add(lightHelper);
	  
	pointLight = new THREE.PointLight(0xffffff, 1, 100);
  	pointLight.position.set(45, 0, 45);
  	scene.add(pointLight);

  	let sphereSize = 3;
	let pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  	scene.add(pointLightHelper);


}
function changeAllWireFrames(){
	let value = ball.material.wireframe;
	ball.material.wireframe = !value;
	flag.stemMat.wireframe = !value;
	flag.flagMat.wireframe = !value;
	grass.grassMat.wireframe = !value;
	changeWireframe = false;

}


export function animate() {
	// Animation functions

	let angSpeed = 1;

	let timeDelta = clock.getDelta();

	// Rotates the platform
/*	if (platform.get_rotation() === "Left") {
		platform.rotate_z(angSpeed * timeDelta);
	}

	if (platform.get_rotation() === "Right") {
		platform.rotate_z(-angSpeed * timeDelta);
	}

	*/
	//Turns on/off the point light
	if (on_off_Point == 1) {
        on_off_Point = 0;
		pointLight.visible = !pointLight.visible;
    }

	// Turns on/off the directional light
	if (on_off_Directional == 1) {
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

	if(ball.get_motion()){
		//ball.move(velocity,clock,flag);
	}
	
	flag.Rotate(timeDelta * angSpeed);

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		if (camera === OrtogonalCamera) {
			camera.left = window.innerWidth / -(2 * cameraRatio);
			camera.right = window.innerWidth / (2 * cameraRatio);
			camera.top = window.innerHeight / (2 * cameraRatio);
			camera.bottom = window.innerHeight / -(2 * cameraRatio);
		}
		else {
			camera.aspect = renderer.getSize(new THREE.Vector2()).width / renderer.getSize(new THREE.Vector2()).height;
		}
	}
	camera.updateProjectionMatrix();
}

function onKeyDown(e) {
	switch (e.key) {
		/*case "1":
			spotlights[0].turn_Light();
			onResize();
			break;
		case "2":
			spotlights[1].turn_Light();
			onResize();
			break;
		case "3":
			spotlights[2].turn_Light();
			onResize();
			break;
		case "4":
			camera = PerspectiveCamera;
			break;
		case "5":
			camera = OrtogonalCamera;
			break;*/

		case "B":	// changes the mesh
		case "b":
			ball.change_motion();	
			break;
		case "D":
		case "d":
			on_off_Directional = 1;
			break;
		case "P":
		case "p":
			on_off_Point = 1;

		case "Q":	//switches the light On/Off
		case "q":
			//on_off_Directional = 1;
			break;
		case "W":	// changes to wireframe
		case "w":
			changeWireframe = true;	
			break;
		case "I":	// changes the mesh
		case "i":
			changeMesh = true;	
			break;
		
		case "E":	// changes between Phong and Gouraud
		case "e":
			// floor.changeMesh("changeShadow");
			// platform.changeMesh("changeShadow");
			break;

		/*case "ArrowRight":	// rotates the platform
			platform.set_rotation("Right");
			break;
		case "ArrowLeft":
			platform.set_rotation("Left");
			break;*/
	}
}

function onKeyUp(e) {
	switch (e.key) {
		case "ArrowRight": //stops the platform
		case "ArrowLeft":
			// platform.set_rotation("Stop");
			break;
	}
}

export function __init__() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0xffffff);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	OrtogonalCamera = createOrtogonalCamera(0, 100, 20);//view to the platform	
	PerspectiveCamera = createPerspectiveCamera(60, -60, 20);
	
	const controls = new OrbitControls( PerspectiveCamera, renderer.domElement );
	controls.update();
	
	window.addEventListener("resize", onResize)
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}