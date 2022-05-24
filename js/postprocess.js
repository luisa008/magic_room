function createLayer(num) {
    const layer = new THREE.Layers();
    layer.set(num);
    return layer;
}

function createUnrealBloomPass() {
    const bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85
    );
    const params = {
        exposure: 1,
        bloomThreshold: 0,
        bloomStrength: 1, // 輝光強度
        bloomRadius: 0,
    };
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    return bloomPass;
}

function createComposer() {
    const renderPass = new THREE.RenderPass(scene, camera); // 兩個composer都要用到這個renderPass，所以在前面公共部分宣告

    // bloomComposer效果合成器 產生輝光，但是不渲染到螢幕上
    const bloomComposer = new THREE.EffectComposer(renderer);
    bloomComposer.renderToScreen = false; // 不渲染到螢幕上
    const bloomPass = createUnrealBloomPass();
    bloomComposer.addPass(renderPass);
    bloomComposer.addPass(bloomPass);

    // 最終真正渲染到螢幕上的效果合成器 finalComposer 
    const finalComposer = new THREE.EffectComposer(renderer);
    const shaderPass = createShaderPass(bloomComposer); // 建立自定義的著色器Pass，詳細見下
    finalComposer.addPass(renderPass);
    finalComposer.addPass(shaderPass);
    return { bloomComposer, finalComposer };
}

// ShaderPass，著色器pass，自定義程度高，需要編寫OpenGL程式碼
// 傳入bloomComposer
function createShaderPass(bloomComposer) {
    // 著色器材質，自定義shader渲染的材質
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }, // 輝光貼圖屬性設定為傳入的bloomComposer，這裡就說明了為什麼bloomComposer不要渲染到螢幕上
        },
        vertexShader: document.getElementById("vertexshader").textContent, // 頂點著色器
        fragmentShader: document.getElementById("fragmentshader").textContent, // 片元著色器
        defines: {},
    });
    const shaderPass = new THREE.ShaderPass(shaderMaterial, "baseTexture");
    shaderPass.needsSwap = true;
    return shaderPass;
}

const NORMAL_LAYER = 0;
const BLOOM_LAYER = 1;
const bloomLayer = createLayer(BLOOM_LAYER); // 建立一個新的圖層，編號為1
const materials = {};
const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" }); // 提前建立好黑色普通材質，供後面使用
const { bloomComposer, finalComposer } = createComposer(); // 建立效果處理器

function darkenNonBloomed( obj ) {
    if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {
        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;
    }
}

function restoreMaterial( obj ) {
    if ( materials[ obj.uuid ] ) {
        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];
    }
}

function addBloomEffect(obj) {
    if (obj.isMesh) {
        obj.layers.enable(BLOOM_LAYER);
    }
}

function toggleBloomEffect(obj) {
    if (obj.isMesh) {
        obj.layers.toggle(BLOOM_LAYER);
    }
}