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
import './api/telehealthcareflow-getsubscriberdetails.js';
import './search/search-listview.js';
import './dialogs/device-add.js'
import './dialogs/device-edit.js'
import '@polymer/paper-toast/paper-toast.js';

class MyManageDevices extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles">
        :host {
          display: block;
        }
        .title {
          font-size: 18px;
          font-family: 'Roboto-Bold';
          color: var(--app-accent-color);
        }
        .title-container {
          padding-bottom: 14px;
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
        <h2>Add/Edit Devices</h2>
      </div>
      <div class="card-header">
        <div class="flex-1 event-title self-end"></div>
      </div>
      <div class="card-content">
        <div class="content-two">
          <div class="layout horizontal title-container">
            <div class="flex title"></div>
            <paper-button class="filledBlue" on-tap="_openAddEditDialog">+ add device</paper-button>
          </div>
          <search-listview class="search-result" columns="[[columns]]"
            search-result="{{subscriber.devices}}" mode="{{_mode}}" on-action-edit="_showDetails"  title="Edit"></search-listview>
        </div>
       <paper-toast id="toast"></paper-toast>
      </div>
    
      <telehealthcareflow-getsubscriberdetails id="getdetails" on-subscriber-details="_setupSubscriber" on-session-expired="_session"></telehealthcareflow-getsubscriberdetails>
      <device-add id="addDevice" on-registered-device="reloadData" subscriber="[[subscriber.email]]" on-device-created="reloadData"></device-add>
<device-edit id="editdevice" on-device-edited="reloadData"></device-edit>
    `;
  }

  static get properties() {
      return {
      columns: {
          type: Array,
          value: [
              { flex: "flex-1", label: "deviceId" },
              { flex: "flex-2", label: "deviceType" },
              { flex: "flex-1", label: "tag" },
          ]
      },
      subscriber: {
          type: Object
      },
      deviceId: {
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

  _openAddEditDialog() {
      this.$.addDevice.open();
  }

  reloadData() {
 this.subscriber = null;
      this.loadData(this.email);
  }


_showDetails(event) {
     // var device = event.detail.data;
     this.dispatchEvent(new CustomEvent("change-page", { detail: { activepage: this.$.editdevice.open()}}));
      //this.$.editdevice.open();
      this.$.editdevice.loadData(event.detail.data.deviceId,this.subscriber.email,event.detail.data.deviceType,event.detail.data.tag,event.detail.data.connectionKey);
  }

  loadData(email) {
    this.subscriber=null;
    this.email = email;
    this.$.getdetails.getDetails(email);
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

window.customElements.define('my-managedevices', MyManageDevices);
