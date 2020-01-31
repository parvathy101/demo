import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element';
import '../shared-styles/shared-styles';
import './manage-event/ith-manage-event-search-view';
import './manage-event/ith-patient-event-template-list-view';
import {store} from '../store';
import {connect} from 'pwa-helpers/connect-mixin';
import {patientEventTemplates, getPatientEventTemplates} from '../reducers/patient-event-templates'
import { eventTemplatesSelector } from '../reducers/event-templates';

store.addReducers({patientEventTemplates});

class ManageEventsPage extends connect(store)(PolymerElement) {
  static get template() {
    return html `
      <style include="iron-flex iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
          position: relative;
          background-color: var(--very-pale-blue-grey);
         @apply --layout-vertical;
        }
        .search-result {
          display: none;
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
        @media (max-width: 767px) {
         :host([_is-search-mode]) .search-result {
            box-shadow: none;
            margin: 0px 4px 4px 4px;
            padding: 8px 5px 5px 5px;
         }
        
        }
      </style>
      <ith-manage-event-search-view search-query="{{_searchQuery}}" mode="{{_mode}}"></ith-manage-event-search-view>
      <ith-manage-event-search-list-view class="search-result" 
            search-query="{{_searchQuery}}" mode="{{_mode}}"></ith-manage-event-search-list-view>
      <ith-patient-event-template-list-view class="event-templates-list" 
                                            items="[[patientEventTemplates]]"
                                            event-templates="[[eventTemplates]]"
                                            ></ith-patient-event-template-list-view>
    `;
  }

  static get properties() {
    return {
      active: Boolean,
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
      patientEventTemplates: {
        type: Array,
        value: () => []
      },

      /**
       * Key is eventTemplate, it's value is EventTemplate instance. 
       */
      eventTemplates: {
        type: Object
      },

      _screenSize: {
        type: String,
        reflectToAttribute: true
      }
    }
  }

  _computeIsSearchMode() {
    return (this.searchQuery || this._mode === 'ADVANCED_SEARCH');
  }

  _stateChanged(state) {
    if(state.app.page === 'manage-events'){
      this._screenSize = state.app.screenSize;
      this.searchQuery = state.eventTemplateSelection.searchQuery;
      this.patientEventTemplates = getPatientEventTemplates(state);
      this.eventTemplates = eventTemplatesSelector(state);
    }
  }
}

window.customElements.define('manage-events-page', ManageEventsPage);
