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
import './api/telehealthcareflow-setupserviceprovider.js';
import './smart/smart-config.js';
import '@polymer/paper-toast/paper-toast.js';

class MyProviderDetails extends PolymerElement {
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
        <h2>Edit Service Provider Details</h2>
      </div>
      <div class="card-header">
        Service Provider Address
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">House Number/Name</div>
                    <input id="street1" required type="text" value="[[provider.address.street1]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Street2</div>
                    <input id="street2" type="text" required value='[[provider.address.street2]]'></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Postcode</div>
                    <input id="pincode" required type="text" value="[[provider.address.pincode]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">City</div>
                    <input id="city" type="text" required value="[[provider.address.city]]"></input>
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">County</div>
                    <input id="state" required type="text" value="[[provider.address.state]]"></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Country</div>
                    <input id="country" type="text" required value="[[provider.address.country]]"></input>
                </div>
            </div>
        </div>
      </div>
      <div class="card-header">
        Primary Contact
      </div>
      <div class="card-content">
        <div class="content-two">
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Service Provider Name</div>
                    <input id="name" required type="text" value="[[provider.providerName]]" readonly></input>
                </div>
                <div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Contact Name</div>
                    <input id="name" required type="text" value="[[provider.primaryContact.name]]"></input> 
                    
                </div>
            </div>
            <div class="row">
                <div class="element">
                    <div class="inputlabel">Contact Phone</div>
                    <input id="phone" type="text" required value="[[provider.primaryContact.phone]]" placeholder="55555 555555"></input>
                </div>
<div class="spacer">&nbsp;</div>
                <div class="element">
                    <div class="inputlabel">Contact Email</div>
                    <input id="email" required type="email" value="[[provider.primaryContact.email]]" readonly></input>
                </div>
            </div>
            </div>
        </div>
      </div>
      <div class="card-buttons layout horizontal">
          <span class="flex">&nbsp;</span>
          <paper-button class="filledWhite" on-click="_saveNow">SAVE PROVIDER DETAILS</paper-button>
<paper-toast id="toast"></paper-toast>
      </div>
      <smart-config id="globals"></smart-config>
      <telehealthcareflow-lookup id="lookup" on-lookup-error="_showError" on-lookup-success="_setupProvider" on-session-expired="_session"></telehealthcareflow-lookup>
 <telehealthcareflow-setupserviceprovider id="setup"  on-setup-success="_setup" on-session-expired="_session"></ <telehealthcareflow-setupserviceprovider>
    `;
  }


  static get properties() {
      return {
        provider: {
            type: Object
        }
      };
  }

  _setupProvider(event) {
    
      if (event.detail.object != undefined) {
          this.provider = event.detail.object.result[0];
        
      }
       if (event.detail.object.session.startsWith("Session Expired"))
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
  _setup(event) {
   var toast = this.$.toast;
      console.log(event);
      toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Successfully Updated."
  });



}
  _showError(event) {
      console.log(event.detail.error);
  }

 _saveNow() {



 this.s1=this.$.street1.value;
 this.s2=this.$.street2.value;
 this.pc=this.$.pincode.value;
 this.cty=this.$.city.value;
 this.state=this.$.state.value;
 this.country=this.$.country.value;
 this.pname=this.$.name.value;
 this.pphone=this.$.phone.value;
 this.pemail=this.$.email.value;
 var name = this.$.globals.tenant;
 var pcreg=/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i; 
//var pcreg=/^((?!(0))[0-9]{6})$/;
 var letter=/^[A-Za-z\. ]+$/;
 var number=/^[0-9 ]{12}$/;
var toast = this.$.toast;

 if(this.s1 == "")
    {
   
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });
   
   return false;
    }

 if(this.s2 == "")
    {
  
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });


   
   return false;
    }

 if(this.pc == "")
   {
  
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });


   
   return false;
    }

 if(!pcreg.test(this.pc))
    {
      
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid postcode"
  });


   
   return false;
    }

 if(this.cty == "")
   {
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });


   
   return false;
    }

   if(!letter.test(this.cty))
    {
  
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid city"
  });


   
   return false;
    }

  if(this.state == "")
   {

   
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });

   
   return false;
    }

  if(!letter.test(this.state))
    {
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid county"
  });


   
   return false;
    } 

  if(this.country == "")
   {

  
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });


   
   return false;
    }

 if(!letter.test(this.country))
    {
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid country"
  });


   
   return false;
    }

  if(this.pname == "")
   {

   
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });


   
   return false;
    }

 if(!letter.test(this.pname))
    {
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid contact name"
  });


   
   return false;
    }

  if(this.pphone == "")
   {

  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the field"
  });


   
   return false;
    }

  if(!number.test(this.pphone))
    {
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Invalid contact number"
  });


   
   return false;
    }

 this.$.setup.setupserviceprovider(name,this.s1,this.s2,this.pc,this.cty,this.state,this.country,this.pname,this.pemail,this.pphone);

  }
  loadData() {
      var pname = this.$.globals.tenant;
      this.$.lookup.lookup("ServiceProvider", pname);
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



window.customElements.define('my-providerdetails', MyProviderDetails);

