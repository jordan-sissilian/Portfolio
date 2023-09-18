
export default class pageContent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML =
            `<link rel="stylesheet" type="text/css" href="/component/navbar/navbar.css">
            <div class="page">
            </div>`;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const self = this;
        document.addEventListener('sectionChange', (event) => {
            const section = event.detail.content;
            self.shadowRoot.querySelector(".page").innerHTML = section;
        });
    }
}

customElements.define('page-content', pageContent);
