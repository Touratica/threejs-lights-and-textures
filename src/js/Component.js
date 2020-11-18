class Component extends THREE.Object3D {
	constructor(x, y, z) {
		super();
		this.position.set(x,y,z);
        this.phongMesh;
        this.basicMesh;
	}

	addCuboid(x, y, z, w, h, d, color) {
		let geometry = new THREE.BoxGeometry(d, w, h);

		let basicMat = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color: color}));
		let phongMat = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color}));
		
		basicMat.position.set(x,y,z);
		phongMat.position.set(x,y,z);
		
		this.phongMesh.push(phongMat);
		this.lambertMesh.push(lambertMat);
		this.basicMesh.push(basicMat);
		
        this.add(basicMat);
	}

	addPlane(x, y, z, w, d, basicColor, Phongcolor, textureMapPath, normalMapPath, bumpMapPath) {
		let geometry = new THREE.PlaneGeometry(d, w);

		let basicMat = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({/* map: textureMapPath */}));
		let phongMat = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());
		
		let bump = new THREE.TextureLoader().load(bumpMapPath);
		
		bump.wrapS = THREE.RepeatWrapping;
		bump.wrapT = THREE.RepeatWrapping;
		bump.repeat.set(4, 4);
		
		let texture = new THREE.TextureLoader().load(textureMapPath);
		texture.wrapS = THREE.RepeatWrapping;
    	texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(4, 4);
		
		let normal = new THREE.TextureLoader().load(normalMapPath);

		normal.wrapS = THREE.RepeatWrapping;
    	normal.wrapT = THREE.RepeatWrapping;
    	normal.repeat.set(4, 4);

    	phongMat.map = texture;
		basicMat.map = texture;
		phongMat.bumpMap = bumpMapPath;
		basicMat.bumpMap = bumpMapPath;
		// phongMat.normalMap = normal;
		

		
		basicMat.position.set(x, y, z);
		phongMat.position.set(x, y, z);
		this.phongMesh = phongMat;
		this.basicMesh = basicMat;
        this.add(basicMat);
	}

	addCylinderHorizontal(x, y, z, baseD, baseU, height, color) {
		let geometry = new THREE.CylinderGeometry(baseD / 2, baseU / 2, height, 16, 1);
		geometry.rotateZ(Math.PI / 2);
		let basicMat = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color: color}));
		let phongMat = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color}));
		
		basicMat.position.set(x, y, z);
		phongMat.position.set(x, y, z);
		
		this.phongMesh.push(phongMat);
		this.basicMesh.push(basicMat);
        
        this.add(basicMat);
    }

	addCylinderVertical(x, y, z, base, height, color) { 
		let geometry = new THREE.CylinderGeometry(base / 2, base / 2, height, 16, 1);

		let basicMat = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: color}));
		let phongMat = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color}));
		
		basicMat.position.set(x, y, z);
		phongMat.position.set(x, y, z);
		
		basicMat.rotateX(Math.PI / 2);
		phongMat.rotateX(Math.PI / 2);
		lambertMat.rotateX(Math.PI / 2);


		this.phongMesh.push(phongMat);
		this.basicMesh.push(basicMat);
        
        this.add(basicMat);
	}

	addSphere(x, y, z, radius, color) {
		let geometry = new THREE.SphereGeometry(radius, 32, 32);
		let basicMat = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide}));
		let phongMat = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
		
		basicMat.position.set(x, y, z);
		phongMat.position.set(x, y, z);
		
		this.phongMesh.push(phongMat);
		
        this.basicMesh.push(basicMat);
        
        this.add(basicMat);
	}

	addHorizontalExtrusion(x, y, z, shape, height, color) {
		let geometry = new THREE.ExtrudeGeometry(shape, {steps: 1, depth: height, bevelEnabled: false});
		geometry.rotateY(-Math.PI / 2);

		let basicMat = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide}));
		let phongMat = new THREE.Mesh(geometry,
			new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide, specular: 0x424849}));
		
		basicMat.position.set(x + height / 2, y, z);
		phongMat.position.set(x + height / 2, y, z);
		

		this.phongMesh.push(phongMat);
		
        this.basicMesh.push(basicMat);
        
        this.add(basicMat);
	}

	addCone(x, y, z) {
		let geometry = new THREE.ConeGeometry(5, 8, 64, 1, true, 0);
		
		let material = new THREE.MeshBasicMaterial({color: "rgb(241, 202, 1)"});
		let cone = new THREE.Mesh(geometry, material);
		cone.rotateX(Math.PI/2);
		cone.position.set(x, y, z);
		this.add(cone);
	}

	addComponent(comp, x, y, z) {
		this.add(comp);
		comp.position.set(x, y, z);
	}

	position_set(x, y, z) {
		this.position.set(x, y, z);
    }

	/*changeMesh(flag) {
		if (flag === "changeShadow") {
	        if (this.currentMesh === this.lambertMesh) {
				this.removeMesh();
	            this.addMesh(this.phongMesh);
	        }
	        else if (this.currentMesh === this.phongMesh) {
	        	this.removeMesh();
	        	this.addMesh(this.lambertMesh);
	        }
	        else {
	        	this.removeMesh();
	        	this.addMesh(this.lastMesh);
	        }
        }
		else {
			if (this.currentMesh !== this.basicMesh) {
				this.removeMesh();
				this.lastMesh = this.currentMesh;
				this.addMesh(this.basicMesh);
			}
			else {
				this.removeMesh();
				this.addMesh(this.lastMesh);
			}
		}
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
	}*/
}