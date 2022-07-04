import Component from "./Component";

export default class Grass extends Component {
  constructor(x, y, z, w, d, TextureMapPath, bumpMapPath) {
    super(x, y, z);
    this.grassMat = this.addPlane(w, d, TextureMapPath, bumpMapPath);
    this.currentMesh = this.phongMesh;
  }
}
