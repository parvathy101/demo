import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-checkbox/paper-checkbox';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/add-event-param-styles';
import '../../icons/ithings-icons.js';

class IthParamTriggerView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
      :host {
        display: block;
        padding-top: 20px;
      }  
      .paper-button {
        padding-top: 22px;        
      }
      paper-button {
        width: 200px;
      }
      </style>
      <div class="layout horizontal add-template-header center">
        <div class="add-template-header-title flex-1">Add parameter set</div>
          <div class="help-icon-container">
          <!--  <paper-icon-button icon="icons:help-outline" class="help-icon"></paper-icon-button>-->
            <div class="help-info-container">
              <div class="help-title">Help title</div>
              <div class="help-info">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into 
                electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
                release of Letraset sheets containing Lorem Ipsum passages.
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
       <div class="add-template-view-container">
        <div class="layout horizontal">
         <div class="layout horizontal trigger-view-row-container flex-8">
           <ith-dropdown-menu value-is-object class="flex-1 dropdown-margin" items="[[_sensors]]"  value="sensor3" label="Sensor event:"></ith-dropdown-menu>
           <div class="flex-1"></div>
         </div>
         <div class="flex-1 editable-view layout vertical center-center">Editable on the front end?</div>
        </div>
        <div class="layout horizontal">
          <div class="layout horizontal trigger-view-row-container flex-8" style="border-bottom:0px;">
            <ith-dropdown-menu 
              class=" flex-1 dropdown-margin" 
              value="{{_rangeOfValue}}" 
              name="valueType"
              label="Value type:" 
              items="[[_rangeOfValues]]">
            </ith-dropdown-menu>
            <div class="layout horizontal flex-1">
              <ith-dropdown-menu 
                value="0"
                name="timeFrom"
                class="from-drop-down flex-1" 
                placeholder="From"  
                label="Time from" 
                items="[[_timePeriods]]">
              </ith-dropdown-menu>
              <ith-dropdown-menu 
                value="100" 
                class="flex-1" 
                placeholder="To"  
                name="timeTo"
                label="Time to" 
                items="[[_timePeriods]]">
              </ith-dropdown-menu>
            </div>
          </div>
         <paper-checkbox  checked class="flex-1 editable-view layout vertical center-center" style="border-bottom:0px;"></paper-checkbox>
        </div>
        <div class="layout vertical end paper-button">
          <paper-button class="filledBlue"> + add parameter set</paper-button>
        </div>
    `;
  }

  static get properties() {
    return {
      item: Object,

      devices: Array,

      _deviceValue: {
        type: Array,
        value: function(){
          return ['1','2']
        }
      },

      _sensors: {
        type: Array,
        value: function(){
          return [{'id': 'sensor1','name':'Motion Sensor'}, {'id': 'sensor2', 'name': 'Door Sensor'},
          { 'id': 'sensor3', 'name': 'Bed Sensor'}]
        }
      },

      _rangeOfValues: {
        type: Array,
        value: function(){
          return ['Range of values']
        }
      },

      _rangeOfValue: {
        type: String,
        value: 'Range of values'
      },

      _durations: {
        type: Array,
        value: function(){
          return []
        }
      },

      _hideTimePeriodDropDown: {
        type: Boolean,
        value: false
      },

      _checked: {
        type: Boolean,
        value: false
      },

      _frequency: {
        type: Array,
        value: function(){
          return []
        }
      }
    }
  }

  connectedCallback(){
    super.connectedCallback();
    var self = this;
    var number = [];

    for(var i=0;i<=100;i++){
      number.push(i)
    }

    this.set('_timePeriods', number);
  }

}

window.customElements.define('ith-param-trigger-view', IthParamTriggerView);
