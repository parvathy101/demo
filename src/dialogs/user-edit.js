
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-dialog-behavior/paper-dialog-shared-styles';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import { PaperDialogBehavior } from '@polymer/paper-dialog-behavior/paper-dialog-behavior';

import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';
import '../shared-styles/shared-styles';
import '../shared-styles/input-styles';
import '../shared-styles/add-event-param-styles';
import '../api/telehealthcareflow-edittecuser.js';
import '../api/telehealthcareflow-lookup.js';
import '@polymer/paper-toast/paper-toast.js';
import '../smart/smart-config.js';

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class UserEdit extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
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
 if($('#role').selected)
    </style>
    <div class="layout horizontal center main-header">
      <div class="main-title">Edit User</div>
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
                        <div class="inputlabel">User Email</div>
                        <input id="email" required type="email" value="[[profile.profileId]]" readonly></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Name<span>*</span></div>
                        <input id="name" type="text" required value="[[profile.name]]"></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Phone<span>*</span></div>
                        <input id="phone" type="text" required value="[[profile.phone]]" placeholder="55555 555555"></input>
                    </div>
                    <div class="element">
                        <paper-radio-group id="role" selected="[[profile.role]]">
                            <paper-radio-button name="tecassessor">TEC Assessor</paper-radio-button>
                            <paper-radio-button name="techassistant">Technical Assistant</paper-radio-button>
                        </paper-radio-group>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button  class="filledWhite" on-tap="_editTECUser">
        Save
      </paper-button>
<paper-toast id="toast"></paper-toast>
    </div>
    <telehealthcareflow-edittecuser id="edituser" on-edited-user="_editedUser" on-session-expired="_session"></telehealthcareflow-edittecuser>
    <telehealthcareflow-lookup id="lookup" on-lookup-error="_showError" on-lookup-success="_setupUser" on-session-expired="_session"></telehealthcareflow-lookup>
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
 return {
        profile: {
            type: Object
        },
        email: {
            type: String
        }
      };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-overlay-closed', this._closeDialog);
  }

  _closeDialog() {
  }
 _setupUser(event) {
      if (event.detail.object != undefined) {
          this.profile = event.detail.object.result[0];
      }
  }
  _editTECUser() {
      var spname = this.$.globals.tenant;
      var email = this.$.email.value;
      var name = this.$.name.value;
      var phone = this.$.phone.value;
      var role = this.$.role.selected;
       var letter=/^[A-Za-z\. ]+$/;
      var number=/^[0-9 ]{12}$/;
   var toast = this.$.toast;

       

  if(name == "")
   {

  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });


   
   return false;
   }
   

 else if(!letter.test(name))
    {
  
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid name"
  });


   
   return false;
    }

  if(phone == "")
   {

 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });


   
  
  return false;
    }
   
 else if(!number.test(phone))
    {
  
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid phone number"
  });


   
   return false;
     
    }
       console.log(name+"-----"+phone);
      this.$.edituser.edittecuser(spname, email, name, phone, role);
 this.dispatchEvent(new CustomEvent('search-changed2'));
  }

  _editedUser(event) {
      var email = this.$.email.value;
      this.$.email.value=null;
      this.$.name.value=null;
      this.$.phone.value=null;
      this.$.role.selected='tecassessor';
      this.close();
      this.dispatchEvent(new CustomEvent('user-edited', { detail: { 'email': email }}));
  }
loadData(email,name,phone,role) {
     
     // this.$.lookup.lookup("Profile", email);
      this.$.email.value=email;
      this.$.name.value=name;
      this.$.phone.value=phone;
      this.$.role.selected=role;
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

customElements.define('user-edit', UserEdit);
