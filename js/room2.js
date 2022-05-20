const ICECUBE_NUM = 200;

function addRoom2Light() {
    // var spotLight = new THREE.SpotLight(0xffffff, 1, 200, 30, 0.1);
    // spotLight.position.set( 0, 20, -25 );
    // // spotLight.castShadow = true;
    // scene.add( spotLight );

    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.intensity = 0.5;
    spotLight.target = objList["room2"]["icecube0"].mesh;
    spotLight.position.set( 0, 5, -25 );
    spotLight.angle = Math.PI/4;
    spotLight.castShadow = true;
    scene.add(spotLight);
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
// addIceCube(0, -3, -25, 0, "room2", new THREE.Vector3(0.01, 0, 0), 0.5);

/* GLB */
addGlb(-6, -5, -9, "drive", [0, 0, 0.5], [1, 1, 1], 'src/models/PrimaryIonDrive.glb', "room2", true);
addRoom2Light();



function addCubes() {
    // 创建两个box， 将box进行layers进行分层是重要代码，camera默认渲染0层
    // let texture = new THREE.TextureLoader().load("./backav9.jpg")
    // let texture1 = new THREE.TextureLoader().load("./py.png")
    let color = new THREE.Color();
	// color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
    // var geometry1 = new THREE.BoxGeometry(1, 1, 1);
    // var material1 = new THREE.MeshBasicMaterial({
    //   color: color
    // });
    // var cube1 = new THREE.Mesh(geometry1, material1);
    // // 重要代码，将当前创建的box分配到0层
    // // cube1.layers.set(0);
    // cube1.layers.enable(0);
    // cube1.position.set(-6, -5, -9);
    // scene.add(cube1);
    
    color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
    var geometry2 = new THREE.BoxGeometry(1, 1, 1);
    var material2 = new THREE.MeshBasicMaterial({
      color: color
    });
    var cube2 = new THREE.Mesh(geometry2, material2);
    // 重要代码，将当前创建的box分配到1层
    // cube2.layers.set(1);
    cube2.layers.enable(1);
    cube2.position.set(6, -5, -9);
    scene.add(cube2);

    color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );
    var geometry3 = new THREE.BoxGeometry(1, 1, 1);
    var material3 = new THREE.MeshBasicMaterial({
      color: color
    });
    var cube3 = new THREE.Mesh(geometry3, material3);
    // 重要代码，将当前创建的box分配到1层
    // cube3.layers.set(2);
    cube3.layers.enable(2);
    cube3.position.set(6, -5, -12);
    scene.add(cube3);
}
addCubes();