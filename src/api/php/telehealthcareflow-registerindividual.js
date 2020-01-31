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

class TeleHealthcareFlowRegisterIndividual extends PolymerElement {
  static get template() {
    return html`
      <iron-ajax 
      id="poster" 
      method="POST" 
      content-type="application/json" 
      url="http://178.128.165.237/php/api/smart/registerindividual.php"
             
              body='{"email":"[[email]]","name":"[[name]]","phone":"[[phone]]","street1":"[[street1]]","street2":"[[street2]]","pincode":"[[pincode]]","city":"[[city]]","state":"[[state]]","country":"[[country]]","latitude":"[[latitude]]","longitude":"[[longitude]]" }' handle-as="json" 
on-response="_handleResponse" 
on-error="_handleError">
      </iron-ajax>
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
      },
      name: {
          type: String
      },
      phone: {
          type: String
      },
      street1: {
          type: String
      },
      street2: {
          type: String
      },
      pincode: {
          type: String
      },
      city: {
          type: String
      },
       state: {
          type: String
      },
      country: {
          type: String
      },
      latitude: {
          type: String
      },
      longitude: {
          type: String
      }
     
      
    
    };
  }

  constructor() {
      super();
  }

  _handleError(e) {
     alert(e.detail.response.responses[0].error+"sssds");
      var response = e.detail.response.responses[0].error;
      console.log(response+"sssdd");
     /* if (e.detail.responses != undefined) {
        response = e.detail.responses[0];
      } else if (e.detail.error != undefined) {
          response = e.detail.error;
      }*/
    this.dispatchEvent(new CustomEvent("createuser-error", { detail: { 'error': response}}));
  }

  _handleResponse(e) {
    
    var response = e.detail.response.responses[0].message;
    var response1=e.detail.response.responses[0].error;
   
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
      this.name=name;
      this.phone=phone;
      this.street1=s1;
      this.street2=s2;
      this.pincode=pc;
      this.city=c;
      this.state=st;
      this.country=con;
      this.latitude=lat;
      this.longitude=lng;
      this.$.poster.generateRequest();

     /*this.$.client._dataChanged();
      this._postEvent = "RegisterIndividual";
      var postData = {};
      postData.emailId = email;
      postData.name = name;
      postData.phone = phone;
      postData.facilityAddress = {};
      postData.facilityAddress.street1 = s1;
      postData.facilityAddress.street2 = s2;
      postData.facilityAddress.pincode = pc;
      postData.facilityAddress.city = c;
      postData.facilityAddress.state = st;
      postData.facilityAddress.country = con;
      postData.latitude = lat;
      postData.longitude = lng;

      var postTo = {};
      postTo['FlowAdmin'] = "TeleHealthcareFlow";

      this.$.client.postSmart(postTo, postData);*/
  }

   
}

window.customElements.define('telehealthcareflow-registerindividual', TeleHealthcareFlowRegisterIndividual);
