class Floor extends Component {
 	constructor(x, y, z) {
		const color = new THREE.Color("rgb(103, 106, 137)");//rgb(121, 136, 147)
		super(x, y, z);
		this.addCuboid(0, 0, 0, 150, 1, 150, color);
		this.currentMesh = this.basicMesh;
		this.lastMesh = this.lambertMesh;
	}
}