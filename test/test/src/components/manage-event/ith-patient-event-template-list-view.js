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
import './ith-patient-event-template'

class ithPatientEventTemplateListView extends PolymerElement {
  static get template() {
    return html `
      <style>
        :host {
          display: block;
          background-color: var(--app-background-color);
          margin: 26px 40px 0px 40px;
        }
        .no-event-found-view {
          background-color: var( --light-theme-background-color);
          font-size: 18px;
          color: var(--app-text-color);
          font-family: 'Roboto-Bold';
          padding: 30px 32px;
          box-shadow:  0px 3px 0px rgba(47, 48, 66, 0.15);
        }
        ith-patient-event-template{
          margin-bottom: 16px;
        }
        @media (max-width: 767px) {
          :host{
            margin: 26px 20px 0px 20px;
          }
          .no-event-found-view {
            padding: 20px 20px;
          }
        }
      </style>
      <div class="no-event-found-view" hidden$="[[_hasEvents]]">
        You currently don't have any events added for this patient.
      </div>

      <div hidden$="[[!_hasEvents]]">
        <template is="dom-repeat" items="[[items]]">
          <ith-patient-event-template template="[[item]]"
                                      event-template="[[_getEventTemplate(item.eventTemplateId)]]"
                                      ></ith-patient-event-template>
        </template>
      </div>
    `;
  }

  static get properties() {
    return {
      items: {
        type: Array
      },

      eventTemplates: {
        type: Object
      },

      _hasEvents: {
        type: Boolean,
        computed: '_computeHasEvents(items)'
      }
    };
  }

  _getEventTemplate(eventTemplateId) {
    return this.eventTemplates[eventTemplateId];
  }

  _computeHasEvents(eventTemplates) {
    return eventTemplates && eventTemplates.length ? true : false;
  }
}

window.customElements.define('ith-patient-event-template-list-view', ithPatientEventTemplateListView);