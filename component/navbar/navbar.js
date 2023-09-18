import snavbar from '/component/navbar/snavbar.js';

export default class navbar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML =
        `<link rel="stylesheet" type="text/css" href="/component/navbar/navbar.css">
        <div class="container">
            <div class="mobile-nav-toggle" id="mobileNav">
                <span><p>MENU</p></span>
            </div>
            <nav>
                <a class="home" alt="home" id="navActive">Accueil</a>
                <a class="aboutMe" alt="aboutMe">À propos de moi</a>
                <a class="project" alt="project">Projets</a>
                <a class="contact" alt="contact">Contact</a>
            </nav>
        </div>`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const self = this;
        const form = self.shadowRoot;

        setTimeout(function () {
            form.querySelector("nav").style.transform = 'translateY(0)';
            const sectionChangeEvent = new CustomEvent('sectionChange', {
                bubbles: true,
                composed: true,
                detail: { section: 'Home', content: "<index-page></index-page>" },
            });
            form.dispatchEvent(sectionChangeEvent);
        }, 1900);
        snavbar(form);
    }
}

customElements.define('nav-bar', navbar);
