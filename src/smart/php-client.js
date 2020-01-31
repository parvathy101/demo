import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import "./smart-config.js"
import "./smart-admin-config.js"

var SMART_ACTION_LOOKUP = 'lookup';
var ERROR = "errors";
var RESPONSES = "responses";

/**
 * `smart-client`
 * An element to connect to smart platform
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PhpClient extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <smart-config id="globals"></smart-config>
      <smart-admin-config id="adminglobals"></smart-admin-config>
      <iron-ajax id="poster" method="POST" content-type="application/json" url="[[_computeURL(server,'php', 'api', flow, flowEvent)]]" body="[[_computeParams(_postData)]]" handle-as="json" on-response="_handleResponse" on-error="_handleError" last-response="{{response}}" headers="[[_createHeaders(_sessionId)]]">
      </iron-ajax>
    `;
  }
  static get properties() {
    return {
        asAdmin: {
            type:Boolean,
            value: false
        },
        server: {
          type: String,
          value: '178.128.165.237'
        },
        port: {
          type: Number,
          value: 9081
        },
        tenant: {
          type: String
        },
        flow: {
          type: String
        },
        flowEvent: {
          type: String
        },
        _postTo: {
          type: Object,
          value: {}
        },
        _postData: {
          type: Object,
          value: {}
        },
        _sessionId: {
          type: String
        },
       headers:{ 
        computed:'_createHeaders(_sessionId)'
             
               }
    };
  }

  ready() {
      super.ready();
      this.server = this.$.globals.server;
      this.port = this.$.globals.port;
      this.tenant = this.$.globals.tenant;

      if (this.asAdmin)
      {
          this.tenant = this.$.adminglobals.tenant;
      }
  }

  _dataChanged() {
  }

  _computeURL(svr, p, t, f, fe) {
      var computedUrl = "http://" + svr + "/" + p + "/";
      computedUrl += t + "/" + f + "/" + fe;

      console.log(computedUrl+"---url");

      return computedUrl;
  }

  _computeParams(data) {
      var post = data;
     
      console.log(JSON.stringify(post));

      return JSON.stringify(post);
  }

  _createHeaders(sess) {
 
      var hdrs = {};
      //var sess = this.$.globals.sessionId;
      if (this.asAdmin)
      {
          sess = this.$.adminglobals.sessionId;
      }
      if (sess != undefined) {
        //hdrs["Session-Id"] = sess;
hdrs["Authorization"] = sess;
      }
  // alert(JSON.stringify(hdrs));
      return hdrs;
  }

  postSmart(data) {
     // this._postTo = todata;
      this._postData = data;
      this._sessionId = this.$.globals.sessionId;
      if (this.asAdmin)
      {
          sess = this.$.adminglobals.sessionId;
      }
      this.$.poster.generateRequest();
  }

  _handleResponse(data) {
      console.log(data.detail.response+"---£");
      
          var responses = data.detail.response;
         
              this.dispatchEvent(new CustomEvent("smart-response", { detail: { "responses" : responses } }));
       
  }

  _fireError(errors) {
      var errs = [];
      for (var i = 0; i < errors.length; i++) {
          var err = {};
          var oneerr = errors[i];
          err.code = oneerr["code"];
          err.context = oneerr["context"];
          errs.push(err);
      }
      this.dispatchEvent(new CustomEvent("smart-error", { detail: { "error" : errs } }));
  }

  _handleError(error) {
      console.log(error.detail+"----ssddd");
      this.dispatchEvent(new CustomEvent("smart-network-error", { detail: { "error" : error.detail } }));
  }
}

window.customElements.define('php-client', PhpClient);
