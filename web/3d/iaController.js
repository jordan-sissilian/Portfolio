import cameraInstance from './Camera.js';
import sceneInstance from './Scene.js';
import particleInstance from './ParticleSystem.js';
import FormHandler from './FormHandler.js';
import fingerPrint from '../script/getFingerPrint.js';

const FRONT_TARGET = 750;

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

    //a faire
    this.hautGauche = new THREE.Vector3(-38, 5, 0);
    this.basDroite = new THREE.Vector3(38, -20, 0);
    [this.hautGauche, this.basDroite].forEach(_ => _.y -= 300);

    this.variation = 2;
    this.variationActive = false;

    this.targetPosition;
    this.ligne = 0;
    this.colonne = 0;

    //a faire
    this.formHandler = new FormHandler(
      () => {
        this.ligne = 0;
        this.colonne = 0;
        particleInstance.deleteAllParticleText();
      },
      (params) => this.drawText(params)
    );

    this.blocageEvent = new Event('blocage');
    this.deBlocageEvent = new Event('deBlocage');
    this.addMsgEvent = new Event('addMessage');
    this.pompt = document.getElementById("prompt");
    this.moveText = (select) => {
      for (let index = 0; index < particleInstance.isMoved.length; index++) {
        const targetY = particleInstance.positions[index * 3 + 1] + (select ? -50 : 50);

        const moveTween = new TWEEN.Tween({ y: particleInstance.positions[index * 3 + 1] })
          .to({ y: targetY }, 1000)
          .onUpdate((object) => {
            particleInstance.positions[index * 3 + 1] = object.y;
            this.particleGeometry.attributes.position.needsUpdate = true;
          })
        moveTween.start();
      }
    };
    this.pompt.addEventListener('hautDeplacement', () => this.moveText(0));
    this.pompt.addEventListener('basDeplacement', () => this.moveText(1));
    this.animate();
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

  drawText(messages) {
    const INITIAL_VALUE = 2;
    const TARGET_VALUE = 40;
    const setVariationTransition = (initialValue, targetValue) => {
      if (this.variationActive)
        return;

      let steps = Math.ceil(1000 / 100);
      let stepValue = (initialValue - targetValue) / steps;

      let self = this;
      function transitionStep(currentValue, remainingSteps) {
        if (remainingSteps > 0) {
          setTimeout(() => {
            self.variation = currentValue - stepValue;
            transitionStep(self.variation, remainingSteps - 1);
          }, 20);
        } else
          self.variation = targetValue;
      }
      transitionStep(initialValue, steps);
    }

    this.pompt.dispatchEvent(this.blocageEvent);

    let count = 0;
    let delay = -750;
    const retourLigne = () => { this.ligne += 1; this.colonne = 0; };
    messages.forEach((message) => {
      if (message !== "") {
        setTimeout(() => {
          setVariationTransition(INITIAL_VALUE, TARGET_VALUE);
          this.variationActive = true;
          const characters = message.split('');
          characters.forEach((char) => {
            this.drawChar(char);
          });
          retourLigne();
          setTimeout(() => {
            this.variationActive = false;
            setVariationTransition(TARGET_VALUE, INITIAL_VALUE);
          }, 500);
        }, (delay += 1500));
      } else {
        count++;
        setTimeout(() => {
          retourLigne();
        }, delay + 500);
      }
    });

    setTimeout(() => {
      this.pompt.dispatchEvent(this.deBlocageEvent);
    }, ((messages.length - count) * 2 * 1000));
    this.pompt.dispatchEvent(this.addMsgEvent);
  }

  drawChar(char) {
    if (this.ligne < Math.floor((this.hautGauche.y - this.basDroite.y) / 3)) {
      if (this.colonne < Math.floor((this.basDroite.x - this.hautGauche.x) / 2)) {
        const x = this.hautGauche.x + this.colonne * 2;
        const y = this.hautGauche.y - this.ligne * 3;
        this.targetPosition = new THREE.Vector3(x, y, FRONT_TARGET);
        this.colonne++;
      } else {
        this.ligne++;
        this.colonne = 0;
      }
    } else {
      this.colonne = 0;
      this.ligne = 0;
    }
    (char === "/") && (this.ligne++ && (this.colonne = 0));

    const lettreTarget = char.slice(-1).toUpperCase();
    if (!alphabetPixel[lettreTarget])
      return;
    const letterPixels = alphabetPixel[lettreTarget].flat();
    const numParticlesToMove = letterPixels.filter((pixel) => pixel === 1).length;
    particleInstance.moveParticlesToTarget(lettreTarget, numParticlesToMove, this.targetPosition);
  }
}

export default new IAController();