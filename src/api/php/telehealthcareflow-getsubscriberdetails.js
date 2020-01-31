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

class TeleHealthcareFlowGetSubscriberDetails extends PolymerElement {
  static get template() {
    return html`
      <iron-ajax 
                 auto id="ajax"
                 url="http://178.128.165.237/php/api/smart/getSubscriberDetails.php"
                 body='{"subscriber":"[[email]]"}'
                 last-response="{{response}}"
                  on-response="handleResponse"
                 method="post"
                  handle-as="json"
                 content-type="application/json"
              > </iron-ajax>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "GetSubscriberDetails"
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
    this.dispatchEvent(new CustomEvent("get-error", { detail: { 'error': response }}));
  }

  handleResponse(e) {
      
    var response = e.detail.response[0];
    console.log(response);
    this.dispatchEvent(new CustomEvent("subscriber-details", { detail: { 'data': response }}));
  }

  getDetails(email) {
    
     this.email=email;
    /*  this.$.client._dataChanged();
      this._postEvent = "GetSubscriberDetails";
      var postData = {};
      var postTo = {};
      postTo['Subscriber'] = email;

      this.$.client.postSmart(postTo, postData);*/
  }
}

window.customElements.define('telehealthcareflow-getsubscriberdetails', TeleHealthcareFlowGetSubscriberDetails);
