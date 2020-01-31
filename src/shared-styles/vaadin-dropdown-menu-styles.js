/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/default-theme.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="vaadin-dropdown-menu-styles" theme-for="vaadin-dropdown-menu">
  <template>    
  <style>
*{ -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; margin:0;padding:0;}
  :host {
    width: 100%;
  }
  :host [part="toggle-button"] {
    --lumo-contrast-60pct: black;
    --lumo-icon-size-m: 21px;
  }
  :host(.status-drop-down) [part="toggle-button"]{
    --lumo-contrast-60pct: var(--app-accent-color);
  }
  </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);


$_documentContainer.innerHTML = `<dom-module id="vaadin-text-field-styles" theme-for="vaadin-dropdown-menu-text-field">
  <template>    
  <style>
  :host {
    padding: 0px;
  }
  :host [part="input-field"] {
    --lumo-contrast-10pct: var(--light-theme-background-color);
    --lumo-border-radius: 0px;
    --lumo-font-size-m: 16px;
    color: var(--app-text-color);
    font-weight: 400 !important;
    border: 2px solid var(--medium-blue-grey);
    box-sizing: border-box;
    height: 50px;
  }
  :host [part="label"] {
    --lumo-font-size-s: 14px;
    --lumo-secondary-text-color: var(--app-text-color);
    font-family: 'Roboto-Regular';
  }
  :host([focused]:not([readonly])) [part="label"]{
    --lumo-primary-text-color: var(--app-text-color);
  }
  :host([has-label]) {
    --lumo-space-m: 0px;
  }
  :host .vaadin-text-field-container {
    --vaadin-text-field-default-width: 1em;
  }
  :host(.status-drop-down) [part="input-field"],
  :host(.add-template-status-drop-down) [part="input-field"]{
    --lumo-contrast-10pct: var(--very-pale-blue-grey);
    --lumo-border-radius: 4px;
    --lumo-font-size-m: 12px;
    --lumo-font-family: 'Roboto-Bold';
    color: var(--app-accent-color);
    border: 0;
    height: 40px;
    text-transform: uppercase;
  }
  :host(.add-template-status-drop-down) [part="input-field"]{
    --lumo-contrast-10pct: var(--light-theme-background-color);
  }
  </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

$_documentContainer.innerHTML = `<dom-module id="vaadin-item-styles" theme-for="vaadin-item">
  <template>    
  <style>
  :host {
      --_lumo-item-selected-icon-display: none;
      cursor: pointer !important;
    }
    vaadin-item[aria-selected="false"]:hover {
      background-color: var(--hover-color) !important;
    }
    vaadin-item {
      padding: 8px;
    }
    :host [part="content"]{
      @apply --layout-horizontal;
      @apply --layout-center;
    }
    :host([focused]:not([disabled])) {
      box-shadow: none !important;
    }
    [selected] {
      background-color: var(--hover-color);
    }
  </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

$_documentContainer.innerHTML = `<dom-module id="vaadin-list-box-styles" theme-for="vaadin-list-box">
  <template>    
  <style>
    [part="items"]{
      background-color: var(--light-theme-background-color);
    }
  </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
