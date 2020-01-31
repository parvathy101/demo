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
import '../api/telehealthcareflow-editassigncaretaker.js';
import '../api/telehealthcareflow-removecaretaker.js';
import '../api/telehealthcareflow-lookup.js';
import '../api/telehealthcareflow-takerlookup.js';
import '../api/telehealthcareflow-getsubscriberdetails.js';
import '@polymer/paper-toast/paper-toast.js';

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class EditCaretaker extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
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
      <div class="main-title">Edit Care Giver</div>
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
                        <div class="inputlabel">Email[[takerMail]]</div>
                        <input id="email" required type="email" value="" readonly ></input>
                    
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Name [[takerName]]</div>
                        <input id="name" type="text" required value=""></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Phone [[takerPhone]]</div>
                        <input id="phone" type="text" required value="" readonly></input>
                    </div>
                    <div class="spacer"></div>
                    <div class="element">
                        <div class="inputlabel">Care Giver Type [[takerType]]</div>
                        <input id="type" required type="text" value=""></input>
                    </div>
                </div>
                <div class="row">
                    <div class="element">
                        <div class="inputlabel">Priority [[takerPriority]]</div>
                        <input id="priority" required type="number" value=""></input>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
<div class="btn-container  vertical end" style="height:100px;">
    <div style="float:right; margin-left:20px;">
      <paper-button class="filledWhite" on-tap="_editCareTaker">
        Save
      </paper-button>
</div>
<div style="float:right">
      <paper-button class="filledWhite" on-tap="_removeCareTaker">
        Remove
      </paper-button>
    </div>
<paper-toast id="toast"></paper-toast>
</div>
    <telehealthcareflow-editassigncaretaker id="editassigncaretaker" on-editassigned-caretaker="_editassignedCaretaker" on-session-expired="_session"></telehealthcareflow-editassigncaretaker>
    <telehealthcareflow-removecaretaker id="removecaretaker" on-caretaker-remove="_removeassignedCaretaker" on-session-expired="_session"></telehealthcareflow-removecaretaker>
<telehealthcareflow-lookup id="lookup" on-lookup-error="_showError" on-lookup-success="_setupcaretaker" on-session-expired="_session"></telehealthcareflow-lookup>
<telehealthcareflow-takerlookup id="lookup1" on-lookup-error="_showError" on-lookup-success="_setupcaretakername" on-session-expired="_session"></telehealthcareflow-takerlookup>
      <telehealthcareflow-getsubscriberdetails id="getdetails" on-subscriber-details="_setupSubscriber" on-session-expired="_session"></telehealthcareflow-getsubscriberdetails>
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
   
        taker: {
            type: Object
        },
         ct: {
            type: Object
        },
        takerMail: {
            type: String
        },
         takerName: {
            type: String
        },
        takerPhone: {
            type: String
        },
        takerType: {
            type: String
        },
        takerPriority: {
            type: String
        },
        takerid: {
            type: String
        },
        subscriber: {
            type: Object
        },
        submail: {
            type: String
        },
       ctaker: {
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
  _setupSubscriber(event) {
      if (event.detail.data != undefined) {
          this.subscriber = event.detail.data;
      }
  }

 _setupcaretaker(event) {
     if (event.detail.object != undefined) {
          this.taker = event.detail.object.result[0];
      }
    console.log(this.taker.caretaker+"mmmm");
    this.$.lookup1.lookup("CareTaker", this.taker.caretaker);
  }

   _setupcaretakername(event) {
     if (event.detail.object != undefined) {
          this.ct = event.detail.object.result[0];
      }
      console.log(this.ct);
  }

  _editCareTaker() {
      var email = this.$.email.value;
      var name = this.$.name.value;
      var phone = this.$.phone.value;
      var type = this.$.type.value;
      var priority = this.$.priority.value;
      console.log("www--"+this.takerid);
 var letter=/^[A-Za-z\. ]+$/;
      var number=/^[0-9 ]{12}$/;
      var mail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var toast = this.$.toast;

 
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

      this.$.editassigncaretaker.editassignCaretaker(this.subscriber, email, name, phone, type, priority,this.takerid);
      this.dispatchEvent(new CustomEvent('search-changed1'));
  }

  _editassignedCaretaker(event) {
      var email = this.$.email.value;
      this.$.email.value=null;
      this.$.name.value=null;
      this.$.phone.value=null;
      this.$.type.value=null;
      this.$.priority.value=null;
      this.close();
      this.dispatchEvent(new CustomEvent('editassigned-caretaker', { detail: { 'email': email }}));
  }
  
   loadData(subscribermail,takermail,takername,takerid,type,phone,priority) {
      
      this.submail=subscribermail;
      //this.takerMail=takermail;
      //this.takerName=takername;
      //this.takerPhone=phone;
      //this.takerType=type;
      //this.takerPriority=priority;   
      this.$.email.value=takermail;
      this.$.name.value=takername;
      this.$.phone.value=phone;
      this.$.type.value=type;
      this.$.priority.value=priority;
 
      this.takerid=takerid;
      this.$.lookup.lookup("AssignedCareTaker", takerid);
      console.log(this.ctaker);
      
  }

_removeCareTaker()
 {
   this.$.removecaretaker.remove(this.takerid,this.subscriber);
  // this.dispatchEvent(new CustomEvent('search-changed1'));

 }
_removeassignedCaretaker(event)
{
      this.close();
      this.dispatchEvent(new CustomEvent('search-changed1'));
      
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

customElements.define('edit-caretaker', EditCaretaker);
