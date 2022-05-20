function room3CreateObject(){
    addBackgorund(30, 0, 15, "rightwall", [0, -1/2, 0], [30, 20, 0.1], "room3");
    addBackgorund(20, -10, 15, "floor", [-1/2, 0, 0], [20, 30, 0.1], "room3", "src/floor.jpg");
    addBackgorund(20, 0, 30, "frontwall", [0, 0, 0], [20, 20, 0.1], "room3");
    addBackgorund(20, 0, 0, "backwall", [0, 0, 0], [20, 20, 0.1], "room3");
    addDiamond(15, -5, 9, "diamond2", [0, 0, 0], [0.5, 1, 1], "room3");
    addMirror();
}

function addMirror(){
    const planeGeometry = new THREE.PlaneBufferGeometry(10, 10);
    let options = {

        clipBias: 0.03,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x889999,
        recursion: 1
   
    };
    let mirror = new THREE.Reflector(planeGeometry, options);
    mirror.position.set(15, -5, 15);
    scene.add(mirror);
}

room3CreateObject();