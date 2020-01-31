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
import '../api/telehealthcareflow-registerindividual.js';
import '@polymer/paper-toast/paper-toast.js';

import "../smart/smart-config.js";

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class SubscriberAdd extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles input-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
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
      <div class="main-title">Add Service User</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <div class="card-header">
            Service User Details
          </div>
          <div class="card-content">
            <div class="content-two">
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Email</div>
                        <input id="email" required type="email" placeholder="Please enter the service user email"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Name</div>
                        <input id="name" type="text" required placeholder="Please enter the service user name"></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Phone</div>
                        <input id="phone" type="text" required placeholder="55555 555555"></input>
                    </div>
                </div>
            </div>
          </div>
          <div class="card-header">
            Service User Address
          </div>
          <div class="card-content">
            <div class="content-two">
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">House Number/name</div>
                        <input id="street1" required type="text" placeholder="Please enter house number/name"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Street2</div>
                        <input id="street2" type="text" placeholder="Please enter street location"></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Postcode</div>
                        <input id="pincode" type="text" required placeholder="Please enter the postcode"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">City</div>
                        <input id="city" type="text" required placeholder="Please enter city"></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">County</div>
                        <input id="state" type="text" required placeholder="Please enter the county"></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Country</div>
                        <input id="country" type="text" required placeholder="Please enter the country"></input>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button class="filledWhite" on-tap="_registerIndividual">
        add service user
      </paper-button>
      <paper-toast id="toast"></paper-toast>
    </div>
    <telehealthcareflow-registerindividual id="register" on-registered-individual="_createdServiceUser" on-createuser-error="_error" on-session-expired="_session"></telehealthcareflow-registerindividual>
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

  _registerIndividual() {
      var email = this.$.email.value;
      var name = this.$.name.value;
      var phone = this.$.phone.value;
      var s1 = this.$.street1.value;
      var s2 = this.$.street2.value;
      var pc = this.$.pincode.value;
      var c = this.$.city.value;
      var st = this.$.state.value;
      var con = this.$.country.value;
      var lat = 12.6; //TODO:
      var lng = 75.6; //TODO:
     var toast = this.$.toast;
     var pcreg=/^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi; 
     //var pcreg=/^((?!(0))[0-9]{6})$/;
     var letter=/^[A-Za-z\. ]+$/;
     var number=/^[0-9 ]{12}$/;
     var mail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

 

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

 if(!letter.test(name))
    {
 
  this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid Name"
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

  if(!number.test(phone))
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

   if(s1 == "")
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

 if(pc == "")
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

 if(!pcreg.test(pc))
    {
      
 this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid postcode"
  });
}).bind(this), 100);


   
   return false;
    }

  if(c == "")
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

   if(!letter.test(c))
    {
  
  this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid city"
  });
}).bind(this), 100);


   
   return false;
    }

  if(st == "")
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

  if(!letter.test(st))
    {
 
 this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid county"
  });
}).bind(this), 100);


   
   return false;
    } 

  if(con == "")
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

 if(!letter.test(con))
    {
 
  this.async((function() { 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid country"
  });
}).bind(this), 100);
   
   return false;
    }




      this.$.register.registerIndividual(email, name, phone, s1, s2, pc, c, st, con, lat, lng);
      this.dispatchEvent(new CustomEvent('search-changed1'));
      
  }

  _createdServiceUser(event) {
      var email = this.$.email.value;
        this.$.email.value=null;  
        this.$.name.value=null;
        this.$.phone.value=null;
        this.$.street1.value=null;
        this.$.street2.value=null;
        this.$.pincode.value=null;
        this.$.city.value=null;
        this.$.state.value=null;
        this.$.country.value=null;
      this.close();
      this.dispatchEvent(new CustomEvent('serviceuser-created', { detail: { 'email': email }}));
  }



   _error(event)
{
 var error = event.detail.error;
  
    if (error != undefined) 
        {
        if (error.startsWith("Already"))
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

customElements.define('subscriber-add', SubscriberAdd);
