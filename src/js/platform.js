class Platform extends Component {
	constructor(x, y, z) {
		const platformColor = new THREE.Color("rgb(41, 47, 115)");
		super(x, y, z);

		this.addCylinderVertical(0, 0, 2.5, 100, 5, platformColor);
		this.currentMesh = this.basicMesh;
		this.lastMesh = this.lambertMesh;
		this.rotation_Z = "Stop";
	}

	addCar(car) {
		this.car = car;
		this.add(car);
	}
	
	//changes the type of Mesh
	changeMesh(flag) {
		super.changeMesh(flag);
		this.car.changeMesh(flag);
	}

	get_rotation() {
		return this.rotation_Z;
	}

	set_rotation(rot) {
		this.rotation_Z = rot;
	}

	rotate_z(angle) {
        if (this.angle >= (Math.PI) / 3 && this.rotate_z == "Left") {
            return;
        }

        if (this.angle >= -(Math.PI) / 3 && this.rotate_z == "Right") {
            return;
        }

        let a = this.angle + angle;

        if (a >= Math.PI / 3) {
            this.angle = (Math.PI) / 3;
            return;
        }
        else if (a <= -Math.PI / 3) {
            this.angle = -Math.PI / 3;
            return;
        }
        this.angle = a;
        this.rotateZ(angle);
    }
}