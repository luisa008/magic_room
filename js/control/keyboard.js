let PACE = 0.5;
let RADIUS = 1.0;
let eyeAngleXZ = 0.0;
let eyeAngleYZ = 0.0;
let CAMERA_MOVING = false;

function checkRange(angle) {
    if (angle > 180) {
        return angle - 360;
    } else if (angle < -180) {
        return angle + 360;
    }
    return angle;
}

const KEYS = {
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowLeft": false,
    "ArrowRight": false,
    "KeyW": false,
    "KeyS": false,
    "KeyA": false,
    "KeyD": false
};
let curPressedCnt = 0;

function sin(degree) {
    return Math.sin((degree / 180) * Math.PI )
}

function cos(degree) {
    return Math.cos((degree / 180) * Math.PI )
}

document.addEventListener('keydown', (e) => {
    if (KEYS[e.code] === false) {
        curPressedCnt += 1;
    }
    KEYS[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    if (KEYS[e.code] === true) {
        curPressedCnt -= 1;
    }
    KEYS[e.code] = false;
});

function moveEye() {
    let deltaX = - sin(eyeAngleXZ) * cos(eyeAngleYZ) * RADIUS;
    let deltaY = sin(eyeAngleYZ) * RADIUS;
    let deltaZ = - cos(eyeAngleXZ) * cos(eyeAngleYZ) * RADIUS;

    let lookPos = new THREE.Vector3(
        camera.position.x + deltaX, 
        camera.position.y + deltaY, 
        camera.position.z + deltaZ
    );

    camera.lookAt(lookPos);
}

function cameraAnimation() {
    if (curPressedCnt < 0) {
        console.log("curPressedCnt is wrong.");
    }
    if (curPressedCnt <= 0) {
        CAMERA_MOVING = false;
        return;
    }
    if (KEYS["KeyW"] || KEYS["KeyS"] || KEYS["KeyA"] || KEYS["KeyD"]) {
        /* Translation */
        let angleXZ = 0;
        if (KEYS["KeyW"]) {
            angleXZ = eyeAngleXZ;
        } 
        else if (KEYS["KeyS"]) {
            angleXZ = eyeAngleXZ + 180;
        } 
        
        if (KEYS["KeyA"]) {
            angleXZ = eyeAngleXZ + 90;
        } 
        else if (KEYS["KeyD"]) {
            angleXZ = eyeAngleXZ - 90;
        }
        let deltaX = - sin(angleXZ) * PACE;
        let deltaZ = - cos(angleXZ) * PACE;

        camera.position.x += deltaX;
        camera.position.z += deltaZ;
        CAMERA_MOVING = true;
        // console.log(camera.position);
    } else {
        CAMERA_MOVING = false;
    }
    if (KEYS["ArrowUp"] || KEYS["ArrowDown"] || KEYS["ArrowLeft"] || KEYS["ArrowRight"]) {
        /* Eye Direction Rotation */
        if (KEYS["ArrowUp"]) {
            eyeAngleYZ += 1.0;
        }
        else if (KEYS["ArrowDown"]) {
            eyeAngleYZ -= 1.0;
        }
        
        if (KEYS["ArrowLeft"]) {
            eyeAngleXZ += 1.0;
        } else if (KEYS["ArrowRight"]) {
            eyeAngleXZ -= 1.0;
        }
        eyeAngleXZ = checkRange(eyeAngleXZ);
        eyeAngleYZ = checkRange(eyeAngleYZ);
        
        let deltaX = - sin(eyeAngleXZ) * cos(eyeAngleYZ) * RADIUS;
        let deltaY = sin(eyeAngleYZ) * RADIUS;
        let deltaZ = - cos(eyeAngleXZ) * cos(eyeAngleYZ) * RADIUS;

        let lookPos = new THREE.Vector3(
            camera.position.x + deltaX, 
            camera.position.y + deltaY, 
            camera.position.z + deltaZ
        );
    
        camera.lookAt(lookPos);
        // console.log(eyeAngleXZ);
        // console.log(eyeAngleYZ);

    }
    
}