// import * as THREE from './node_modules/three';
// import { Interaction } from '/home/luisa/information/node_modules/three.interaction';
// import * as THREE from 'https://unpkg.com/three@0.140.2/build/three.module.js';
// import { OrbitControls } from "https://threejs.org/examples/js/controls/OrbitControls.js";
// import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'

// parameter
const objList = {
  "room1": {},
  "room2": {}
};
let angle = 0;
let scene, renderer, camera;
let vase;

const glassTool = {};
glassTool["normalMapTexture"] = new THREE.TextureLoader().load("src/normal.jpg");
glassTool["normalMapTexture"].wrapS = THREE.RepeatWrapping;
glassTool["normalMapTexture"].wrapT = THREE.RepeatWrapping;
glassTool["normalMapTexture"].repeat.set(1, 1);
glassTool["hdrEquirect"]  = new THREE.RGBELoader().load(
  "src/empty_warehouse_01_2k.hdr",
  () => {
    glassTool["hdrEquirect"].mapping = THREE.EquirectangularReflectionMapping;
  }
);

// Basic scene
function initScene(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = -5;
  camera.position.y = -5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  document.body.appendChild( renderer.domElement );
}

// create scene
class object {  
    constructor(geometry, material, name="", clickable=false) {
      this.geometry = geometry;
      this.material = material;
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.mesh.name = name;
      this.clickable = clickable;
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
    setScale(x=1, y=1, z=1){
      this.mesh.scale.set(x, y, z)
    }
    setCastShadow() {
      this.mesh.castShadow = true;
    }
    setReceiveShadow() {
      this.mesh.receiveShadow = true;
    }
  }

function createLight(){
  const light = new THREE.AmbientLight(0xfff0dd, 1);
  light.position.set(0, 5, 10);
  scene.add(light);
  const spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.intensity = 1;
  spotLight.position.set( 500, 500, 500 );
  spotLight.castShadow = true;
  scene.add(spotLight);

  // const spotLight2 = new THREE.SpotLight( 0xffffff );
  // spotLight2.intensity = 1;
  // spotLight2.position.set( 0, 0, -25 );
  // scene.add(spotLight2);
}

function addBackgorund(x, y, z, name, angle, size, location, texture="src/wall.jpg"){
  const bgTexture = new THREE.TextureLoader().load(texture);
  const bgGeometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
  objList[location][name] = new object(bgGeometry, bgMaterial, `${location}-${name}`)
  objList[location][name].setPosition(x, y, z);
  // objList[location][name].setReceiveShadow();
  objList[location][name].addToScene(scene);
  objList[location][name].setRotation(angle);
}

function addShowcase(x, y, z, name, angle, size, location){
  const texture = new THREE.TextureLoader().load("src/showcase.jpg");
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  objList[location][name] = new object(geometry, material, `${location}-${name}`);
  objList[location][name].setPosition(x, y, z);
  // objList[location][name].setReceiveShadow();
  objList[location][name].addToScene(scene);
}

function addDiamond(x, y, z, name, angle, size, location){
  const geometry = new THREE.IcosahedronGeometry(0.5, 0);
  const material = new THREE.MeshPhysicalMaterial({
    metalness: 0,  
    roughness: 0,
    thickness: 1,
    transmission: 1
  });
  material.transmission = 1;
  objList[location][name] = new object(geometry, material, `${location}-${name}`);
  objList[location][name].setPosition(x, y, z);
  // objList[location][name].setCastShadow();
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
  objList[location][name] = new object(geometry, material, `${location}-${name}`)
  objList[location][name].setScale(0.05, 0.05, 0.05);
  objList[location][name].setPosition(x, y, z)
  objList[location][name].addToScene(scene)
}

function addGlb(x, y, z, name, angle, size, glbfile, location){
  const loader = new THREE.GLTFLoader();
  const glb = loader.load( glbfile, function ( gltf ){
    vase = gltf.scene;
    vase.position.set(x, y, z);
    vase.scale.set(size[0], size[1], size[2]);
    vase.name = `${location}-${name}`;
    vase.rotation.y = Math.PI * angle[1];
    scene.add(vase);
    objList[location][name] = vase;
  } );
}

function addPlane(x, y, z, name, angle, size, texture, location){
  const bgTexture = new THREE.TextureLoader().load(texture);
  const bgGeometry = new THREE.PlaneGeometry(size[0], size[1]);
  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture, side: THREE.DoubleSide });
  objList[location][name] = new object(bgGeometry, bgMaterial, `${location}-${name}`)
  objList[location][name].setPosition(x, y, z)
  objList[location][name].addToScene(scene)
  objList[location][name].setRotation(angle)
}


initScene();
// createObject();
createLight();
// addBackgorund();
// render();
