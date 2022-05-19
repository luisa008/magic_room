addBackgorund(0, -10, -15, "floor", [-1/2, 0, 0], [20, 30, 0.1], "room2", "src/floor2.jpg");
addBackgorund(0, 0, -30, "backwall", [0, 0, 0], [20, 20, 0.1], "room2", "src/kaleidoscope_wall.jpg");
addBackgorund(-10, 0, -15, "leftwall", [0, 1/2, 0], [30, 20, 0.1], "room2", "src/wall2.jpg");
addBackgorund(10, 0, -15, "rightwall", [0, -1/2, 0], [30, 20, 0.1], "room2", "src/wall2.jpg");

function addIceCube(x, y, z, idx, location){
    // const textureLoader = new THREE.TextureLoader();
    // const normalMapTexture = textureLoader.load("src/normal.jpg");
    // normalMapTexture.wrapS = THREE.RepeatWrapping;
    // normalMapTexture.wrapT = THREE.RepeatWrapping;
    // normalMapTexture.repeat.set(1, 1);
    const BASE_SIZE = 2
    const geometry = new THREE.BoxGeometry(BASE_SIZE, BASE_SIZE, BASE_SIZE);
    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0.05,
      thickness: 1.2,
      transmission: 1
    });
    material.transmission = 1;
    var name = `icecube${idx}`;
    objList[location][name] = new object(geometry, material, `${location}-${name}`);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].addToScene(scene);
}

addIceCube(0, 5, -10, 0, "room2");

function room2Animate() {
    objList["room2"]["icecube0"].mesh.rotation.x += 0.01;
}

// function addIceCubes() {
//     const MESH_COUNT = 500;
//     const textureLoader = new THREE.TextureLoader();
//     const normalMapTexture = textureLoader.load("src/normal.jpg");
//     normalMapTexture.wrapS = THREE.RepeatWrapping;
//     normalMapTexture.wrapT = THREE.RepeatWrapping;
//     normalMapTexture.repeat.set(1, 1);

//     // const geometry = new THREE.RoundedBoxGeometry(1, 1, 1, 16, 0.2);
//     const geometry = new THREE.BoxGeometry(1, 1, 1, 16, 0.2);
//     const material = new THREE.MeshPhysicalMaterial({
//         transmission: 1,
//         thickness: 1.2,
//         roughness:0.05,
//         // envMap: hdrEquirect,
//         // envMapIntensity: options.envMapIntensity,
//         clearcoat: 1,
//         clearcoatRoughness: 0.1,
//         normalScale: new THREE.Vector2(1),
//         normalMap: normalMapTexture,
//         clearcoatNormalMap: normalMapTexture,
//         clearcoatNormalScale: new THREE.Vector2(0.3)
//       });

//     const mesh = new THREE.InstancedMesh(geometry, material, MESH_COUNT);
//     scene.add(mesh);

//     const matrixDummy = new THREE.Object3D();

//     const instanceData = [...Array(MESH_COUNT)].map(() => {
//         const position = new THREE.Vector3(
//             1.5 * (-1 + 2 * Math.random()),
//             1.5 * (-1 + 2 * Math.random()),
//             0.2 + (-1 + 2 * Math.random()) -15
//         );

//         const rotation = new THREE.Euler(
//             Math.random() * Math.PI * 2,
//             Math.random() * Math.PI * 2,
//             Math.random() * Math.PI * 2
//         );

//         const axis = new THREE.Vector3(
//             Math.random() * 2 - 1,
//             Math.random() * 2 - 1,
//             Math.random() * 2 - 1
//         );

//         const BASE_SCALE = 2;
//         const scale = BASE_SCALE * (0.25 + 0.75 * Math.random());

//         const rotateTime = 5 + 15 * Math.random();

//         return {
//             position,
//             rotation,
//             axis,
//             scale: new THREE.Vector3(scale, scale, scale),
//             rotateTime
//         };
//     });

//     console.log(instanceData[0].position);

//     const updateInstances = (deltaTime) => {
//         for (let i = 0; i < MESH_COUNT; i++) {
//             const data = instanceData[i];
            
//             matrixDummy.position.copy(data.position);
//             matrixDummy.scale.copy(data.scale);
//             matrixDummy.quaternion.setFromEuler(data.rotation);
//             if (options.enableRotation) {
//             matrixDummy.rotateOnWorldAxis(data.axis, deltaTime / data.rotateTime);
//             data.rotation.copy(matrixDummy.rotation);
//             }
//             matrixDummy.updateMatrix();
//             mesh.setMatrixAt(i, matrixDummy.matrix);
//         }
//         mesh.instanceMatrix.needsUpdate = true;
//     };
//     return updateInstances;
// }

// const updateCubes = addIceCubes();
