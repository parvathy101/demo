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
import './shared-styles.js';
import './search/search-view.js';
import './search/search-listview.js';
import './dialogs/subscriber-add.js';
import './api/telehealthcareflow-searchsubscribers.js';
import './my-subscribergeneral.js';
import '@polymer/paper-toast/paper-toast.js';
import "./smart/smart-config.js";

class MyServiceUsers extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-factors iron-flex-alignment">
      *{ -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; margin:0;padding:0;}
        :host {
          display: block;
          position: relative;
          background-color: var(--pale-blue-grey);
          @apply --layout-vertical;
          margin: 26px 40px 0px 40px;
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
        }
      </style>
      <div>
      <search-view search-query="{{searchQuery}}" mode="{{_mode}}" title="Service User" on-open-createnew="_openCreateNew" on-search-changed="_triggerSearch1"></search-view> 
      <search-listview class="search-result" columns="[[columns]]"
        search-result="{{searchResult}}" mode="{{_mode}}" on-action-edit="_showDetails"></search-listview>
       <paper-toast id="toast"></paper-toast>
      </div>
<telehealthcareflow-searchsubscribers id="searchsubscribers" on-subscriber-result="_setupResult" on-session-expired="_session"></telehealthcareflow-searchsubscribers>
      <subscriber-add id="addsubscriber" on-serviceuser-created="_serviceUserEdit" on-search-changed1="_triggerSearch1"></subscriber-add>
         <smart-config id="globals"></smart-config>
 `;
  }

  static get properties() {
    return {
      columns: {
          type: Array,
          value: [
              { flex: "flex-1", label: "email" },
              { flex: "flex-2", label: "name" },
              { flex: "flex-1", label: "phone" },
          ]
      },
      searchQuery: {
          type: String,
          value: "",
          notify: true,
      },
      _mode: {
        type: String,
        reflectToAttribute: true
      },

      searchResult: {
          type: Array,
           reflectToAttribute: true
      },
      
      _view: {
        type: String,
        reflectToAttribute: true
      },

      _screenSize: {
        type: String,
        reflectToAttribute: true
      }
    }
  }

  loadData() {
      this._triggerSearch1();
      alert(this.$.globals.userId);
  
  }
_triggerSearch1(event) {
       this.searchResult =null;
      this.$.searchsubscribers.search(this.searchQuery);
  }
_triggerSearch2() {
        
      this.$.searchsubscribers.search(this.searchQuery);
      loadData();
     
  }
  _triggerSearch() {
      this.$.searchsubscribers.search(this.searchQuery);
  }

  _setupResult(event) {
     
    this.searchResult = event.detail.subscribers;//php
   // this.searchResult = event.detail.subscribers.subscribers;//smart

  }

  _openCreateNew() {
      this.$.addsubscriber.open();
      
  }

  _serviceUserEdit(event) {
      this._triggerSearch1();
      var email = event.detail.email;
      console.log(email);
  }
 _saveEdit(event) {
      this._triggerSearch1();
      var email = event.detail.email;
      console.log(email);
  }


  _showDetails(event) {
      var subscriber = event.detail.data;
      this.dispatchEvent(new CustomEvent("change-page", { detail: { activepage: "subscribergeneral", activedata: { "email" : subscriber.email , "name" : subscriber.name } }}));
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

window.customElements.define('my-serviceusers', MyServiceUsers);
