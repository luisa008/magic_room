let RADIUS = 1;
let eyeAngleXZ = 0.0;
let eyeAngleYZ = 0.0;

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
        let deltaX = - Math.sin((angleXZ / 360) * Math.PI * 2) * RADIUS;
        let deltaZ = - Math.cos((angleXZ / 360) * Math.PI * 2) * RADIUS;

        camera.position.x += deltaX;
        camera.position.z += deltaZ;
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
        
        let deltaX = - Math.sin((eyeAngleXZ / 360) * Math.PI * 2) * RADIUS;
        let deltaY = Math.sin((eyeAngleYZ / 360) * Math.PI * 2) * RADIUS;
        let deltaZ = - Math.cos((eyeAngleXZ / 360) * Math.PI * 2) * RADIUS - Math.cos((eyeAngleYZ / 360) * Math.PI * 2) * RADIUS;
        

        let lookPos = new THREE.Vector3(
            camera.position.x + deltaX, 
            camera.position.y + deltaY, 
            camera.position.z + deltaZ
        );
    
        camera.lookAt(lookPos);
    }
});