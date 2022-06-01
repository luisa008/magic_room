function room1CreateObject(){
    // create wall and floor
    addBackgorund(0, 4, 0, "backwall1", [0, 0, 0], [20, 12, 0.1], "room1");
    addBackgorund(5, -6, 0, "backwall2", [0, 0, 0], [10, 8, 0.1], "room1");
    addBackgorund(-7.5, -6, 0, "backwall3", [0, 0, 0], [5, 8, 0.1], "room1");
    addBackgorund(-2.5, -6, 0, "door", [0, 0, 0], [5, 8, 0.1], "room1", "src/door.jpg");
    addGroup("room1", "door");
    addBackgorund(-10, 0, 15, "leftwall", [0, 1/2, 0], [30, 20, 0.1], "room1");
    addBackgorund(10, 4, 15, "rightwall1", [0, -1/2, 0], [30, 12, 0.1], "room1");
    addBackgorund(10, -6, 22.5, "rightwall2", [0, -1/2, 0], [15, 8, 0.1], "room1");
    addBackgorund(10, -6, 5, "rightwall3", [0, -1/2, 0], [10, 8, 0.1], "room1");
    addBackgorund(10, -6, 12.5, "door2", [0, -1/2, 0], [5, 8, 0.1], "room1", "src/door.jpg");
    addGroup2("room1", "door2");
    addBackgorund(0, -10, 15, "floor", [-1/2, 0, 0], [20, 30, 0.1], "room1", "src/floor.jpg");
    addBackgorund(0, 0, 30, "frontwall", [0, 0, 0], [20, 20, 0.1], "room1");
    addBackgorund(0, 10, 15, "ceiling", [-1/2, 0, 0], [20, 30, 0.1], "room1", "src/ceiling.jpg");
    addBackgorund(-9, 9, 15, "beam1", [0, 1/2, 0], [30, 1, 2], "room1");
    addBackgorund(9, 9, 15, "beam2", [0, 1/2, 0], [30, 1, 2], "room1");
    addBackgorund(0, 9, 1, "beam3", [0, 0, 0], [20, 1, 2], "room1");
    addBackgorund(0, 9, 29, "beam4", [0, 0, 0], [20, 1, 2], "room1");
  
    // create showcase
    addShowcase(-6, -8, 9, "case1", [0, 0, 0], [1, 4, 1], "room1", true, [-3.5, -5, 9], 90, 0);
    addShowcase(-6, -8, 6, "case2", [0, 0, 0], [1, 4, 1], "room1", true, [-3.5, -5, 6], 90, 0);
    addShowcase(6, -8, 8, "case3", [0, 0, 0], [1, 4, 5], "room1", true, [3.5, -5, 9], -90, 0);
    // addShowcase(6, -8, 15, "case4", [0, 0, 0], [1, 4, 1], "room1");
    addShowcase(-6, -8, 15, "case5", [0, 0, 0], [1, 4, 5], "room1");
    addShowcase(6, -8, 22, "case6", [0, 0, 0], [1, 4, 5], "room1", true, [2.5, -5, 22], -90, 0);
    addShowcase(5, -8, 27, "case7", [0, 0, 0], [1, 4, 1], "room1");
    addShowcase(-3, -8, 27, "case8", [0, 0, 0], [5, 4, 1], "room1", true, [-3, -5, 23], -179, 5);
  
    // create items
    addDiamond(-6, -5, 9, "diamond1", [0, 0, 0], [0.5, 1, 1], "room1");
    addBowl(-6, -5.4, 6, "bowl1", [0, 0, 0], [0.5, 1, 1], "room1");
    addGlb(6, -5.4, 9, "vase1", [0, 0, 0], [0.5, 0.5, 0.5], 'src/models/vase1.glb', "room1");
    addGlb(0, 0, 15, "chandelier", [0, 0, 0], [0.02, 0.01, 0.02], 'src/models/chandelier4.glb', "room1");
    addGlb(-5.5, -10, 23, "man", [0, 1/2, 0], [4, 4, 4], 'src/models/man1.glb', "room1");
    addCylinder(-3, -5, 27, "cylinder1", [0.2, 0.5, 2], "room1");
    addCylinder(-3, -4, 27, "cylinder2", [0.5, 0.2, 0.5], "room1");
    addLineBall(6, -5, 22, "lineball1", 1, "room1");
  
    // create picture
    addPlane(-9.9, -5, 9, "plane1", [0, 1/2, 0], [3, 4, 3], 'src/kaleidoscope.jpg', "room1");
    addBackgorund(-9.9, -3, 9, "ceiling", [0, 1/2, 0], [3, 0.3, 0.5], "room1", "src/frame.jpg");
    addBackgorund(-9.9, -7, 9, "ceiling", [0, 1/2, 0], [3, 0.3, 0.5], "room1", "src/frame.jpg");
    addBackgorund(-9.9, -5, 10.5, "ceiling", [0, 1/2, 0], [0.3, 4.3, 0.5], "room1", "src/frame.jpg");
    addBackgorund(-9.9, -5, 7.5, "ceiling", [0, 1/2, 0], [0.3, 4.3, 0.5], "room1", "src/frame.jpg");

    let labelContent = `
        技術：<br>
        1. 將object放到group裡，指定group軸的位置後再將門放到相對位置旋轉。<br>
        2. 靠近門時門會打開，遠離時會關閉。
        `;
    addLabelBtn(0.3, -5.7, 1, "label-door", "room1", "互動門", labelContent, false);

    labelContent = `
        技術：<br>
        1. 使用blender製作花瓶，並且加上texture。<br>
        2. 用glbLoader將glb load到場景。
        `;
    addLabelBtn(7, -5, 7, "label-vase", "room1", "自製花瓶", labelContent, false);

    labelContent = `
        技術：<br>
        1. 使用MeshLambertMaterial並套上envmap
        `;
    addLabelBtn(-5, -5, 27, "label-vase2", "room1", "幻影藝術", labelContent, false);

    labelContent = `
        解說：使展品呈現網狀感 <br>
        技術：<br>
            網狀的呈現方式是藉由先得到物體形狀，然後放入EdgesGeometry將其網狀化，之後再配上材質顯現螢光效果。
        `;
    addLabelBtn(6, -5, 20, "label-lineball", "room1", "網狀球", labelContent, false);
}

function isInRoom1() {
    return (camera.position.x >= -10) && (camera.position.x <=10) && (camera.position.z >= 0) && (camera.position.z <= 30);
}

function door1Animation() {
    if (camera.position.x < 0 && camera.position.x > -5 && camera.position.z < 12 && camera.position.z > -12) {
        DOOR1_OPEN = true;
        if(pivot.rotation.y < Math.PI * 1/2)
            pivot.rotation.y += 0.03;
    }
    else {
        DOOR1_OPEN = false;
        if(pivot.rotation.y > Math.PI * 0)
            pivot.rotation.y -= 0.03;
    }
}

function door2Animation(){
    if (camera.position.x < 20 && camera.position.x > 0 && camera.position.z < 15 && camera.position.z > 10) {
        DOOR2_OPEN = true;
        if(pivot2.rotation.y < Math.PI * 1/2)
            pivot2.rotation.y += 0.03;
    }
    else {
        DOOR2_OPEN = false;
        if(pivot2.rotation.y > Math.PI * 0)
            pivot2.rotation.y -= 0.03;
    }
}

function room1Animate() {
    if (isInRoom1()) {
        objList["room1"]["diamond1"].mesh.rotation.x += 0.01;
        objList["room1"]["diamond1"].mesh.rotation.y += 0.01;
        objList["room1"]["lineball1"].rotation.y += 0.01;
        objList["room1"]["bowl1"].mesh.rotation.y += 0.01;
        if (objList["room1"]["chandelier"]) {
            objList["room1"]["chandelier"].rotation.y += 0.01;
        }
        if (objList["room1"]["vase1"]) {
            objList["room1"]["vase1"].rotation.y += 0.01;
        }
        door1Animation();
        door2Animation();
    }
};

room1CreateObject();
        