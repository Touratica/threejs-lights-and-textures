import {Component} from './Component.mjs';

export class Ball extends Component {
	constructor(x, y, z, radius, textureMapPath, bumpMapPath) {
		super(x, y, z);

		this.radius = radius;
		this.initial_x = x;
		this.initial_y = y;
		this.initial_z = z;
		
		this.motion = true;

		this.step = 0;
		
		this.addSphere(radius, textureMapPath, bumpMapPath); 

		this.currentMesh = this.phongMesh;
	}

	initial_state(){
		super.initial_state();
		this.position.set(this.initial_x, this.initial_y, this.initial_z);
		this.step = 0;
	}

	get_motion() {
		return this.motion;
	}
	
	change_motion() {
		this.motion = !this.motion;
	}

	stop_motion() {
		this.motion = false;
	}

	start_motion() {
		this.motion = true;
	}

	move(step) {
		this.step += step;
        this.position.z = this.radius + Math.abs(30 * (Math.sin(this.step)));
		this.position.y = -20 + (20 * Math.cos(this.step));
		this.rotateX(step);
	}
}