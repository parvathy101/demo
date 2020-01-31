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

class TeleHealthcareFlowEventHistory extends PolymerElement {
  static get template() {
    return html`
      <php-client id="client" flow="smart" flow-event="{{_postEvent}}" on-smart-network-error="_handleError" on-smart-error="_handleError" on-smart-response="_handleResponse" ></php-client>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "EventHistory"
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
    

       var response=e.detail.responses.records[0].countVal;
    
    
     if(response!=undefined)
     {
     console.log(response);
   this.dispatchEvent(new CustomEvent("get-eventhistory", { detail: { 'countVal': response }}));
     }
    if(response==undefined)
     {
var response2=e.detail.responses.responses[0].session;
      console.log(response2);
      if(response2!=undefined)
     {
     
   this.dispatchEvent(new CustomEvent("session-expired", { detail: { 'session': response2}}));
     }
     }



  }

  getEventHistory(email) {
      this.$.client._dataChanged();
alert(email);
      this._postEvent = "getEventHistory3.php";
      var postData = {};
      postData.subscriber = email;
      this.$.client.postSmart(postData);
  }
}

window.customElements.define('telehealthcareflow-eventhistory', TeleHealthcareFlowEventHistory);
