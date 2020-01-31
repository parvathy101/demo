/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-styles/default-theme';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/input-styles';
import './ith-patient-event-template.js'
import '../../elements/loader-view/loader-view.js';


class ithPatientEventTemplateListView extends  (PolymerElement) {
  static get template() {
    return html `
      <style include="iron-flex iron-flex-alignment iron-flex-factors">
        :host {
          display: flex;
          background-color: var(--app-background-color);
        }
        .no-event-found-view {
          background-color: var( --light-theme-background-color);
          font-size: 18px;
          color: var(--app-text-color);
          font-family: 'Roboto-Bold';
          padding: 30px 32px;
          box-shadow:  0px 3px 0px rgba(47, 48, 66, 0.15);
          margin: 26px 40px 0px 40px;
        }
        ith-patient-event-template{
          margin-bottom: 24px;
        }
        .event-template-container {
          margin: 26px 40px 0px 40px;
          overflow-y: auto;
        }
        @media (max-width: 1024px) {
        .no-event-found-view{
           padding: 20px 20px;
           margin: 26px 20px 0px 20px;
         }
         .event-template-container {
            margin: 12px 12px 0px 12px;
         }
        }
        @media (max-width: 767px) { 
          .event-template-container {
            overflow-y: initial;
          }
        }

        #event-container {
            height: 100vh;
            width: 100%;
        }
      </style>

      <template is="dom-if" if="[[_eq(_mode,'IN_PROGRESS')]]">
        <div class="loader-container">
          <loader-view></loader-view>
        </div>
      </template>
      
      <div id="event-container" class="card-content">
      <template is="dom-if" if="[[_eq(_mode,'NO_RECORD_VIEW')]]">
        <div class="no-event-found-view">
         You currently don't have any events added for this service user.
        </div>
      </template>

      <template is="dom-if" if="[[_eq(_mode,'LIST_VIEW')]]">
        <div class="event-template-container layout vertical">
          <template is="dom-repeat" items="[[eventTemplates]]">
            <ith-patient-event-template template="[[item]]" event-template="[[item]]" on-delete-templates="_delete" on-edit-templates="_edit">
            </ith-patient-event-template>
          </template>
         </div>
      </template>
      </div>
    `;
  }

  static get properties() {
    return {
      
      eventTemplates: {
        type: Object
      },

      _requestInProgress: {
        type: Boolean,
        value: false
      },

      _mode: {
        type: String,
        computed: '_computeMode(eventTemplates,_requestInProgress)'
      }
    };
  }

  connectedCallback(){
    super.connectedCallback();

  }

  _computeMode(eventTemplates, searchInProgress){
    if(searchInProgress && (!eventTemplates || !eventTemplates.length)){
      return 'IN_PROGRESS';
    }

    if(eventTemplates && eventTemplates.length){
      return 'LIST_VIEW';
    }

    return 'NO_RECORD_VIEW';
 }


  _eq(str1, str2){
    return str1 == str2;
  }

  _getEventTemplate(eventTemplateId) {
    return this._eventTemplates[eventTemplateId];
  }

   _delete(e)
    {
     console.log(e.detail.eventname+"aaaaaa");
     this.dispatchEvent(new CustomEvent('delete-eventtemplates', { detail: { 'eventname': e.detail.eventname }}));
    }

   _edit(e)
   {
     this.dispatchEvent(new CustomEvent('edit-eventtemplates', { detail: { 'eventname': e.detail.eventname,'start':e.detail.start,'end':e.detail.end,'tag':e.detail.tag,'sequence':e.detail.sequence }}));
   }
}

window.customElements.define('ith-patient-event-template-list-view', ithPatientEventTemplateListView);
