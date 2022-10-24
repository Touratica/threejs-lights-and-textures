import * as THREE from "three";

export default class Component extends THREE.Object3D {
  constructor(x, y, z) {
    super();
    this.position.set(x, y, z);
    this.phongMesh = [];
    this.basicMesh = [];
  }

  addCuboid(x, y, z, w, h, d, color) {
    let geometry = new THREE.BoxGeometry(d, w, h);
    let meshPhong = new THREE.MeshPhongMaterial({
      color: color,
      wireframe: false,
    });
    let basicMat = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: color, wireframe: false })
    );
    let phongMat = new THREE.Mesh(geometry, meshPhong);

    basicMat.position.set(x, y, z);
    phongMat.position.set(x, y, z);

    this.phongMesh.push(phongMat);
    this.basicMesh.push(basicMat);

    this.add(phongMat);
  }

  addPlane(w, d, textureMapPath, bumpMapPath) {
    let geometry = new THREE.PlaneGeometry(d, w, 50, 50);
    //width, height, width segments, height segments
    let bump = new THREE.TextureLoader().load(bumpMapPath);
    let texture = new THREE.TextureLoader().load(textureMapPath);
    let meshPhong = new THREE.MeshPhongMaterial({
      map: texture,
      bumpMap: bump,
      wireframe: false,
    });
    let meshBasic = new THREE.MeshBasicMaterial({
      map: texture,
      wireframe: false,
    });
    let basicMat = new THREE.Mesh(geometry, meshBasic);
    let phongMat = new THREE.Mesh(geometry, meshPhong);

    bump.wrapS = THREE.RepeatWrapping;
    bump.wrapT = THREE.RepeatWrapping;
    bump.repeat.set(4, 4);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    this.phongMesh.push(phongMat);
    this.basicMesh.push(basicMat);
    this.add(phongMat);
  }

  addCylinderVertical(x, y, z, base, height, color) {
    let geometry = new THREE.CylinderGeometry(
      base / 2,
      base / 2,
      height,
      16,
      1
    );
    let meshPhong = new THREE.MeshPhongMaterial({
      color: color,
      wireframe: false,
    });
    let basicMat = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: color })
    );
    let phongMat = new THREE.Mesh(geometry, meshPhong);

    basicMat.position.set(x, y, z);
    phongMat.position.set(x, y, z);

    basicMat.rotateX(Math.PI / 2);
    phongMat.rotateX(Math.PI / 2);

    this.phongMesh.push(phongMat);
    this.basicMesh.push(basicMat);

    this.add(phongMat);
  }

  addSphere(radius, textureMapPath, bumpMapPath) {
    let geometry = new THREE.SphereGeometry(radius, 32, 32);
    let bump = new THREE.TextureLoader().load(bumpMapPath);
    let texture = new THREE.TextureLoader().load(textureMapPath);
    let mesh = new THREE.MeshBasicMaterial({ map: texture, wireframe: false });
    let phongMesh = new THREE.MeshPhongMaterial({
      color: "white",
      bumpMap: bump,
      shininess: 70,
      bumpScale: 1,
    });
    let basicMat = new THREE.Mesh(geometry, mesh);
    let phongMat = new THREE.Mesh(geometry, phongMesh);

    bump.wrapS = THREE.RepeatWrapping;
    bump.wrapT = THREE.RepeatWrapping;
    bump.repeat.set(3, 3);

    this.phongMesh.push(phongMat);
    this.basicMesh.push(basicMat);
    this.add(phongMat);
  }

  addComponent(comp, x, y, z) {
    this.add(comp);
    comp.position.set(x, y, z);
  }

  position_set(x, y, z) {
    this.position.set(x, y, z);
  }

  changeMesh() {
    if (this.currentMesh === this.phongMesh) {
      console.log("entrei");
      this.removeMesh();
      this.addMesh(this.basicMesh);
    } else {
      console.log("basic");
      this.removeMesh();
      this.addMesh(this.phongMesh);
    }
  }

  //addMesh changes all the meshes.
  addMesh(meshVector) {
    this.currentMesh = meshVector;
    for (let i = 0; i < meshVector.length; i++) {
      this.add(meshVector[i]);
    }
  }

  //removes the mesh of all objects.
  removeMesh() {
    for (let i = 0; i < this.currentMesh.length; i++) {
      this.remove(this.currentMesh[i]);
    }
  }

  Rotate(a) {
    this.rotateZ(a);
  }

  initial_state() {
    for (let i = 0; i < this.phongMesh.length; i++) {
      this.phongMesh[i].wireframe = false;
    }

    for (let i = 0; i < this.basicMesh.length; i++) {
      this.basicMesh[i].wireframe = false;
    }

    if (this.currentMesh === this.basicMesh) {
      this.changeMesh();
    }
  }

  changeWireframe() {
    for (let i = 0; i < this.phongMesh.length; i++) {
      this.phongMesh[i].material.wireframe =
        !this.phongMesh[i].material.wireframe;
    }

    for (let i = 0; i < this.basicMesh.length; i++) {
      this.basicMesh[i].material.wireframe =
        !this.basicMesh[i].material.wireframe;
    }
  }
}
