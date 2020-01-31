import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import './ith-edit-event-list-viewbreakfast';
import '../../shared-styles/shared-styles';
import './ith-parameter-list-view';

class IthEditTemplateListViewBreakFast extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-factors iron-flex-alignment ">
    //  *{ -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; margin:0;padding:0;}
        :host {
          display: block;
        }
        .add-template-header  {
          padding-right: 68px;
        }
        ith-parameter-list-view {
          margin-top: 20px;
        }
      </style>
      <div class="layout horizontal add-template-header center">
        <div class="add-template-header-title flex-1">Sensor Settings</div>
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
        <ith-edit-event-list-viewbreakfast id="eventlist" email="[[email]]"></ith-edit-event-list-viewbreakfast>
        <!--<ith-parameter-list-view></ith-parameter-list-view> -->
      </div>
    `;
  }

  static get properties() {
    return {
      id: String,
      name: String ,
     email: {
            type: String
        }
    }
  }

  getEvents() {
      return this.$.eventlist.getEvents();
  }
  load()
{
   
  this.$.eventlist.load();
}

  eload(d,st,en)
{
  
  this.$.eventlist.eload(d,st,en);
}
}

window.customElements.define('ith-edit-template-list-viewbreakfast', IthEditTemplateListViewBreakFast);
