import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-button/paper-button';
import '../../shared-styles/paper-button-styles';
import '../../icons/ithings-icons.js';

class IthParameterListItem extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
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
      <div class="layout horizontal">
        <div class="flex-1 title-content cell-content border">[[item.name]]</div>
        <div class="flex-3 desc-content border">[[item.description]]</div>
        <div class="flex-1 cell-content border">
          <paper-button class="filledBlue delete-btn" on-tap="_deleteParameter">
            <iron-icon icon="ithings-icons:delete"></iron-icon>
          </paper-button>
          <paper-button class="filledBlue" on-tap="_editParameter"  hidden="[[hidePatientEventTemplate]]">
            <iron-icon icon="ithings-icons:edit"></iron-icon>
          </paper-button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      item: Object
    }
  }

  _editParameter() {
    this.dispatchEvent(new CustomEvent('edit-param', {detail: {id: this.item.id}}));
  }

  _deleteParameter() {
    this.dispatchEvent(new CustomEvent('delete-param', {detail: {id: this.item.id}}));
  }
}

window.customElements.define('ith-parameter-list-item', IthParameterListItem);
