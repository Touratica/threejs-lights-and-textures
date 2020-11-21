class Flag extends Component {
    constructor(x, y, z, base, height,colorCylinder,colorCube,w,h,d) {
      super(x, y, z);
      this.stem = new Component();
      this.flag = new Component();
      this.stem.addCylinderVertical(x,y,z,colorCylinder,base, height,colorCylinder);
      this.flag.addCuboid(x,y,z,w,h,d,colorCube);
      this.stem.addComponent(this.flag,this.stem.position.x,this.stem.position.y,3*this.stem.position.z/2);
      //TODO: verificar como fica e "endireitar"
      //TODO: nao esta a aparecer na cena, ver o que esta mal
      
    }
}