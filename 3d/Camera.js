class Camera {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 800;
    }

    resize(newWidth, newHeight) {
        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();
    }
}

export default new Camera();