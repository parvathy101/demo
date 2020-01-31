import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-styles/default-theme';
import '../../shared-styles/paper-button-styles';
import '../../icons/ithings-icons.js';
import '../../elements/ith-event-status-select/ith-event-status-select.js';
//import {updatePatientEventTemplateStatus, deletePatientEventTemplate} from '../../actions/patient-event-teplates.js';


class IthEventTemplateHeader extends (PolymerElement) {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
       :host {
        display: block;
        background-color: var(--light-theme-background-color);
      }
      paper-button.filledBlue {
        padding: 10px;
      }
      .event-template-title{
        font-size: 14px;
        color: var(--app-text-color);
        font-family: 'Roboto-Bold';
        line-height: 20px;
        padding: 0px 3px 0px 11px;
      }
      .event-template-type{
        font-size: 18px;
        color:var(--app-accent-color);
        font-family: 'Roboto-Bold';
        line-height: 20px;
        //padding: 0px 200px 0px 5px;
        padding-right: 100px;
      }
      .delete-btn{
        margin-right: 16px;
      }
      ith-event-status-select {
        margin-right: 48px;
        width: 130px;
      }
      .status-container {
        align-items: flex-end;
      }
      paper-button.edit-btn {
        margin-right: 32px;
      }
      .event-template-container {
        border-bottom: 2px solid var(--very-pale-blue-grey);
        padding: 19px 0px 11px 0px;
      }
      :host([hide-patient-event-template])  .event-template-container{
        padding: 19px 0px 19px 0px;
      }
      iron-icon{
        top: 3px;
      }
      @media (max-width: 1024px) {
        .event-template-title{
         min-width: 100%;
         border-bottom: 2px solid var(--very-pale-blue-grey);
         padding: 6px 24px 19px 24px;
         box-sizing: border-box;
      }
      .event-template-container{
        flex-wrap: wrap;
        border-bottom: 0px;
      }
      .status-container{
        align-items: flex-start;
      }
      .action-container {
        padding: 10px 24px 0px 24px;
      }
      paper-button.filledBlue {
        height: 45px;
        min-width: 50px;
      }
      .btn-text {
        display: none;
      }
      paper-button.edit-btn {
        margin-right: 0px;
      }
      ith-event-status-select {
        margin-right: 16px;
      }
      iron-icon{
        top: 11px;
        right: 6px;
        position: absolute;
      }
      }
      @media (max-width: 340px) {
        ith-event-status-select {
          width: 100px;
        }
      }
      </style>
      <div class="layout horizontal event-template-container"> 
       <div class="event-template-title self-center" style="margin-right:5px">
              Template Name:
          </div>
       <div class="event-template-type self-center"">
             [[title]]
          </div>
          <div class="event-template-title self-center" style="margin-right:5px">
              Event Type:
          </div>
       <div class="event-template-type self-center"">
             [[category]]
          </div>
       
        
        <div class="layout horizontal flex-1 action-container">
          <div class="flex-1 layout vertical status-container">
              <ith-event-status-select id="eventStatus"  on-value-changed="_dispatchTemplateStatus"></ith-event-status-select>
          </div>
          <paper-button class="filledBlue delete-btn" on-tap="_dispatchTemplateDeleteEvent">
            <iron-icon icon="ithings-icons:delete"></iron-icon>
            <div class="btn-text">delete</div>
          </paper-button>
         <paper-button class="filledBlue edit-btn" on-tap="_dispatchTemplateEditEvent"  hidden="[[hidePatientEventTemplate]]">
            <iron-icon icon="ithings-icons:edit"></iron-icon>
            <div  class="btn-text">save</div>
          </paper-button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      title: String,
      category:String,
      hidePatientEventTemplate: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    }
  }

  _dispatchTemplateStatus(){
    var value = this.$.eventStatus.value;
  }

  _dispatchTemplateEditEvent(){
    this.dispatchEvent(new CustomEvent('edit-template'));
  }

  _dispatchTemplateDeleteEvent(){
     this.dispatchEvent(new CustomEvent('delete-template'));
  }

  _stateChanged(state) {}
}

window.customElements.define('ith-event-template-header', IthEventTemplateHeader);
