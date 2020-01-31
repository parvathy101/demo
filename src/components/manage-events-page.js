import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element';
import '../shared-styles/shared-styles';
import './manage-event/ith-manage-event-search-view.js';
import './manage-event/ith-manage-event-search-list-view.js';
import './manage-event/ith-patient-event-template-list-view.js';
import './manage-event/ith-add-template-view.js';
import './manage-event/ith-edit-template-view.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '../api/telehealthcareflow-searcheventtemplates.js';
import '../api/telehealthcareflow-getsubscribereventdetails.js';
import "../smart/smart-config.js";
import '@polymer/paper-toast/paper-toast.js';
import '../api/telehealthcareflow-deleteeventtemplate.js';

class ManageEventsPage extends (PolymerElement) {
  static get template() {
    return html `
      <style include="iron-flex iron-flex-factors iron-flex-alignment">
      
        :host {
          display: block;
          position: relative;
          background-color: var(--pale-blue-grey);
          @apply --layout-vertical;
          margin: 26px 40px 0px 40px;
        }
        .search-result {
          display: none;
        }
        paper-toast {
        width: 300px;
        margin-left: calc(50vw - 150px);
        margin-bottom: calc(50vw - 150px);
        background:#e5ebef;
        color:#2f3042;
      }
        :host([_is-search-mode]) .search-result { 
          display: flex;          
          box-shadow: 0px -3px 0px rgba(47, 48, 66, 0.15);          
          background: white;
          padding: 92px 24px 34px 24px;
          margin: -80px 40px 40px 40px;
        }
        :host([_mode="ADVANCED_SEARCH"]) .search-result{          
          padding-top: 42px;          
          margin-top: -41px;        
        }
        :host([_is-search-mode]) .event-templates-list{
          display: none;
        }
        :host([_screen-size='small']){
           overflow: auto;
        }
        :host([_view="CREATE_TEMPLATE"]){
          background-color: var(--light-theme-background-color);
          margin-top: 11px;
        }
        @media (max-width: 767px) {
          :host {
           overflow-y: auto;
         }
         :host([_is-search-mode]) .search-result {
            box-shadow: none;
            margin: 0px 4px 4px 4px;
            padding: 8px 5px 5px 5px;
         }
         :host {
           margin: 8px;
         }
        }
      </style>
      <template is="dom-if" if="[[_isVisible(_view, 'LIST')]]">
        <ith-manage-event-search-view on-search-now="_search" on-search-close="_resetSearch" search-query="{{searchQuery}}" search-result="{{searchResult}}" 
                    on-show-createtemplate="_showCreateTemplate" mode="{{_mode}}"></ith-manage-event-search-view> 
        <ith-manage-event-search-list-view class="search-result"  subscriber="[[email]]" on-added-templates="_reloadData"
            search-query="{{searchQuery}}" search-result="{{searchResult}}" mode="{{_mode}}" id="l1" selectedTemplates={{stn}}></ith-manage-event-search-list-view>
        <ith-patient-event-template-list-view class="event-templates-list" event-templates="[[subscriberEvents]]" on-delete-eventtemplates="_deleteTemplate" on-edit-eventtemplates="_editTemplate"></ith-patient-event-template-list-view>
      </template>
      <template is="dom-if" if="[[_isVisible(_view, 'CREATE_TEMPLATE')]]">
        <ith-add-template-view id="lload" on-hide-createtemplate="_showListView" email="[[email]]" on-added-templates="_reloadData"></ith-add-template-view> 
      </template> 
      <template is="dom-if" if="[[_isVisible(_view, 'EDIT_TEMPLATE')]]" id="tif">
        <ith-edit-template-view id="eload" on-hide-createtemplate="_showListView" email="[[email]]" temp="[[tempname]]" on-edited-templates="_reloadEditData"></ith-edit-template-view>
      </template>
     <paper-toast id="toast"></paper-toast>
      <telehealthcareflow-searcheventtemplates id="searchTemplates" on-events-result="_setupResult" on-session-expired="_session"></telehealthcareflow-searcheventtemplates>
      <telehealthcareflow-getsubscribereventdetails id="geteventdefs" on-subscriber-events="_setupData" email="[[email]]" on-session-expired="_session"></telehealthcareflow-getsubscribereventdetails>

  <smart-config id="globals"></smart-config>
     <!--<iron-ajax 
                 id="ajax1"
                 url="http://[[server]]/php/api/deleteSubscriberEvent.php"
                 body='{"subscriber":"[[email]]","eventName":"[[eventname]]"}'
                 last-response="{{response}}"
                  on-response="_respon"
                 method="post"
                  handle-as="json"
                 content-type="application/json"
              > </iron-ajax>-->
<telehealthcareflow-deleteeventtemplate id="deletetemplate" on-deleted-eventtemplate="_deleteSaveTemplate" on-deleteeventtemplate-error="_error" on-session-expired="_session"></telehealthcareflow-deleteeventtemplate>
    `;
  }

  static get properties() {
    return {
      active: {
        type: Boolean,
        observer: '_onActiveChanged'
      },
      searchQuery: String,
      _isSearchMode: {
        type: Boolean,
        reflectToAttribute: true,
        value: false,
        computed: '_computeIsSearchMode(searchQuery, _mode)'
      },
      _mode: {
        type: String,
        reflectToAttribute: true
      },

      _view: {
        type: String,
        reflectToAttribute: true,
        value: "LIST"
      },

      _screenSize: {
        type: String,
        reflectToAttribute: true
      },

      searchResult: {
          type: Array,
          reflectToAttribute: true,
          notify: true,
      },
      server: {
            type: String
        },

      subscriberEvents: {
          type: Array,
          reflectToAttribute: true,
          notify: true
      },
      tempname: {
          type: String
      },
      email: {
          type: String,
          observer: '_changePage'
      },
      eventname: {
          type: String
      },
      stn: {
          type: Array,
          reflectToAttribute: true,
          notify: true
      },
     subscriber: {
          type: Object
      },
     response:{
          type:Object 
         }

    }
  }  connectedCallback() {
      super.connectedCallback();
   // this.shadowRoot.querySelector('#eload').load();
 
    
    }

  _changePage()
    {
    
      //if(this.$.ajax1.lastRequest){
           
           // this.$.ajax1.lastRequest.abort();
          // }
    }


  _computeIsSearchMode() {
    return (this.searchQuery || this._mode === 'ADVANCED_SEARCH');
  }

  _onActiveChanged(newVal, oldVal){
    if(!newVal && oldVal){
    }
  }

  _isVisible(a, b){
    
    return a === b;
  }

  _search(event){
    this.searchQuery = event.detail.searchQuery;
    this.$.searchTemplates.search(this.searchQuery,this.email);

   
  }

  _setupResult(event) {
      this.searchResult = event.detail.events;
  }

  _resetSearch() {
      this.searchQuery = "";
      this.searchResult = undefined;
    
  }

  _showCreateTemplate() {
      this._view = "CREATE_TEMPLATE";
  //   this.shadowRoot.querySelector('#lload').load();
     

  }

  _showListView() {
      this._view = "LIST";
      
       
     
  }

  _reloadData() {
       this.subscriberEvents=null;
      this.loadData(this.email);
      this._resetSearch();
     
  }

  loadData(subscriber) {
       this.subscriber=null;
        this.server=this.$.globals.server;
    //   this.email=null;
      this.email = subscriber;
       this.subscriberEvents=null;
       this._resetSearch();
       this.stn=null;
         this._showListView();
      this.$.geteventdefs.getEventdefs(subscriber);
       
  }

  _setupData(event) {
      this.subscriberEvents=null;
    //  this.shadowRoot.querySelector('#lload').load();
      this.subscriberEvents = event.detail.data;

      
  }

   _deleteTemplate(e)
   {
  
        
          
         
    this.eventname=e.detail.eventname;
    this.$.deletetemplate.deleteEventTemplate(this.eventname,this.email);
    //this.email=email;
    
   }  
   _respon(r)
    {
    console.log(r);
    this.loadData(this.email);
    }

  _editTemplate(e)
    {
     
  // alert(e.detail.eventname+"***"+e.detail.tag+"***"+e.detail.sequence+"***"+e.detail.start+"***"+e.detail.end);
   this._view = e.detail.title;
   this.tempname=e.detail.eventname;
   this.$['tif'].render();
   this.shadowRoot.querySelector('#eload').load(e.detail.eventname,e.detail.description,e.detail.type,e.detail.eventDetails,e.detail.start,e.detail.end);
    }
_reloadEditData() {
        
       this.subscriberEvents=null;
         this._view = "LIST";
      this.loadData(this.email);
      this._resetSearch();
     
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

_deleteSaveTemplate(e)
{
this._reloadData();

}
  
}

window.customElements.define('manage-events-page', ManageEventsPage);
