import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-button/paper-button';
import '../../shared-styles/paper-button-styles';
import '../../icons/ithings-icons.js';
import './ith-edit-event-add-edit-dialog.js';
import '../../api/telehealthcareflow-getsubscriberdetails.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '../../shared-styles/shared-styles';
import '../../shared-styles/input-styles';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../shared-styles/add-event-param-styles';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';

class IthEventListItemWake extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles add-event-param-styles input-styles">
        :host {
          display: block;
        }
        .cell-content {
          padding: 12px 24px 12px 20px;
          border-bottom: 2px solid var(--light-theme-background-color);
        }
        .desc-content {
          padding: 12px 162px 12px 20px;
          font-size: 14px;
          font-family: 'Roboto-Regular';
          color: var(--app-text-color);
          border-bottom: 2px solid var(--light-theme-background-color);
        }
        iron-icon{
          top: 5px;
          right: -4px;
          position: absolute;
        }
        paper-button.filledBlue {
          padding: 0px;
          min-width: 30px;
          height: 30px;
        }
        .title-content {
          font-size: 14px;
          font-family: 'Roboto-Bold';
          color: var(--app-text-color);
        }
        .delete-btn {
          margin-right: 10px;
        }
      </style>
      <template is="dom-repeat" items="[[subscriber.devices]]" as="item">

      <div class="layout horizontal">

        <div class="flex-1 title-content cell-content border" id="tag">[[item.tag]]</div>
         <div class="flex-3 desc-content border" id="type">
          
            [[item.deviceType]]

        </div>
       <div class="flex-1 cell-content border" id="radi">
         <paper-radio-button name="{{item.deviceId}}" on-load='_load' on-click="_change" data-args="{{item.deviceId}}" value="{{item.tag}}" id="sensbutton"></paper-radio-button>


      </div>
        </div>
       </template>
       
         <div class="layout horizontal">
           <paper-radio-group id="generate">
              <paper-radio-button id="wake" name="1"   style="padding-right:20px;">Generate WakeUp Event</paper-radio-button>
              <paper-radio-button id="missed" name="0" style="padding-right:20px;">Generate WakeUp Missed Event</paper-radio-button>
               <paper-radio-button id="both" name="2"  style="padding-right:20px;">Both</paper-radio-button>
            </paper-radio-group>
           
          </div>
    
     <ith-edit-event-add-edit-dialog id="addeditevent" on-edited-event="EditedEvent" email="[[email]]"></ith-edit-event-add-edit-dialog>
     <telehealthcareflow-getsubscriberdetails id="searchdev" on-subscriber-details="_saveDevice"></telehealthcareflow-getsubscriberdetails>
    `;
  }

  static get properties() {
    return {
      _eventList: {
        type: Array,
        value: []
      },
      item: Object,
     email: {
            type: String,
            observer: '_changePage'
        },
     sensors: {
          type: Array,
          value: []
      },
     subscriber: {
          type: Object
      },
currentPage: {
            type: String,
            notify: true,
            observer: '_changePage'
        },
     _minMaxValue: {
        type: Array,
        value: function(){
          return []
        }
      },
     sel: {
            type: String,
            observer: '_change'
        }
    }
  }
    connectedCallback(){
   
    super.connectedCallback();
   //this.$.searchdev.getDetails(this.email);
    var thresh= [];

    for(var i=0;i<=60;i++){
      thresh.push(i+" min")
    }
    this.set('_minMaxValue', thresh);
     
  }


_change(e)
   { 
   
   var ev =[];
   ev.push(e.target.value);
     if(e.target.checked)
     {
   this.sensors.push(e.target.value);
     }
     else
      {
          var temp = [];
     for (var i = 0; i < this.sensors.length; i++) {
         var dev = this.sensors[i];
         if (dev == e.target.value) {
         } else {
             temp.push(this.sensors[i]);
         }
     }

     this.sensors = temp;
      }
  
}


_changePage()
{

  this.$.wake.checked=false;
  this.$.missed.checked=false;
  this.$.both.checked=false;
   this.subscriber=null;
  this.sensors.length=0;
this.$.searchdev.getDetails(this.email);

}

  _saveDevice(event)
{
// alert(this.email+"sefws")
  /*   var mapped = {};
      var evts = []; 

   for (var i = 0; i < ev.detail.data.devices.length; i++)
   {
    var evt = ev.detail.data.devices[i];
          mapped[evt.tag] = evt;
          evts.push(evt.tag);
    }
    this.sensors=evts;*/


   if (event.detail.data != undefined) {
          this.subscriber = event.detail.data;
      }  
    
}

  load(aaa)
   {
   
  this.$.wake.checked=false;
  this.$.missed.checked=false;
  this.$.both.checked=false;
   this.subscriber=null;
  this.sensors.length=0;
    this.$.searchdev.getDetails(aaa);
   }
  
  sensorList()
  {
   
   var tag=[];
   var evt={};
      evt.tag=this.sensors;
    //  evt.name = "zsS"+Math.random();
      evt.description = "";
      evt.category="";

      evt.generateEvent=this.$.generate.selected;

   //  return evt;
      this.dispatchEvent(new CustomEvent("add-event", { detail: evt }));
  }

}


window.customElements.define('ith-event-list-itemwake', IthEventListItemWake);
