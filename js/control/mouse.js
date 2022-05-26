renderer.domElement.addEventListener("click", onclick, true);
renderer.domElement.addEventListener("pointermove", setMouseVec);
var raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.1;
var mouse = new THREE.Vector2();

function setMouseVec(event) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function getIntersectObject(candidates) {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(candidates, true); //array
    if (intersects.length > 0) {
        return intersects[0];
    }
    return undefined;
}

function onclick(event) {
    setMouseVec(event)
    var selected = getIntersectObject(scene.children)["object"];
    if (selected) {
        var location = selected.name.substring(0, selected.name.indexOf("-"));
        var name = selected.name.substring(selected.name.indexOf("-")+1);
        if (objList[location] && objList[location][name] && objList[location][name].clickable) {
            /**
             * Add the click effect here. 
             * First Judge what object it is.
             */
            if ("icecube" === name.substring(0, 7)) {
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
            else if ("ring" === name.substring(0, 4)) {
                toggleBloomEffect(objList[location][name].mesh);
            } 
            else if ("label" === name.substring(0, 5)) {
                $('#exampleModalTitle').html(objList[location][name].title);
                $('#exampleModalContent').html(objList[location][name].content);
                $('#exampleModal').modal('show');
            }
        }
    }
}
