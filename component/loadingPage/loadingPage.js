import loader from '/component/loadingPage/sloadingPage.js';

export default class loadingPage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML =
      `<div class="loading-container">
      <link rel="stylesheet" type="text/css" href="/component/loadingPage/loadingPage.css">
         <div class="bubble-container">
              <div class="bubble b3"></div>
              <div class="bubble b2"></div>
              <div class="bubble b1"></div>
              <div class="bubble b2"></div>
              <div class="bubble b3"></div>
          </div>
       </div>`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const self = this;
    const form = self.shadowRoot;
    loader(form);
  }

  disconnectedCallback() {
    template.remove();
  }
}
customElements.define('loading-page', loadingPage);
