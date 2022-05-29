const ICECUBE_NUM = 200;
const RING_ROW = 3;
const RING_COL = 5;
const RING_DIST = 2;
const RING_COLORS = [0x750000,0xFF5151,0xFF00FF,0xFF359A,0x9F35FF,0x6A6AFF,0x2894FF,0x00FFFF,0x1AFD9C,0x28FF28, 0x73BF00	,0x8C8C00	,0xAE8F00	,0xD26900	,0xBB3D00];

const POINT_CLOUD_W = 80;
const POINT_CLOUD_L = 80;
const POINT_CLOUD_Y_OFFSET = -4;
const POINT_CLOUD_Z_OFFSET = -12;

const spheres = [];
let toggle = 0;
let spheresIndex = 0;
let driveMixer = null;
let labelContent;

function isInRoom2() {
    return (camera.position.x >= -10) && (camera.position.x <=10) && (camera.position.z >= -30) && (camera.position.z <= 0);
}

function room2Animate() {
    let inRoom2 = isInRoom2();
    if (inRoom2 || (DOOR1_OPEN && eyeAngleXZ > -90 && eyeAngleXZ < 90) ) {
        if (driveMixer) {
            const delta = clock.getDelta();
            driveMixer.update( delta );
        }
        for (let i = 0; i < ICECUBE_NUM; i++) {
            var icecube = objList["room2"][`icecube${i}`];
            icecube.mesh.rotation.x += icecube.rotateDelta.x;
            icecube.mesh.rotation.y += icecube.rotateDelta.y;
        }
        door1Animation();
    }

    if (inRoom2 && objList["room2"]["pointclouds"]) {
        let intersection = getIntersectObject(objList["room2"]["pointclouds"]);
        if ( toggle > 0.02 && intersection !== undefined ) {
            spheres[ spheresIndex ].position.copy( intersection.point );
            spheres[ spheresIndex ].scale.set( 1, 1, 1 );
            spheresIndex = ( spheresIndex + 1 ) % spheres.length;
            toggle = 0;
        }
        for ( let i = 0; i < spheres.length; i ++ ) {
            const sphere = spheres[ i ];
            sphere.scale.multiplyScalar( 0.98 );
            sphere.scale.clampScalar( 0.01, 1 );
        }
        toggle += clock.getDelta();
    }
}

/* Walls and Floor */
addBackgorund(0, -10, -15, "floor", [-1/2, 0, 0], [20, 30, 0.1], "room2", "src/floor2.jpg");
addBackgorund(0, 0, -30, "backwall", [0, 0, 0], [20, 20, 0.1], "room2", "src/texture2.jpg");
addBackgorund(-10, 0, -15, "leftwall", [0, 1/2, 0], [30, 20, 0.1], "room2", "src/wall2.jpg");
addBackgorund(10, 0, -15, "rightwall", [0, -1/2, 0], [30, 20, 0.1], "room2", "src/wall2.jpg");
addBackgorund(0, 10, -15, "ceiling", [-1/2, 0, 0], [20, 30, 0.1], "room2", "src/wall2.jpg");

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
labelContent = `
    互動：點擊冰塊試試吧！<br>
    技術：<br>
    1. 改寫 js/three.js ，加上 RGBELoader 、 RoundedBoxGeometry 的class。<br>
    2. 利用 RGBELoader 去載入 HDR檔，以獲得反光的材質。<br>
    3. 利用 raycaster，將二維的「滑鼠點擊位置」轉換成三維向量以獲得點擊的物品。<br>
    4. 使用 MeshPhysicalMaterial 做出透明效果。
    `;
addLabelBtn(-6.3, -5.7, -23, "label-icecube", "room2", "懸浮冰晶", labelContent);

/* GLB */
async function addDrive(x, y, z, name, angle, size, glbfile, location){
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
        
        traverseChildren(model, addBloomEffect);
        
        driveMixer = new THREE.AnimationMixer( model );
        const clip = gltf.animations[0];
        driveMixer.clipAction( clip.optimize() ).play();
    } );
}
addDrive(-6, -5, -6, "drive", [0, 0, 0.5], [1, 1, 1], 'src/models/PrimaryIonDrive.glb', "room2");
labelContent = `
    解說：神秘的宇宙礦石。<br>
    技術：<br>
    1. 使用到 Unreal Bloom 效果，將物件分成多個圖層，並針對不同圖層進行各自的後處理。<br>
    2. 將動畫效果儲存在模型glb檔內，使用Animation Mixer達成動畫效果。
    `;
addLabelBtn(-6.3, -5.7, -4, "label-drive", "room2", "原始離子動力裝置", labelContent);

/* Ring */
function addRing(x, y, z, name, radius, angle, location, color) {
    const geometry = new THREE.TorusGeometry(radius, radius / 5, 8, 50);
    const material = new THREE.MeshStandardMaterial({ color: color });
    objList[location][name] = new object(geometry, material, `${location}-${name}`, true);
    objList[location][name].setPosition(x, y, z);
    objList[location][name].mesh.rotation.x = Math.PI * angle[0];
    objList[location][name].mesh.rotation.y = Math.PI * angle[1];
    objList[location][name].mesh.rotation.z = Math.PI * angle[2];
    // objList[location][name].setCastShadow();
    objList[location][name].addToScene(scene);
    addBloomEffect(objList[location][name].mesh);
}

for (let i = 0; i < RING_ROW; i++) {
    for (let j = 0; j < RING_COL; j++) {
        let idx = i * RING_COL + j;
        let color = idx / (RING_ROW * RING_COL) * 0xffffff;
        if (idx < RING_COLORS.length) {
            color = RING_COLORS[idx];
        }
        addRing(-8, -2 - RING_DIST * i, -12 - RING_DIST * j, `ring${idx}`, 0.4, [0, 0.5, 0], "room2", new THREE.Color( 0xffffff ).setHex( color));
    }
}

labelContent = `
    互動：點擊冰塊試試吧！<br>
    技術：<br>
    1. 改寫 js/three.js ，加上 RGBELoader 、 RoundedBoxGeometry 的class。<br>
    2. 利用 RGBELoader 去載入 HDR檔，以獲得反光的材質。<br>
    3. 利用 raycaster，將二維的「滑鼠點擊位置」轉換成三維向量以獲得點擊的物品。<br>
    4. 使用 MeshPhysicalMaterial 做出透明效果。
    `;
addLabelBtn(-7, -5.7, -10, "label-ring", "room2", "霓光環", labelContent);

/* PointCloud */
function addPointClouds() {
    const pcBuffer = generatePointcloud( new THREE.Color( 1, 0, 0 ), POINT_CLOUD_W, POINT_CLOUD_L );
    pcBuffer.scale.set( 4, 8, 5 );
    pcBuffer.position.set( 9, 0 + POINT_CLOUD_Y_OFFSET, -5 + POINT_CLOUD_Z_OFFSET);
    scene.add( pcBuffer );

    const pcIndexed = generateIndexedPointcloud( new THREE.Color( 0, 1, 0 ), POINT_CLOUD_W, POINT_CLOUD_L );
    pcIndexed.scale.set( 4, 8, 5 );
    pcIndexed.position.set( 9, 0 + POINT_CLOUD_Y_OFFSET, 0 + POINT_CLOUD_Z_OFFSET);
    scene.add( pcIndexed );

    const pcIndexedOffset = generateIndexedWithOffsetPointcloud( new THREE.Color( 0, 1, 1 ), POINT_CLOUD_W, POINT_CLOUD_L );
    pcIndexedOffset.scale.set( 4, 8, 5 );
    pcIndexedOffset.position.set( 9, 0 + POINT_CLOUD_Y_OFFSET, 5 + POINT_CLOUD_Z_OFFSET);
    scene.add( pcIndexedOffset );

    objList["room2"]["pointclouds"] = [ pcBuffer, pcIndexed, pcIndexedOffset ];

    /* Pointer Spheres*/
    const sphereGeometry = new THREE.SphereGeometry( 0.1, 32, 32 );
    const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

    for ( let i = 0; i < 20; i ++ ) {
        const sphere = new object( sphereGeometry, sphereMaterial, `pointer${i}`);
        sphere.mesh.scale.set(0.05, 0.05, 0.05);
        sphere.addToScene(scene);
        spheres.push( sphere.mesh );
    }
}

addPointClouds();


function addRoom2Light() {
    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.intensity = 0.5;
    spotLight.target = objList["room2"]["backwall"].mesh;
    spotLight.position.set( 0, 0, 0 );
    spotLight.angle = Math.PI/10;
    spotLight.castShadow = true;
    scene.add(spotLight);
}
addRoom2Light();

