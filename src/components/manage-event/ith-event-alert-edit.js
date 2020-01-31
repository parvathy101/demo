import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-radio-button/paper-radio-button';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '../../shared-styles/shared-styles';
import '../../shared-styles/input-styles';
import '../../shared-styles/add-event-param-styles';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../api/telehealthcareflow-getsubscriberdetails.js';
import './ith-edit-event-add-edit-dialog.js';
import '@polymer/iron-ajax/iron-ajax.js';

import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-menu-button/paper-menu-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-input/iron-input';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-listbox/paper-listbox';
import '../../shared-styles/paper-menu-button-styles';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {IronFormElementBehavior} from '@polymer/iron-form-element-behavior/iron-form-element-behavior';
import '../../api/telehealthcareflow-associateeventdef.js';
import "../../smart/smart-config.js";
import '@polymer/paper-toast/paper-toast.js';





class IthEventAlertEdit extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles add-event-param-styles input-styles iron-flex iron-flex-factors iron-flex-alignment">
      :host {
        display: block;
        padding-top: 20px;
      } 
       paper-toast {
        width: 300px;
        margin-left: calc(50vw - 150px);
        margin-bottom: calc(50vw - 150px);
        background:#e5ebef;
        color:#2f3042;
      } 
      paper-radio-button {
        padding: 17px 12px 0px 0px;
      }
      .alert-text {
        font-size: 16px;
        font-family: 'Roboto-Regular';
        color: var(--app-text-color);
      }
      #alertType {
        margin-right: 24px;
      }

--paper-listbox-width: 458px;
        height: 50px;
        --paper-menu-button:{
           width: 100%;
        };
        --paper-checkbox-label: {
          display: none;
        }
        --paper-checkbox-checked-color: var(--light-theme-background-color);
        --paper-checkbox-checkmark-color: var(--app-accent-color);
        --paper-checkbox-checked-ink-color: var(--app-accent-color);
      }
      paper-checkbox #checkboxContainer #checkbox.checked {
        background-color: #ff0000);
        border-color:  #ff0000);
      }
      paper-menu-button paper-listbox paper-checkbox {
          padding: 0px;
          border-bottom: none;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        paper-menu-button paper-listbox{
          box-shadow: 0px 3px 0px rgba(189, 203, 213, 1) !important;
        }
        .checkbox-title {
          font-size: 14px;
          font-family: 'Roboto-Regular';
          color: var(--app-accent-color);
          padding: 5px 8px 5px 10px;
          text-align: center;
          border-bottom:  1px solid var(--border-color);
          outline: none;
        }
        .list-container {
          outline: none;
          padding: 0px 8px 0px 20px;
          border-bottom:  1px solid var(--border-color);
          cursor: pointer;
        }
        .list-container:hover{
          background-color:var(--hover-color);
        }

      </style>
      <div class="layout horizontal add-template-header center">
      <div class="add-template-header-title flex-1">Event alert</div>
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
        <div class="layout vertical trigger-view-row-container flex-8">
          <div class="alert-text">Will the alert trigger when the event trigger takes place or if it doesn't?</div>
           <paper-radio-group selected="{{_selected}}">
              <paper-radio-button name="take_palce" id="one">When it takes place</paper-radio-button>
              <paper-radio-button name="tale_not_palce" id="two">if it does not take place</paper-radio-button>
           </paper-radio-group> 
        </div>
      </div>

      <div class="layout horizontal">
        <div class="layout vertical trigger-view-row-container" style="width:100%">
          <ith-dropdown-menu 
            value="{{_alertType}}" 
            id="alertType" 
            label="Alert type"
            name="alertType"
            id = "alertType"
            items="[[_alertTypes]]" style="width:50%">
          </ith-dropdown-menu>
          
        </div>
      </div>
      
      
<iron-ajax 
                 id="ajax"
                 url="http://[[server]]/php/api/selectAlertSetting.php"
                 body='{"name":"[[alertname]]","subscriber":"[[email]]"}'
                 last-response="{{response}}"
                  on-response="handleResponse1"
                 method="post"
                  handle-as="json"
                 content-type="application/json"
              > </iron-ajax>
<template is="dom-repeat" items="[[response.records]]" as="item" id="itemlist" scroll-target="document" selected-item="{{selectedItem}}" selection-enabled grid>
     <div class="layout horizontal">
        <div class="layout vertical trigger-view-row-container" style="width:100%">
          <div class="dropdown-title">Recipients:</div>
          <!--<textarea rows="2" id="recipient" readonly autocomplete="off" value="[[item.recipients]]" style="width:50%"></textarea>-->
            
            <paper-radio-group id="generate" selected="[[fun(item.recipients)]]">
                  <template is="dom-repeat" items="[[subscriber.caretakers]]">
              <paper-radio-button id="[[item.name]]" name="[[item.name]]"   style="padding-right:20px;" on-click="_change" value="[[item.name]]">[[item.name]]</paper-radio-button>
                 </template>
            </paper-radio-group>
              </div>



        </div>
      </div>

<div class="layout horizontal">
        <div class="layout vertical trigger-view-row-container" style="width:100%">
          <div class="dropdown-title">Message:</div>
          <textarea rows="5" id="message" autocomplete="off" value="[[item.message]]" style ="width:50%"></textarea>
</template>
        </div>
      </div>
    <paper-toast id="toast"></paper-toast>
     </div>

<ith-edit-event-add-edit-dialog id="addeditevent" on-edited-event="EditedEvent" email="[[email]]"></ith-edit-event-add-edit-dialog>
<telehealthcareflow-getsubscriberdetails id="searchdev" on-subscriber-details="_saveData" on-session-expired="_session"></telehealthcareflow-getsubscriberdetails>
<smart-config id="globals"></smart-config>
    `;
  }

  static get properties() {
    return { 
      _selected: {
        type: String,
        value: 'take_palce'
      },

      workflowTemplates: {
        type: Array,
        value: function(){
          return  ['worlflow template1','worlflow template2']
        }
      },

      forwardToSystem: {
        type: Array,
        value: function(){
          return  ['system1']
        }
      },

      inputValue: {
        type: Array,
        value: function(){
          return  [{'contanct1': ['EMAIL','APP']},{'contanct2': ['EMAIL','APP']},{'contanct3': ['EMAIL','SMS']}]
        }
      },

subscriber: {
            type: Object
        },
name: String,
output: String,

         email: {
            type: String,
observer: '_changePage'
            
        },
      recipents: {
        type: Array,
        value: function(){
          return [{'id': 'contanct1','name':'apexa kheni'}, {'id': 'contact2', 'name': 'ruchita kheni'},
          {'id': 'contact3', 'name': 'nirmal baladaniya'}]
        }
      },

alertname: {
            type: String
        },


currentPage: {
            type: String,
            notify: true,
            observer: '_changePage'
        },

     _alertType: {
        type: String,
        value: 'Notification',
        observer: '_onAlertTypeChanged'
      },

      _alertTypes: {
        type: Array,
        value: function(){
          return ['Notification']
        }
      },
      server: {
            type: String
        }
    }
  }

  connectedCallback(){
    super.connectedCallback()
this.$.searchdev.getDetails(this.email);
//alert(this.subscriber.devices);
    var elPaperRadioButton = this.shadowRoot.querySelectorAll('paper-radio-button');
    var number = [];

    for(var i = 0 ; i < elPaperRadioButton.length ; i++){
      var elRadioContainer = elPaperRadioButton[i].shadowRoot.querySelector('#radioContainer');
      var onRadio = elRadioContainer.querySelector('#onRadio');
      var offRadio = elRadioContainer.querySelector('#offRadio');
      
      onRadio.style.backgroundColor= '#11367A';
      offRadio.style.backgroundColor= 'white';
    }
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

  _eq(str1, str2){
    return str1 === str2;
  }


_saveAlert()
{
var radioval;
if (this.$.one.checked) {
   radioval = "1";

}
else if (this.$.two.checked) {
  radioval = "0";

}
var alerttype="Notification";
var receipientval=this.output;
//this.$.receipients._isSelectedItem("1", "sms");


}


 _isSelectedItem(id, key){

    if(!this._recipients){
      return;
    }

     var recipientInfo =  this._recipients[id];


     if(!recipientInfo){
       return;
     }

     if(recipientInfo.indexOf(key) === -1){
       return false;
     }

     return true;
  }



  getActionDetails() {
this.server=this.$.globals.server; 
      var action = {};

          action.recipients = this.output;
          action.message = this.shadowRoot.querySelector('#message').value;
     

      return action;
  }

_changePage()
{
this.server=this.$.globals.server; 
   this.subscriber=null;
this.$.searchdev.getDetails(this.email);

}


_onCheckedChanged(e){
    var isChecked = e.detail.value;
if(e.target.checked)
{
    this.output = e.target.name;

}
    var setting = e.target.id;
    var num;

    var index = this.value.findIndex(function(item){
      var key = Object.keys(item)[0];
      return contactId === key;
    });
    
    if(index === -1 && isChecked){
      this._addNewRecipents(setting, contactId);
      return;
    }
    
    if(isChecked){
      this._addNewSetting(index, contactId, setting);
      return;
    }
    
    this._removeSetting(index, contactId, setting);
  }


 _saveData(event)
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


handleResponse1(e) {

//alert("success"+this.$.message.value);
     }

_getData(e)
{
this.alertname = e.detail.alertname;

}




  load()
{


 this.subscriber=null;
this.$.searchdev.getDetails(this.email);

this.$.alertType.value="Notification";
//this.$.message.value="";
}

eload(a)
 {
this.server=this.$.globals.server; 
  this.alertname =a;
  this.$.ajax.generateRequest();
}


_change(e)
{

   if(e.target.checked)
     {
       this.output=e.target.value;
     }
    else
      {
        this.output=this.$.generate.selected;
      } 
}

  fun(recipient)
{
   this.output=recipient;
   return this.output;
}

_session(event)
{
 var session = event.detail.session;
  
    if (session != undefined) 
        {
        if (session.startsWith("Session Expired"))
          {


             var toast = this.$.toast;
             
 		 toast.show({
  			  horizontalAlign: 'left',
  			  verticalAlign: 'bottom',
  			  duration: 10000,
  			  text: "Session Expired. Please login again"
 			 });

                 return false;
  	  }

        }
}
}

window.customElements.define('ith-event-alert-edit', IthEventAlertEdit);
