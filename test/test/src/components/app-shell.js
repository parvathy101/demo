/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from "@polymer/polymer/polymer-element";
import {setPassiveTouchGestures} from "@polymer/polymer/lib/utils/settings";
import "@polymer/app-layout/app-drawer/app-drawer";
import "@polymer/app-layout/app-drawer-layout/app-drawer-layout";
import "@polymer/app-layout/app-header/app-header";
import "@polymer/app-layout/app-header-layout/app-header-layout";
import "@polymer/app-layout/app-scroll-effects/app-scroll-effects";
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/iron-flex-layout/iron-flex-layout-classes";
import "@polymer/paper-button/paper-button";
import "@polymer/iron-icons/iron-icons";
import "@polymer/paper-icon-button/paper-icon-button";
import "@polymer/iron-icon/iron-icon";
import "../icon/ithings-icons";
import '../theme/theme';
import '../shared-styles/paper-button-styles';
import './shared-components/loader-view';

import { installMediaQueryWatcher } from 'pwa-helpers/media-query';
import {installRouter} from 'pwa-helpers/router';
import {store} from '../store';
import {connect} from 'pwa-helpers/connect-mixin';

// These are the actions needed by this element.
import {
  navigate, updateDrawerState, setScreenSize} from '../actions/app';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

class AppShell extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style include="paper-button-styles iron-flex iron-flex-alignment iron-positioning">
        :host {
          display: block;
        }
        
        app-drawer-layout{
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          bottom: 0;
        }
        
        app-toolbar{
          height: 60px;
          color: #fff;
          padding: 0px 40px;
          background-color: var(--app-accent-color);
          box-sizing: border-box;
        }

        app-toolbar.small{
            padding: 0px 24px;
         }

        app-toolbar.secondary{
          border-top:1px solid var(--dark-blue-grey);
        }

        app-toolbar.secondary.large{
          display: none;
        }

        .drawer-open-menu{
          margin-left: -8px;
          width: 40px;
          height: 40px;
        }

        .drawer-close-menu{
          position: absolute;
          right: -54px;
          width: 54px;
          height: 54px;
          color: white;
          top: -4px;
        }

        .drawer-close-menu.large{
          display: none;
        }

        app-header .welcome-text{
          line-height: 60px;
        }

        app-drawer-layout{
          --app-drawer-width: 300px;
        }

        app-drawer{
          margin-top: 60px;
          font-family: 'Roboto-Regular';
          --app-drawer-content-container: {
            background-color: var(--pale-blue-grey);
          }
        }

        app-drawer.small{
          margin-top: 68px;
        }

        .drawer-list{
          position: relative;
        }

        .drawer-list a {
          display: block;
          text-decoration: none;
          padding: 15px 24px;
          line-height: 20px;
          font-size: 14px;
          height: 50px;
          color: var(--app-text-color);
          text-transform: uppercase;
          box-sizing: border-box;
          outline: none;
        }

        .drawer-list a[selected] {
          color: var(--app-accent-color);
          background-color: white;
        }

        .drawer-list iron-icon{
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }

        .drawer-list a iron-icon{
          --iron-icon-fill-color: var(--app-text-color);
        }

        .drawer-list a[selected] iron-icon{
          --iron-icon-fill-color: var(--app-accent-color);
        }

        .drawer-list .patient-links{
          border-top: 2px solid var(--light-blue-grey);
          border-bottom: 2px solid var(--light-blue-grey);
          background-color: var(--very-pale-blue-grey);
        }

        .drawer-list .patient-links a.patient-info{
          height: 98px;
        }

        .drawer-list .patient-links a.patient-info img{
          height: 60px;
          width: auto;
          border: 3px solid white;
          border-radius: 50%;
        }

        .drawer-list .patient-links a.patient-info .fullname{
          font-size: 18px;
          font-weight: bold;
          margin-left: 16px;
          text-transform: none;
        }

        .main-content {
          padding: 26px 40px 0px 40px;
          box-sizing: border-box;
          height: 100%
        }

        .main-content.small{
          padding: 8px;
          height: calc(100% - 60px);
        }
        
        .page {
          display: none;
        }

        .page[active] {
          display: flex;
        }
        
        paper-button.sign-in-btn {
          height: 30px;
        }
      </style>

      <app-header-layout>
        <app-header slot="header" fixed condenses effects="waterfall">
          <app-toolbar class$="layout horizontal justified [[_screenSize]]">
            <img id="header-logo" src="images/ithings-logo.png" alt="Ithings Health">
            <div class="layout horizontal">
              <paper-button class="filledWhite sign-in-btn">login</paper-button>
            </div>
          </app-toolbar>
        </app-header>
        <app-drawer-layout narrow="{{narrow}}" responsive-width="1020px">
        <app-toolbar class$="secondary [[_screenSize]]">
          <paper-icon-button class="drawer-open-menu" src="icons/menu.png" drawer-toggle></paper-icon-button>
        </app-toolbar>
          <!-- Drawer content -->
          <app-drawer id="drawer" slot="drawer" class$="[[_screenSize]]"
              swipe-open="[[narrow]]" opened=[[_drawerOpened]]
              on-opened-changed="_updateDrawerState">
            <nav class="drawer-list" role="navigation">
                <paper-icon-button class$="drawer-close-menu [[_screenSize]]" icon="close" drawer-toggle></paper-icon-button>
                <a href="/">
                  <iron-icon icon="ithings-icons:arrow-back"></iron-icon>
                  Patient List</a>
                <div class="patient-links">
                  <a href="/" class="layout horizontal center patient-info">
                    <img src="https://dummyimage.com/60x60/2f3042/2f3042">
                    <div class="fullname flex">Fred Sample</div>
                    <iron-icon icon="arrow-drop-down"></iron-icon>
                  </a>
                  <a selected$="[[_isSelected(_page, 'patient-dashboard')]]" href="/">
                    <iron-icon icon="ithings-icons:patient-dashboard"></iron-icon>
                    Patient Dashboard
                  </a>
                  <a selected$="[[_isSelected(_page, 'edit-patient')]]" href="/edit-patient">
                    <iron-icon icon="ithings-icons:edit-patient"></iron-icon>
                    Edit Patient
                  </a>
                  <a selected$="[[_isSelected(_page, 'manage-events')]]" href="/manage-events">
                    <iron-icon icon="ithings-icons:manage-events"></iron-icon>
                    Manage Events
                  </a>
                  <a selected$="[[_isSelected(_page, 'manage-devices')]]" href="/manage-devices">
                    <iron-icon icon="ithings-icons:manage-devices"></iron-icon>
                    Manage Devices
                  </a>
                  <a selected$="[[_isSelected(_page, 'manage-categories')]]" href="/manage-categories">
                  <iron-icon icon="ithings-icons:manage-categories"></iron-icon>
                    Manage Categories</a>
                </div>
                <a selected$="[[_isSelected(_page, 'account')]]" href="/account">
                  <iron-icon icon="ithings-icons:account"></iron-icon>
                  My Account</a>
                <a selected$="[[_isSelected(_page, 'support')]]" href="/support">
                <iron-icon icon="ithings-icons:support"></iron-icon>
                  Support</a>
                <a selected$="[[_isSelected(_page, 'contact')]]" href="/contact">
                <iron-icon icon="ithings-icons:contact"></iron-icon>
                  Contact</a>
            </nav>
          </app-drawer>
          <!-- Main Content -->
          <main role="main" class$="main-content layout horizontal [[_screenSize]]">
            <template is="dom-if" if="[[!_pageImportInProgress]]">
              <patient-dashboard-page class="page" 
                active$="[[_isSelected(_page, 'patient-dashboard')]]">
              </patient-dashboard-page>
              <edit-patient-page class="page" active$="[[_isSelected(_page, 'edit-patient')]]">
              </edit-patient-page>
              <manage-events-page class="page flex" active$="[[_isSelected(_page, 'manage-events')]]">
              </manage-events-page>
              <manage-devices-page class="page" active$="[[_isSelected(_page, 'manage-devices')]]">
              </manage-devices-page>
              <manage-categories-page class="page" active$="[[_isSelected(_page, 'manage-categories')]]">
              </manage-categories-page>
              <account-page class="page" active$="[[_isSelected(_page, 'account')]]">
              </account-page>
              <support-page class="page" active$="[[_isSelected(_page, 'support')]]">
              </support-page>
              <contact-page class="page" active$="[[_isSelected(_page, 'contact')]]">
              </contact-page>
              <not-found-page class="page" active$="[[_isSelected(_page, 'not-found')]]"></not-found-page>
            </template>
            <template is="dom-if" if="[[_pageImportInProgress]]">
              <loader-view></loader-view>
            </template>

            
          </main>
        </app-drawer-layout>
      </app-header-layout>
    `;
  }

  static get properties() {
    return {
      _page: String,
      _drawerOpened: Boolean,
      _screenSize: String,
      _user: Object,
      _pageImportInProgress: Boolean
    };
  }

  connectedCallback() {
    super.connectedCallback();
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    // Sets Screen size based on media query.
    installMediaQueryWatcher(`(max-width: 767px)`,
            (match) => match ? store.dispatch(setScreenSize('small')) : '');
    installMediaQueryWatcher(`(min-width: 768px) and (max-width: 1020px)`,
            (match) => match ? store.dispatch(setScreenSize('medium')) : '');
    installMediaQueryWatcher(`(min-width: 1021px)`,
            (match) => match ? store.dispatch(setScreenSize('large')) : '');
  }

  _isSelected(_page, value){
    return _page === value;
  }

  _updateDrawerState(e){
    store.dispatch(updateDrawerState(e.detail.value));
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._drawerOpened = state.app.drawerOpened;
    this._screenSize = state.app.screenSize;
    this._user = state.app.user;
    this._pageImportInProgress = state.app.pageImportInProgress;
  }
}

window.customElements.define("app-shell", AppShell);
