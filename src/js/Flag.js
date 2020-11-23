class Flag extends Component {
    constructor(x, y, z, base, height,colorCylinder,colorCube,w,h,d) {
      super(x, y, z);
      this.addCylinderVertical(0,0,0,base, height,colorCylinder);
      this.addCuboid(0,-base*3/2,height/2 - h/2,w,h,d,colorCube);
      
      
    }
}