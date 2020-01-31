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
import './search/caretaker-listview.js';
import './search/searchcaretaker-view.js';
import './api/telehealthcareflow-searcheventtemplates.js';
import './api/telehealthcareflow-caretakersearchassign.js';
import './api/telehealthcareflow-searchcaretaker.js';
import './smart/smart-search.js';
import './dialogs/caretaker-assign.js';
import './dialogs/edit-caretaker.js';
import '@polymer/paper-toast/paper-toast.js';

class MyManageCaretakers extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles">
   
        :host {
          display: block;
          position: relative;
          background-color: var(--pale-blue-grey);
          @apply --layout-vertical;
          margin: 26px 40px 0px 40px;
        }
        .title {
          font-size: 18px;
          font-family: 'Roboto-Bold';
          color: var(--app-accent-color);
        }
        .title-container {
          padding-bottom: 14px;
        }
        .search-result {
          display: none;
        }
        :host .search-result { 
          display: flex;          
          box-shadow: 0px -3px 0px rgba(47, 48, 66, 0.15);          
          background: white;
          padding: 92px 24px 34px 24px;
          margin: -60px 40px 40px 40px;
        }
        :host([_screen-size='small']){
           overflow: auto;
        }
        :host([_view="CREATE_TEMPLATE"]){
          background-color: var(--light-theme-background-color);
          margin-top: 11px;
        }
        @media (max-width: 767px) {
          :host {
           overflow-y: auto;
         }
         :host .search-result {
            box-shadow: none;
            margin: 0px 4px 4px 4px;
            padding: 8px 5px 5px 5px;
         }
         :host {
           margin: 8px;
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
        <h2>Add/Edit Care Givers</h2>
      </div>
      <searchcaretaker-view search-query="{{searchString}}" mode="{{_mode}}" title="Care giver" on-open-createnew="_openCreateNew" on-search-changed="_triggerSearch" enable-close="true"
        active="[[searchView]]" on-close-listview="_hideListView" ></searchcaretaker-view> 
      <search-listview class="search-result" columns="[[searchColumns]]" hidden="[[!searchView]]"
        search-result="{{searchResult}}" mode="{{_mode}}" actions="[[actions]]" on-action-assign="_assignCaretaker"></search-listview>
      <div class="title-container" hidden="[[searchView]]">
          <div class="flex-1 title">&nbsp;</div>
          <div class="card-content">
            <div class="content-single">
             <caretaker-listview class="caregiver-list" columns="[[columns]]"
                search-result="{{subscriber.caretakers}}" mode="{{_mode}}"  on-action-edit="_editassignCaretaker"></caretaker-listview>
            </div>
          </div>
        <paper-toast id="toast"></paper-toast>
      </div>
      <caretaker-assign id="newcaretaker" subscriber="[[subscriber.email]]" on-assigned-caretaker="reloadData" on-search-changed1="reloadData1"></caretaker-assign>
         <edit-caretaker id="editcaretaker" subscriber="[[subscriber.email]]" ctaker="[[ctaker]]"on-editassigned-caretaker="reloadData" on-search-changed1="reloadData1"></edit-caretaker>
      <telehealthcareflow-getsubscriberdetails id="getdetails" on-subscriber-details="_setupSubscriber" on-session-expired="_session"></telehealthcareflow-getsubscriberdetails>
<telehealthcareflow-searchcaretaker id="searchcaretaker" on-caretaker-result="_setupResult" on-session-expired="_session"></telehealthcareflow-searchcaretaker>
      <telehealthcareflow-caretakersearchassign id="myassign" on-assigned-caretaker="_assigned" on-assigncaretaker-error="_error" on-session-expired="_session"></telehealthcareflow-caretakersearchassign>
      <smart-search id="caretakersearch" flow="TeleHealthcareFlow" group="CareTaker" query="[[searchQuery]]" search-result="{{searchResult}}"></smart-search>
    `;
  }

  static get properties() {
      return {
      searchString: {
          type: String
      },
      searchQuery: {
          type: Object,
          notify: true,
          value: {}
      },
      searchResult: {
          type: Array,
          notify: true
      },
       takerphone: {
          type: String
      },
      ctaker: {
          type: String
      },
      ctakername: {
          type: String
      },
     searchColumns: {
          type: Array,
          value: [
              { flex: "flex-1", label: "email" },
              { flex: "flex-2", label: "name" },
              { flex: "flex-1", label: "phone" },
          ]
      },
        _mode: {
        type: String,
        reflectToAttribute: true
      },
      actions: {
          type: Array,
          value: [
              { id: 'assign', label: '+ ASSIGN'}
          ]
      },
      actions1: {
          type: Array,
          value: [
              { id: 'assigned', label: '+ ASSIGNED'}
          ]
      },
  remove: {
          type: Array,
          value: [
              { id: 'remove', label: '+ Edit/Remove'}
          ]
      },
      columns: {
          type: Array,
          value: [
              { flex: "flex-1", label: "email" },
              { flex: "flex-2", label: "name" },
              { flex: "flex-1", label: "phone" },
              { flex: "flex-1", label: "priority" },
          ]
      },
      subscriber: {
          type: Object
      },
      currentIndex: {
          type: Number,
          value: 1
      },
      email: {
          type: String
      },
      searchView: {
          type: Boolean,
          notify: true,
          value: false
      }
    };
  }

  _setupSubscriber(event) {
      if (event.detail.data != undefined) {
          this.subscriber = event.detail.data;
          this.currentIndex = this.subscriber.caretakers.length + 1;
         // console.log(this.subscriber.caretakers+"nnn");
     // this.takers=this.subscriber.caretakers[0];
     // for(i=0;i<this.currentIndex-1;i++)
     //   {
     //    this.takerphone=this.subscriber.caretakers[].phone;
      //  } 
     // console.log(this.currentIndex+"ddnnn");
         
      }
      this._hideListView();
  }

  _hideListView() {
      this.searchView = false;
  }

  _triggerSearch() {
      
      this.$.searchcaretaker.search(this.searchString,this.subscriber.email);
     // this.searchQuery = {};
     // this.searchQuery.quickSearch = this.searchString;
     // this.$.caretakersearch.search();
      this.searchView = true;
      this.searchResult = null;   
      //this.subscriber=null;
     // reloadData1();

         
  }
   
  _assignCaretaker(event) {
      console.log(event.detail);
      var email = event.detail.data.email;
      var name = event.detail.data.name;
      var phone = event.detail.data.phone;
      var priority = this.currentIndex;
      var type = "caretaker";

      this.$.myassign.assignCaretaker(this.subscriber.email, email, name, phone, type, priority);
this.searchView = false;
  this.reloadData1();
  }
  _editassignCaretaker(event) {
     // this.$.editcaretaker.open();
     // this.subscriber=null;
     // this.loadData(this.email);
      this.dispatchEvent(new CustomEvent("change-page", { detail: { activepage: this.$.editcaretaker.open()}}));
       console.log(event.detail.data.email+"mailjj");
      this.ctaker=event.detail.data.email;
      this.ctakername=event.detail.data.name;
      this.$.editcaretaker.loadData(this.subscriber.email,this.ctaker,this.ctakername,event.detail.data.acaretakerId,event.detail.data.type,event.detail.data.phone,event.detail.data.priority);
  }
_setupResult(event) {
    // this.searchView = true;
     this.searchResult = event.detail.caretakers;   
     console.log(this.actions.id);

  }

  loadData(email) {
    this.subscriber=email;
    this.searchString=null;
    this.email = email;
    this.$.getdetails.getDetails(email);
  }
 reloadData1() {
        this.searchString=null;
       this.subscriber=this.email;
       this.loadData(this.email);
  }
  reloadData() {
     
       this.subscriber=this.email;
       this.loadData(this.email);
  }

  _openCreateNew() {
      this.$.newcaretaker.open();
  }

_assigned()
{
this.searchView = false;
 this.reloadData1();
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

window.customElements.define('my-managecaretakers', MyManageCaretakers);
