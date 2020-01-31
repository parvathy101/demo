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
import '../api/telehealthcareflow-assigncaretaker.js';
import '@polymer/paper-toast/paper-toast.js';

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class CaretakerAssign extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles input-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
  *{ -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; margin:0;padding:0;}
      :host {
        display: block;
        min-width: 1024px;
        top:60px;
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
      <div class="main-title">Assign New Care Giver</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <div class="card-header">
            Provide Care Giver Details
          </div>
          <div class="card-content">
            <div class="content-two">
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Email</div>
                        <input id="email" required type="email"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Name</div>
                        <input id="name" type="text" required></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Phone</div>
                        <input id="phone" type="text" required placeholder="55555 555555"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Care Giver Type</div>
                        <input id="type" required type="text"></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Priority</div>
                        <input id="priority" required type="number"></input>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button class="filledWhite" on-tap="_assignCareTaker">
        add & assign
      </paper-button>
<paper-toast id="toast"></paper-toast>
    </div>
    <telehealthcareflow-assigncaretaker id="assigncaretaker" on-assigned-caretaker="_assignedCaretaker" on-assigncaretaker-error="_error" on-session-expired="_session"></telehealthcareflow-assigncaretaker>
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
      subscriber: {
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

  _assignCareTaker() {
      var email = this.$.email.value;
      var name = this.$.name.value;
      var phone = this.$.phone.value;
      var type = this.$.type.value;
      var priority = this.$.priority.value;
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
 if(type == "")
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
   

 else if(!letter.test(type))
    {
  this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid type"
  });
}).bind(this), 100);

   
   return false;
    }
 if(priority == "")
   {
this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please select priority"
  });
}).bind(this), 100);

   
   return false;
    }



      this.$.assigncaretaker.assignCaretaker(this.subscriber, email, name, phone, type, priority);
      this.dispatchEvent(new CustomEvent('search-changed1'));
  }

  _assignedCaretaker(event) {
      var email = this.$.email.value;
      this.$.email.value=null;
      this.$.name.value=null;
      this.$.phone.value=null;
      this.$.type.value=null;
      this.$.priority.value=null;
      this.close();
      this.dispatchEvent(new CustomEvent('assigned-caretaker', { detail: { 'email': email }}));
  }

   _error(event)
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



        }
       }
      console.log(event.detail.error[0]);
     
      
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

customElements.define('caretaker-assign', CaretakerAssign);
