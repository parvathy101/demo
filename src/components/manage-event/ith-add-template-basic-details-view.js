import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-radio-button/paper-radio-button';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/iron-input/iron-input';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-button/paper-button';
import '../../shared-styles/input-styles';
import '../../shared-styles/shared-styles';
import '../../elements/ith-event-status-select/ith-event-status-select.js';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';

class IthAddTemplateBasicDetailsView extends (PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles input-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
     // *{ -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; margin:0;padding:0;}
        :host {
          display: block;
        }
        .container {
          padding: 0px 82px 37px 0px;
        }
        .view-container {
          padding: 23px 23px 0px 48px;
          background: var(--light-theme-background-color);
        }
        .add-info {
          background: var(--very-pale-blue-grey);
          margin-bottom: 24px;
          padding: 21px 40px 21px 37px;
        }
        input {
          font-size: 14px;
          padding-left: 6px;
        }
        ith-event-status-select {
          width: 140px;
          padding-bottom: 27px;
        }
        paper-radio-group {
          margin: 24px 0px 24px 0px;
        }
        paper-radio-button {
          padding: 0px 14px 0px 0px;
        }
        .min-drop-down {
          margin-right: 24px;
        }
        .minmum-dropdown {
          width: 50%;
        }
       .btn-container {
         // background: var(--app-accent-color);
          padding: 20px 21px 21px 0px;
        }
        paper-button.filledWhite {
          min-width: 200px;
        }
      </style>
      <div class="layout horizontal add-template-header center">
        <div class="add-template-header-title flex-1">Template Details</div>
        <div class="help-icon-container">
         <!-- <paper-icon-button icon="icons:help-outline" class="help-icon"></paper-icon-button>-->
          <div class="help-info-container">
            <div class="help-title">Help title</div>
            <div class="help-info">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </div>
      </div> 
      
      <div class="layout horizontal add-template-view-container">
        <div class="view-container layout horizontal flex-1"> 
          
          <div class="container layout vertical flex-1">
            <div class="basic-detail-title ">Template name</div>
            <iron-input bind-value="{{_templateTitle}}">
               <input id="name" placeholder="eg. Getting out of Bed" autocomplete="off" style ="width:500px; margin-left:20px">
            </iron-input>
            <div class="basic-detail-title "></div>
            <div class="basic-detail-title">Short description</div>
            <textarea id="description" rows="5" placeholder="Please add short description to describe the template" autocomplete="off" style ="width:500px; margin-left:20px"></textarea>
            <div class="basic-detail-title "></div>
            <div class="basic-detail-title">Event Type</div>
              <ith-dropdown-menu 
            class="flex-1 dropdown-margin" 
             value="{{event.category}}" 
            name="category"
             items="[[_eventTemplateCategories]]"
            id="category"
            on-value-changed="_value"
            style ="width:500px; height:100px; margin-left:20px"
          </ith-dropdown-menu>
          </div>


         <!-- <div class="add-info flex-1 layout vertical">
           
           <div class="btn-container layout vertical">
          <paper-button class="filledWhite" on-tap="">
            reuse existing Template
          </paper-button>
      
        </div>
       
        </div>-->
      </div>
    `;
  }

  static get properties() {
    return {
      id: String,
      name: String,
      type:String,
      _minMaxValue: {
        type: Array,
        value: function(){
          return []
        }
      },
      _selected: {
        type: String,
        value: 'max',
        observer: '_onSelectedChanged'
      },

      _hideMinMaxRadionBtn: {
        type: Boolean,
        value: false
      },

       /**
       * Represents array of  event template categories list e.g. [{id: 1, name: 'Category  1'}, {id: 2, name: 'Category  2'}]
       */
      _eventTemplateCategories: {
        type: Array,
        value: function(){
          return ['Inactivity', 'WakeUp','Breakfast','BathroomBreak']
        }
      },

      _dayOfWeek: {
        type: Array,
        value: function(){
          return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        }
      },
      _view: {
        type: String,
        reflectToAttribute: true,
        value:"gen"
      },
       email: {
            type: String,
            observer: '_changePage'
        }
    
    }
  }
  
  

  getEvent() {
      var event = {};
      event.name = this.$.name.value;
      event.description = this.$.description.value;
     
      event.category = this.$.category.value;
      
      event.tag = "abc";
      event.appliesTo = "subscriber"; //for now, carehome not implemented
      event.eventType = "normal"; //current not modifiable?

      return event;
  }
   load()
   {
     this.$.name.value=null;
     this.$.description.value=null;
     this.$.category.value="";
  //   this.$.category._setSelectedValues();
   //  this.$.tag.value="";
   // this.$.minValue.value=null;
//this.$.maxValue.value=0;
//this.$.minMaxValue.value=0;
//this.$.min.value=null;
//this.$.max.value=null;

     
   }
 _changePage()
{

   this.$.name.value=null;
     this.$.category.value="";

}
 

    _value(e)
     {
       
    
      this.type=e.target.value;
    
      this.dispatchEvent(new CustomEvent("event-type", { detail:this.type})); 
     }
}

window.customElements.define('ith-add-template-basic-details-view', IthAddTemplateBasicDetailsView);
