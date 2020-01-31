/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-styles/default-theme';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/input-styles';

class IthPatientEventTemplate extends PolymerElement {
  static get template() {
    return html `
      <style include="paper-button-styles input-styles iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
          background-color: var(--light-theme-background-color);
          padding: 27px 30px 21px 31px;
          box-shadow:  0px 3px 0px rgba(47, 48, 66, 0.15);
        }

        .event-title{
          font-size: 18px;
          color: var(--app-text-color);
          font-family: 'Roboto-Bold';
          line-height: 20px;
        }
       
      </style>
      
      <div class="layout verticle">
        <span class="event-title">[[eventTemplate.title]]</span>
      </div>
        </template>
        
      </div>
    `;
  }

  static get properties() {
    return {
      template: {
        type: Object
      },

      eventTemplate: {
        type: Object
      }

    };
  }

}

window.customElements.define('ith-patient-event-template', IthPatientEventTemplate);