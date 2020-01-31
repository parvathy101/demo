import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '../../shared-styles/paper-button-styles';
import '../../shared-styles/shared-styles';
import './ith-parameter-list-item.js';
//import { openParameterAddEditDialog } from '../../actions/patient-event-teplates.js';

class IthParameterListView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
        :host {
          display: block;
        }
        .container {
          background: var(--light-theme-background-color);
          padding: 16px 50px 29px 46px;
        }
        paper-button.filledBlue {
          min-width: 140px;
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
        ith-parameter-list-item.param-item{
          background: var(--table-background-color);
        }
        ith-parameter-list-item.param-item:nth-of-type(odd){
          background: var(--very-pale-blue-grey);
        }
      </style>
      <div class="container">
        <div class="layout horizontal event-title-container">
          <div class="flex-1 event-title self-end">Parameter sets</div>
          <paper-button class="filledBlue" on-tap="_openParameterAddEditDialog">+ add parameter set</paper-button>
        </div>
        <div class="no-event-view" hidden>
            <div class="not-event-view-text">Please add parameter sets to the event pattern</div>
        </div>
        <div class="layout horizontal header-list-container">
          <div class="flex-1 layout vertical center-justified border header-cell-content">parameter</div>
          <div class="flex-3 layout vertical center-justified border header-cell-content desc-content">description</div>
          <div class="flex-1 layout vertical center-justified border header-cell-content"></div>
        </div>

        <template is="dom-repeat" items="[[_eventList]]">
          <ith-parameter-list-item 
          on-edit-param="_openParameterAddEditDialog"
          on-delete-param="_deleteParameter"
          item="[[item]]"  
          class="param-item">
          </ith-parameter-list-item>
        </template>

      </div>
    `;
  }

  static get properties() {
    return {
      _eventList: {
        type: Array,
        value: function(){
          return [{
            'name': 'param1',
            'id': 'param1',
            'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          },{
            'name': 'param2',
            'id': 'param1',
            'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          }]
        }
      }
    }
  }

  _openParameterAddEditDialog(e) {
    if(!e || !e.detail){
      return;
    }

  }

  _deleteParameter(e) {

  }

}

window.customElements.define('ith-parameter-list-view', IthParameterListView);
