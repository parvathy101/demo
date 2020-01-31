import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import  '@polymer/iron-form/iron-form';
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';
import '../../elements/ith-recipients-settings/ith-recipients-settings.js';
import '../../shared-styles/shared-styles';
import '../../shared-styles/input-styles';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

class IthPatientEventSettings extends mixinBehaviors([IronFormElementBehavior], PolymerElement) {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-factors iron-flex-alignment shared-styles input-styles">
        :host {
          display: block;
        }
       .event-title {
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
       @media (max-width: 1200px) {
        .list-container,
        .time-period-container  {
          flex-wrap: wrap;
        }
.sensor  {
          
min-width: 100%;
           box-sizing: border-box;
        }
        .list-container {
          margin-bottom: 20px;
        }
       .list-container:last-child{
          margin-bottom: 0px;
        }
        .cell-content.time-period-container {
          padding: 0px;
        }
         ith-dropdown-menu,
	iron-input,

         ith-recipients-settings,
         .recipient-container {
           min-width: 100%;
           box-sizing: border-box;
         }

         .from-drop-down {
           border-bottom: 2px solid  var(--light-theme-background-color);
           padding: 20px;
         }
         .time-period-dropdown {
          padding: 20px;
         }
        }
      </style>
      <div class="main-list-container">
        <!--<div class="event-title">[[event.eventName]]</div>-->
        <div class="layout horizontal header-list-container">
          <div class="flex-1 layout vertical center-justified border header-cell-content">[[event.tag]] settings</div>
          <!--<div class="flex-3 layout vertical center-justified header-cell-content">value</div>-->
        </div>
        <iron-form id="ironForm" >
          <form id="form">
            <div class="layout horizontal list-container">
         
             


<div class="layout horizontal cell-content border">

              
                        <div style="margin-top:33px">Time Type </div>
            <iron-input bind-value="{{_getLabel(event.timeType)}}">
               <input style ="width:200px; margin-left:20px; margin-top:20px" on-value-changed="_setValue" readonly>
            </iron-input>
                     
</div>



              <div class="flex-3 layout horizontal cell-content time-period-container">
                <ith-dropdown-menu 
                    hidden$="[[!_eq(event.timeType, 'TimePeriod')]]" 
                    value="{{_getTime(event.betweenTime.startTime)}}"
                    name="timeFrom"
                    class="drop-down from-drop-down flex-1" 
                    placeholder="From"  
                    label="Time from" 
                    items="[[_timePeriods]]"
                    id="stime"
                    on-value-changed="_changedTime">
                </ith-dropdown-menu>
                <ith-dropdown-menu 
                  value="{{_getTime(event.betweenTime.endTime)}}" 
                  hidden$="[[!_eq(event.timeType, 'TimePeriod')]]" 
                  class="flex-1 time-period-dropdown" 
                  placeholder="To"  
                  name="timeTo"
                  label="Time to"
                  id="etime" 
                  items="[[_timePeriods]]"
                  on-value-changed="_changedTime">
                </ith-dropdown-menu>
                <ith-dropdown-menu 
                  hidden$="[[!_eq(event.timeType, 'WithinPrevious')]]" 
                  class="flex-1 drop-down time-period-dropdown" 
                  placeholder="Duration (mins)"
                  value="{{event.duration.duration}}"
                  name="duration"
                  label="Duration" 
                  items="[[_durations]]"
                  on-value-changed="_setValue">
                </ith-dropdown-menu>
                <ith-dropdown-menu 
                  hidden$="[[!_eq(event.timeType, 'AtTime')]]" 
                  class="flex-1 drop-down time-period-dropdown" 
                  placeholder="Time"
                  value="{{_getTime(event.time.time)}}"
                  name="time"
                  label="Time" 
                  items="[[_timePeriods]]"
                  on-value-changed="_setValue">
                </ith-dropdown-menu>
                 <div class="flex-1" hidden$="[[_hideTimePeriodDropDown]]"></div>
                    <ith-dropdown-menu 
                    value="{{event.timeOut}}"
                    hidden$="[[_eq(event.timeOut, '')]]"
                    name="device"
                    class="flex-3 drop-down " 
                    placeholder="Threshhold"  
                    items="[[_durations]]"
                    label="Time Out" 
                     ></ith-dropdown-menu>
                 <div class="flex-1" hidden$="[[_hideTimePeriodDropDown]]"></div>
                 </div>
                 
         
            </div>
            <div class="layout horizontal list-container">
           <div class="layout horizontal cell-content sensor border">
              
               <div style="margin-top:12px;">Sensor Used</div>
            <iron-input bind-value="{{event.tag}}">
               <input style ="width:200px; margin-left:6px;" on-value-changed="_setValue" readonly>
            </iron-input> 
</div>

              <div class="flex-1 layout horizontal cell-content">
              
                        <div style="margin-top:12px">Device Used</div>
            <iron-input bind-value="{{event.deviceId}}">
               <input style ="width:200px; margin-left:20px" on-value-changed="_setValue" readonly>
            </iron-input>
                     
                
                <!-- <div class="drop-down flex-3">
                  <paper-checkbox checked  hidden$="[[_eq1(event.generateEvent)]]">[[_checklabel(event.generateEvent)]]</paper-checkbox>
                </div>-->
                <div class="flex-1">
                 
                </div>
                <div class="flex-2"></div>
              </div>
            </div>
               <div class="layout horizontal list-container">
                 <div class="border cell-content flex-1">
                  <paper-checkbox checked  hidden$="[[_eq1(event.generateEvent)]]">[[_checklabel(event.generateEvent)]]</paper-checkbox>
                </div>
               </div>
            <!--<div class="layout horizontal list-container">
              <ith-dropdown-menu 
                value="{{action.actionType}}" 
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
                    items="[[recipients]]" 
                    name="recipients"
                    input-value="[[event.action.recipient]]">
                  </ith-recipients-settings>
                </div>
              <ith-dropdown-menu 
                class="drop-down flex-1" 
                hidden="[[!_eq(action.actionType, 'Workflow')]]"
                value="[[action.workflow]]"
                placeholder="Workflow template"  
                label="Workflow template" 
                name="workflow"
                items="[[workflowTemplates]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <ith-dropdown-menu 
                class="drop-down flex-1" 
                hidden="[[!_eq(action.actionType, 'Notification')]]"
                value="[[action.recipient]]"
                placeholder="Recipient"  
                label="Recipient" 
                name="recipient"
                items="[[recipients]]"
                on-value-changed="_setValue">
              </ith-dropdown-menu>
              <div class="flex-1">
                  <ith-dropdown-menu 
                    class="drop-down flex-1" 
                    hidden="[[!_eq(action.actionType, 'Notification')]]"
                    value="[[action.dType]]"
                    placeholder="Delivery Type"  
                    label="Notify via" 
                    name="dtype"
                    items="[[ntypes]]"
                    on-value-changed="_setValue">
                  </ith-dropdown-menu>
              </div>
              <div class="flex-2"></div>
            </div>-->
          </form>
        </iron-form>
      </div>
    `;
  }

  static get properties() {
    return {
      event: { 
          type: Object,
          observer: "_dataChanged"
      },
      action: {
          type: Object
      },
      _sensors: {
          type: Array,
          value: []
      },
      _devices: {
          type: Array,
          value: []
      },
      category:{
           type:String
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

      recipients: Array,
      ntypes: {
          type: Array,
          value: [ 'email', 'sms' ]
      },
      workflowTemplates: Array,
      forwardToSystem: Array,

      _durations: {
        type: Array,
        value: function(){
          return []
        }
      },

      _alertTypes: {
        type: Array,
        value: function(){
          return ['Notification', 'Workflow']
        }
      },

      _timePeriodLabel: {
        type: Array,
        value: function(){
          return ['Time Period', '']
        }
      },

      _timePeriod: {
        type: String,
        observer: '_onTimePeriodChanged'
      },

      _alertType: {
        type: String,
        value: 'Notification',
        observer: '_onAlertTypeChanged'
      },

      _hidden: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      _hideTimePeriodDropDown: {
        type: Boolean,
        value: false
      },
       start: {
        type: String
      },
      end: {
        type: String
      }
    }; 
  }

  static get observers() {
    return ['_setTimePeriodAndAlertType(event.eventTrigger.time, event.eventAlert.alertType)'];
  }

  connectedCallback(){
    super.connectedCallback();
    var self = this;
    var number = [];

    for(var i=0;i<=60;i++){
      number.push(i);
    }
    
    this.set('_durations', number);
    setTimeout(() => {
      self._setValue();
    }, 100); 
  }

  _setValue(){
    var formSerializeData = this.$.ironForm.serializeForm()
    var obj = {...this.event, ...formSerializeData}
    this.set('value', obj);
  }

  _setTimePeriodAndAlertType(timePeriod, alertType){
    this.set('_timePeriod', timePeriod);
    this.set('_alertType', alertType);
  }
  
  _eq(str1, str2){
    
    return str1 === str2;
  }

  _onTimePeriodChanged(e){
    if(this._timePeriod === 'Time Period'){
      this.set('_hideTimePeriodDropDown', true);
      return;
    }

    this.set('_hideTimePeriodDropDown', false);
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

  _dataChanged() {
      var sensors = [];
      sensors.push(this.event.tag);
      this._sensors = sensors;

      var devices = [];
      devices.push(this.event.deviceId);
      this._devices = devices;

      var recps = [];
      if (this.action != undefined) {
          recps.push(this.action.recipient);
          this.recipients = recps;
      }

      var timePeriod = [];
      timePeriod.push(this._getLabel(this.event.timeType));
      this._timePeriodLabel = timePeriod;
  }

  _getLabel(type) {
      if (type == 'WithinPrevious') {
          return "Within";
      } else if (type == 'AtTime') {
          return "Time";
      } else if (type == 'TimePeriod') {
          return "Time Period";
      }

     // return type;
  }


  _getTime2(dt) {
      var odt = new Date(dt);
      var m = odt.getMinutes();
      if (m< 10)
      {
       m = "0" + m;
      }

     // console.log(odt.getDate()+"--"+odt.toUTCString()+"----"+odt.getHours()+":"+m);
      return odt.getHours() + ":" + m;
  }
  _getTime1(dt) {
      var odt = new Date(dt);
      var utc = odt.getTime() + (odt.getTimezoneOffset() * 60000);
     var nd = new Date(utc);
      var m = "0" + nd.getMinutes();
      //var t=odt.getHours()+localOffset;
      //var s=odt.toUTCString();
     // console.log(odt.getDate()+"--"+utc+"--"+odt.toUTCString()+"----"+odt.getHours());
     // var m=odt.getMinutes();
      //odt.setTime(dt);
      // if ((m.substr(-2)) < 10) {
   // m = "0" + m;
  //}
       

      return nd.getHours() + ":" + m.substr(-2);
  }

    _getTime(dt) {
      var odt = new Date(dt);
      var m = odt.getMinutes().toLocaleString('en-US', {timeZone: "Asia/Kolkata"});
      if (m< 10)
      {
       m = "0" + m;
      }
     // console.log(odt.getDate()+"--"+odt.toUTCString()+"----"+odt.getHours()+":"+m);
      return odt.getHours().toLocaleString('en-US', {timeZone: "Asia/Kolkata"}) + ":" + m;
  }
     _eq1(str1){
       if(str1==null)
        {
       return true;
        }
        else
         {
         return false;
         }
  }

    _checklabel(str1){
       if(str1=="1"||str1=="true")
        {
        
        return "Generate " +this.category+" Event";
        }
        else if(str1=="0"||str1=="false")
         {
         return "Generate "+this.category+" Missed Event";
         }
        else if(str1=="2")
         {
         return "Generate Both (" +this.category+" Event and "+this.category+" Missed Event)";
         }
  }

    _changedTime(e)
      {
         var evt={};
      var evts=[];
      evt.start=this.$.stime.value;
    evt.end=this.$.etime.value;
    evt.tag=this.event.tag;
    evt.sequence=this.event.sequence;
      // this.start=e.target.value;
       this.dispatchEvent(new CustomEvent('patient-edit-templates', { detail: evt}));
      }
   
   _changeToTime(e)
      {
       this.end=e.target.value;
  this.dispatchEvent(new CustomEvent('patient-edit-templates', { detail: {'start':this.$.stime.value, 'end':this.end,'tag':this.event.tag,'sequence':this.event.sequence }}));
      }

}

window.customElements.define('ith-patient-event-settings', IthPatientEventSettings);
