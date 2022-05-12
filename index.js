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
  camera.position.z = 5;

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
    setRotationy(angle){
      this.mesh.rotation.y += angle;
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

  objList["cube2"] = new object(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial( { color: 0x0000ff } ), 'square')
  objList["cube2"].addToScene(scene)

  addBackgorund(0, 0, -2.5, "backwall", 0);
  addBackgorund(-4, 0, 0, "leftwall", 90);
  addBackgorund(4, 0, 0, "rightwall", -90);
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

function addBackgorund(x, y, z, name, angle){
  const bgTexture = new THREE.TextureLoader().load("wall.jpg");
  const bgGeometry = new THREE.PlaneGeometry(10, 10);
  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
  objList[name] = new object(bgGeometry, bgMaterial, name)
  objList[name].setPosition(x, y, z)
  objList[name].addToScene(scene)
  objList[name].setRotationy(angle)
  // const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  // bgMesh.position.set(0, 0, -5);
  //scene.add(bgMesh);
}


function animate() {
    // objList["cube"].mesh.rotation.x += 0.01;
    // objList["cube"].mesh.rotation.y += 0.01;
    objList["cube2"].mesh.rotation.x += 0.01;
    objList["cube2"].mesh.rotation.y += 0.01;
    // cube.position.x += 0.01;
    // camera.lookAt(cube.position)
    // angle += 0.005;
    // var x = 5 * Math.sin(angle);
    // var z = 3 * Math.cos(angle);
    // objList["cube"].mesh.position.set(x, 0, z);
    // camera.position.set(x, 0, z*3);
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
