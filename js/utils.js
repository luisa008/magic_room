
function addBackgorund(x, y, z, name, angle, size, location, texture="src/wall.jpg"){
    const bgTexture = new THREE.TextureLoader().load(texture);
    const bgGeometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
    const bgMaterial = new THREE.MeshStandardMaterial({ map: bgTexture });
    objList[location][name] = new object(bgGeometry, bgMaterial, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].setReceiveShadow();
    objList[location][name].addToScene(scene);
    objList[location][name].setRotation(angle);
}
  
function addShowcase(x, y, z, name, angle, size, location){
    const texture = new THREE.TextureLoader().load("src/showcase.jpg");
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    objList[location][name] = new object(geometry, material, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
}
  
function addDiamond(x, y, z, name, angle, size, location){
    const geometry = new THREE.IcosahedronGeometry(0.5, 0);
    const material = new THREE.MeshPhysicalMaterial({
      envMap: glassTool["hdrEquirect"],
      envMapIntensity: 1.5,
      metalness: 0,  
      roughness: 0,
      thickness: 1,
      transmission: 1
    });
    // const material = new THREE.MeshStandardMaterial({color:0x7777ff});
    objList[location][name] = new object(geometry, material, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
}
  
function addBowl(x, y, z, name, angle, size, location){
    const points = [];
    for ( let i = 0; i < 10; i ++ ) {
      points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    }
    const geometry = new THREE.LatheGeometry( points );
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 0,  
      roughness: 0.3,
      thickness: 0.5,
      transmission: 1
    });
    // name = `${location}-${name}`;
    objList[location][name] = new object(geometry, material, `${location}-${name}`);
    objList[location][name].setScale(0.05, 0.05, 0.05);
    objList[location][name].setPosition(x, y, z)
    objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene)
}
  
async function addGlb(x, y, z, name, angle, size, glbfile, location, isBloom=false){
    const glb = new THREE.GLTFLoader().load( glbfile, function ( gltf ){
      let glbModel = gltf.scene;
      glbModel.position.set(x, y, z);
      glbModel.scale.set(size[0], size[1], size[2]);
      glbModel.name = `${location}-${name}`;
      glbModel.rotation.x = Math.PI * angle[0];
      glbModel.rotation.y = Math.PI * angle[1];
      glbModel.rotation.z = Math.PI * angle[2];
      scene.add(glbModel);
      objList[location][name] = glbModel;
      if (isBloom) {
        traverseChildren(glbModel, addBloomEffect);
      }
    } );
}

function traverseChildren(obj, handler) {
    if (obj.type == "Mesh") {
        handler(obj);
    } else {
        for (const child of obj.children) {
            traverseChildren(child, handler);
        }
    }
}
  
function addPlane(x, y, z, name, angle, size, texture, location){
    const bgTexture = new THREE.TextureLoader().load(texture);
    const bgGeometry = new THREE.PlaneGeometry(size[0], size[1]);
    const bgMaterial = new THREE.MeshStandardMaterial({ map: bgTexture, side: THREE.DoubleSide });
    // name = `${location}-${name}`;
    objList[location][name] = new object(bgGeometry, bgMaterial, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].addToScene(scene);
    objList[location][name].setRotation(angle);
}
  
class IceCube extends object {
    static baseSize = 1;
    constructor(geometry, material, name, rotateDelta, scale, clickable=true) {
        super(geometry, material, name, clickable);
        this.rotateDelta = rotateDelta;
        this.scale = scale;
        this.setScale(scale, scale, scale);
    }
}
  
function addIceCube(x, y, z, idx, location, rotateDelta, scale){
    // const geometry = new THREE.BoxGeometry(IceCube.baseSize, IceCube.baseSize, IceCube.baseSize);
    const geometry = new THREE.RoundedBoxGeometry(IceCube.baseSize, IceCube.baseSize, IceCube.baseSize, IceCube.baseSize/5, 4);
    
    const material = new THREE.MeshPhysicalMaterial({
        envMap: glassTool["hdrEquirect"],
        envMapIntensity: 1.5,
        metalness: 0, 
        roughness: 0.1,
        thickness: 1.2,
        transmission: 1,
        // clearcoat: 1,
        // clearcoatRoughness: 0.1,
        // normalScale: new THREE.Vector2(1),
        // normalMap: glassTool["normalMapTexture"],
        // clearcoatNormalMap: glassTool["normalMapTexture"],
        // clearcoatNormalScale: new THREE.Vector2(0.3)
    });
    var name = `icecube${idx}`;
    objList[location][name] = new IceCube(geometry, material, `${location}-${name}`, rotateDelta, scale);
    objList[location][name].setPosition(x, y, z);
    // objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
}

function addMirror(x, y, z, name, angle, size, location, color){
    const planeGeometry = new THREE.BoxBufferGeometry(size[0], size[1]);
    let options = {
        // clipBias: 0.03, // default 0, limit reflection
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: color,
        recursion: 1,
    };
    objList[location][name] = new THREE.Reflector(planeGeometry, options);
    // const material = new THREE.MeshPhongMaterial({color: 0xccddff, refractionRatio:0.98, reflectivity:0.9});
    // objList[location][name] = new THREE.Mesh(planeGeometry, material);
    objList[location][name].position.set(x, y, z);
    objList[location][name].rotation.set(Math.PI*angle[0], Math.PI*angle[1], Math.PI*angle[2]);
    objList[location][name].name = `${location}-${name}`;
    scene.add(objList[location][name]);
}

function addSphere(x, y, z, name, angle, radius, location, u){
    const geometry = new THREE.SphereBufferGeometry(radius);
    const material = new THREE.MeshPhongMaterial();
    material.color.setHSL(u, 1, .75);
    objList[location][name] = new object(geometry, material, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
}

class LabelBtn extends object {
    static baseSize = 0.3;
    constructor(geometry, material, name, title, content, clickable=true) {
        super(geometry, material, name, clickable);
        this.title = title;
        this.content = content;
    }
}

function addLabelBtn(x, y, z, name, location, title, content){
    const texture = new THREE.TextureLoader().load("src/label.jpg");
    const geometry = new THREE.BoxGeometry(LabelBtn.baseSize, LabelBtn.baseSize, LabelBtn.baseSize);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    objList[location][name] = new LabelBtn(geometry, material, `${location}-${name}`, title, content);
    objList[location][name].setPosition(x, y, z);
    // objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
}