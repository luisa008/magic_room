// import * as THREE from './node_modules/three';
// import { Interaction } from '/home/luisa/information/node_modules/three.interaction';
// import * as THREE from 'https://unpkg.com/three@0.140.2/build/three.module.js';
// import { OrbitControls } from "https://threejs.org/examples/js/controls/OrbitControls.js";
// import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'

// parameter
const objList = {};
let angle = 0;
let scene, renderer, camera;
let vase;

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
  // create wall and floor
  addBackgorund(0, 0, 0, "backwall", [0, 0, 0], [20, 10, 0.1]);
  addBackgorund(-10, 0, 10, "leftwall", [0, 1/2, 0], [20, 10, 0.1]);
  addBackgorund(10, 0, 10, "rightwall", [0, -1/2, 0], [20, 10, 0.1]);
  addBackgorund(0, -5, 10, "floor", [-1/2, 0, 0], [20, 20, 0.1], "src/floor.jpg");

  // create showcase
  addShowcase(-6, -3, 9, "case1", [0, 0, 0], [1, 2, 1]);
  addShowcase(-6, -3, 6, "case2", [0, 0, 0], [1, 2, 1]);
  addShowcase(6, -3, 9, "case3", [0, 0, 0], [1, 2, 5]);
  addShowcase(6, -3, 15, "case4", [0, 0, 0], [1, 2, 1]);

  // create items
  addDimond(-6, -1.5, 9, "dimond1", [0, 0, 0], [0.5, 1, 1])
  addBowl(-6, -1.5, 6, "bowl1", [0, 0, 0], [0.5, 1, 1])
  addGlb(6, -1.5, 9, "vase1", [0, 0, 0], [0.5, 1, 1], 'src/vase1.glb')
}

function createLight(){
  const light = new THREE.DirectionalLight(0xfff0dd, 1);
  light.position.set(0, 5, 10);
  scene.add(light);
}

function addBackgorund(x, y, z, name, angle, size, texture="src/wall.jpg"){
  const bgTexture = new THREE.TextureLoader().load(texture);
  const bgGeometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
  objList[name] = new object(bgGeometry, bgMaterial, name)
  objList[name].setPosition(x, y, z)
  objList[name].addToScene(scene)
  objList[name].setRotation(angle)
}

function addShowcase(x, y, z, name, angle, size){
  const texture = new THREE.TextureLoader().load("src/showcase.jpg");
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  objList[name] = new object(geometry, material, name)
  objList[name].setPosition(x, y, z)
  objList[name].addToScene(scene)
}

function addDimond(x, y, z, name, angle, size){
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

function addBowl(x, y, z, name, angle, size){
  const points = [];
  for ( let i = 0; i < 10; i ++ ) {
    points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 0.3, ( i - 8 ) * 0.08 ) );
  }
  const geometry = new THREE.LatheGeometry( points );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  objList[name] = new object(geometry, material, name)
  objList[name].setPosition(x, y, z)
  objList[name].addToScene(scene)
}

function addGlb(x, y, z, name, angle, size, glbfile){
  const loader = new THREE.GLTFLoader();
  const glb = loader.load( glbfile, function ( gltf ){
    vase = gltf.scene;
    vase.position.set(x, y, z);
    vase.scale.set(0.5, 0.5, 0.5);
    vase.name = name;
    scene.add(vase);
  } );
}

function animate() {
    objList["dimond1"].mesh.rotation.x += 0.01;
    objList["dimond1"].mesh.rotation.y += 0.01;
    objList["bowl1"].mesh.rotation.x += 0.01;
    objList["bowl1"].mesh.rotation.y += 0.01;
    vase.rotation.y += 0.01;
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
