import * as THREE from '../../node_modules/three/build/three.module.js';
import {allMaterials} from './main.mjs';

export class Component extends THREE.Object3D {
	constructor(x, y, z) {
		super();
		this.position.set(x,y,z);
        this.phongMesh = [];
		this.basicMesh = [];
		this.currentMesh = this.phongMesh;
		this.shadeOn = true;
	}

	addCuboid(x, y, z, w, h, d, color) {
		let geometry = new THREE.BoxGeometry(d, w, h);
		let meshPhong = new THREE.MeshPhongMaterial({color: color, wireframe : false});
		let basicMat = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color: color, wireframe :false}));
		let phongMat = new THREE.Mesh(geometry,meshPhong );
		
		basicMat.position.set(x,y,z);
		phongMat.position.set(x,y,z);
		
		this.phongMesh.push(phongMat);
		this.basicMesh.push(basicMat);
		
		this.add(phongMat);
		allMaterials.push(phongMat, basicMat);
		return  meshPhong;
	}

	addPlane(w, d, textureMapPath, bumpMapPath) {

		let geometry = new THREE.PlaneBufferGeometry(d, w,50,50);
		//width, height, width segments, height segments
		let bump = new THREE.TextureLoader().load(bumpMapPath);
		let texture = new THREE.TextureLoader().load(textureMapPath);
		let meshPhong = new THREE.MeshPhongMaterial({map : texture, bumpMap: bump})

		let basicMat = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map : texture}));
		let phongMat = new THREE.Mesh(geometry,meshPhong );

		
		bump.wrapS = THREE.RepeatWrapping;
		bump.wrapT = THREE.RepeatWrapping;
		bump.repeat.set(4, 4);
		
		texture.wrapS = THREE.RepeatWrapping;
    	texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(4, 4);
	
		this.phongMesh.push(phongMat);
		this.basicMesh.push(basicMat);
		this.add(phongMat);
		allMaterials.push(phongMat, basicMat);
		return meshPhong;
	}

	

	addCylinderVertical(x, y, z, base, height, color) { 
		let geometry = new THREE.CylinderGeometry(base / 2, base / 2, height, 16, 1);
		let meshPhong = new THREE.MeshPhongMaterial({color: color, wireframe : false})
		let basicMat = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: color}));
		let phongMat = new THREE.Mesh(geometry, meshPhong);
		
		basicMat.position.set(x, y, z);
		phongMat.position.set(x, y, z);
		

		basicMat.rotateX(Math.PI / 2);
		phongMat.rotateX(Math.PI / 2);
		


		this.phongMesh.push(phongMat);
		this.basicMesh.push(basicMat);
        
		this.add(phongMat);
		allMaterials.push(phongMat, basicMat);
		return meshPhong;
	}

	addSphere(radius,textureMapPath ,bumpMapPath) {

		let geometry = new THREE.SphereGeometry(radius, 32, 32);
		let bump = new THREE.TextureLoader().load(bumpMapPath);
		let texture = new THREE.TextureLoader().load(textureMapPath);
		let mesh = new THREE.MeshBasicMaterial({map : texture , wireframe : false});

		let basicMat = new THREE.Mesh(geometry, mesh);
		let phongMat = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: "white", bumpMap: bump, shininess : 70, specular: "white",bumpScale: 1}));

		bump.wrapS = THREE.RepeatWrapping;
		bump.wrapT = THREE.RepeatWrapping;
		bump.repeat.set(3, 3);
	
		/*
		texture.wrapS = THREE.RepeatWrapping;
    	texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(4, 4);
		*/

		this.phongMesh.push(phongMat);
		this.basicMesh.push(basicMat);
		//this.add(basicMat);
		this.add(phongMat);
		return mesh;
		//this.rotateZ((Math.PI / 2);
		
	}

	

	addComponent(comp, x, y, z) {
		this.add(comp);
		comp.position.set(x, y, z);
	}

	position_set(x, y, z) {
		this.position.set(x, y, z);
	}
	changeMesh() {
		
		if (this.shadeOn) {
			this.removeMesh(this.phongMesh);
			this.addMesh(this.basicMesh);
		} else {
			this.removeMesh(this.basicMesh);
			this.addMesh(this.phongMesh);
		}
		this.shadeOn = !this.shadeOn;
		
	}

	//mesh vector has all objects of the scene. 
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
		console.log("vou terminar o remove");
	}

	Rotate(a){
		this.rotateZ(a);
	}
	
}