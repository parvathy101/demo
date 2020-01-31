import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import "./smart-config.js"
import "./php-client.js"

var sessionId;
var error;
var userId;

var SESSIONID = "sessionId";
var ERROR = "error";
var USERID = "userId";

class SmartSecurity extends PolymerElement {
  static get template() {
    return html`
        <smart-config id="globals"></smart-config>
        
<php-client id="client" flow="smart" flow-event="{{_postEvent}}" on-smart-network-error="handleError" on-smart-error="_handleError" on-smart-response="storeSessionId" ></php-client>
    `;
  }

  static get properties() {
    return {
      user: { 
          type: String
      },
      password: { 
          type: String
      },
_postEvent: {
          type: String,
          value: "Login"
      }
    };
  }

  loginSmart() {
this._postEvent = "login.php";
      var postData = {};
      postData.identity = this.user;
      postData.password = this.password;
      
      this.$.client.postSmart(postData);
  }

  get sessionId() {
      return sessionId;
  }

  get userId() {
      return userId;
  }

  storeSessionId(evt) {
      var response = evt.detail.responses;
      sessionId = response[SESSIONID];
      userId = response[USERID];
 error = response[ERROR];
console.log(response);

if(sessionId ==undefined)
{

//alert("Invalid credentials");
        if (error.startsWith("Invalid credentials for")){
            this.dispatchEvent(new CustomEvent("smart-invalid-login", { detail: { "user" : this.user } }));
        } else {
            this.dispatchEvent(new CustomEvent("smart-error-login", { detail: { "code" : error.code, "context" : error } }));
        }
      }

else
{

      this.$.globals.sessionId = sessionId;
       this.$.globals.userId = userId;
  
//var response = evt.detail.responses;
//var sessionId = evt.detail.responses.responses[0].message;
console.log("Id===="+sessionId);

    
      console.log(response);
   this.dispatchEvent(new CustomEvent("smart-login-success", { detail: { "sessionId": sessionId, "userId": userId } }));
     }
   
  }

  handleError(evt) {
    var error = evt.detail.error[0];
    if (error != undefined) {
        if (error.context.startsWith("Invalid credentials for")){
            this.dispatchEvent(new CustomEvent("smart-invalid-login", { detail: { "user" : this.user } }));
        } else {
            this.dispatchEvent(new CustomEvent("smart-error-login", { detail: { "code" : error.code, "context" : error.context } }));
        }
    }
  }
}

window.customElements.define('smart-security', SmartSecurity);

