let PACE = 0.5;
let RADIUS = 1.0;
let eyeAngleXZ = 0.0;
let eyeAngleYZ = 0.0;

function sin(degree) {
    return Math.sin((degree / 180) * Math.PI )
}

function cos(degree) {
    return Math.cos((degree / 180) * Math.PI )
}

document.addEventListener('keydown', (e) => {
    if (e.code == "KeyW" || e.code == "KeyS" || e.code == "KeyA" || e.code == "KeyD") {
        /* Translation */
        let angleXZ = 0;
        if (e.code == "KeyW") {
            angleXZ = eyeAngleXZ;
        } 
        else if (e.code == "KeyS") {
            angleXZ = eyeAngleXZ + 180;
        } 
        else if (e.code == "KeyA") {
            angleXZ = eyeAngleXZ + 90;
        } 
        else if (e.code == "KeyD") {
            angleXZ = eyeAngleXZ - 90;
        }
        let deltaX = - sin(angleXZ) * PACE;
        let deltaZ = - cos(angleXZ) * PACE;

        camera.position.x += deltaX;
        camera.position.z += deltaZ;
        // console.log(camera.position);
    }
    else if (e.code == "ArrowUp" || e.code == "ArrowDown" || e.code == "ArrowLeft" || e.code == "ArrowRight") {
        /* Eye Direction Rotation */
        if (e.code == "ArrowUp") {
            eyeAngleYZ += 1.0;
        }
        else if (e.code == "ArrowDown") {
            eyeAngleYZ -= 1.0;
        }
        else if (e.code == "ArrowLeft") {
            eyeAngleXZ += 1.0;
        } else {
            eyeAngleXZ -= 1.0;
        }
        
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
});