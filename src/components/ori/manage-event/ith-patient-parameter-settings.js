import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import  '@polymer/iron-form/iron-form';
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';
import '../../elements/ith-recipients-settings/ith-recipients-settings.js';
import '../../shared-styles/shared-styles';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior';

class IthPatientParameterSettings extends mixinBehaviors([IronFormElementBehavior], PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles  iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
        }
       .param-title {
         font-size: 16px;
         font-family: 'Roboto-Bold';
         color: var(--app-accent-color);
         margin-bottom: 15px;
       }
       .main-list-container {
         margin-top: 15px;
       }
       .cell-content {
          padding: 15px 20px 17px 20px;
          box-sizing: border-box;
          border-bottom: 2px solid var(--light-theme-background-color);
          background: var(--very-pale-blue-grey);
       }
       .drop-down {
         margin-right: 20px;
       }
       .recipient-container {
         flex-direction: column;
       }
       @media (max-width: 1024px) {
        .list-container{
          flex-wrap: wrap;
        }
        .list-container {
          margin-bottom: 20px;
        }
       .list-container:last-child{
          margin-bottom: 0px;
        }
         ith-dropdown-menu,
         ith-recipients-settings,
         .recipient-container {
           min-width: 100%;
           box-sizing: border-box;
         }
        }
      </style>
      <div class="main-list-container">
        <div class="param-title">[[param.basic.title]] params 1 </div>
        <div class="layout horizontal header-list-container">
          <div class="flex-1 layout vertical center-justified border header-cell-content">setting</div>
          <div class="flex-3 layout vertical center-justified header-cell-content">value</div>
        </div>
        <iron-form id="ironForm" >
          <form id="form">
            <div class="layout horizontal list-container">
              <ith-dropdown-menu 
                value="{{_alertType}}" 
                class="border cell-content flex-1" 
                label="Alert type" 
                name="alertType"
                items="[[_alertTypes]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <div class="flex-3 layout horizontal cell-content">
                <div class="flex-1 recipient-container" hidden="[[!_eq(_alertTypeDropDowm, 'Notification')]]">
                <div class="dropdown-title">Recipents</div>
                <ith-recipients-settings
                  items="[[recipents]]" 
                  name="recipients"
                  input-value="[[param.parameterAlert.recipients]]">
                </ith-recipients-settings>
              </div>
              <ith-dropdown-menu 
                class="drop-down flex-1" 
                hidden="[[!_eq(_alertTypeDropDowm, 'Workflow')]]"
                value="[[param.parameterAlert.workflow]]"
                placeholder="Workflow template"  
                label="Workflow template" 
                name="workflow"
                items="[[workflowTemplates]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <ith-dropdown-menu 
                class="drop-down flex-1" 
                hidden="[[!_eq(_alertTypeDropDowm, 'System')]]"
                value="[[param.parameterAlert.forwardToSystem]]"
                placeholder="Forward to another system"  
                label="Forward to another system"
                name="forwradToSystem"
                items="[[forwardToSystem]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <div class="flex-1"></div>
              <div class="flex-2"></div>
            </div>
          </form>
        </iron-form>
      </div>
    `;
  }

  static get properties() {
    return {
      param: Object,
      recipents: Array,
      workflowTemplates: Array,
      forwardToSystem: Array,
      _alertType: {
        type: String,
        value: 'Notification'
      },

      _alertTypes: {
        type: Array,
        value: function(){
          return ['Notification', 'Workflow', 'Forward to another system']
        }
      },

      _alertType: {
        type: String,
        value: 'Time Period',
        observer: '_onAlertTypeChanged'
      }
    };
  }

  static get observers() {
    return ['_setTimeAlertType(param.parameterAlert.alertType)'];
  }

  connectedCallback(){
    super.connectedCallback();
    var self = this;

    setTimeout(() => {
      self._setValue();
    }, 100); 
  }
  
  _setValue(){
    var formSerializeData = this.$.ironForm.serializeForm()
    var obj = {...this.params, ...formSerializeData}
    this.set('value', obj);
  }

  _eq(str1, str2){
    return str1 === str2;
  }

  _setTimeAlertType(alertType){
    this.set('_alertType', alertType);
  }

  _onAlertTypeChanged(e){
    if(this._alertType === 'Notification'){
      this.set('_alertTypeDropDowm', 'Notification');
      return;
    }

    if(this._alertType === 'Workflow'){
      this.set('_alertTypeDropDowm', 'Workflow');
      return;
  }

    this.set('_alertTypeDropDowm', 'System');
  }
}

window.customElements.define('ith-patient-parameter-settings', IthPatientParameterSettings);
