
class ParticleSystem {
    constructor() {
        this.particles = 20000;
        this.positions = new Float32Array(this.particles * 3);
        this.colors = new Float32Array(this.particles * 3);
        this.isMoved = new Array(this.particles).fill(false);
        this.orbitRadius = 70;

        for (let i = 0; i < this.particles; i++) {
            const phi = Math.acos(-1 + (2 * i) / this.particles);
            const theta = Math.sqrt(this.particles * Math.PI) * phi;

            const x = this.orbitRadius * Math.cos(theta) * Math.sin(phi);
            const y = this.orbitRadius * Math.sin(theta) * Math.sin(phi);
            const z = this.orbitRadius * Math.cos(phi);

            this.positions[i * 3] = x;
            this.positions[i * 3 + 1] = y;
            this.positions[i * 3 + 2] = z;

            this.colors[i * 3 + 0] = 0xff;
            this.colors[i * 3 + 1] = 0xff;
            this.colors[i * 3 + 2] = 0x00;
        }

        this.particleGeometry = new THREE.BufferGeometry();
        this.particleGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.particleGeometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));

        this.material = new THREE.PointsMaterial({
            size: .35,
            vertexColors: true
        });

        this.particleSystem = new THREE.Points(this.particleGeometry, this.material);
        this.particleSystem.position.set(0, 300, 0);
    }

    moveParticlesToTarget(letter, numParticles, targetPosition) {
        function mixArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return (array);
        }

        const particleLettre = mixArray(this.createParticlesForLetter(letter, numParticles));
        const duration = 1.5;

        const indices = mixArray(Array.from({ length: this.particles }, (_, i) => i));
        const selectedIndices = (indices.slice(0, numParticles));
        selectedIndices.forEach((index, i) => {
            if (!this.isMoved[index]) {
                this.isMoved[index] = true;

                const delay = i * 20;
                const tween = new TWEEN.Tween({ x: this.positions[index * 3], y: this.positions[index * 3 + 1], z: this.positions[index * 3 + 2] })
                    .to({ x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, duration * 1000)
                    .onUpdate((object) => {
                        this.positions[index * 3] = object.x + particleLettre[i].x;
                        this.positions[index * 3 + 1] = object.y + particleLettre[i].y;
                        this.positions[index * 3 + 2] = object.z + particleLettre[i].z;
                        this.particleGeometry.attributes.position.needsUpdate = true;
                    });

                setTimeout(() => {
                    tween.start();
                }, delay);
            }
        });
    }

    deleteAllParticleText() {
        for (let index = 0; index < this.isMoved.length; index++) {
            if (this.isMoved[index]) {
                const targetY = this.positions[index * 3 + 1] - 50;
                
                const moveTween = new TWEEN.Tween({ y: this.positions[index * 3 + 1] })
                .to({ y: targetY }, 1000)
                .onUpdate((object) => {
                    this.positions[index * 3 + 1] = object.y;
                })
                moveTween.start();
            }
        }
    }

    createParticlesForLetter(letter) {
        letter = alphabetPixel[letter];
        const particles = [];

        for (let row = 0; row < letter.length; row++)
            for (let col = 0; col < letter[row].length; col++)
                if (letter[row][col] === 1)
                    particles.push({
                        x: col * (.2),
                        y: -row * (.2),
                        z: 0
                    });
        return (particles);
    }
}

export default new ParticleSystem();