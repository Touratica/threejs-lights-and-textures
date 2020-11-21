let camera, PerspectiveCamera, OrtogonalCamera;

let scene, renderer;
let clock = new THREE.Clock();
let cameraRatio = 10;

/*let directionalLight;
let on_off_Directional = 0;
let spotlights = [];*/

let grass;
let ball;
let ball_radius = 5;
let flag ; 
let stem_base = 3;
let stem_height = 15;
let flag_w = 5;
let flag_h= 5;
let flag_d = 1;
let stem_color = new THREE.Color("grey");
let flag_color = new THREE.Color("rgb(254, 90, 6)");

let time = clock.getDelta();

// Sets the z-axis as the top pointing one
THREE.Object3D.DefaultUp.set(0, 0, 1);

//TODO : SKYBOX marada
//esta torta, endireitar
function createSkyBox(){
	scene.background = new THREE.CubeTextureLoader()
	.setPath( '../media/cubemap/' )
	.load( [
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'
	] );
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
	//scene.background = new THREE.Color("black");
	
	// Adds axes to the scene: x-axis is red, y-axis is green, z-axis is blue
	scene.add(new THREE.AxesHelper(30));
	grass = new Grass(0, 0, 0, 150, 150, "../media/grass.png", "../media/grass_bumpMap.png");
	scene.add(grass);

	ball = new Ball(20,0,ball_radius,ball_radius,"../media/ball.jpeg", "../media/ball_bump.png");
	scene.add(ball);

	flag = new Flag(0,0,0,stem_base,stem_height,stem_color,flag_color,flag_w,flag_h,flag_d);
	scene.add(flag);
	//TODO: nao esta a aparecer na cena, ver o que esta mal



	

	//spotlights[0] = new SpotLight(0, -80, 40);
	//const spotLightHelper = new THREE.SpotLightHelper(spotlights[0].light);
	// scene.add(spotLightHelper);	
	//spotlights[0].rotateX(Math.PI / 4);
	
   	/*spotlights[1] = new SpotLight(-80, 0, 40);
	spotlights[1].rotateY(-Math.PI / 4);

    spotlights[2] = new SpotLight(80, 0, 40);
	spotlights[2].rotateY(Math.PI / 4);
	
	directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  	directionalLight.position.set(-95, 0, 25);
	scene.add(directionalLight);*/
}

function animate() {
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

	if (spotlights[0].turnLight) {
		spotlights[0].OnOff();
	}
	
	if (spotlights[1].turnLight) {
		spotlights[1].OnOff();
	}

	if (spotlights[2].turnLight) {
		spotlights[2].OnOff();
	}

	// Turns on/off the directional light
	if (on_off_Directional == 1) {
        on_off_Directional = 0;
        
		directionalLight.visible = !directionalLight.visible;
    }
*/
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

		case "Q":	//switches the light On/Off
		case "q":
			//on_off_Directional = 1;
			break;
		case "W":	// changes between Basic and one of the others
		case "w":
			/*floor.changeMesh();
			platform.changeMesh();
			*/break;
		case "E":	// changes between Phong and Gouraud
		case "e":
			/*floor.changeMesh("changeShadow");
			platform.changeMesh("changeShadow");
			*/break;

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
		case "ArrowRight":	//stops the platform
		case "ArrowLeft":
			//platform.set_rotation("Stop");
			break;
	}
}

function __init__() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0xffffff);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	OrtogonalCamera = createOrtogonalCamera(0, 100, 20);//view to the platform	
	PerspectiveCamera = createPerspectiveCamera(-100, -100, 100); 
	
	window.addEventListener("resize", onResize)
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}