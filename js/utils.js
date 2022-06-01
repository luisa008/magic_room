const bgMaterials = {};

function getBgMaterial(filename) {
    if (bgMaterials[filename] === undefined) {
        bgMaterials[filename] = new THREE.MeshStandardMaterial({ map: textureLoader.load(filename) });
    }
    return bgMaterials[filename];
}

function addBackgorund(x, y, z, name, angle, size, location, texture="src/wall.jpg"){
    const bgGeometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
    const bgMaterial = getBgMaterial(texture);
    objList[location][name] = new object(bgGeometry, bgMaterial, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].setReceiveShadow();
    objList[location][name].addToScene(scene);
    objList[location][name].setRotation(angle);
}

const showcaseGeometry = new THREE.BoxGeometry(5, 5, 5);
const showcaseTexture = textureLoader.load("src/showcase.jpg");
const showcaseMaterial = new THREE.MeshStandardMaterial({ map: showcaseTexture });

class Showcase extends object {
    constructor(geometry, material, name, clickable, focusPos, focusAngleXZ, focusAngleYZ) {
        super(geometry, material, name, clickable);
        /* For focus */
        this.focusPos = focusPos;
        this.focusAngleXZ = focusAngleXZ;  
        this.focusAngleYZ = focusAngleYZ;  
    }
}

function addShowcase(x, y, z, name, angle, size, location, clickable=false, focusPos=undefined, focusAngleXZ=undefined, focusAngleYZ=undefined){
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
    objList[location][name] = new Showcase(geometry, showcaseMaterial, `${location}-${name}`, clickable, focusPos, focusAngleXZ, focusAngleYZ);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
}

const diamondMaterial = new THREE.MeshPhysicalMaterial({
    envMap: glassTool["hdrEquirect"],
    envMapIntensity: 1.5,
    metalness: 0,  
    roughness: 0,
    thickness: 1,
    transmission: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    normalScale: new THREE.Vector2(1),
    normalMap: glassTool["normalMapTexture"],
    clearcoatNormalMap: glassTool["normalMapTexture"],
    clearcoatNormalScale: new THREE.Vector2(0.3)
});
function addDiamond(x, y, z, name, angle, size, location){
    const geometry = new THREE.IcosahedronGeometry(0.5, 0);
    objList[location][name] = new object(geometry, diamondMaterial, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
}

const bowlMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0,  
    roughness: 0.3,
    thickness: 0.5,
    transmission: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    normalScale: new THREE.Vector2(1),
    normalMap: glassTool["normalMapTexture"],
    clearcoatNormalMap: glassTool["normalMapTexture"],
    clearcoatNormalScale: new THREE.Vector2(0.3)
  });
function addBowl(x, y, z, name, angle, size, location){
    const points = [];
    for ( let i = 0; i < 10; i ++ ) {
      points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    }
    const geometry = new THREE.LatheGeometry( points );
    objList[location][name] = new object(geometry, bowlMaterial, `${location}-${name}`);
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
        
        // 以下註解的code是能夠讓glb有影子
        // glbModel.traverse( function( node ) {

        //     if ( node.isMesh ) { node.castShadow = true; }
    
        // } );
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
    const bgTexture = textureLoader.load(texture);
    const bgGeometry = new THREE.PlaneGeometry(size[0], size[1]);
    const bgMaterial = new THREE.MeshStandardMaterial({ map: bgTexture, side: THREE.DoubleSide });
    objList[location][name] = new object(bgGeometry, bgMaterial, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].addToScene(scene);
    objList[location][name].setRotation(angle);
}
  
class IceCube extends object {
    static baseSize = 1;
    static number = 0;
    constructor(geometry, material, name, rotateDelta, scale, clickable=true) {
        super(geometry, material, name, clickable);
        this.rotateDelta = rotateDelta;
        this.scale = scale;
        this.setScale(scale, scale, scale);
        this.number += 1;
    }
    move (dx, dy, dz) {
        this.mesh.position.x += dx;
        this.mesh.position.x += dy;
        this.mesh.position.x += dz;
    }
    break() {
        let oriScale = this.scale;
        let basePos = this.mesh.position;

        /* Add two new icecubes */
        let scales = [0.5, 0.3];
        let dists = [0.0333, 0.05]; 
        for (let i = 1; i <= 2; i++) {
            var rotateDelta = new THREE.Vector3(
                Math.random()/100 ,
                Math.random()/100 ,
                Math.random()/100
            );
            var theta = Math.random() * 180;
            var alpha = Math.random() * 180;
            var dx = dists[i] * cos(theta) * cos(alpha);
            var dy = dists[i] * cos(theta) * sin(alpha);
            var dz = dists[i] * sin(theta);
            addIceCube(basePos.x + dx, basePos.y + dy, basePos.z + dz, IceCube.number+i, "room2", rotateDelta, oriScale * scales[i]);
        }
        IceCube.number += 2;

        this.scale = oriScale * 0.75;
        this.setScale(this.scale, this.scale, this.scale);
        var theta = Math.random() * 180;
        var alpha = Math.random() * 180;
        var dx = 0.02 * cos(theta) * cos(alpha);
        var dy = 0.02 * cos(theta) * sin(alpha);
        var dz = 0.02 * sin(theta);
        this.move(dx, dy, dz);
    }
}
  
const iceCubeGeometry = new THREE.RoundedBoxGeometry(IceCube.baseSize, IceCube.baseSize, IceCube.baseSize, IceCube.baseSize/5, 4);
const iceCubeMaterial = new THREE.MeshPhysicalMaterial({
    envMap: glassTool["hdrEquirect"],
    envMapIntensity: 3,
    metalness: 0, 
    roughness: 0.1,
    thickness: 1.2,
    transmission: 1,
});
function addIceCube(x, y, z, idx, location, rotateDelta, scale){
    // console.log(idx);
    var name = `icecube${idx}`;
    objList[location][name] = new IceCube(iceCubeGeometry, iceCubeMaterial, `${location}-${name}`, rotateDelta, scale);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].addToScene(scene);
}

function addMirror(x, y, z, name, angle, size, location, color){
    const mirrorGeometry = new THREE.BoxBufferGeometry(size[0], size[1]);
    let options = {
        // clipBias: 0.03, // default 0, limit reflection
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: color,
        recursion: 1,
    };
    objList[location][name] = new THREE.Reflector(mirrorGeometry, options);
    // const material = new THREE.MeshPhongMaterial({color: 0xccddff, refractionRatio:0.98, reflectivity:0.9});
    // objList[location][name] = new THREE.Mesh(mirrorGeometry, material);
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
    constructor(geometry, material, name, title, content, isBloom, clickable=true) {
        super(geometry, material, name, clickable);
        this.title = title;
        this.content = content;
        if (isBloom) {
            addBloomEffect(this.mesh);
        }
    }
}

const labelBtnGeometry = new THREE.BoxGeometry(LabelBtn.baseSize, LabelBtn.baseSize, LabelBtn.baseSize);
const labelBtnTexture = textureLoader.load("src/label.jpg");
const labelBtnMaterial = new THREE.MeshStandardMaterial({ map: labelBtnTexture });
function addLabelBtn(x, y, z, name, location, title, content, isBloom=true){
    objList[location][name] = new LabelBtn(labelBtnGeometry, labelBtnMaterial, `${location}-${name}`, title, content, isBloom);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].addToScene(scene);
}

function addCylinder(x, y, z, name, radius, location){
    const geometry = new THREE.CylinderBufferGeometry(radius[0], radius[1], radius[2], 32, 2);
    const material = new THREE.MeshLambertMaterial({
        color: 0x3f7b9d,
        envMap: glassTool["hdrEquirect"]});
    objList[location][name] = new object(geometry, material, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
}

function addLineBall(x, y, z, name, radius, location){
    const geometry = new THREE.SphereBufferGeometry(radius);
    const material = new THREE.LineBasicMaterial({
        color: 0x30395C,
        // transparent: true,
        opacity: 0
    });
    const lineGeometry = new THREE.EdgesGeometry(geometry);
    objList[location][name] = new THREE.LineSegments(lineGeometry, material);
    objList[location][name].position.set(x, y, z);
    objList[location][name].cashShadow = true;
    scene.add(objList[location][name]);
}

function addSpotLight(x, y, z, name, location){
    objList["room1"]["spotlight"].target = objList[location][name].mesh;
    objList["room1"]["spotlight"].position.set(x, y, z);
    scene.add(objList["room1"]["spotlight"]);
    scene.remove(objList["room1"]["pointlight"]);
}

function removeSpotLight(){
    scene.remove(objList["room1"]["spotlight"]);
    scene.add(objList["room1"]["pointlight"]);
}