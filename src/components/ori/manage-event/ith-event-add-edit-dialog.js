
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-dialog-behavior/paper-dialog-shared-styles';
import { PaperDialogBehavior } from '@polymer/paper-dialog-behavior/paper-dialog-behavior';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';
import '../../shared-styles/shared-styles';
import '../../shared-styles/add-event-param-styles';
import './ith-event-basic-detail-view.js';
import './ith-event-trigger-view.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
//import { closeEventAddEditDialog } from '../../actions/patient-event-teplates.js';
import '@polymer/paper-toast/paper-toast.js';

class IthEventAddEditDialog extends (mixinBehaviors([PaperDialogBehavior], PolymerElement)) {
  static get template() {
    return html`
    <style include="shared-styles add-event-param-styles iron-flex iron-flex-factors iron-flex-alignment paper-dialog-shared-styles paper-button-styles">
      :host {
        display: block;
        min-width: 1024px;
        top:60px;
      }
      paper-toast {
   width: 300px;
   margin-left: calc(50vw - 150px);
margin-bottom: calc(50vw - 150px);
background:#e5ebef;
color:#2f3042;
}
  @media (min-width:992px)and (max-width:1200px){
        :host{
          min-width:800px;
        }
      }
      @media (min-width:641px) and (max-width:991px){
        :host{
          min-width:600px;
        }
      }
      @media (max-width:640px){
        :host{
          min-width:300px;
        }
    </style>
    <div class="layout horizontal center main-header">
      <div class="main-title">[[_computeTitle(_id)]]</div>
      <span class="flex"></span>
      <paper-icon-button dialog-dismiss="" class="dialog-close" icon="close"></paper-icon-button>
    </div>
    <paper-dialog-scrollable dialog-element="[[_dialogElement]]">
      <div class="dialog-content-container">
          <ith-event-basic-detail-view id="basic" categories="[[_eventTemplateCategories]]" email="[[email]]"></ith-event-basic-detail-view>
          <ith-event-trigger-view id="details"></ith-event-trigger-view>
      </div>
    </paper-dialog-scrollable>
    <div class="btn-container layout vertical end">
      <paper-button on-tap="addEvent" class="filledWhite">
        add sensor
      </paper-button>
       <paper-toast id="toast"></paper-toast>
    </div>
   `;
  }

  static get properties() {
    return {
      _dialogElement: {
        type: Object,
        value: function() {
          return this;
        }
      },

       /**
       * Represents array of devices. e.g. [{id: 1, name: 'Device  1'}, {id: 2, name: 'Device  2'}]
       */
      _devices: {
        type: Array,
        value: () => []
      },

     /**
      * Represents array of  event template categories list e.g. [{id: 1, name: 'Category  1'}, {id: 2, name: 'Category  2'}]
      */
     _eventTemplateCategories: {
      type: Array,
      value: () => []
      },
    email: {
            type: String
        }

    };
  }
   load()
  {

this.$.basic.load();
this.$.details.load();
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('iron-overlay-closed', this._closeDialog);
  }

  _closeDialog() {
  }

  _computeTitle(id){
    if(!id){
      return 'Add event';
    }

    return 'Edit event';
  }


  addEvent() {
      var evtTemplate = this.$.basic.getEventTemplate();
      var evtDetails = this.$.details.getDetails();
       var toast = this.$.toast;
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
          var dt=dd+"/"+mm+"/"+yyyy;
      evtDetails.name = evtTemplate.name;
      evtDetails.description = evtTemplate.description;
      evtDetails.category = evtTemplate.category;
      evtDetails.tag = evtTemplate.tag;
      
   /*   if(evtTemplate.name=="")
       {
       toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the EventName"
  });
      return false;
       }

     
      if(evtTemplate.description=="")
       {
       toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the description"
  });
      return false;
       }
       if(evtTemplate.category=="")
       {
       toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the category"
  });
      return false;
       }*/
     if(evtTemplate.tag==null)
       {
       toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please select the sensor"
  });
      return false;
       }

      if(evtDetails.timeType==undefined)
       {
        
       toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please select the Time schedule"
  });
      return false;
       
       }

      this.dispatchEvent(new CustomEvent("add-event", { detail: evtDetails }));
      this.close();
     

  }
}

customElements.define('ith-event-add-edit-dialog', IthEventAddEditDialog);
