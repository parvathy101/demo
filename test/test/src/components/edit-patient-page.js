import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../shared-styles/shared-styles';
class EditPatientPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <h1>Edit Patient page</h1>
    `;
  }

  static get properties() {
    return {
      active: Boolean
    }
  }
}

window.customElements.define('edit-patient-page', EditPatientPage);
