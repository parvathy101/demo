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

class TeleHealthcareFlowEditRegisterIndividual extends PolymerElement {
  static get template() {
    return html`
      <smart-client id="client" flow="TeleHealthcareFlow" flow-event="{{_postEvent}}" on-smart-network-error="_handleError" on-smart-error="_handleError" on-smart-response="_handleResponse" ></smart-client>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "EditRegisterIndividual"
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
        response = e.detail.responses[0];
      } else if (e.detail.error != undefined) {
          response = e.detail.error;
      }
    this.dispatchEvent(new CustomEvent("edituser-error", { detail: { 'error': response}}));
  }

  _handleResponse(e) {
    var response = e.detail.responses[0];
    this.dispatchEvent(new CustomEvent("editregistered-individual", { detail: { 'message': response, 'email': this.email }}));
  }

  editregisterIndividual(email, name, phone, s1, s2, pc, c, st, con, lat, lng) {
      this.email = email;
      var facilityName=email+"-facility";
      this.$.client._dataChanged();
      this._postEvent = "EditRegisterIndividual";
      var postData = {};
      postData.emailId = email;
      postData.name = name;
      postData.phone = phone;
       var postData1 = {};
      postData1.facilityAddress = {};
      postData1.facilityAddress.street1 = s1;
      postData1.facilityAddress.street2 = s2;
      postData1.facilityAddress.pincode = pc;
      postData1.facilityAddress.city = c;
      postData1.facilityAddress.state = st;
      postData1.facilityAddress.country = con;
      postData1.latitude = lat;
      postData1.longitude = lng;
      //postData.facilityName = facilityName;

      var postTo = {};
      postTo['Subscriber'] = email;

            var postTo1 = {};
      postTo1['Facility'] =facilityName ;



      this.$.client.postSmart(postTo, postData);
       this.$.client.postSmart(postTo1, postData1);
   //  console.log('http://127.0.0.1:8000/update.php?mail='+this.email+'&street1='+s1+'&street2='+s2+'&pincode='+pc+'&city='+c+'&state='+st+'&country='+con+'&latitude='+lat+'&longitude='+lng+'');
    //window.location = 'http://127.0.0.1:8000/update.php?mail='+this.email+'&street1='+s1+'&street2='+s2+'&pincode='+pc+'&city='+c+'&state='+st+'&country='+con+'&latitude='+lat+'&longitude='+lng+'';
   
     
  }
}

window.customElements.define('telehealthcareflow-editregisterindividual', TeleHealthcareFlowEditRegisterIndividual);
