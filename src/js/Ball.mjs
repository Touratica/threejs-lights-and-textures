import * as THREE from '../../node_modules/three/build/three.module.js';
import {Component} from './Component.mjs';
//import {main} from './main.mjs';

export class Ball extends Component {
	constructor(x, y, z, radius,textureMapPath ,bumpMapPath) {
		super(x, y, z);
		
		this.motion = true;
		
		this.material = this.addSphere(radius,textureMapPath ,bumpMapPath); 
	}

	get_motion(){
		return this.motion;
	}
	
	change_motion(){
		this.motion = !this.motion;
	}

	move(velocity,clock,flag) {
		let angle;
		let time = clock.getDelta();
		/*if (angle < 0.02) {*/
		angle += 0.005 * time;
		//}*/
		/*else {
			angle = 0.02;
		}*/
		angle *= velocity;
		
		//let position = new THREE.Vector3(flag.position.x, flag.position.y, flag.position.z);
		const position = new THREE.Vector3(0,0,0);
		let axis = new THREE.Vector3(0, velocity, 0);
		rotateAroundFlag(this, axis, position, angle);

		this.rotateY(angle);
	}
}