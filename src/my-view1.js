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

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .circle img{
          width:100%;
          height:auto;
        }
        .card{
          width:100%;
        }
        .circle p{
          font-size:16px;
          text-align:justify
        }
      </style>

      <div class="card">
        <div class="circle">
          <img src="/src/images/aboutimage.png">
        </div>
        <div class="circle">
          <img src="/src/images/about.png">
        </div>
        <div class="circle">  
          <p>Traditionally, software systems employed by alarm centres focus, not surprisingly, on the processing of alarms; they do not generally integrate with care systems or support the wider processes and quality frameworks which ensure the delivery of fit-for-purpose TEC services.</p>
          <p>iThings Health provides the solution to the rapidly changing needs of the Telehealth Care environment. Our smart technology gives service organisations the ability to provide bespoke and personalised care programmes to their tenants whilst providing a framework for workflow planning not available until now.</p>
          <p><b>Service providers benefit from…..​</b>
          <ul>
            <li>Interoperable IoT technology access whilst maintaining freedom of device choice.</li>
            <li>Responsive software which provides smart workflow and analytics.</li>
            <li>Referrals to their services as a consequence of growing consumer awareness of the benefits of smart systems in Healthcare.</li>
            <li>Automation of key elements of frameworks and guidelines that support quality of service, enabling regulatory requirement to be met.</li>
          </ul>
          <p><b>Users and Carers benefit from….</b></p>
          <ul>
            <li>Design of personalised support systems allowing system behaviour to be configured to individual needs</li>
            <li>Access to multi-media messaging system to assist interaction with users and carers</li>
            <li>Smartphone and web applications to enable secure and consented interaction with users & carers</li>
          </ul>
        </div>
      </div>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
