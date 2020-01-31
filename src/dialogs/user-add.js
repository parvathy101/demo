
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-dialog-behavior/paper-dialog-shared-styles';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import { PaperDialogBehavior } from '@polymer/paper-dialog-behavior/paper-dialog-behavior';
import '@polymer/paper-toast/paper-toast.js';

import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';
import '../shared-styles/shared-styles';
import '../shared-styles/input-styles';
import '../shared-styles/add-event-param-styles';
import '../api/telehealthcareflow-createtecuser.js';
import '../smart/smart-config.js';

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class UserAdd extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles input-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
      :host {
        display: block;
        min-width: 1024px;
        top:60px;
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
      @media (min-width:992px)and (max-width:1200px){
        :host{
          min-width:800px;
        }
      }
      @media (min-width:641px) and (max-width:991px){
        :host{
          min-width:600px;
        }
      }
      @media (max-width:640px){
        :host{
          min-width:300px;
        }
      }
    </style>
    <div class="layout horizontal center main-header">
      <div class="main-title">Add User</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <div class="card-header">
            Provide User Details
          </div>
          <div class="card-content">
            <div class="content-single">
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">User Email<span>*</span></div>
                        <input id="email" required type="email"></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Name<span>*</span></div>
                        <input id="name" type="text" required></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Phone<span>*</span></div>
                        <input id="phone" type="text" required><span id="error_msg2" placeholder="55555 555555"></span></input>
                    </div>
                    <div class="element">
                        <paper-radio-group id="role" selected="tecassessor"></span>
                            <paper-radio-button name="tecassessor">TEC Assessor</paper-radio-button>
                            <paper-radio-button name="techassistant">Technical Assistant</paper-radio-button>
                        </paper-radio-group></span>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button class="filledWhite" on-tap="_createTECUser">
        add user
      </paper-button>
<paper-toast id="toast"></paper-toast>
    </div>
    <telehealthcareflow-createtecuser id="createuser" on-created-user="_createdUser" on-createuser-error="_errCreateUser" on-session-expired="_session"></telehealthcareflow-createtecuser>
    <smart-config id="globals"></smart-config>
   `;
  }

  static get properties() {
    return {
      _dialogElement: {
        type: Object,
        value: function() {
          return this;
        }
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-overlay-closed', this._closeDialog);
  }

  _closeDialog() {
  }

  _createTECUser() {
      var spname = this.$.globals.tenant;
      var email = this.$.email.value;
      var name = this.$.name.value;
      var phone = this.$.phone.value;
      var role = this.$.role.selected;
       var letter=/^[A-Za-z\. ]+$/;
      var number=/^[0-9 ]{12}$/;
      var mail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var toast = this.$.toast;

       if(email == "")
   {
this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });
}).bind(this), 100);

   
   return false;
    }
    
 else if(!mail.test(email))
    {
  this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid email"
  });
}).bind(this), 100);

  return false;     
    }
   if(name == "")
   {
this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });
}).bind(this), 100);

   
   return false;
   }
   

 else if(!letter.test(name))
    {
  this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid name"
  });
}).bind(this), 100);

   
   return false;
    }

  if(phone == "")
   {

  this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });
}).bind(this), 100);

   
  
  return false;
    }
   
 else if(!number.test(phone))
    {
  this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid phone number"
  });
}).bind(this), 100);

   
   return false;
     
    }
   
   
  this.$.createuser.createtecuser(spname, email, name, phone, role);

 this.dispatchEvent(new CustomEvent('search-changed1'));
  }

  _createdUser(event) {
      var email = this.$.email.value;
      this.$.email.value=null;
      this.$.name.value=null;
      this.$.phone.value=null;
      this.$.role.selected="tecassessor";
      
      this.close();
      this.dispatchEvent(new CustomEvent('user-created', { detail: { 'email': email }}));
  }

_errCreateUser(event)
{
 var error = event.detail.error;
    if (error != undefined) 
        {
        if (error.startsWith("Already exist."))
          {


             var toast = this.$.toast;
             
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 10000,
    text: "Existing mailId."
  });


   
   return false;
    }



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

customElements.define('user-add', UserAdd);
