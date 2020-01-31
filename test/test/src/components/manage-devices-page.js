import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../shared-styles/shared-styles';
class ManageDevicesPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <h1>Manage Devices page</h1>
    `;
  }

  static get properties() {
    return {
      active: Boolean
    }
  }
}

window.customElements.define('manage-devices-page', ManageDevicesPage);
