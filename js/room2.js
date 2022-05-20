const ICECUBE_NUM = 200;

function addRoom2Light() {
    // const spotLight = new THREE.SpotLight( 0xffffff );
    // spotLight.intensity = 0.5;
    // spotLight.target = objList["room2"]["backwall"].mesh;
    // spotLight.position.set( 0, 0, 0 );
    // spotLight.angle = Math.PI/10;
    // spotLight.castShadow = true;
    // scene.add(spotLight);
}

function room2Animate() {
    if (driveMixer) {
        const delta = clock.getDelta();
        driveMixer.update( delta );
    }
    for (let i = 0; i < ICECUBE_NUM; i++) {
        var icecube = objList["room2"][`icecube${i}`];
        icecube.mesh.rotation.x += icecube.rotateDelta.x;
        icecube.mesh.rotation.y += icecube.rotateDelta.y;
    }
}

function addRing(x, y, z, name, radius, angle, location, color) {
    const geometry = new THREE.TorusGeometry(radius, radius / 5, 8, 50);
    const material = new THREE.MeshStandardMaterial({ color: color });
    objList[location][name] = new object(geometry, material, `${location}-${name}`, true);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].mesh.rotation.x = Math.PI * angle[0];
    objList[location][name].mesh.rotation.y = Math.PI * angle[1];
    objList[location][name].mesh.rotation.z = Math.PI * angle[2];
    // objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
    addBloomEffect(objList[location][name].mesh);
}

async function addDrive(x, y, z, name, angle, size, glbfile, location){
    const glb = new THREE.GLTFLoader().load( glbfile, function ( gltf ){
    const model = gltf.scene;
    model.position.set(x, y, z);
    model.scale.set(size[0], size[1], size[2]);
    model.name = `${location}-${name}`;
    model.rotation.x = Math.PI * angle[0];
    model.rotation.y = Math.PI * angle[1];
    model.rotation.z = Math.PI * angle[2];
    scene.add(model);
    objList[location][name] = model;
    
    traverseChildren(model, addBloomEffect);
    
    driveMixer = new THREE.AnimationMixer( model );
    const clip = gltf.animations[0];
    driveMixer.clipAction( clip.optimize() ).play();
    } );
}

/* Walls and Floor */
addBackgorund(0, -10, -15, "floor", [-1/2, 0, 0], [20, 30, 0.1], "room2", "src/floor2.jpg");
addBackgorund(0, 0, -30, "backwall", [0, 0, 0], [20, 20, 0.1], "room2", "src/texture2.jpg");
addBackgorund(-10, 0, -15, "leftwall", [0, 1/2, 0], [30, 20, 0.1], "room2", "src/wall2.jpg");
addBackgorund(10, 0, -15, "rightwall", [0, -1/2, 0], [30, 20, 0.1], "room2", "src/wall2.jpg");

/* Ice Cubes */
for (let i = 0 ; i < ICECUBE_NUM; i++) {
    var rotateDelta = new THREE.Vector3(
        Math.random()/100 ,
        Math.random()/100 ,
        Math.random()/100
    );
    var scale = IceCube.baseSize * (0.25 + 0.75 * Math.random());
    var x = 5 * (-1 + 2 * Math.random());
    var y = 5 * (-1 + 2 * Math.random()) -1.5;
    var z = 3 + (-1 + 2 * Math.random()) -27;
    addIceCube(x, y, z, i, "room2", rotateDelta, scale);
}

let driveMixer = null;
/* GLB */
addDrive(-6, -5, -6, "drive", [0, 0, 0.5], [1, 1, 1], 'src/models/PrimaryIonDrive.glb', "room2");
// addRing(-6, -5, -10, "ring", 0.4, [0, 0.5, 0], "room2", new THREE.Color( 0xffffff ).setHex( Math.random() * 0xffffff ));

const RING_ROW = 3;
const RING_COL = 5;
const RING_DIST = 2;
const RING_COLORS = [0x750000,0xFF5151,0xFF00FF,0xFF359A,0x9F35FF,0x6A6AFF,0x2894FF,0x00FFFF,0x1AFD9C,0x28FF28, 0x73BF00	,0x8C8C00	,0xAE8F00	,0xD26900	,0xBB3D00];
for (let i = 0; i < RING_ROW; i++) {
    for (let j = 0; j < RING_COL; j++) {
        let idx = i * RING_COL + j;
        let color = idx / (RING_ROW * RING_COL) * 0xffffff;
        if (idx < RING_COLORS.length) {
            color = RING_COLORS[idx];
        }
        addRing(-8, -2 - RING_DIST * i, -12 - RING_DIST * j, `ring${idx}`, 0.4, [0, 0.5, 0], "room2", new THREE.Color( 0xffffff ).setHex( color));
    }
}

/* Light */
addRoom2Light();