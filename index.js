// import * as THREE from './node_modules/three';
// import { Interaction } from '/home/luisa/information/node_modules/three.interaction';

// parameter
const objList = {};
let angle = 0;
let scene, renderer, camera

// Basic scene
function initScene(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 20;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
}

// create scene
class object {  
    constructor(geometry, material, name="") {
      this.geometry = geometry;
      this.material = material;
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.mesh.name = name;
      // this.mesh.position.set(1, 1, 1)
    }
    addToScene(scene) {
      scene.add(this.mesh);
    }
    removeFromScene(scene) {
      scene.remove(this.mesh);
    }
    setPosition(x=0, y=0, z=0) {
      this.mesh.position.set(x, y, z);
    }
    setRotation(angle){
      this.mesh.rotation.x = Math.PI * angle[0];
      this.mesh.rotation.y = Math.PI * angle[1];
      this.mesh.rotation.z = Math.PI * angle[2];
    }
  }

function createObject(){
  // const material = new THREE.MeshPhysicalMaterial({
  //     metalness: 0,  
  //     roughness: 0,
  //     thickness: 1,
  //     transmission: 1
  // });
  // objList["cube"] = new object(new THREE.IcosahedronGeometry(1, 0), material, 'dimond')
  // objList["cube"].addToScene(scene)
  // objList["cube"].setPosition(1, 0, 0)

  // objList["cube2"] = new object(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial( { color: 0x0000ff } ), 'square')
  // objList["cube2"].addToScene(scene)

  // create wall and floor
  addBackgorund(0, 0, 0, "backwall", [0, 0, 0], [20, 10, 0.5]);
  addBackgorund(-10, 0, 5, "leftwall", [0, 1/2, 0], [10, 10, 0.5]);
  addBackgorund(10, 0, 5, "rightwall", [0, -1/2, 0], [10, 10, 0.5]);
  addBackgorund(0, -5, 5, "floor", [-1/2, 0, 0], [20, 10, 1], "src/floor.jpg");

  // create showcase
  addShowcase(-5, -2.5, 11, "case1", [0, 0, 0], [1, 2, 1]);
  addShowcase(-5, -2.5, 8, "case2", [0, 0, 0], [1, 2, 1]);
  addShowcase(5, -2.5, 10, "case3", [0, 0, 0], [1, 2, 3]);

  // create items
  addVase(-5, -1, 11, "vase1", [0, 0, 0], [0.5, 1, 1])
}

// cube.cursor = "pointer";
// cube.name = 'object'
// var a = scene.getObjectByName("object");
// console.log(a)

function createLight(){
  const light = new THREE.DirectionalLight(0xfff0dd, 1);
  light.position.set(0, 5, 10);
  scene.add(light);
}

function addBackgorund(x, y, z, name, angle, size, texture="src/wall.jpg"){
  const bgTexture = new THREE.TextureLoader().load(texture);
  const bgGeometry = new THREE.PlaneGeometry(size[0], size[1]);
  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
  objList[name] = new object(bgGeometry, bgMaterial, name)
  objList[name].setPosition(x, y, z)
  objList[name].addToScene(scene)
  objList[name].setRotation(angle)
  // const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  // bgMesh.position.set(0, 0, -5);
  //scene.add(bgMesh);
}

function addShowcase(x, y, z, name, angle, size){
  const texture = new THREE.TextureLoader().load("src/showcase.jpg");
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  objList[name] = new object(geometry, material, name)
  objList[name].setPosition(x, y, z)
  objList[name].addToScene(scene)
}

function addVase(x, y, z, name, angle, size){
  // const texture = new THREE.TextureLoader().load("src/showcase.jpg");
  const geometry = new THREE.IcosahedronGeometry(0.5, 0);
  const material = new THREE.MeshPhysicalMaterial({
    metalness: 0,  
    roughness: 0,
    thickness: 1,
    transmission: 1
  });
  objList[name] = new object(geometry, material, name)
  objList[name].setPosition(x, y, z)
  objList[name].addToScene(scene)
}

function animate() {
    objList["vase1"].mesh.rotation.x += 0.01;
    objList["vase1"].mesh.rotation.y += 0.01;
    // objList["cube"].mesh.rotation.x += 0.01;
    // objList["cube"].mesh.rotation.y += 0.01;
    // objList["cube2"].mesh.rotation.x += 0.01;
    // objList["cube2"].mesh.rotation.y += 0.01;
    // cube.position.x += 0.01;
    // camera.lookAt(cube.position)
    // angle += 0.005;
    // var x = 5 * Math.sin(angle);
    // var z = 3 * Math.cos(angle);
    // objList["cube"].mesh.position.set(x, 0, z);
    // camera.position.set(x, 0, z*3);
    // camera.position.z += 0.01
};

function render(){
    requestAnimationFrame( render );
    animate();
    renderer.render( scene, camera );
}

initScene();
createObject();
createLight();
// addBackgorund();
render();
