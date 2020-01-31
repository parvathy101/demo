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

class SupportPage extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
       <br><br>
      
        <h1>Software Version</h1><br>
         <h2> Current Release version: 0.8.8-3</h2>
         <h2> App Build version supported.</h2><br><br>
         <hr><br><br>
        <h1>Contact Details</h1><br>
         <h2> Suite 4G Goods Wharf<br>

                Goods Road<br>

               Belper<br>

               Derbyshire<br>

                DE56 1UU<br>

               Mobile: 07757 995793

      </div>
    `;
  }
}

window.customElements.define('my-support', SupportPage);
