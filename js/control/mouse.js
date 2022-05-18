renderer.domElement.addEventListener("click", onclick, true);
var raycaster = new THREE.Raycaster();
function onclick(event) {
    console.log(event);

    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true); //array
    if (intersects.length > 0) {
        var selectedObject = intersects[0];
        console.log(selectedObject["object"]);
    }
}