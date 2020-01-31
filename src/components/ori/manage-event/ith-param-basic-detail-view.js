import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '../../shared-styles/shared-styles';
import '../../shared-styles/input-styles';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../shared-styles/add-event-param-styles';

class IthParamBasicDetailView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles add-event-param-styles input-styles iron-flex iron-flex-factors iron-flex-alignment">
        input {
          font-size: 14px;
          padding-left: 6px;
        }
      </style>
      <div class="layout horizontal add-template-header center">
        <div class="add-template-header-title flex-1">Parameter set Detail</div>
        <div class="help-icon-container">
          <!--<paper-icon-button icon="icons:help-outline" class="help-icon"></paper-icon-button>-->
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
        <div class="event-params-basic-detail-view layout horizontal">
          <div class="flex-2">
            <div class="container layout vertical flex-1">
              <div class="basic-detail-title">Parameter set title:</div>
              <iron-input bind-value="{{_templateTitle}}">
              <input id="search" placeholder="eg. Getting out of Bed">
              </iron-input>
              <div class="basic-detail-title basic-detail-title-padding">Short description:</div>
              <textarea id="textarea" rows="5" autocomplete="off" placeholder="Please add short description to describe the template"></textarea>
              <div class="basic-detail-title basic-detail-title-padding">Category:</div>
              <ith-multi-select items="[[categories]]" 
                placeholder-text="eg Health & Nutrition, Dementia" default-text="eg Health & Nutrition, Dementia">
              </ith-multi-select>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return { 
      categories: Array
    }
  }
}

window.customElements.define('ith-param-basic-detail-view', IthParamBasicDetailView);
