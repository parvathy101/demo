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


var ERROR = "errors";
var RESPONSES = "responses";

class TeleHealthcareFlowGetSubscriberEventDetails extends PolymerElement {
  static get template() {
    return html`


 <php-client id="client" flow="smart" flow-event="{{_postEvent}}" on-smart-network-error="_handleError" on-smart-error="_handleError" on-smart-response="_handleResponse" ></php-client>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "GetSubscriberEventDefs"
      },
email: {
type: String
},
      server: {
            type: String
        }
    };
  }

  constructor() {
      super();
  }

  
  _handleResponse(data) {
      console.log(data.detail.responses);

      
          var responses = data.detail.responses.records;
          var response = responses;
          if ((response != undefined) )
          {
             
this.dispatchEvent(new CustomEvent("subscriber-events", { detail: { 'data': responses }}));
          }
      }
  

_handleError(error) {
      console.log(error);
      //this.dispatchEvent(new CustomEvent("smart-network-error", { detail: { "error" : error.detail } }));
this.dispatchEvent(new CustomEvent("get-error", { detail: { 'error': error.detail }}));
  }

  getEventdefs(email) {
      this.$.client._dataChanged();
      this._postEvent = "getSubscriberEventDetails.php";
      var postData = {};
      postData.subscriber=email;

      this.$.client.postSmart(postData);
  }
}

window.customElements.define('telehealthcareflow-getsubscribereventdetails', TeleHealthcareFlowGetSubscriberEventDetails);
