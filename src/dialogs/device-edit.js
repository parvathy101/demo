
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
import '../api/telehealthcareflow-editdevice.js';
import '../api/telehealthcareflow-lookup.js';
import '@polymer/paper-toast/paper-toast.js';
import '../smart/smart-config.js';
import '../api/telehealthcareflow-removedevice.js';

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

class DeviceEdit extends mixinBehaviors([PaperDialogBehavior], PolymerElement) {
  static get template() {
    return html`
     <style include="shared-styles input-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
      :host {
        display: block;
        min-width: 1024px;
        top:60px;
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
    <div class="layout horizontal center main-header">
      <div class="main-title">Edit Device</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <div class="card-header">
            Provide Device Details
          </div>
          <div class="card-content">
            <div class="content-single">
                <div class="row">
                    <div class="element">
			<div class="inputlabel">Device Id</div>
                        <input id="deviceId" required type="text" value="" readonly></input>
                        </div>
                    <div class="element">
                        <div class="inputlabel">Device Type</div>
                        <input id="deviceType" type="text" required value="" readonly></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Connection String</div>
                        <input id="connection" type="text" required value=""></input>
                    </div>
                    <div class="element">
                        <div class="inputlabel">Device Name</div>
                        <input id="tag" type="text" required value=""></input>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container vertical end" style="height:100px;">
     <div style="float:right; margin-left:20px;">
      <paper-button  class="filledWhite" on-tap="_editDevice">
        Save Device
      </paper-button>
     </div>
   <div style="float:right">
      <paper-button class="filledWhite" on-tap="_remove">
        Remove
      </paper-button>
     
    </div>

<paper-toast id="toast"></paper-toast>
    </div>
    <telehealthcareflow-editdevice id="editdevices" on-edited-device="_editedDevice" on-session-expired="_session"></telehealthcareflow-editdevice>
    <telehealthcareflow-lookup id="lookup" on-lookup-error="_showError" on-lookup-success="_setupDevice" on-session-expired="_session"></telehealthcareflow-lookup>
        <telehealthcareflow-removedevice id="removedevice" on-device-remove="_removeDevice" on-session-expired="_session"></telehealthcareflow-removedevice>
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
        device: {
            type: Object
        },
        subscriber: {
          type: String
        },
email:{
type:String
},
id:{
type:String
}
      };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-overlay-closed', this._closeDialog);
  }

  _closeDialog() {
  }
 _setupDevice(event) {
      if (event.detail.object != undefined) {
          this.device = event.detail.object.result[0];
      }
  }
  _editDevice() {
      var did = this.$.deviceId.value;
      var dtype = this.$.deviceType.value;
      var conn = this.$.connection.value;
      var tag = this.$.tag.value;

       var toast = this.$.toast;


if(dtype == "")
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

if(conn == "")
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

if(tag == "")
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



      this.$.editdevices.editdevice(this.email, did, dtype, conn, tag);

 this.dispatchEvent(new CustomEvent('device-edited'));

//window.location.reload(true);
  }

  _editedDevice(event) {
      var did = this.$.deviceId.value;
      this.$.deviceId.value=null;
       this.$.deviceType.value=null;
       this.$.connection.value=null;
       this.$.tag.value=null;
      this.close();
      this.dispatchEvent(new CustomEvent('device-edited', { detail: { 'device': did }}));
  }
loadData(did, email,type,tag,ckey) {
     this.email = email;
       this.id=did;
       this.$.deviceId.value=did;
       this.$.deviceType.value=type;
       this.$.connection.value=ckey;
       this.$.tag.value=tag;
      this.$.lookup.lookup("Device", did);
  }


_remove()
 {
   this.$.removedevice.remove(this.id,this.email);
  // this.dispatchEvent(new CustomEvent('search-changed1'));

 }
_removeDevice(event)
{
      this.close();
      this.dispatchEvent(new CustomEvent('device-edited'));
      
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

customElements.define('device-edit', DeviceEdit);
