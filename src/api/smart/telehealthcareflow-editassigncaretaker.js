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

class TeleHealthcareFlowEditAssignCaretaker extends PolymerElement {
  static get template() {
    return html`
      <smart-client id="client" flow="TeleHealthcareFlow" flow-event="{{_postEvent}}" on-smart-network-error="_handleError" on-smart-error="_handleError" on-smart-response="_handleResponse" ></smart-client>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "EditAssignCaretaker"
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
    this.dispatchEvent(new CustomEvent("editassigncaretaker-error", { detail: { 'error': response}}));
  }

  _handleResponse(e) {
    var response = e.detail.responses[0];
    this.dispatchEvent(new CustomEvent("editassigned-caretaker", { detail: { 'message': response }}));
  }

  editassignCaretaker(subscriber, email, name, phone, type, priority,takerid) {
      this.$.client._dataChanged();
      this._postEvent = "EditAssignCaretaker";
      var postData = {};
      postData.email = email;
      postData.name = name;
      postData.phone = phone;
     // var postData1 = {};
      postData.caretaker = phone;
      postData.Subscriber_mail=subscriber;
      postData.type = type;
      postData.priority = parseInt(priority);
      postData.aCaretakerId = takerid;
      var postTo = {};
      postTo['Subscriber'] = subscriber;
      
  //  var postTo1= {};
   // postTo1['AssignedCareTaker'] = takerid;
      
      this.$.client.postSmart(postTo, postData);
      //this.$.client.postSmart(postTo1, postData1);
  }
}

window.customElements.define('telehealthcareflow-editassigncaretaker', TeleHealthcareFlowEditAssignCaretaker);
