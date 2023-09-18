export default class contact extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML =
        `<style>:host {display: none;}</style>
        <link rel="stylesheet" type="text/css" href="/component/pages/contact/contact.css">
        <div class="websiteContact" id="Contact">
            <div class="main">
                <h1><span class="spanName">
                jordan.sissilian@laplateforme.io
                </span></h1>
            </div>
        </div>`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        setTimeout(() => {
            this.style.display = 'block';
        }, 100);
    }
}

customElements.define('contact-page', contact);
