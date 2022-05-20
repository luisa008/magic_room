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
    for (let i = 0; i < ICECUBE_NUM; i++) {
        var icecube = objList["room2"][`icecube${i}`];
        icecube.mesh.rotation.x += icecube.rotateDelta.x;
        icecube.mesh.rotation.y += icecube.rotateDelta.y;
    }
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
/* GLB */
addGlb(-6, -5, -15, "drive", [0, 0, 0.5], [1, 1, 1], 'src/models/PrimaryIonDrive.glb', "room2", true);

/* Light */
addRoom2Light();