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

class TeleHealthcareFlowAssociateEventDef extends PolymerElement {
  static get template() {
    return html`
      <php-client id="client" flow="smart" flow-event="{{_postEvent}}" on-smart-network-error="_handleError" on-smart-error="_handleError" on-smart-response="_handleResponse" ></php-client>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "AssociateEventDef"
      },
       eventname: {
        type: String,
        notify: true
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
    this.dispatchEvent(new CustomEvent("associateeventdef-error", { detail: { 'error': response}}));
  }

  _handleResponse(e) {
    //var response = e.detail.responses[0];
console.log(e.detail.responses);

 var response = e.detail.responses.responses[0].message;
    var response1=e.detail.responses.responses[0].error;
    var response2=e.detail.responses.responses[0].session;
     if(response!=undefined)
     {
     
   this.dispatchEvent(new CustomEvent("associated-eventdef", { detail: { 'message': response,'eventname':this.eventname}}));
     }
    if(response1!=undefined)
     {
      console.log(response1);
      this.dispatchEvent(new CustomEvent("associateeventdef-error", { detail: { 'error': response1}}));
     }
if(response2!=undefined)
     {
     
   this.dispatchEvent(new CustomEvent("session-expired", { detail: { 'session': response2}}));
     }



  }

  associateEventDef(subscriber, ename, usedefaults,priority, action, recipients,message) {
      this.$.client._dataChanged();
      this.eventname=ename;
      this._postEvent = "associatetemplate.php";
      var postData = {};
      postData.Subscriber = subscriber;
      postData.eventName = ename;
      postData.recipients = recipients;
      postData.message = message;
 postData.deliveryType = "sms";
      if (priority == undefined) {
          priority = "1";
      }
      if (action == undefined) {
          action = "criticalalert"; //TODO:
      }

      if (usedefaults == undefined) {
          usedefaults = "0";
      }
      postData.actionName = action;
      postData.useDefaults = parseInt(usedefaults);
      postData.priority = parseInt(priority);
      console.log(subscriber+"--"+ename+"--"+usedefaults+"--"+priority+"--"+action+"--"+"--"+recipients+"--"+message);
      
      this.$.client.postSmart(postData);
  }
}

window.customElements.define('telehealthcareflow-associateeventdef', TeleHealthcareFlowAssociateEventDef);
