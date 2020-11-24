import {Component} from './Component.mjs';

export class Ball extends Component {
	constructor(x, y, z, radius,textureMapPath ,bumpMapPath) {
		super(x, y, z);
		this.addSphere(radius,textureMapPath ,bumpMapPath);  
	}

	move(velocity) {
		let angle;
		let time = clock.getDelta();
		if (angle < 0.02) {
			angle += 0.005 * time;
		}
		else {
			angle = 0.02;
		}
		angle *= velocity;
		let position = new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z);
		let axis = new THREE.Vector3(0, velocity, 0);
		rotateAroundCube(this, axis, position, angle);

		this.rotateY(angle);
	}
}