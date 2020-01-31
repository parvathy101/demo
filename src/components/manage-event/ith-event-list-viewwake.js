import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/shared-styles';
import "./ith-event-list-itemwake.js";
import './ith-event-add-edit-dialog.js';
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';

class IthEventListViewWake extends (PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles add-event-param-styles">
        :host {
          display: block;
          padding-top: 20px;
        }
        .container {
          background: var(--light-theme-background-color);
          padding: 16px 50px 29px 46px;
        }
        paper-button.filledBlue {
          min-width: 140px;
        }
         .frequency-width{
        width: 138px;
      }
       
        .event-title-container {
          padding-bottom: 14px;
        }
        .event-title {
          font-size: 18px;
          font-family: 'Roboto-Bold';
          color: var(--app-accent-color);
        }
        .no-event-view {
          padding: 37px 0px 43px 28px;
          background: var(--very-pale-blue-grey);
        }
        .not-event-view-text {
          font-size: 18px;
          font-family: 'Roboto-Bold';
          color: var(--app-text-color);
        }
        .desc-content{
          padding: 12px 162px 12px 20px;
        }
        ith-event-list-item.event-item{
          background: var(--table-background-color);
        }
        ith-event-list-item.event-item:nth-of-type(odd){
          background: var(--very-pale-blue-grey);
        }
      </style>
      <div class="container">
        <div class="layout horizontal event-title-container">
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
        <div class="no-event-view" hidden>
            <div class="not-event-view-text">Please add events to the event pattern</div>
        </div>
        <div class="layout horizontal header-list-container">
          <div class="flex-1 layout vertical center-justified border header-cell-content">Sensor To Use</div>
          <div class="flex-3 layout vertical center-justified border header-cell-content desc-content">Sensor Type</div>
          <div class="flex-1 layout vertical center-justified border header-cell-content">Select</div>
        </div>
        <div>
       
          <ith-event-list-itemwake  class="event-item" email="[[email]]" id="update" on-add-event="getDetails"></ith-event-list-itemwake>
        
</div>
      </div>
    `;
  }

  static get properties() {
    return {
      _eventList: {
        type: Array,
        value: []
      },
       email: {
            type: String,
            observer: '_changePage'
        },
    _List: {
        type: Array,
        value: []
      },
     hide: {
          type: Boolean,
          value: true
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


  addNewEvent(event) {
      var evt = event.detail;
      var evts = [];
      for (var i = 0; i < this._eventList.length; i++) {
          evts.push(this._eventList[i]);
          
      }
      evt.sequence = this._eventList.length + 1;
      evts.push(evt);
      this._eventList = evts;
      this.hide=true;
    
  }

  _stateChanged(state) {

  }

  getEvents() {
      
      this.$.update.sensorList();
   
      return this._eventList;
  }
   load()
{

    this.$.timeType.value=null;
    this.$.startTime.value=undefined;
    this.$.endTime.value=undefined; 
    this.$.update.load(this.email);
    
}
   eload(d,st,en)
{
   
   var time;
   var start;
   var end;
   var sen=[];
   var gen;
    for(var i=0;i<d.length;i++)
        {
      // sen[i]=d[i].tag+","+d[i].sequence;
       sen[i]=d[i].tag;
       gen=d[i].generateEvent;
         }
      
        time="Time Period";
    this.$.timeType.value=time;
    this.$.startTime.value=st;
    this.$.endTime.value=en; 
     this.$.update.eload(sen,gen);
    
}
_changePage()
{

  this.$.timeType.value=null;
    this.$.startTime.value=undefined;
    this.$.endTime.value=undefined; 

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

      today = yyyy + '/' + mm + '/' + dd;
      return today + ' ' + time;
  }
_appendedDate(da,mm,yy,hh,mt) {

    if(mm<10) {
              mm = '0'+mm;
      } 

      if(da<10) {
              da = '0'+da;
      }

       if(hh<10) {
              hh= '0'+hh;
      } 

      if(mt<10) {
              mt = '0'+mt;
      }
      
      return da + '/' + mm + '/' + yy +' '+ hh +':'+mt;
  }

_translate() {
      var tt = this.$.timeType.value;
      var time = {};
      
       if (tt == "Time Period") {
           time.timeType = "TimePeriod";
          //time.startTime = this._appendedToday(this.$.startTime.value);
            var sdt=new Date(this._appendedToday(this.$.startTime.value));
            var tsdt=Math.floor(sdt.getTime());
            time.startTime =tsdt;
             var edt=new Date(this._appendedToday(this.$.endTime.value));
             var tedt=Math.floor(edt.getTime());
            time.endTime =tedt;
          //time.endTime = this._appendedToday(this.$.endTime.value);


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

  getDetails(event) {
    
      
        var evtTemplate = event.detail;
       var tag= evtTemplate.tag;
     
        var evts = [];   
       for(var i=0;i<tag.length;i++)
        {
            
              var evtDetails = this._translate(); 
           evtDetails.name="zsS"+Math.random();
           evtDetails.description = evtTemplate.description;
           evtDetails.category = evtTemplate.category;
           evtDetails.generateEvent= evtTemplate.generateEvent;
           evtDetails.timeOut= "NA";
           evtDetails.tag=tag[i];
           evtDetails.sequence=i+1;
          
           evts.push(evtDetails);
         
         
        }
          this._eventList=evts;
        
  }
    

}

window.customElements.define('ith-event-list-viewwake', IthEventListViewWake);
