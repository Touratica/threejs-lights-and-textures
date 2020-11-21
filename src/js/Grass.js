class Grass extends Component{

	constructor(x, y, z, w, d, TextureMapPath, bumpMapPath){
		super(x, y, z);
		this.addPlane(w, d, TextureMapPath, bumpMapPath);
	}

}