import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';

import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '../../../shared-styles/paper-dropdown-menu-styles';

class DropdownMenu extends PolymerElement {
  static get template() {
    return html`
      <style include="paper-dropdown-menu-styles iron-flex iron-flex-factors iron-flex-alignment">
      </style>
      <paper-dropdown-menu label="[[label]]" no-animations no-label-float>
        <paper-listbox slot="dropdown-content">
          <template is="dom-repeat" items="[[timePeriod]]">
              <paper-item>[[item]]</paper-item>
          </template>
        </paper-listbox>
     </paper-dropdown-menu>
    `;
  }

  static get properties() {
    return {
      timePeriod: Array,
      label: String
    } 
  }
}

window.customElements.define('dropdown-menu', DropdownMenu);
