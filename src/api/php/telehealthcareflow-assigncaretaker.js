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

class TeleHealthcareFlowAssignCaretaker extends PolymerElement {
  static get template() {
    return html`
       <iron-ajax 
      id="poster1" 
      method="POST" 
      content-type="application/json" 
      url="http://178.128.165.237/php/api/smart/registercaregiver.php"             	 body='{"subscriber":"[[subscriber]]","email":"[[email]]","name":"[[name]]","phone":"[[phone]]","type":"[[type]]","priority":"[[priority]]" }' 
on-response="_handleResponse" 
on-error="_handleError">
      </iron-ajax>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "AssignCaretaker"
      },
      subscriber: {
          type: String
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
      type: {
          type: String
      },
      priority: {
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
    this.dispatchEvent(new CustomEvent("assigncaretaker-error", { detail: { 'error': response}}));
  }

  _handleResponse(e) {
  
     var response = e.detail.response.responses[0].message;
    var response1=e.detail.response.responses[0].error;
   
    if(response!=undefined)
     {
      
   this.dispatchEvent(new CustomEvent("assigned-caretaker", { detail: { 'message': response }}));
     }
    if(response1!=undefined)
     {

      
       this.dispatchEvent(new CustomEvent("assigncaretaker-error", { detail: { 'error': response1}}));
     }




  }

  assignCaretaker(subscriber, email, name, phone, type, priority) {


     this.subscriber=subscriber;
     this.email=email;
     this.name=name;
     this.phone=phone;
     this.type=type;
     this.priority=priority;
     this.$.poster1.generateRequest();
     
  }
}

window.customElements.define('telehealthcareflow-assigncaretaker', TeleHealthcareFlowAssignCaretaker);
