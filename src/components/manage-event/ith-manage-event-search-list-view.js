/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-media-query/iron-media-query';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-styles/default-theme';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/input-styles';
import '../../shared-styles/shared-styles';
import "../../icons/ithings-sensor-icons.js";
import "./ith-template-selection-dialog.js";
import "./ith-manage-event-search-item.js";
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../elements/loader-view/loader-view.js';
import "../../elements/ith-dropdown-menu/ith-dropdown-menu.js";

import '../../api/telehealthcareflow-associateeventdef.js';

class IthManageEventSearchListView extends (PolymerElement) {
  static get template() {
    return html `
      <style include="shared-styles input-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
        :host {
          @apply --layout-vertical;
        }
        .cell-content {
          padding: 0px 20px 0px 20px;
          border-right: 2px solid var(--light-theme-background-color);
        }
        .header-description {
          padding: 0px 52px 0px 20px;
          border-right: 2px solid var(--light-theme-background-color);
        }
        .header-cell-margin {
          margin-right: 2px;
        }
        .list {
          overflow: auto;
        }
        .header-last-child {
          min-width: 110px;
        }
        paper-toast {
        width: 300px;
        margin-left: calc(50vw - 150px);
        margin-bottom: calc(50vw - 150px);
        background:#e5ebef;
        color:#2f3042;
      }
        :host([mode='NORMAL']) .advance-search-main-container{
          display: none;
        }
        :host([_screen-size='small']) .list{
           overflow: initial;
         }
        .advance-search-main-container {
          margin-bottom: 24px;
          font-size: 14px;
          font-family: 'Roboto-Regular';
          color: var(--app-text-color);
        }
        .dropdown-margin {
          margin-right: 24px;
        }
        .search-btn-container{
          margin-top: 24px;
        }
        paper-button.search-btn{
          width: 110px;
        }
        ith-template-selection-dialog{
          position: fixed;
          bottom: 200px;
          right: 0px;
        }
        .loader-container{
          position: relative;
          min-height: 100px;
        }
        .no-record-view{
          text-align: center;
          font-size: 18px;
          color: var(--app-text-color);
          font-family: 'Roboto-Regular';
        }
        .from-drop-down{
          margin-right: 16px;
        }
        ith-manage-event-search-item.event-row{
          background: var(--table-background-color);
        }
        ith-manage-event-search-item.event-row:nth-of-type(odd){
          background: var(--very-pale-blue-grey);
        }
        #search {
          font-size: 16px;
        }
        @media (max-width: 767px) {
        .header-cell-margin {
          margin-right: 0px;
         }
         .dropdown-container {
          min-width: 100%;
         }
         .dropdown-margin{
          margin: 0px 0px 16px 0px;
         }
         .advance-search-main-container  {
           margin-bottom: 16px;
           padding: 0px 30px;
         }
         .advance-search-container {
           flex-wrap: wrap;
         }
         }
        paper-toast {
        width: 300px;
        margin-left: calc(50vw - 150px);
        margin-bottom: calc(50vw - 300px);
        background:#e5ebef;
        color:#2f3042;
      }
      </style>

    <ith-template-selection-dialog selected-templates="{{selectedTemplates}}" 
                                   show-selected="[[_hasSelectedTemplates(selectedTemplates)]]"
                                   on-remove-selection="_removeFromSelection"
                                   on-add-selected="_addSelectedTemplates"
                                   ></ith-template-selection-dialog>
    
    <div class="advance-search-main-container">
      <div class="layout horizontal advance-search-container">
        <div class="layout vertical flex-1 dropdown-margin dropdown-container">
          <div>Keyword:</div>
          <iron-input bind-value="{{searchQuery}}">
            <input  id="search" placeholder="Search keyword" on-keydown="_onKeyDown">
          </iron-input>
        </div>
        <div class="layout vertical flex-1 dropdown-margin dropdown-container">
          <div>Device:</div>
          <ith-multi-select id="devices" items="[[_devices]]" placeholder-text="Please select a device" default-text="Sensor device(s)"></ith-multi-select>
        </div>
        <div class="layout vertical flex-1 dropdown-margin dropdown-container">
          <div>Category:</div>
          <ith-multi-select id="category" items="[[_eventTemplateCategories]]" placeholder-text="Please select a category" default-text="Categories"></ith-multi-select>
        </div> 
        <div class="layout vertical dropdown-container flex-1">
          <div>Time period:</div>
          <div class="layout horizontal">
            <ith-dropdown-menu id="timeFrom" placeholder="From" items="[[_timePeriod]]" class="from-drop-down"></ith-dropdown-menu>
            <ith-dropdown-menu id="timeTo" placeholder="To" items="[[_timePeriod]]"></ith-dropdown-menu>
           </div>
        </div>
      </div>
      <div class="search-btn-container layout vertical end">
        <paper-button class="borderBlue search-btn" on-tap="_search">
          <iron-icon icon="icons:search"></iron-icon>
            search
        </paper-button>
      </div>
     </div>

     <template is="dom-if" if="[[_showLoaderView(_searchInProgress, searchResult)]]">
      <div class="loader-container">
        <loader-view></loader-view>
      </div>
     </template>

     <template is="dom-if" if="[[!_searchInProgress]]">
       <div class="no-record-view" hidden$="[[_hasSearchResults(searchResult)]]">
         <span>No search results found</span>
       </div>
     </template>

      <div class="list" hidden$="[[!_hasSearchResults(searchResult)]]">
       <div class="layout horizontal header-list-container">
          <div class="layout vertical center-justified flex-2" style="margin-left:150px">event title</div>
          <div class="layout vertical center-justified flex-1" style="margin-right:200px">short description</div>
          <!--<div class=" header-cell-margin cell-content layout vertical center-justified flex-1">sensors</div>
          <div class="layout vertical center-justified flex-1 header-last-child"></div>-->
        </div>
        <template is="dom-repeat" items="{{searchResult}}">
            <ith-manage-event-search-item template="[[item]]" used="[[_usedTemplate]]"
            class="event-row"
                                    selected="[[_isInSelection(selectedTemplates, item)]]"
                                    on-add-selection="_addToSelection"
                                    on-remove-selection="_removeFromSelection"
                                    ></ith-manage-event-search-item>
        </template>  
       <paper-toast id="toast"></paper-toast>    
     </div>
     
     

     <paper-toast opened="[[_showToast(_searchFailureReason)]]" text="Search request failed"></paper-toast>
     <telehealthcareflow-associateeventdef id="associateeventdef" on-associated-eventdef="_addedTemplates" on-associateeventdef-error="_onerror" on-session-expired="_session"></telehealthcareflow-associateeventdef>
    `;
  }

  static get properties() {
    return {

      mode: {
        type: String,
        notify: true,
        reflectToAttribute: true,
        value: 'NORMAL'
      },

      searchQuery: {
        type: String,
        notify: true
      },

      selectedTemplates: {
        type: Array,
        value: [],
        notify: true
      },

      /**
       * Represents array of devices. e.g. [{id: 1, name: 'Device  1'}, {id: 2, name: 'Device  2'}]
       */
      _devices: {
        type: Array,
        value: () => []
      },

      /**
       * Represents array of  event template categories list e.g. [{id: 1, name: 'Category  1'}, {id: 2, name: 'Category  2'}]
       */
      _eventTemplateCategories: {
        type: Array,
        value: () => []
      },

      _screenSize: {
        type: String,
        reflectToAttribute: true
      },

      _timePeriod: {
        type: Array,
        value: function(){
          return ['0:00','1:00','1:30','2:00','3:00','3:30','4:00','4:30','5:00','6:00','6:30','7:00',
                 '7:30','8:00','8:30','9:00','10:00','11:00','12:00','12:30','13:00','13:30','14:00','14:30',
                 '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
                 '20:30','21:00','21:30','22:00','22:30','23:00']
        }
      },

      _searchInProgress: {
        type: Boolean,
        value: false
      },

      _searchFailureReason: Object,

      searchResult: {
        type: Array,
        value: () => []
      },
      
      /**
       * Array of template id which is used by patient
       */
      _usedTemplate:{
        type: Array
      },

      subscriber: {
          type: String
      }
    };
  }

 connectedCallback(){
   super.connectedCallback();
   window.addEventListener('reset-advance-search', this._resetAdvanceSearch.bind(this))
   
 }

 _resetAdvanceSearch(){
  this.$.devices.value = '';
  this.$.category.value = '';
  this.$.timeFrom.value = '';
  this.$.timeTo.value = '';
 }

  _onKeyDown(e) {
    if(e.keyCode !== 13) {
     
      return;
    }
   
    let noDelay = true;
    this._search(noDelay);
     
  }

  _isInSelection(selectedTemplates, template) {
    
       
    for(var i=0;i<selectedTemplates.length; i++){
      if(selectedTemplates[i].name === template.name) {
        console.log(selectedTemplates[i].name+"----"+template.name);
         
        return true;
      }
   
    }
    return false;
  }

  _search(){
    var devices = this.$.devices.value;
    var catgories = this.$.category.value;
    var timeFrom = this.$.timeFrom.value;    
    var timeTo = this.$.timeTo.value;
    var searchValue = this.$.search.value;
 
   
  }

  _showToast(failedReason){
    console.log(this.subscriber+"qqq");
     
    return failedReason;
  }

  _showLoaderView(searchReqInprogress, reaseResults){
      
     for (var i = 0; i < this.selectedTemplates.length; i++) {
       if(reaseResults==undefined||reaseResults==null)
        {
     // var template = this.selectedTemplates[i];
     this._remove(this.selectedTemplates[i].name);
      this.searchResult=null;
      }
    }
    console.log(searchReqInprogress+"****"+reaseResults);
    return searchReqInprogress && (!reaseResults || !reaseResults.length);
    }

  _hasSearchResults(searchResult){
   
    if(searchResult && searchResult.length){
         
      return true;
    }
   
    return false;
  }

  _addSelectedTemplates(e) {
   
    this.mode = 'NORMAL';
    for (var i = 0; i < this.selectedTemplates.length; i++) {
        var template = this.selectedTemplates[i];
        this.$.associateeventdef.associateEventDef(this.subscriber, template.name, 1,1,"critical alert","","");
         
    }
    //this.selectedTemplates=null;
  }

  _addedTemplates(e) {
     for (var i = 0; i < this.selectedTemplates.length; i++) {
      var template = this.selectedTemplates[i];
     this._remove(template.name);
    }
     this.dispatchEvent(new CustomEvent("added-templates"));
      
  }

  _addToSelection(e) {
      this.push('selectedTemplates', e.detail.data);
      var temp = [];
      temp.push(...this.selectedTemplates);
      this.selectedTemplates = temp;
  }

  _hasSelectedTemplates(templates) {

     
     return ((templates != undefined) && (templates.length > 0));
     

  }
  _remove(a) {
      var temp = [];
     for (var i = 0; i < this.selectedTemplates.length; i++) {
         var template = this.selectedTemplates[i];
         if (template.name == a) {
         } else {
             temp.push(this.selectedTemplates[i]);
         }
     }

     this.selectedTemplates = temp;
  }

  _removeFromSelection(e) {
      var temp = [];
     for (var i = 0; i < this.selectedTemplates.length; i++) {
         var template = this.selectedTemplates[i];
         if (template.name == e.detail.id) {
         } else {
             temp.push(this.selectedTemplates[i]);
         }
     }

     this.selectedTemplates = temp;
  }
   load()
    {
      console.log("asdsaefcdfcsc");
    }

  
     _onerror(event){
      
      var toast = this.$.toast;
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "No matching device found to associate. Please install the device."
  });
   
      
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

window.customElements.define('ith-manage-event-search-list-view', IthManageEventSearchListView);
