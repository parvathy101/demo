/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles/shared-styles.js';
import '../smart/php-client.js';

class TeleHealthcareFlowDeleteEventTemplate extends PolymerElement {
  static get template() {
    return html`
      <php-client id="client" flow="smart" flow-event="{{_postEvent}}" on-smart-network-error="_handleError" on-smart-error="_handleError" on-smart-response="_handleResponse" ></php-client>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "DeleteEventTemplate"
      },
    };
  }

  constructor() {
      super();
  }

  _handleError(e) {
      var response = "";
      if (e.detail.responses != undefined) {
        response = e.detail.responses[0];
      } else if (e.detail.error != undefined) {
          response = e.detail.error;
      }
    this.dispatchEvent(new CustomEvent("deleteeventtemplate-error", { detail: { 'error': response}}));
  }

  _handleResponse(e) {
    
        console.log(e.detail);
       var response = e.detail.responses.responses[0].message;
    var response1=e.detail.responses.responses[0].error;
    var response2=e.detail.responses.responses[0].session;
     if(response!=undefined)
     {
     console.log(response);
   this.dispatchEvent(new CustomEvent("deleted-eventtemplate", { detail: { 'status': response }}));
     }
    if(response1!=undefined)
     {
      console.log(response1);
      this.dispatchEvent(new CustomEvent("deleteeventtemplate-error", { detail: { 'error': response1}}));
     }

if(response2!=undefined)
     {
     
   this.dispatchEvent(new CustomEvent("session-expired", { detail: { 'session': response2}}));
     }

  }

  deleteEventTemplate(evt,email) {
      this.$.client._dataChanged();
      this._postEvent = "deleteSubscriberEvent.php";
      var postData = {};
      postData.eventName = evt;
      postData.subscriber = email;
      this.$.client.postSmart(postData);
  }
}

window.customElements.define('telehealthcareflow-deleteeventtemplate', TeleHealthcareFlowDeleteEventTemplate);
