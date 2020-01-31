/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-button/paper-button';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-spinner/paper-spinner-lite';
import '@polymer/iron-input/iron-input';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/input-styles';
import {
  store
} from '../../store';
import {
  connect
} from 'pwa-helpers/connect-mixin';
import {search, reset} from '../../actions/event-template-selection';
import {eventTemplateSelection}  from '../../reducers/event-template-selection';


store.addReducers({eventTemplateSelection});


class IthManageEventSearchView extends connect(store)(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
      <style include="paper-button-styles input-styles iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
          background-color: var(--pale-blue-grey);
          padding: 0px 40px;
          border-bottom: 2px solid var(--light-blue-grey);
          box-sizing: border-box;
          --paper-spinner-color:--primary-color;
          --paper-spinner-stroke-width: 2px;
        }
        .text {
          color: var(--app-accent-color);
          font-size: 24px;
          font-family: 'Roboto-Regular';
          text-align: center;
        }
        .search-title{
          font-size: 14px;
          text-align: center;
          font-family: 'Roboto-Regular';
          color: var(--app-text-color);
          text-decoration: underline;
          cursor: pointer;
        }
        .search-container {
          margin-top: 17px;
          overflow: hidden;
          padding: 15px 46px;
          z-index: 1;
        }
        :host([_active]) .search-container {
          background: var( --light-theme-background-color);
          box-shadow:  0px -3px 0px rgba(47, 48, 66, 0.15);
        }
        .empty-div,
        .paper-button-container{
          @apply --layout-flex;
        }
        .paper-button-container {
          margin-top: 28px;
          margin-left: 5px;
        }
        paper-button.add-tmp {
          text-align: center;
        }
        iron-input {
          margin: 15px 0px;
          position: relative;
        }
        .close-search-container {
          margin-top: 16px;
          cursor: pointer;
        }
        :host([mode='NORMAL']) .close-search-container{
          display: none;
        }
        :host([mode='ADVANCED_SEARCH']) .advance-search-container,
        :host([mode='ADVANCED_SEARCH']) .search-input {
          display: none;
        }
        paper-icon-button.close-icon{
          --iron-icon-fill-color: var(--app-accent-color);
        }
        paper-icon-button.search-remove-icon {
          padding: 0px;
          margin-right: 14px;
          top: 45px;
          width: 30px;
          height: 30px;
        }
        paper-spinner-lite{
          width: 16px;
          height: 16px;
          line-height:16px;
          position: absolute;
          right: 10px;
          top: 14px;
          color: var(--app-accent-color);
        }
        @media (max-width: 767px) {
         :host {
           padding: 0px 4px;
         }
         :host([mode='ADVANCED_SEARCH']) {
            border-bottom: 0px;
         }
          paper-button {
            display: none; 
          }
         .paper-button-container,
         .empty-div {
          @apply  --layout-flex-none;
            margin: 0px;
         }
         .search-container {
          margin: 5px 0px 0px 0px;
          padding: 10px 16px;
         }
         .close-search-container {
            margin-top: 10px;
         }
        }
      </style>
      <div class="layout horizontal">
         <div class="empty-div"></div>
          <div class="flex-2 layout vertical search-container">
            <div class="text">Start typing to search for an event template</div>  
            <iron-input class="search-input" bind-value="{{searchQuery}}">
                <input id="search" placeholder="Eg. Bed Falls, kitchen" 
                      on-keydown="_onKeyDown">
                <paper-spinner-lite active="[[_searchInProgress]]"></paper-spinner-lite>
            </iron-input>
            <div class="layout horizontal center-justified advance-search-container">
               <div on-tap="_openAdvanceSearch" class="search-title">Advanced search</div>
            </div> 
            <div class="layout horizontal center center-justified close-search-container" on-tap="_closeAdvanceSearch">
                <paper-icon-button icon="icons:close" class="close-icon"></paper-icon-button>
                <div class="search-title">Close advanced search</div>
            </div>
        </div> 
        <div class="end layout vertical paper-button-container">
           <paper-button class="filledBlue add-tmp">create new template</paper-button>
           <paper-icon-button icon="icons:close" class="close-icon search-remove-icon" on-tap="_reset" hidden="[[_hideCloseIcon(mode,_searchResult)]]"></paper-icon-button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      searchQuery: {
        type: String,
        notify: true
      },
      mode: {
        type: String,
        value: 'NORMAL',
        reflectToAttribute: true,
        notify: true
      },
      _searchResult: {
        type: Array
      },

      _active: {
        type: Boolean,
        reflectToAttribute: true,
        value: false,
        notify: true,
        computed: '_computeActive(_searchInProgress, _searchResult, mode)'
      },
      _searchInProgress: {
        type: Boolean,
        value: false
      },
    };
  }

  _hideCloseIcon(){
    if(this.mode === 'ADVANCED_SEARCH'){
      return false;
    }

    if(this.mode === 'NORMAL' && this._searchResult){
      return false;
    }

    return true;
  }
  
  _eq(str1, str2) {
    return str1 === str2;
  }

  _computeActive(searchInProgress, searchResult, mode) {
    return Boolean(searchInProgress || searchResult || this.mode === 'ADVANCED_SEARCH');
  }

  _closeAdvanceSearch() {
    this.set('mode', 'NORMAL');
  }

  _openAdvanceSearch() {
    this.set('mode', 'ADVANCED_SEARCH');
  }

  _onKeyDown(e) {
    if(e.keyCode !== 13) {
      return;
    }

    let noDelay = true;
    this._search(noDelay);
  }

  /**
   * It's not being used at present. To start search on key-input, bind 'input' event of text-field.
   */
  _onKeyInput() {
    if(this.$.search.value) {
      this._search();
      return;
    }
    // this._reset();
  }

  _search(noDelay){
    store.dispatch(search(this.$.search.value, noDelay));
  }

  _reset() {
    this.mode = "NORMAL";
    store.dispatch(reset());
  }

  _stateChanged(state) {
    if (state.app.page === 'manage-events') {
      this._screenSize = state.app.screenSize;
      this._searchInProgress = state.eventTemplateSelection.searchRequestInProgress;
      this._searchResult = state.eventTemplateSelection.searchResult;
      // this.searchQuery = state.eventTemplateSelection.searchQuery;
    }
  }
}

window.customElements.define('ith-manage-event-search-view', IthManageEventSearchView);
