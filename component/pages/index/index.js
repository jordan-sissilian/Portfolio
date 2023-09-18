import Game from '/game/loadGame.js';

export default class index extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML =
            `<style>:host {display: none;}</style>
        <link rel="stylesheet" type="text/css" href="/component/pages/index/index.css">
        <div class="websiteHome" id="Home">
            <div class="main floue">
                <h1>
                    Salut, Moi c'est <span class="spanName" style="color: rgb(255, 255, 0);">Jordan</span>,<br>
                    <span style="color: rgba(255, 0, 212, 0.611);">{</span>Développer<span style="color: rgba(255, 0, 212, 0.611);">}</span> passionné.
                </h1>
                <p>
                    Je transforme des idées en code, créant des expériences numériques uniques.<br>
                        Découvrez mon travail et explorez les projets qui prennent vie à travers mes lignes de code,
                </p>
                <button class="play">Play</button>
            </div>
            <button class="retour">Retour</button>
            <div id="canvas-container"></div>
         </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        setTimeout(() => {
            this.style.display = 'block';
            this.shadowRoot.querySelector(".websiteHome").style.opacity = 1;
        }, 100);
        setTimeout(() => {
            this.shadowRoot.querySelector(".main").classList.remove("floue");
        }, 200);
        if (window.innerWidth >= 768) {
            const game = new Game();
            game.loadGame();
            const canvasContainer = this.shadowRoot.querySelector('#canvas-container');
            canvasContainer.appendChild(game.getRenderer());

            const playButton = this.shadowRoot.querySelector('.play');
            playButton.addEventListener('click', () => {
                game.switchToPlayerCamera();
                this.shadowRoot.querySelector('.main').style.opacity = 0;
                this.shadowRoot.querySelector('.retour').style.display = 'block';
            });
            const retourButton = this.shadowRoot.querySelector('.retour');
            retourButton.addEventListener('click', () => {
                game.switchToSceneCamera();
                this.shadowRoot.querySelector('.main').style.opacity = 1;
                this.shadowRoot.querySelector('.retour').style.display = 'none';
            });
        }
    }
}

customElements.define('index-page', index);
