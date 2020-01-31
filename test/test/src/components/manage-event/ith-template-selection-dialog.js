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
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-collapse/iron-collapse';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/hardware-icons';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '../../shared-styles/paper-button-styles';
import '../elements/ith-chip-view/ith-chip-view';
import { store } from '../../store';
import { connect } from 'pwa-helpers/connect-mixin';

class IthTemplateSelectionDialog extends connect(store)(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
      <style include="paper-button-styles iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
          min-width: 700px;
          z-index: 1;
          padding: 0px 0px 5px 5px;
        }
        .add-selected-container {
          padding: 15px 33px 12px 30px;
        }
        .text-style {
          font-family: 'Roboto-Regular';
          font-size: 18px;
          color: var(--light-theme-background-color);
        }
        paper-icon-button.up-down-icon{
          --iron-icon-fill-color: var( --light-theme-background-color);
        }
        #eventTemplateText {
          cursor: pointer;
        }
        #ironCollapse{
          background: var( --light-theme-background-color);
          padding: 13px 10px 15px 12px;
          border-left: 5px solid var(--app-accent-color);
          border-bottom: 5px solid var(--app-accent-color);
        }
        .text-style.small{
          display:  none;
        }
        .border.large,
        .border.medium{
          display:  none;
        }
        .overlay {
          position: fixed;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          background: black;
          opacity: 0.6;
        }
        .container{
          background: var(--app-accent-color);
          opacity: 0.9; 
        }
        @media (max-width: 767px) {
          :host {
            min-width: 100%;
          }
          .border{
            width: 2px;
            background: var( --light-theme-background-color);
            height: 100%;
            margin-left: 10px;
            display: block;
         }
        }
      </style>
      <template is="dom-if" if="[[_hasItems(items)]]">
      <div class="overlay" hidden="[[!_opened]]" on-tap="_toggleCollapse"></div>
      <div class="container" id="selectionContainer">
        <div class="layout horizontal add-selected-container justified">
          <div  class="layout horizontal center flex-1" id="eventTemplateText" on-tap="_toggleCollapse">
            <div class$="text-style [[_screenSize]]">[[items.length]] Event templates selected</div>
            <paper-icon-button icon="hardware:keyboard-arrow-up" hidden="[[_opened]]" class="up-down-icon" ></paper-icon-button>
            <paper-icon-button icon="hardware:keyboard-arrow-down" hidden="[[!_opened]]" class="up-down-icon" ></paper-icon-button>
            <div class="border"></div>
          </div>
          <paper-button id="addSelectedBtn" class="filledWhite" on-tap="_dispatchAddSelected">+ ADD SELECTED</paper-button>
        </div>
        <iron-collapse id="ironCollapse" opened="{{_opened}}">
          <div class="layout horizontal">
            <template is="dom-repeat" items="[[items]]">
                <ith-chip-view name="[[item.title]]" id="[[item.id]]" on-remove="_dispatchRemoveSelection"></ith-chip-view>
            </template>
          </div>
        </iron-collapse>
        </div>
      </template>
    `;
  }

  static get properties() {
    return {
      /**
       * When dialog is in expanded mode, it's `true`.
       */
      _opened: {
        type: Boolean,
        value: false
      },

      _screenSize: String,

      items: {
        type: Array,
        value: function () {
          return []
        },
        observer: '_onItemsChanged'
      }
    };
  }
  
  _onItemsChanged(items) {
    if(!items || !items.length) {
      this._opened = false;
    }
  }


  _toggleCollapse() {
    this.shadowRoot.querySelector('#ironCollapse').toggle();
  }

  _stateChanged(state) {
    if (state.app.page === 'manage-events') {
      this._screenSize = state.app.screenSize
    }
  }

  _hasItems(items) {
    return items && (items.length > 0);
  }


  _dispatchRemoveSelection(e) {
    this.dispatchEvent(new CustomEvent('remove-selection', {detail: {id: e.detail.id}}));
  }

  _dispatchAddSelected() {
    this.dispatchEvent(new CustomEvent('add-selected'));
  }

}

window.customElements.define('ith-template-selection-dialog', IthTemplateSelectionDialog);