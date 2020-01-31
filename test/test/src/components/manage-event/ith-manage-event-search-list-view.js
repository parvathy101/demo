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
import '@polymer/paper-toast/paper-toast';
import '@polymer/iron-media-query/iron-media-query';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-styles/default-theme';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/input-styles';
import '../../shared-styles/shared-styles';
import "../../icon/ithings-sensor-icons";
import "./ith-template-selection-dialog";
import "./ith-event-template-row";
import '../shared-components/ith-multi-select';
import '../shared-components/loader-view';
import "../elements/dropdown-menu/dropdown-menu";
import {
  store
} from '../../store';
import {
  connect
} from 'pwa-helpers/connect-mixin';

import {eventTemplates} from '../../reducers/event-templates';

import {getSearchResult, getSelectedTemplates } from '../../reducers/event-template-selection';

import { devices, getDevices } from '../../reducers/devices';

import { eventTemplateCategories, getEventTemplateCategories } from '../../reducers/event-template-categories';

import {addToSelection, removeFromSelection, addSelected } from '../../actions/event-template-selection';

store.addReducers({eventTemplates, eventTemplateCategories, devices});

class IthManageEventSearchListView extends connect(store)(PolymerElement) {
  static get template() {
    return html `
      <style include="shared-styles input-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
        :host {
          @apply --layout-vertical;
        }
        .list-header{
          font-size: 14px;
          font-family: 'Roboto-Bold';
          text-transform: uppercase;
          color:  var( --light-theme-background-color);
          background: var(--app-accent-color);
          min-height: 40px;
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
        @media (max-width: 767px) {
         .list-header{
           display: none !important;
         }
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
      </style>

    <ith-template-selection-dialog items="[[_selectedTemplates]]" 
                                   on-remove-selection="_removeFromSelection"
                                   on-add-selected="_addSelectedTemplates"
                                   ></ith-template-selection-dialog>
    
    <div class="advance-search-main-container">
      <div class="layout horizontal advance-search-container">
        <div class="layout vertical flex-1 dropdown-margin dropdown-container">
          <div>Keyword:</div>
          <iron-input bind-value="{{searchQuery}}">
            <input  placeholder="Search keyword">
          </iron-input>
        </div>
        <div class="layout vertical flex-1 dropdown-margin dropdown-container">
          <div>Device:</div>
          <ith-multi-select items="[[_devices]]" placeholder-text="Please select a device" default-text="Sensor device(s)"></ith-multi-select>
        </div>
        <div class="layout vertical flex-1 dropdown-margin dropdown-container">
          <div>Category:</div>
          <ith-multi-select items="[[_eventTemplateCategories]]" placeholder-text="Please select a category" default-text="Categories"></ith-multi-select>
        </div> 
        <div class="layout vertical dropdown-container">
          <div>Time period:</div>
          <div class="layout horizontal">
            <dropdown-menu label="From" time-period="[[_timePeriod]]" class="from-drop-down"></dropdown-menu>
            <dropdown-menu label="To" time-period="[[_timePeriod]]"></dropdown-menu>
           </div>
        </div>
      </div>
      <div class="search-btn-container layout vertical end">
        <paper-button class="borderBlue search-btn">
          <iron-icon icon="icons:search"></iron-icon>
            search
        </paper-button>
      </div>
     </div>

     <template is="dom-if" if="[[_showLoaderView(_searchInProgress, _searchResult)]]">
      <div class="loader-container">
        <loader-view></loader-view>
      </div>
     </template>

     <template is="dom-if" if="[[!_searchInProgress]]">
      <div class="no-record-view" hidden$="[[_hasSearchResults(_searchResult)]]">
        <span>No search results found</span>
      </div>
    </template>

      <div class="list" hidden$="[[!_hasSearchResults(_searchResult)]]">
        <div class="layout horizontal list-header">
          <div class=" header-cell-margin cell-content layout vertical center-justified flex-1 header-title">event title</div>
          <div class=" header-cell-margin  layout vertical center-justified flex-2 header-description">short description</div>
          <div class=" header-cell-margin cell-content layout vertical center-justified flex-1 header-sensor">sensors</div>
          <div class=" layout vertical cell-content center-justified flex-1 header-last-child"></div>
        </div>
        <template is="dom-repeat" items="[[_searchResult]]">
            <ith-event-template-row template="[[item]]"
                                    selected="[[_isInSelection(_selectedTemplates, item)]]"
                                    on-add-selection="_addToSelection"
                                    on-remove-selection="_removeFromSelection"
                                    ></ith-event-template-row>
        </template>      
     </div>
     
     

     <paper-toast opened="[[_showToast(_searchFailureReason)]]" text="Search request failed"></paper-toast>
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

      _selectedTemplates: {
        type: Array,
        value: () => []
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

      _searchResult: {
        type: Array,
        value: () => []
      }
    };
  }

  _isInSelection(selectedTemplates, template) {
    for(var i=0;i<selectedTemplates.length; i++){
      if(selectedTemplates[i].id === template.id) {
        return true;
      }
    }
    return false;
  }

  _eq(str1, str2) {
    return str1 === str2;
  }

  _stateChanged(state) {
    if (state.app.page === 'manage-events') {
      this._screenSize = state.app.screenSize;
      this.searchQuery = state.eventTemplateSelection.searchQuery;
      this._searchInProgress = state.eventTemplateSelection.searchRequestInProgress;
      this._searchResult = getSearchResult(state);
      this._selectedTemplates = getSelectedTemplates(state);
      this._devices = getDevices(state);
      this._eventTemplateCategories = getEventTemplateCategories(state);
      this._searchFailureReason = state.eventTemplateSelection.searchFailureReason;
    }
  }

  _showToast(failedReason){
    return failedReason;
  }

  _showLoaderView(searchReqInprogress, reaseResults){
    return searchReqInprogress && (!reaseResults || !reaseResults.length);
    }

  _hasSearchResults(searchResult){
    return searchResult && searchResult.length;
  }

  _addSelectedTemplates(e) {
    this.mode = 'NORMAL';
    store.dispatch(addSelected());
  }

  _addToSelection(e) {
    store.dispatch(addToSelection(e.detail.id));
  }

  _removeFromSelection(e) {
    store.dispatch(removeFromSelection(e.detail.id));
  }
}

window.customElements.define('ith-manage-event-search-list-view', IthManageEventSearchListView);
