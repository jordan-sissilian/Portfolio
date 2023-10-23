import cameraInstance from './Camera.js';
import sceneInstance from './Scene.js';
import particleInstance from './ParticleSystem.js';
import fingerPrint from '../script/getFingerPrint.js';

class IAController {
  constructor() {
    this.user = fingerPrint;

    this.camera = cameraInstance.camera;
    this.scene = sceneInstance.scene;
    this.particleSystem = particleInstance.particleSystem;
    this.particles = particleInstance.particles;
    this.particleGeometry = particleInstance.particleGeometry;
    this.scene.add(this.particleSystem);

    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('IA') });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.hautGauche = new THREE.Vector3(-37, 5 - 300, 0);
    this.basDroite = new THREE.Vector3(37, -20 - 300, 0);

    this.variation = 2;
    this.variationActive = false;

    this.targetPosition;
    this.ligne = 0;
    this.colonne = 0;
    this.retourLigne = () => {this.ligne += 1; this.colonne = 0;};

    this.animate();
  }

  getUser() {
    return (this.user);
  }

  drawText(messages) {
    let delay = 0;
  
    messages.forEach((message) => {
      if (message !== "") {
        setTimeout(() => {
          const characters = message.split('');
          characters.forEach((char) => {
            this.drawChar(char);
          });
          this.retourLigne();
          setTimeout(() => {
            this.drawChar();
          }, 1000);
        }, (delay += 2000));
      } else {
        setTimeout(() => {
          this.retourLigne();
        }, delay + 1000);
      }
    });
  }
  
  drawChar(char) {
    if (char) {
      this.setVariationTransition(2, 40, 1000, 100);
      this.variationActive = true;

      if (this.ligne < Math.floor((this.hautGauche.y - this.basDroite.y) / 3)) {
        if (this.colonne < Math.floor((this.basDroite.x - this.hautGauche.x) / 2)) {
          const x = this.hautGauche.x + this.colonne * 2;
          const y = this.hautGauche.y - this.ligne * 3;
          this.targetPosition = new THREE.Vector3(x, y, 750);
          this.colonne++;
        } else {
          this.colonne = 0;
          this.ligne++;
        }
      } else {
        this.colonne = 0;
        this.ligne = 0;
      }

      const lettreTarget = char.slice(-1).toUpperCase();
      if (!alphabetPixel[lettreTarget])
        return;
      const letterPixels = alphabetPixel[lettreTarget].flat();
      const numParticlesToMove = letterPixels.filter((pixel) => pixel === 1).length;
      particleInstance.moveParticlesToTarget(lettreTarget, numParticlesToMove, this.targetPosition);
    } else {
      this.variationActive = false;
      this.setVariationTransition(40, 2, 1000, 100);
    }
  }

  setVariationTransition(initialValue, targetValue, duration, interval) {
    if (this.variationActive)
      return;

    let steps = Math.ceil(duration / interval);
    let stepValue = (initialValue - targetValue) / steps;

    let self = this;
    function transitionStep(currentValue, remainingSteps) {
      if (remainingSteps > 0) {
        setTimeout(() => {
          self.variation = currentValue - stepValue;
          transitionStep(self.variation, remainingSteps - 1);
        }, interval);
      } else {
        self.variation = targetValue;
      }
    }
    transitionStep(initialValue, steps);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    TWEEN.update();

    const time = this.clock.getElapsedTime();
    for (let i = 0; i < this.particles; i++) {
      if (!particleInstance.isMoved[i]) {
        const phi = Math.acos(-1 + (2 * i) / this.particles);
        const theta = Math.sqrt(this.particles * Math.PI) * phi;

        const initialX = particleInstance.orbitRadius * Math.cos(theta) * Math.sin(phi);
        const initialY = particleInstance.orbitRadius * Math.sin(theta) * Math.sin(phi);
        const sinValue = Math.sin(time * 10 + initialX * 0.1) * this.variation;

        particleInstance.positions[i * 3 + 1] = initialY + sinValue;
      }
    }
    this.particleGeometry.attributes.position.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }
}

export default new IAController();