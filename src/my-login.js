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
import "@polymer/iron-flex-layout/iron-flex-layout-classes";
import '@polymer/paper-button/paper-button.js';
import './shared-styles/shared-styles.js';
import './shared-styles/input-styles.js';
import './shared-styles/paper-button-styles.js';
import './smart/smart-security.js';
import './smart/smart-config.js';
import './smart/smart-client.js';
import '@polymer/paper-toast/paper-toast.js';

class MyLogin extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles iron-flex iron-flex-alignment iron-positioning">
      input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
}
        :host {
          display: block;
        }
       paper-toast {
   width: 300px;
   margin-left: calc(50vw - 150px);
margin-bottom: calc(50vw - 150px);
background:#e5ebef;
color:#2f3042;
}
      </style>

      <smart-config id="globals"></smart-config>
      <smart-security id="security" user="[[user]]" password="[[password]]" on-smart-login-success="_loggedIn" on-smart-invalid-login="_error" on-smart-error-login="_errormsg"></smart-security>

      <div class="card-header">
        Login to iThingsHealth
      </div>
      <div class="card-content">
        <div class="content-single">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Service Provider</div>
                    <input id="tenant" required type="text" placeholder="Please enter your service provider code" autocomplete="off"></input>
                </div>
                <div class="element">
                    <div class="inputlabel">User Email</div>
                    <input id="email" required type="email" placeholder="Please enter your email id registered" autocomplete="off"></input>
                </div>
                <div class="element">
                    <div class="inputlabel">Password</div>
                    <input id="password" type="password" required placeholder="Please enter your password"></input>
                </div>
            </div>
        </div>
      </div>
      <div class="card-buttons layout horizontal">
          <span class="flex">&nbsp;</span>
          <paper-button class="filledWhite" on-click="_loginNow">LOGIN</paper-button>
           <paper-toast id="toast"></paper-toast>
      </div>
    `;
  }

  static get properties() {
      return {
          tenant: {
              type: String,
          },
          user: {
              type: String,
          },
          password: {
              type: String,
          }
      };
  }

  _loginNow() {
      this.tenant = this.$.tenant.value;
      this.$.globals.tenant = this.tenant;
      this.user = this.$.email.value;
      this.password = this.$.password.value;
     
       this.$.globals.userId = this.user;
      this.$.security.loginSmart();
  }

  _loggedIn(event) {
      console.log(event);
      

      this.dispatchEvent(new CustomEvent("login-success", { detail: { "sessionId": event.detail.sessionId, "userId": event.detail.userId } }));
  } 
   _error(event){


      
      var toast = this.$.toast;
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid Username or Password."
  });
      
}

_errormsg(event){
      
      var toast = this.$.toast;
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid User Credentials or Internal Error"
  });
      
}


  
}

window.customElements.define('my-login', MyLogin);
