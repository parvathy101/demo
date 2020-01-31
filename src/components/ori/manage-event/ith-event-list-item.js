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

class IthEventListItem extends PolymerElement {
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
            type: String
        },
     sensors: {
          type: Array,
          value: []
      },
     subscriber: {
          type: Object
      },
     _minMaxValue: {
        type: Array,
        value: function(){
          return []
        }
      },
    }
  }
    connectedCallback(){
   
    super.connectedCallback();
   
    var thresh= [];

    for(var i=0;i<=60;i++){
      thresh.push(i+" min")
    }
    this.set('_minMaxValue', thresh);
  }
  
  _editEvent() {
    this.$.addeditevent.open();
    this.$.addeditevent.load(this.item.name,this.item.description,this.item.category,this.item.tag,this.item.time,this.item.timeType,this.item.duration,this.item.startTime,this.item.endTime);
    
  }

  _deleteEvent() {
    this.dispatchEvent(new CustomEvent('delete-event', {detail: {id: this.item.id}}));
  }


 EditedEvent(event) {
      var evt = event.detail;
      var evts = [];
      for (var i = 0; i < this._eventList.length; i++) {
          evts.push(this._eventList[i]);
          
      }
      evt.sequence = this._eventList.length + 1;
      evts.push(evt);
      this._eventList = evts;
     this.dispatchEvent(new CustomEvent('edit-event', {detail:{list:this._eventList}}));
    
  }
    getEvent() {
      return this._eventList;
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
    
    this.$.searchdev.getDetails(aaa);
   }
}

window.customElements.define('ith-event-list-item', IthEventListItem);
