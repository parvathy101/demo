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
import '@polymer/paper-button/paper-button.js';
import './shared-styles/shared-styles.js';
import './shared-styles/input-styles.js';
import './shared-styles/paper-button-styles.js';
import './api/telehealthcareflow-lookup.js';
import './smart/smart-config.js';
import '@polymer/paper-toast/paper-toast.js';

class AccountPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles">
        :host {
          display: block;
        }

span
{
color:red;
}
paper-toast {
        width: 300px;
        margin-left: calc(50vw - 150px);
        margin-bottom: calc(50vw - 150px);
        background:#e5ebef;
        color:#2f3042;
      }
 
      </style>

      <div class="content-title">
        <h2>My Account</h2>
      </div>
      <div class="card-header">
        Account Details
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                     <div class="inputlabel">User Email:</div>
              
                        <div class="readonlylabel">[[email]]</div>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                     <div class="inputlabel">Name:</div>
           
                        <div class="readonlylabel">[[profile.name]]</div>
                </div>
            </div>
            <div class="row">
                <div class="element">
                   <div class="inputlabel">Phone:</div>
                     
                        <div class="readonlylabel">[[profile.phone]]</div>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Role:</div>
                       <div class="readonlylabel">[[role]]</div>
                </div>
            </div>
            
        </div>
        <paper-toast id="toast"></paper-toast>
      </div>
      

      <smart-config id="globals"></smart-config>

  <telehealthcareflow-lookup id="lookup" on-lookup-error="_showError" on-lookup-success="_setupUser" on-session-expired="_session"></telehealthcareflow-lookup>
    `;
  }


  static get properties() {
      return {
        profile: {
            type: Object
        },
        email: {
            type: String
        },
       role:{
            type: String
           },
      sprofile: {
            type: Object
        },
      };
  }

 _setupUser(event) {
      // console.log(event.detail.object.result[0]);
       if(this.role=='tecadmin')
        {
         this.profile=event.detail.object.result[0].primaryContact;
          this.role='tecadmin';
          this.email=event.detail.object.result[0].primaryContact.email;
        }
        else
       {
          this.profile = event.detail.object.result[0];
           this.role=this.profile.role;
            this.email=this.profile.profileId;
       }
  }
  _setup(event) {
  
      console.log(event);
}
  _showError(event) {
      console.log(event.detail.error);
  }

  loadData(id,role) {
       console.log(role);

    
   
      if(role=='tecadmin')
       { 
       this.role=role;
       this.$.lookup.lookup("ServiceProvider",'sptest');
       }
      else
       {
      this.$.lookup.lookup("Profile",id);
       }
  }

_session(event)
{
 var session = event.detail.session;
  
    if (session != undefined) 
        {
        if (session.startsWith("Session Expired"))
          {


             var toast = this.$.toast;
             
 		 toast.show({
  			  horizontalAlign: 'left',
  			  verticalAlign: 'bottom',
  			  duration: 10000,
  			  text: "Session Expired. Please login again"
 			 });

                 return false;
  	  }

        }
}


}



window.customElements.define('my-account', AccountPage);
