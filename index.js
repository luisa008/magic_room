// import * as THREE from './node_modules/three';
// import { Interaction } from '/home/luisa/information/node_modules/three.interaction';
// import * as THREE from 'https://unpkg.com/three@0.140.2/build/three.module.js';
// import { OrbitControls } from "https://threejs.org/examples/js/controls/OrbitControls.js";
// import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'

// parameter
const objList = {
  "room1": {},
  "room2": {},
  "room3": {}
};
// const area = {
//   "room1": [new THREE.Vector2(-10, 0), new THREE.Vector2(10, 30)],
//   "room2": [new THREE.Vector2(-10, -30), new THREE.Vector2(10, 0)],
//   "room3": [new THREE.Vector2(25, 0), new THREE.Vector2(55, 30)],
// };
let angle = 0;
let scene, renderer, camera, textureLoader;
let pivot, pivot2;
let clock = new THREE.Clock();
let DOOR1_OPEN = false, DOOR2_OPEN = false;
// const gui = new dat.GUI();

/* Save all texture */
textureLoader = new THREE.TextureLoader();

/* For glass effect */
const glassTool = {};
glassTool["normalMapTexture"] = textureLoader.load("src/normal.jpg");
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
  // camera.position.z = 20;
  // camera.position.x = 20;
  camera.position.z = -5;
  camera.position.y = -5;
  camera.layers.enable(0);
  camera.layers.enable(1);
  camera.layers.enable(2);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClear = false;
  // renderer.toneMapping = THREE.ReinhardToneMapping;
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  document.body.appendChild( renderer.domElement );
}

// create scene
class object {  
    constructor(geometry, material, name="", clickable=false, hoverable=false) {
      this.geometry = geometry;
      this.material = material;
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      this.mesh.name = name;
      this.clickable = clickable;
      this.hoverable = hoverable;
      this.clicked = false;
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
    click() {
      if (this.clickable) {
        this.clicked = ! this.clicked;
        return this.clicked;
      }
      return false;
    }
  }

function createLight(){
  objList["room1"]["pointlight"] = new THREE.PointLight( 0xffffff );
  objList["room1"]["pointlight"].position.set(0, 0, 15);
  objList["room1"]["pointlight"].intensity = 1.2;
  objList["room1"]["pointlight"].distance = 50;
  objList["room1"]["pointlight"].castShadow = true;
  scene.add(objList["room1"]["pointlight"]);

  const pointLight2 = new THREE.PointLight( 0xffffff );
  pointLight2.position.set(0, 5, -15);
  pointLight2.intensity = 0.3;
  pointLight2.distance = 50;
  pointLight2.castShadow = true;
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight( 0xffffff );
  pointLight3.position.set(20, 0, 15);
  pointLight3.intensity = 1;
  pointLight3.distance = 50;
  // pointLight3.castShadow = true;
  scene.add(pointLight3);

  objList["room1"]["spotlight"] = new THREE.SpotLight( 0xffffff );
  objList["room1"]["spotlight"].intensity = 1;
  objList["room1"]["spotlight"].angle = Math.PI/18;
  objList["room1"]["spotlight"].castShadow = true;
  // scene.add(objList["room1"]["spotlight"]);
}

function addGroup(location, name){
  pivot=new THREE.Group();
  scene.add(pivot);
  pivot.add(objList[location][name].mesh);
}

function addGroup2(location, name){
  pivot2=new THREE.Group();
  pivot2.position.set(10, -6, 15);
  scene.add(pivot2);
  pivot2.add(objList[location][name].mesh); // ??????????????????????????????
  objList[location][name].mesh.position.set(0, 0, -2.5); //???????????????????????????pivot2?????????
}

// map the showcase and object
let objectMap = {"case2": "bowl1", "case1": "diamond1", "case3": "vase1", "case6": "lineball1", "case8": "cylinder1"};

initScene();
createLight();

