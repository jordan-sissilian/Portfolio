class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x001F3F);

        this.addLight();
    }

    addLight() {
        let light = new THREE.PointLight(0xffff00, 500);
        this.scene.add(light);
    }
}

export default new Scene();