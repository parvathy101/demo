import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../shared-styles/shared-styles';
class ContactPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <h1>Contact page</h1>
    `;
  }

  static get properties() {
    return {
      active: Boolean
    }
  }
}

window.customElements.define('contact-page', ContactPage);
