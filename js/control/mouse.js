renderer.domElement.addEventListener("click", onclick, true);
var raycaster = new THREE.Raycaster();
function getObject(mouse) {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true); //array
    if (intersects.length > 0) {
        return intersects[0]["object"];
    }
    return undefined;
}
function onclick(event) {
    // console.log(event);
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    var selected = getObject(mouse);
    if (selected) {
        var location = selected.name.substring(0, selected.name.indexOf("-"));
        var name = selected.name.substring(selected.name.indexOf("-")+1);
        if (objList[location][name].clickable) {
            /**
             * Add the click effect here. 
             * First Judge what object it is.
             */
            if ("icecube" == name.substring(0, 7)) {
                if (objList[location][name].click()) {
                    selected.material = new THREE.MeshPhysicalMaterial({
                        metalness: 0,
                        roughness: 0,
                        color: new THREE.Color( 0xffffff ).setHex( Math.random() * 0xffffff )
                    });
                } else {
                    selected.material = objList[location][name].material;
                }
            }
        }
    }
}