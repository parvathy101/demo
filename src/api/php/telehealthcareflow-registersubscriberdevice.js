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

class TeleHealthcareFlowRegisterSubscriberDevice extends PolymerElement {
  static get template() {
    return html`
  <iron-ajax 
      id="poster1" 
      method="POST" 
      content-type="application/json" 
      url="http://178.128.165.237/php/api/smart/registerdevice.php"             	 body='{"subscriber":"[[subscriber]]","deviceId":"[[deviceId]]","deviceType":"[[deviceType]]","connectionKey":"[[connectionKey]]","tag":"[[tag]]" }' 
on-response="_handleResponse" 
on-error="_handleError">
      </iron-ajax>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "RegisterSubscriberDevice"
      },
      subscriber: {
          type: String
      },
      deviceId: {
          type: String
      },
      deviceType: {
          type: String
      },
      connectionKey: {
          type: String
      },
      tag: {
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
    this.dispatchEvent(new CustomEvent("registerdevice-error", { detail: { 'error': response}}));
  }

  _handleResponse(e) {
    
    
   var response = e.detail.response.responses[0].message;
    var response1=e.detail.response.responses[0].error;
   
    if(response!=undefined)
     {
     
   this.dispatchEvent(new CustomEvent("registered-device", { detail: { 'message': response }}));
     }
    if(response1!=undefined)
     {

       this.dispatchEvent(new CustomEvent("registerdevice-error", { detail: { 'error': response1}}));
     }



  }

  registerSubscriberDevice(subscriber, did, dtype, conn, tag) {


     this.subscriber=subscriber;
     this.deviceId=did;
     this.deviceType=dtype;
     this.connectionKey=conn;
     this.tag=tag;
     
     this.$.poster1.generateRequest();

     /* this.$.client._dataChanged();
      this._postEvent = "RegisterSubscriberDevice";
      var postData = {};
      postData.deviceId = did;
      postData.deviceType = dtype;
      postData.connectionKey = conn;
      postData.tag = tag;

      var postTo = {};
      postTo['Subscriber'] = subscriber;

      this.$.client.postSmart(postTo, postData);*/
  }
}

window.customElements.define('telehealthcareflow-registersubscriberdevice', TeleHealthcareFlowRegisterSubscriberDevice);
