function room1CreateObject(){
    // create wall and floor
    addBackgorund(0, 4, 0, "backwall1", [0, 0, 0], [20, 12, 0.1], "room1");
    addBackgorund(5, -6, 0, "backwall2", [0, 0, 0], [10, 8, 0.1], "room1");
    addBackgorund(-7.5, -6, 0, "backwall3", [0, 0, 0], [5, 8, 0.1], "room1");
    addBackgorund(-10, 0, 15, "leftwall", [0, 1/2, 0], [30, 20, 0.1], "room1");
    addBackgorund(10, 0, 15, "rightwall", [0, -1/2, 0], [30, 20, 0.1], "room1");
    addBackgorund(0, -10, 15, "floor", [-1/2, 0, 0], [20, 30, 0.1], "room1", "src/floor.jpg");
    addBackgorund(0, 0, 30, "frontwall", [0, 0, 0], [20, 20, 0.1], "room1");
    addBackgorund(0, 10, 15, "ceiling", [-1/2, 0, 0], [20, 30, 0.1], "room1", "src/ceiling.jpg");
    addBackgorund(-9, 9, 15, "beam1", [0, 1/2, 0], [30, 1, 2], "room1");
    addBackgorund(9, 9, 15, "beam2", [0, 1/2, 0], [30, 1, 2], "room1");
    addBackgorund(0, 9, 1, "beam3", [0, 0, 0], [20, 1, 2], "room1");
    addBackgorund(0, 9, 29, "beam4", [0, 0, 0], [20, 1, 2], "room1");
  
    // create showcase
    addShowcase(-6, -8, 9, "case1", [0, 0, 0], [1, 4, 1], "room1");
    addShowcase(-6, -8, 6, "case2", [0, 0, 0], [1, 4, 1], "room1");
    addShowcase(6, -8, 9, "case3", [0, 0, 0], [1, 4, 5], "room1");
    addShowcase(6, -8, 15, "case4", [0, 0, 0], [1, 4, 1], "room1");
    addShowcase(-6, -8, 15, "case5", [0, 0, 0], [1, 4, 5], "room1");
    addShowcase(6, -8, 22, "case6", [0, 0, 0], [1, 4, 5], "room1");
    addShowcase(5, -8, 27, "case7", [0, 0, 0], [1, 4, 1], "room1");
    addShowcase(-3, -8, 27, "case8", [0, 0, 0], [5, 4, 1], "room1");
  
    // create items
    addDiamond(-6, -5, 9, "diamond1", [0, 0, 0], [0.5, 1, 1], "room1");
    addBowl(-6, -5, 6, "bowl1", [0, 0, 0], [0.5, 1, 1], "room1");
    addGlb(6, -5.4, 9, "vase1", [0, 0, 0], [0.5, 0.5, 0.5], 'src/vase1.glb', "room1");
    addGlb(0, 0, 15, "chandelier", [0, 0, 0], [0.02, 0.01, 0.02], 'src/chandelier4.glb', "room1");
    addGlb(-5.5, -10, 23, "man", [0, 1/2, 0], [4, 4, 4], 'src/man1.glb', "room1");
  
    // create picture
    addPlane(-9.9, -5, 9, "plane1", [0, 1/2, 0], [2, 3, 3], 'src/kaleidoscope.jpg', "room1");
    addBackgorund(-9.9, -3.5, 9, "ceiling", [0, 1/2, 0], [2, 0.3, 0.5], "room1", "src/frame.jpg");
    addBackgorund(-9.9, -6.5, 9, "ceiling", [0, 1/2, 0], [2, 0.3, 0.5], "room1", "src/frame.jpg");
    addBackgorund(-9.9, -5, 10, "ceiling", [0, 1/2, 0], [0.3, 3.3, 0.5], "room1", "src/frame.jpg");
    addBackgorund(-9.9, -5, 8, "ceiling", [0, 1/2, 0], [0.3, 3.3, 0.5], "room1", "src/frame.jpg");
}

function room1Animate() {
    objList["room1"]["diamond1"].mesh.rotation.x += 0.01;
    objList["room1"]["diamond1"].mesh.rotation.y += 0.01;
    objList["room1"]["bowl1"].mesh.rotation.x += 0.01;
    objList["room1"]["bowl1"].mesh.rotation.y += 0.01;
    if (objList["room1"]["chandelier"]) {
        objList["room1"]["chandelier"].rotation.y += 0.01;
    }
    if (objList["room1"]["vase1"]) {
        objList["room1"]["vase1"].rotation.y += 0.01;
    }
    // cube.position.x += 0.01;
    // camera.lookAt(cube.position)
    // angle += 0.005;
    // var x = 5 * Math.sin(angle);
    // var z = 3 * Math.cos(angle);
    // objList["cube"].mesh.position.set(x, 0, z);
    // camera.position.set(x, 0, z*3);
    // camera.position.z += 0.01
};

room1CreateObject();
  