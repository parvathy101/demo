import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../shared-styles/shared-styles';
class SupportPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <h1>Support page</h1>
    `;
  }

  static get properties() {
    return {
      active: Boolean
    }
  }
}

window.customElements.define('support-page', SupportPage);
