import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles/shared-styles.js';
import '../smart/php-client.js';

class TeleHealthcareFlowEditDevice extends PolymerElement {
  static get template() {
    return html`
         <php-client id="client" flow="smart" flow-event="{{_postEvent}}" on-smart-network-error="_handleError" on-smart-error="_handleError" on-smart-response="_handleResponse" ></php-client>
    `;
  }

  static get properties() {
    return {
      _postEvent: {
          type: String,
          value: "EditSubscriberDevice"
      },
    };
  }

  constructor() {
      super();
  }

  _handleError(e) {
      var response = "";
      if (e.detail.responses != undefined) {
        response = e.detail.responses[0];
      } else if (e.detail.error != undefined) {
          response = e.detail.error;
      }
    this.dispatchEvent(new CustomEvent("editdevice-error", { detail: { 'error': response}}));
  }

  _handleResponse(e) {
    var response = e.detail.responses[0];
    this.dispatchEvent(new CustomEvent("edited-device", { detail: { 'message': response }}));
  }

  editdevice(subscriber, did, dtype, conn, tag) {
      this.$.client._dataChanged();
      this._postEvent = "editdevice.php";
      var postData = {};
      postData.subscriber = subscriber;
      postData.deviceId = did;
      postData.deviceType = dtype;
      postData.connectionKey = conn;
      postData.tag = tag;

      

      this.$.client.postSmart(postData);
  }
}

window.customElements.define('telehealthcareflow-editdevice', TeleHealthcareFlowEditDevice);
