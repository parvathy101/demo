import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes'
import  '@polymer/iron-icon/iron-icon';
import  '@polymer/paper-button/paper-button';
import  '@polymer/paper-tooltip/paper-tooltip'
import '../../shared-styles/paper-button-styles';

class ithManageEventSearchItem extends PolymerElement {
  static get template() {
    return html`
      <style include="iron-flex paper-button-styles iron-flex-factors iron-flex-alignment">
        :host {
          display: block;
        }
        .cell-margin {
          margin-right: 2px;
        }
        .row {
          margin-bottom: 2px;
          min-height: 100px;
          flex-wrap: wrap;
        }
        .cell-content {
          padding: 19px 20px 19px 20px;
          border-right: 2px solid var(--light-theme-background-color);
        }
        paper-button.btn{
          min-width: 110px;
        }
        .in-use-btn{
            color: var(--app-accent-color);
        }
        .title-content {
          font-size: 16px;
          font-family: 'Roboto-Bold';
          color: var(--app-text-color);
        }
        .description-content {
          font-size: 14px;
          font-family: 'Roboto-Regular';
          color: var(--app-text-color);
          border-right: 2px solid var(--light-theme-background-color);
          padding: 19px 52px 19px 20px;
        }
        iron-icon.sensor-icon {
          --iron-icon-fill-color: var(--app-accent-color);
        }
        .in-used-label {
          min-width: 110px;
          font-size: 16px;
          font-family: 'Roboto-Regular';
          color: var(--app-text-color);
        }
        @media (max-width: 767px) {
         .sensor-container{
           display: none !important;
         }
         .cell-content {
          padding: 0px;
          min-width: 100%;
          border-right: 0px;
          box-sizing: border-box;
         }
         .cell-margin {
          margin-right: 0px;
         }
         .row{
           margin-bottom: 8px;
           padding: 17px;
         }
         .description-content { 
           padding: 16px 0px;
           border-right: none;
         }
        }
      </style>
      <div class="layout horizontal row">
        <div class="cell-content cell-margin title-content flex-1 ">[[template.name]]</div>
        <div class="cell-margin  description-content  flex-2">[[template.description]]</div>
        <div class="cell-margin cell-content flex-1 sensor-container">

          <template is="dom-repeat" items="[[template.sensors]]" as="sensor">
              <iron-icon id="[[_getIdForToolTip(sensor.name)]]" icon="[[_getSensorIcon(sensor.id)]]" class="sensor-icon"></iron-icon>
              <paper-tooltip  for="[[_getIdForToolTip(sensor.name)]]" position="bottom">[[sensor.name]]</paper-tooltip>
          </template>

        </div>
        
        <template is="dom-if" if="[[_isUsed(template.id, used)]]">
          <div class="cell-content  center-justified flex-1">
            <paper-button class="btn in-use-btn" disabled raised>In use</paper-button>
          </div>
        </template>
        
        <template is="dom-if" if="[[!_isUsed(template.id, used)]]">
          <div class="cell-content  center-justified flex-1" hidden="[[selected]]">
            <paper-button id="addEventBtn" class="filledBlue btn" on-tap="_dispatchAddSelection">+ ADD</paper-button>
          </div>
          <div class="cell-content  center-justified flex-1" hidden$="[[!selected]]">
            <paper-button class="borderBlue btn" on-tap="_dispatchRemoveSelection">- REMOVE</paper-button>
          </div>
        </template>
      </div>        
    `;
  }

  static get properties() {
    return {
      template: Object,
      selected: {
        type: Boolean,
        value: false
      },

      /**
       * Array of template id which is used by patient
       */
      used:{
        type: Array
      }
    }
  }

  _dispatchAddSelection() {
    this.dispatchEvent(new CustomEvent('add-selection', {detail: { data: this.template }}));
  }


  _dispatchRemoveSelection() {
    this.dispatchEvent(new CustomEvent('remove-selection', {detail: { id: this.template.name }}));
  }

  _getSensorIcon(sensorId){
    if(sensorId && sensorId.toLocaleLowerCase() === 'bed sensor'){
      return 'ithings-sensor-icons:Temperature';
    }

    if(sensorId && sensorId.toLocaleLowerCase() === 'motion sensor'){
      return 'ithings-sensor-icons:Motion';
    }

    return 'ithings-sensor-icons:Pressure-Sensor';

  }

  _getIdForToolTip(name){
    return name.toLocaleLowerCase().replace(' ', '');
  }

  _isUsed(id, used){
    return used && used.indexOf(id) !== -1 ? true : false;
  }
}

window.customElements.define('ith-manage-event-search-item', ithManageEventSearchItem);
