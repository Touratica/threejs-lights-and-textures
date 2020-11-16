class SpotLight extends Component {
	constructor(x, y, z) {
	
		super(x, y, z);

		this.light = new THREE.SpotLight(0xffffff);
		this.light.intensity = 3;

		this.light.angle = Math.PI / 9;
		this.light.distance = 100;
		this.turnLight = false;


		this.addSphere(0, 0, 0, 3,"rgb(241, 202, 1)");
		this.addCone(0, 0, 1.8);
		this.light.lookAt(0, 0, 20);
		this.add(this.light);
		scene.add(this);
	}

	// Toggles on/off state of the spotlight
	OnOff() {
		this.light.visible = !this.light.visible;
		this.turnLight = false;
	}

	turn_Light() {
		this.turnLight = true;
	}
}