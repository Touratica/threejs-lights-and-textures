class Grass extends Component{

	constructor(x, y, z, w, d, basicColor,Phongcolor, TextureMapPath, normalMapPath, bumpMapPath){
		super(x, y, z);
		this.addPlane(0, 0, 0, w, d, basicColor,Phongcolor, TextureMapPath, normalMapPath, bumpMapPath);
	}

createGrass(){

	
	let phongMat = new THREE.MeshPhongMaterial();
	let basicMat = new THREE.MeshBasicMaterial();
	

	
}

}