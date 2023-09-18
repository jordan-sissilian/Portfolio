import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

class Player {
    constructor(scene) {
        this.scene = scene;
        this.camera = this.createCamera();
        this.model = null;
        this.keys = {};
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);

        this.loadModel();
    }

    createCamera() {
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(40, 5, 34);
        return camera;
    }

    setCamera(camera) {
        this.camera = camera;
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load('/asset/3dObject/pote.gltf', (gltf) => {
            this.model = gltf.scene;
            this.model.position.set(36, 2, 30);
            this.scene.add(this.model);
        }, undefined, (error) => {
            console.error(error);
        });
    }

    onKeyDown(event) {
        this.keys[event.key] = true;
    }

    onKeyUp(event) {
        this.keys[event.key] = false;
    }

    update() {
        const speed = 0.1;
        if (this.keys['ArrowUp']) {
            this.model.position.z -= speed;
            this.camera.position.z -= speed;
        }
        if (this.keys['ArrowDown']) {
            this.model.position.z += speed;
            this.camera.position.z += speed;
        }
        if (this.keys['ArrowLeft']) {
            this.model.position.x -= speed;
            this.camera.position.x -= speed;
        }
        if (this.keys['ArrowRight']) {
            this.model.position.x += speed;
            this.camera.position.x += speed;
        }
        this.camera.lookAt(this.model.position);
    }
}


export default class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();
        this.animationId = null;
        this.player = new Player(this.scene);
    }

    switchToPlayerCamera() {
        this.camera = this.player.camera;
    }
    switchToSceneCamera() {
        this.camera = this.createCamera();
    }

    createCamera() {
        const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(75, 30, 50);
        camera.lookAt(25, 7, 0);
        return camera;
    }

    createRenderer() {
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            shadowMap: {
                enabled: true,
                type: THREE.PCFSoftShadowMap
            },
            gammaOutput: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        return renderer;
    }

    createLights() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(20, 20, 10);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load('/asset/3dObject/map.gltf', (gltf) => {
            const model = gltf.scene;
            this.scene.add(model);
        }, undefined, (error) => {
            console.error(error);
        });
    }


    getRenderer() {
        return this.renderer.domElement;
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        setTimeout(() => {
            this.player.update();
        }, 1000);
        this.renderer.render(this.scene, this.camera);
    }

    init() {
        this.createLights();
        this.loadModel();
    }

    loadGame() {
        this.init();
        this.animate();
    }
}
