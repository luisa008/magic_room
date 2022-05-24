const ball_num = 8;
// let up = false, speed = 0, t = 0.01;
let up = [false, false, false, false, false];
let speed = [0, 0, 0, 0, 0], ball_height = [];
let timer = null;
let time = 0;

function room3CreateObject(){
    addMirror(40, 0, 15, "rightwall", [0, -1/2, 0], [30, 20, 0.1], "room3", 0x889999);
    addBackgorund(25, -10, 15, "floor", [-1/2, 0, 0], [30, 30, 0.1], "room3");
    // addBackgorund(25, 10, 15, "ceiling", [-1/2, 0, 0], [30, 30, 0.1], "room3", "src/ball_ceiling.jpg");
    addBackgorund(25, 0, 30, "frontwall", [0, 0, 0], [30, 20, 0.1], "room3");
    addMirror(25, 0, 0, "backwall", [0, 0, 0], [30, 20, 0.1], "room3", 0x889999);
    // addGlb(15, -5.4, 9, "vase1", [0, 0, 0], [0.5, 0.5, 0.5], 'src/models/vase1.glb', "room3");
    for(let i = 0; i < ball_num; i++){
        const u = i / ball_num;
        var x = Math.random() * (35 - 15) + 15;
        var z = Math.random() * (25 - 5) + 5;
        var y = Math.random() * (0 - (-5)) + (-5);
        ball_height.push(y);
        addSphere(x, y, z, `sphere${i}`, [0, 0, 0], 1, "room3", u);
    }
}

function isInRoom3() {
    return (camera.position.x >= 10) && (camera.position.x < 40) && (camera.position.z >= 0) && (camera.position.z <= 30);
}

function room3Animate(){
    // time *= 0.001;
    // const yOff = Math.abs(Math.sin(time * 2));
    // objList["room3"]["sphere1"].position.y = y + THREE.Math.lerp(-2, 2, yOff);
    if (isInRoom1() || isInRoom3()) {
        time = setInterval(function(){}, 1000);
        time *= 0.05;
        // console.log(time);
        for(let i = 0; i < ball_num; i++){
            const u = i / ball_num;
            const speed = time * .2;
            // yOff is a value that goes from 0 to 1
            const yOff = Math.abs(Math.sin(time * 2 + i));
            // move the sphere up and down
            objList["room3"][`sphere${i}`].mesh.position.y = THREE.Math.lerp(-8, 0, yOff);
            // console.log(objList["room3"][`sphere${i}`].mesh.position.y)
        }
    }
}

room3CreateObject();