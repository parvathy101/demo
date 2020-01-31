import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-radio-button/paper-radio-button';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/add-event-param-styles';
import '../../icons/ithings-icons.js';

class IthEventTriggerView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
      :host {
        display: block;
        padding-top: 20px;
      }  
      .frequency-width{
        width: 138px;
      }
      .alert-text {
        font-size: 16px;
        font-family: 'Roboto-Regular';
        color: var(--app-text-color);
      }
      </style>
      <div class="layout horizontal add-template-header center">
        <div class="add-template-header-title flex-1">Settings</div>
          <div class="help-icon-container">
           <!-- <paper-icon-button icon="icons:help-outline" class="help-icon"></paper-icon-button>-->
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
          <ith-dropdown-menu 
            class="flex-1 dropdown-margin" 
            value="{{event.timeType}}" 
            name="timePeriod"
            label="Time schedule" 
            items="[[_timePeriodLabel]]"
            id="timeType"
            on-value-changed="_onValueChanged">
          </ith-dropdown-menu>
          <div class="flex-1 layout horizontal">
            <ith-dropdown-menu 
                hidden$="[[!_hideTimePeriodDropDown]]" 
                value="[[event.startTime]]"
                name="timeFrom"
                class="from-drop-down flex-1" 
                placeholder="From"  
                label="Time from" 
                id="startTime"
                items="[[_timePeriods]]">
            </ith-dropdown-menu>
            <ith-dropdown-menu 
              value="[[event.endTime]]" 
              hidden$="[[!_hideTimePeriodDropDown]]" 
              class="flex-1" 
              placeholder="To"  
              name="timeTo"
              label="Time to" 
              id="endTime"
              items="[[_timePeriods]]">
            </ith-dropdown-menu>
            <ith-dropdown-menu 
              value="[[event.time]]" 
              hidden$="[[!_hideTime]]" 
              class="flex-1" 
              placeholder="Time"  
              name="time"
              label="Time" 
              id="time"
              items="[[_timePeriods]]">
            </ith-dropdown-menu>
            <ith-dropdown-menu 
              hidden$="[[!_hideDuration]]" 
              class="frequency-width" 
              placeholder="Duration"
              value="[[event.duration]]"
              name="duration"
              label="Time:" 
              id="duration"
              items="[[_durations]]">
            </ith-dropdown-menu>
          </div>
         </div>
        </div>
       <!-- <div class="layout horizontal">
        <div class="layout vertical trigger-view-row-container flex-8">
          <div class="alert-text">Will trigger event?</div>
           <paper-radio-group>
              <paper-radio-button name="take_palce" id="yes">Yes</paper-radio-button>
              <paper-radio-button name="tale_not_palce" id="no">No</paper-radio-button>
           </paper-radio-group>
          </div>
        </div>-->
        </div>
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
          return [{'id': 'sensor1','name':'Bed occupied'}, {'id': 'sensor2', 'name': 'Door Sensor'},
          { 'id': 'sensor3', 'name': 'Bed Sensor'}]
        }
      },

      _timePeriodLabel: {
        type: Array,
        value: function(){
          return ['Time Period']
        }
      },

      _timePeriod: {
        type: String,
        value: 'Duration'
      },

      _timePeriods: {
        type: Array,
        value: function(){
          return ['0:00','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30','5:00','5:30','6:00','6:30','7:00',
                 '7:30','8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
                 '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
                 '20:30','21:00','21:30','22:00','22:30','23:00','23:30']
        }
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

      _hideDuration: {
          type: Boolean,
          value: false
      },

      _hideTime: {
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
    var frequency = [];

    for(var i=0;i<=60;i++){
      number.push(i + ' mins')
      frequency.push(i);
    }

    this.set('_frequency', frequency);
    this.set('_durations', number);
  }

  _onValueChanged(e){
    this.set('_hideTimePeriodDropDown', false);
    this.set('_hideDuration', false);
    this.set('_hideTime', false);

    if(e.target.value === 'Time Period'){
      this.set('_hideTimePeriodDropDown', true);
      return;
    }
    if(e.target.value === 'Within'){
      this.set('_hideDuration', true);
      return;
    }
    if(e.target.value === 'At Time'){
      this.set('_hideTime', true);
      return;
    }

  }

  _appendedToday(time) {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
              dd = '0'+dd
      } 

      if(mm<10) {
              mm = '0'+mm
      } 

      today = dd + '/' + mm + '/' + yyyy;
      return today + ' ' + time;
  }

_translate() {
      var tt = this.$.timeType.value;
      var time = {};
      
      if (tt == "Time Period") {
          time.timeType = "TimePeriod";
          time.startTime = this._appendedToday(this.$.startTime.value);
          time.endTime = this._appendedToday(this.$.endTime.value);
      } else if (tt == "Within") {
          time.timeType = "WithinPrevious";
          time.duration = parseInt(this.$.duration.value);
      } 
        else if(tt=="At Time") {
          time.timeType = "AtTime";
          time.time = this._appendedToday(this.$.time.value);
      }

      return time;
  }

  getDetails() {
      var time = this._translate();
      return time;
  }

load()
{
this.$.timeType.value=null;
this.$.startTime.value=undefined;
this.$.endTime.value=undefined;
//this.$.yes.selected="";
//this.$.no.selected="";
}
}

window.customElements.define('ith-event-trigger-view', IthEventTriggerView);
