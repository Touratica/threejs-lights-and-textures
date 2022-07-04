import Component from "./Component";

export default class Flag extends Component {
  constructor(x, y, z, base, height, colorCylinder, colorCube, w, h, d) {
    super(x, y, z);
    this.stemMat = this.addCylinderVertical(
      0,
      0,
      0,
      base,
      height,
      colorCylinder
    );
    this.flagMat = this.addCuboid(
      0,
      (-base * 3) / 2,
      height / 2 - h / 2,
      w,
      h,
      d,
      colorCube
    );

    this.currentMesh = this.phongMesh;
    this.motion = true;
    this.lookAt(20, 0, 20);
  }

  get_motion() {
    return this.motion;
  }

  stop_motion() {
    this.motion = false;
  }

  start_motion() {
    this.motion = true;
  }

  initial_state() {
    super.initial_state();
    this.lookAt(20, 0, 20);
  }
}
