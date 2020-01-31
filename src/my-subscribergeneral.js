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
import '@polymer/paper-toast/paper-toast.js';
import './shared-styles/shared-styles.js';
import './shared-styles/input-styles.js';
import './shared-styles/paper-button-styles.js';
import './api/telehealthcareflow-getsubscriberdetails.js';
import './api/telehealthcareflow-editregisterindividual.js';
import '@polymer/paper-toast/paper-toast.js';

class MySubscriberGeneral extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles">
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

      <div class="content-title" id="heading">
        <h2>Edit Service User Details</h2>
      </div>
      <div class="card-header">
        Service User Details
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Email</div>
                    <div class="readonlylabel">[[subscriber.email]]</div>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Name</div>
                    <input id="name" required type="text" value="[[subscriber.name]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Phone</div>
                    <input id="phone" type="text" required value="[[subscriber.phone]]" placeholder="55555 555555"></input>
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
                    <input id="street1" required type="text" value="[[subscriber.facilityAddress.street1]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Street2</div>
                    <input id="street2" type="text" required value="[[subscriber.facilityAddress.street2]]"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Postcode</div>
                    <input id="pincode" required type="text" value="[[subscriber.facilityAddress.pincode]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">City</div>
                    <input id="city" type="text" required value="[[subscriber.facilityAddress.city]]"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">County</div>
                    <input id="state" required type="text" value="[[subscriber.facilityAddress.state]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Country</div>
                    <input id="country" type="text" required value="[[subscriber.facilityAddress.country]]"></input>
                </div>
            </div>
        </div>
      </div>
      <div class="card-buttons layout horizontal">
          <span class="flex">&nbsp;</span>
           <paper-button class="filledWhite" on-tap="_Edit">SAVE</paper-button>
          <paper-toast id="toast"></paper-toast>
      </div>
      <telehealthcareflow-getsubscriberdetails id="getdetails" on-subscriber-details="_setupSubscriber" on-session-expired="_session"></telehealthcareflow-getsubscriberdetails>
   <telehealthcareflow-editregisterindividual id="edit" on-editregistered-individual="_editedServiceUser" on-session-expired="_session"></telehealthcareflow-editregisterindividual>
    `;
  }

  static get properties() {
      return {
        subscriber: {
            type: Object
        },
        email: {
            type: String
        }
      };
  }

  _setupSubscriber(event) {
      if (event.detail.data != undefined) {
          this.subscriber = event.detail.data;
      }
  }

  _showError(event) {
      console.log(event.detail.error);
  }

  loadData(email) {
    this.email = email;
    this.$.heading.focus();
    this.$.getdetails.getDetails(email);
    
  }
_Edit()
    {

      var email =this.email;
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

 if(!letter.test(name))
    {
 
  
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid Name"
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

  if(!number.test(phone))
    {
 
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid phone number"
  });


   
   return false;
    }

   if(s1 == "")
    {
   

  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });


   return false;
    }

 if(pc == "")
   {
  
  
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });



   
   return false;
    }

 if(!pcreg.test(pc))
    {
      

  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid postcode"
  });



   
   return false;
    }

  if(c == "")
   {

  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });



   
   return false;
    }

   if(!letter.test(c))
    {
  
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid city"
  });



   
   return false;
    }

  if(st == "")
   {

  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });

   
   return false;
    }

  if(!letter.test(st))
    {
 

  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid county"
  });



   
   return false;
    } 

  if(con == "")
   {

  
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });



   
   return false;
    }

 if(!letter.test(con))
    {
 
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid country"
  });

   
   return false;
    }

      this.$.edit.editregisterIndividual(email, name, phone, s1, s2, pc, c, st, con, lat, lng);


    }
 _editedServiceUser(event) {
     // var email = this.$.email.value;
      var toast = this.$.toast;
      console.log(event);
      toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Successfully Updated."
  });

      this.close();
      this.dispatchEvent(new CustomEvent('serviceuser-edited', { detail: { 'email': this.email }}));
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

window.customElements.define('my-subscribergeneral', MySubscriberGeneral);
