const BALL_NUM = 8;
let time = 0;
let walkmanMixer = null;
/* GLB */
async function addWalkman(x, y, z, name, angle, size, glbfile, location){
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
        
        walkmanMixer = new THREE.AnimationMixer( model );
        const clip = gltf.animations[0];
        walkmanMixer.clipAction( clip.optimize() ).play();
    } );
}

function room3CreateObject(){
    addMirror(40, 0, 15, "rightwall", [0, -1/2, 0], [30, 20, 0.1], "room3", 0x889999);
    addBackgorund(25, -10, 15, "floor", [-1/2, 0, 0], [30, 30, 0.1], "room3");
    //addMirror(25, 10, 15, "ceiling", [1/2, 0, 0], [30, 30, 0.1], "room3", 0x889999);
    addBackgorund(25, 10, 15, "ceiling", [1/2, 0, 0], [30, 30, 0.1], "room3");
    addBackgorund(25, 0, 30, "frontwall", [0, 1, 0], [30, 20, 0.1], "room3");
    addMirror(25, 0, 0, "backwall", [0, 0, 0], [30, 20, 0.1], "room3", 0x889999);
    addWalkman(30, -10, 15, "walkman", [0, 1/2, 0], [2, 2, 2], 'src/models/walkman2.glb', "room3");
    for(let i = 0; i < BALL_NUM; i++){
        const u = i / BALL_NUM;
        var x = Math.random() * (35 - 15) + 15;
        var z = Math.random() * (25 - 5) + 5;
        var y = Math.random() * (0 - (-5)) + (-5);
        addSphere(x, y, z, `sphere${i}`, [0, 0, 0], 1, "room3", u);
    }

    labelContent = `
        解說：隨意彈跳彩球<br>
        技術：<br>
        1. 使用phong shading作為球的材質，並且用setHSL讓每個球的顏色不會突兀。<br>
        2. 用Math.lerp讓球做震盪，實現墜落與反彈。
        `;
    addLabelBtn(20, -4, 4, "label-ball", "room1", "彈跳彩球", labelContent);

    labelContent = `
        解說：實做鏡子<br>
        技術：<br>
        1. 使用THREE.Reflector實做鏡子。
        `;
    addLabelBtn(16, -4, 4, "label-ball", "room1", "彈跳彩球", labelContent);
}

function isInRoom3() {
    return (camera.position.x >= 10) && (camera.position.x < 40) && (camera.position.z >= 0) && (camera.position.z <= 30);
}

function walkAnimate(){
    if(isInRoom3() || (DOOR2_OPEN && eyeAngleXZ < 0)){
        if(!(scene.getObjectByName("room3-walkman"))){
            scene.add(objList["room3"]["walkman"]);
        }
        if ( objList["room3"]["walkman"]) {
            objList["room3"]["walkman"].position.set(camera.position.x, -10, camera.position.z);
            objList["room3"]["walkman"].rotation.y = (eyeAngleXZ -180) / 180 * Math.PI ;
            if (CAMERA_MOVING) {
                const delta = clock.getDelta();
                walkmanMixer.update( delta );
            }
        }
    }
    else{
        if(scene.getObjectByName("room3-walkman")){
            scene.remove(objList["room3"]["walkman"]);
        }
    }
}

function room3Animate(){
    if (isInRoom3() || (DOOR2_OPEN && eyeAngleXZ < 0)) {
        time = setInterval(function(){}, 1000);
        time *= 0.05;
        for(let i = 0; i < BALL_NUM; i++){
            // yOff is a value that goes from 0 to 1
            const yOff = Math.abs(Math.sin(time * 2 + i));
            // move the sphere up and down
            objList["room3"][`sphere${i}`].mesh.position.y = THREE.Math.lerp(-8, 0, yOff);
        }
    }
    door2Animation();
    walkAnimate();
}

room3CreateObject();