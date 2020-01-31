import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../shared-styles/shared-styles';
class ManageCategoriesPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <h1>Manage Categories page</h1>
    `;
  }

  static get properties() {
    return {
      active: Boolean
    }
  }
}

window.customElements.define('manage-categories-page', ManageCategoriesPage);
