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

class TeleHealthcareFlowRegisterIndividual extends PolymerElement {
  static get template() {
    return html`
       <php-client id="client" flow="smart" flow-event="{{_postEvent}}" on-smart-network-error="_handleError" on-smart-error="_handleError" on-smart-response="_handleResponse" ></php-client>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "RegisterIndividual"
      },
      email: {
          type: String
      }
    };
  }

  constructor() {
      super();
  }

  _handleError(e) {
      var response = "";
      if (e.detail.responses != undefined) {
        response = e.detail.responses[0].error;
      }
    this.dispatchEvent(new CustomEvent("createuser-error", { detail: { 'error': response}}));
  }

  _handleResponse(e) {
    var response = e.detail.responses.responses[0].message;
    var response1=e.detail.responses.responses[0].error;
   
    if(response!=undefined)
     {
    this.dispatchEvent(new CustomEvent("registered-individual", { detail: { 'message': response, 'email': this.email }}));
     }
    if(response1!=undefined)
     {
      this.dispatchEvent(new CustomEvent("createuser-error", { detail: { 'error': response1}}));
     }
  }

  registerIndividual(email, name, phone, s1, s2, pc, c, st, con, lat, lng) {
      this.email = email;
      this.$.client._dataChanged();
        
     this._postEvent = "registerindividual.php";
      var postData = {};
      postData.email = email;
      postData.name = name;
      postData.phone = phone;
      postData.street1 = s1;
      postData.street2 = s2;
      postData.pincode = pc;
      postData.city = c;
      postData.state = st;
      postData.country = con;
      postData.latitude = lat;
      postData.longitude = lng;
     


      this.$.client.postSmart(postData);
  }

   
}

window.customElements.define('telehealthcareflow-registerindividual', TeleHealthcareFlowRegisterIndividual);
