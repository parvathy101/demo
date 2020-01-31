import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '../../shared-styles/shared-styles';
import '../../shared-styles/input-styles';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../shared-styles/add-event-param-styles';
import '../../api/telehealthcareflow-searcheventtemplates.js';
import '../../api/telehealthcareflow-getsubscriberdetails.js';

class IthEventBasicDetailView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles add-event-param-styles input-styles iron-flex iron-flex-factors iron-flex-alignment">
        input {
          font-size: 14px;
          padding-left: 6px;
        }
        .search-icon {
            float:right;
            position: relative;
            top: -40px;
            right: 0px;
        }
      .event-params-basic-detail-view{
          padding:20px;
        }
      </style>
      <div class="layout horizontal add-template-header center">
        <div class="add-template-header-title flex-1">Select Sensors</div>
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
      <div class="add-template-view-container">
        <div class="event-params-basic-detail-view">
          <div class="flex-2">
            <div class="container layout vertical flex-1">
             <!--  <div class="basic-detail-title">Event Title:</div>
              <iron-input   disabled >
                <input id="eventName" placeholder="eg., motion in bedroom"/>
              </iron-input>
              <div class="basic-detail-title">Short description:</div>
              <textarea id="eventDescription" rows="5" autocomplete="off" placeholder="Please add short description to describe the template"></textarea>
              <div class="basic-detail-title">Category:</div>
              <iron-input   disabled >
                <input id="eventCategory" placeholder="eg Health & Nutrition, Dementia"/>
              </iron-input>-->
              <div class="basic-detail-title basic-detail-title-padding"></div>
            <ith-dropdown-menu 
            class="flex-1"
            id="tag" 
            label="Sensor Used"
            name="tag"
            items="[[sensors]]">
            on-value-changed="_value"
          </ith-dropdown-menu>           
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    <telehealthcareflow-searcheventtemplates id="search" on-events-result="_saveResult"></telehealthcareflow-searcheventtemplates>
   <telehealthcareflow-getsubscriberdetails id="searchdev" on-subscriber-details="_saveDevice"></telehealthcareflow-getsubscriberdetails>
    `;
  }

  static get properties() {
    return { 
      events: {
          type: Array,
          value: []
      },
 sensors: {
          type: Array,
          value: []
      },
       email: {
            type: String
        },
      searchedEvents: {
          type: Object,
          value: {}
      },
        subscriber: {
          type: Object
      },
      searchQuery: {
          type: String
      },
      categories: Array,
      running: {
          type: Boolean,
          value: false
      },
 _tag: {
        type: String,
        value: 'bedsensor'
      },

      _tags: {
        type: Array,
        value: function(){
          return ['bedsensor', 'bedroommotionsensor']
        }
      },
  _events: {
        type: Array,
        value: function(){
          return ['InActivityDayTime', 'Bed Occupied','Bed Not Occupied','Motion Detected']
        }
      },
  

    }
  }
  
 
  _searchTemplates(event) {
      var query = event.detail.value;
      if ((!this.runnin) && (query != undefined) && (query.length > 3)) {
          this.$.search.search(query);
           
          this.running = true;
      }
    
  }

  _saveResult(event) {
      var mapped = {};
      var evts = [];

      for (var i = 0; i < event.detail.events.length; i++) {
          var evt = event.detail.events[i];
          mapped[evt.name] = evt;
          evts.push(evt.name);
      }

      this.searchedEvents = mapped;
      this.events = evts;
      this.running = false;
  }

_saveDevice(ev)
{

     var mapped = {};
      var evts = []; 

   for (var i = 0; i < ev.detail.data.devices.length; i++)
   {
    var evt = ev.detail.data.devices[i];
          mapped[evt.tag] = evt;
          evts.push(evt.tag);
    }
    this.sensors=evts;
    

}

load()
{
//this.$.eventName.value=null;
//this.$.eventDescription.value=null;
//this.$.eventCategory.value=null;
this.$.tag.value=null;
this.$.searchdev.getDetails(this.email);
}

  _selectTemplate() {
      var val = this.$.eventName.value;
      this.eventTemplate = this.searchedEvents[val];
      if (this.eventTemplate != undefined) {
          this.$.eventDescription.value = this.eventTemplate.description;
           this.$.eventCategory.value=this.eventTemplate.category;
      }
  }
   _value()
    {
    
    }

  getEventTemplate() {
           var eventTemplate=[];
       eventTemplate.tag = this.$.tag.value;
       eventTemplate.name=  "zsS"+Math.random();
       eventTemplate.description="";
       eventTemplate.category="";
       return eventTemplate;
  }
}

window.customElements.define('ith-event-basic-detail-view', IthEventBasicDetailView);
