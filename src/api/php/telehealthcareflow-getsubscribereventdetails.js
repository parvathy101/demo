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
import '../smart/smart-client.js';
import "../smart/smart-config.js";

var ERROR = "errors";
var RESPONSES = "responses";

class TeleHealthcareFlowGetSubscriberEventDetails extends PolymerElement {
  static get template() {
    return html`
      <iron-ajax id="event" method="POST" content-type="application/json" url="http://[[server]]/php/api/getSubscriberEventDetails.php" body='{"subscriber":"[[email]]"}'  handle-as="json" on-response="_handleResponse" on-error="_handleError">

      </iron-ajax>
<smart-config id="globals"></smart-config>
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
      console.log(data.detail.response);

      var errors = data.detail.response[ERROR];
      if (errors != undefined) {
          //this._fireError(errors);
alert("undefined error");
      } else {
          var responses = data.detail.response.records;
          var response = responses;
          if ((response != undefined) && (response[ERROR] != undefined))
          {
              errors = response[ERROR];
              //this._fireError(errors);
          } else {

              //this.dispatchEvent(new CustomEvent("smart-response", { detail: { "responses" : responses } }));
this.dispatchEvent(new CustomEvent("subscriber-events", { detail: { 'data': responses }}));
          }
      }
  }

_handleError(error) {
      console.log(error);
      //this.dispatchEvent(new CustomEvent("smart-network-error", { detail: { "error" : error.detail } }));
this.dispatchEvent(new CustomEvent("get-error", { detail: { 'error': error.detail }}));
  }

  getEventdefs(email) {
this.server=this.$.globals.server; 
this.email = email;

      this.$.event.generateRequest();
  }
}

window.customElements.define('telehealthcareflow-getsubscribereventdetails', TeleHealthcareFlowGetSubscriberEventDetails);
