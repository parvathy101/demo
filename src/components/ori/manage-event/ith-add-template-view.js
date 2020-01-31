import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-button/paper-button';
import './ith-add-template-basic-details-view.js';
import './ith-add-template-list-view.js';
import './ith-add-template-list-viewinact.js';
import './ith-add-template-list-viewwake.js';
import './ith-add-template-list-viewbreakfast.js';
import './ith-add-template-list-viewbathroom.js';
import './ith-event-alert-view.js';
import '../../api/telehealthcareflow-createeventtemplate.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-ajax/iron-ajax.js';
import "../../smart/smart-config.js";


class IthAddTemplateView extends (PolymerElement) {
  static get template() {
    return html`
      <style include="iron-flex iron-flex-factors iron-flex-alignment paper-button-styles">
        :host {
          display: block;
          overflow-y: auto;
        }
          paper-toast {
   width: 300px;
   margin-left: calc(50vw - 150px);
margin-bottom: calc(50vw - 150px);
background:#e5ebef;
color:#2f3042;
}
        .add-template-title {
          font-size: 24px;
          font-family: 'Roboto-Bold';
          color: var(--app-accent-color);
        }
        paper-icon-button.close-icon{
          --iron-icon-fill-color: var(--app-accent-color);
          padding: 0px;
          width: 30px;
          height: 30px
        }
        .cancel-title {
          color: var(--app-accent-color);
          font-size: 14px;
          font-family: 'Roboto-Regular';
          text-decoration: underline;
          cursor: pointer;
        }
       .main-header{
         padding-bottom: 11px;
         padding-right: 11px;
       }
        ith-add-template-list-view {
          margin-top: 20px;
        }
        paper-button.filledWhite {
          min-width: 200px;
        }
        .btn-container {
          background: var(--app-accent-color);
          padding: 20px 21px 21px 0px;
        }
      </style>
        <div class="layout horizontal main-header">
          <div class="add-template-title flex-1">Create/Edit template</div>
          <div class="layout horizontal center" on-tap="_hideCreateTemplateView">
            <paper-icon-button icon="icons:close" class="close-icon"></paper-icon-button>
            <div class="cancel-title self-center">Cancel</div>
          </div>
        </div>
        <ith-add-template-basic-details-view id="basic" email="[[email]]" on-event-type="category"></ith-add-template-basic-details-view>
          <template is="dom-if" if="[[_isVisible(_view, 'WakeUp')]]">
        <ith-add-template-list-viewwake id="subeventswake" email="[[email]]"></ith-add-template-list-viewwake>
        </template>
        <template is="dom-if" if="[[_isVisible(_view, 'Inactivity')]]">
        <ith-add-template-list-viewinact id="subeventsIn" email="[[email]]"></ith-add-template-list-viewinact>
       </template>
       <template is="dom-if" if="[[_isVisible(_view, 'Breakfast')]]">
        <ith-add-template-list-viewbreakfast id="subeventsbf" email="[[email]]"></ith-add-template-list-viewbreakfast>
       </template>
        <template is="dom-if" if="[[_isVisible(_view, 'BathroomBreak')]]">
        <ith-add-template-list-viewbathroom id="subeventsbath" email="[[email]]"></ith-add-template-list-viewbathroom>
       </template>
       
         <template is="dom-if" if="[[_isVisible(_view, 'gen')]]">
        <ith-add-template-list-view id="subevents" email="[[email]]"></ith-add-template-list-view>
        </template>
          <ith-event-alert-view id="action" email="[[email]]" subscriber="[[subscriber]]"></ith-event-alert-view>
        <div class="btn-container layout vertical end">
          <paper-button class="filledWhite" on-tap="_saveTemplate">
            save template
          </paper-button>
          <paper-toast id="toast"></paper-toast>
        </div>
    <iron-ajax 
                   auto id="ajax"
                   url="http://[[server]]/php/api/insertAlertSetting.php"
                   body='{"name":"[[eventname]]","deliveryType":"sms","message":"[[message]]","recipients":"[[recipients]]"}'
                   last-response="{{response}}"
                    on-response="handleResponse"
                   method="post"
                    handle-as="json"
                   content-type="application/json">
                  </iron-ajax>
        <telehealthcareflow-createeventtemplate id="createtemplate" on-created-eventtemplate="_successSave" on-createeventtemplate-error="_error"></telehealthcareflow-createeventtemplate>
<smart-config id="globals"></smart-config>
    `;
  }

  static get properties() {
    return {
    
        subscriber: {
            type: Object
        },
        email: {
            type: String
        },
       eventtype:{
              type:String
          },
     _view: {
        type: String
        //reflectToAttribute: true
      },
      recipients:{
              type:String
          },
    message:{
              type:String
          },
     sen:{
         type: String
         } ,
       eventname:{
         type: String
         },
      server: {
            type: String
        }
    }
  }

     _isVisible(a, b){
    
    
    return a === b;
  }

  _hideCreateTemplateView() {
    

     this.server=this.$.globals.server; 
       var type=this._view;
      this.dispatchEvent(new CustomEvent("hide-createtemplate"));
      this.$.basic.load();
      this.$.action.load(); 
      
      if(type=='WakeUp')
       {
      this.shadowRoot.querySelector('#subeventswake').load();
       }
      else if(type=='Inactivity')
       {
     this.shadowRoot.querySelector('#subeventsIn').load();
       }
      else if(type=='Breakfast')
       {
     this.shadowRoot.querySelector('#subeventsbf').load();
       }
       else if(type=='BathroomBreak')
       {
     this.shadowRoot.querySelector('#subeventsbath').load();
       }
       else
         {
       
      this.shadowRoot.querySelector('#subevents').load();
        }
        
      
    
      
  }
  _saveTemplate() {
       this.server=this.$.globals.server;
       var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
              dd = '0'+dd
      } 

      if(mm<10) {
              mm = '0'+mm
      } 

      today = dd + '/' + mm + '/' + yyyy;
      var subevts;
      var evt = this.$.basic.getEvent();
      this.sen=evt.category;
     
      if(evt.category=='Inactivity')
        {
        subevts = this.shadowRoot.querySelector('#subeventsIn').getEvents();
         }
       else if(evt.category=='WakeUp')
         {
           subevts = this.shadowRoot.querySelector('#subeventswake').getEvents();
         }
       else if(evt.category=='Breakfast')
         {
           subevts = this.shadowRoot.querySelector('#subeventsbf').getEvents();
         }
       else if(evt.category=='BathroomBreak')
         {
           subevts = this.shadowRoot.querySelector('#subeventsbath').getEvents();
         }
   //  var subevts = this.$.subeventsIn.getEvents();
       
      var act = this.$.action.getActionDetails();
      this.recipients = act.recipients;
      this.message = act.message;
      this.eventname=Math.random();
      
      if (act.actionName == undefined) {
          act.actionName = evt.name + "action";
      }

      evt.actionName = act.actionName;
      evt.eventDetails = subevts;
       var toast = this.$.toast;
       if(evt.name == "")
   {
 
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please fill the TemplateName"
  });


   
   return false;
    }

   if(evt.category == "")
   {

  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please select Event Type "
  });
 
   return false;
    }

  if(evt.eventDetails.length==0)
          {
           toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please Select Time Schedule and Sensors"
  });


   
   return false;

          }
       for(var i=0;i<evt.eventDetails.length;i++)
        {
         
            
       if(evt.eventDetails[i].timeType==undefined)
          {
           toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please Select Time Schedule"
     });


   
   return false;

          }

          

       if(evt.eventDetails[i].startTime==today)
          {
           toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please Select Start Time "
  });


   
   return false;

          }
       if(evt.eventDetails[i].endTime===today)
          {
           toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Please Select End Time "
  });


   
   return false;

          }
 
          
        }


       if(evt.category=='Inactivity')
        {
         for(var i=0;i<evt.eventDetails.length;i++)
        {
         
              if(evt.eventDetails[i].timeOut!==evt.eventDetails[i].timeOut)
                 {
          		 toast.show({
    			 horizontalAlign: 'left',
   			verticalAlign: 'bottom',
   			 duration: 5000,
  			  text: "Please Select Inactivity Threshold"
   		  		});

  			 return false;

                  }
        //  alert(evt.eventDetails[i].timeOut);
           } 
         }
       else if(evt.category=='WakeUp')
         {
           for(var i=0;i<evt.eventDetails.length;i++)
        {
         
            
               if(evt.eventDetails[i].generateEvent==undefined)
                 {
          		 toast.show({
    			 horizontalAlign: 'left',
   			verticalAlign: 'bottom',
   			 duration: 5000,
  			  text: "Please Select Generate Events"
   		  		});

  			 return false;

                  }
           } 
         }
       else if(evt.category=='Breakfast')
         {
          for(var i=0;i<evt.eventDetails.length;i++)
        {
         
            
               if(evt.eventDetails[i].generateEvent==undefined)
                 {
          		 toast.show({
    			 horizontalAlign: 'left',
   			verticalAlign: 'bottom',
   			 duration: 5000,
  			  text: "Please Select Generate Events"
   		  		});

  			 return false;

                  }
           } 
         }
       else if(evt.category=='BathroomBreak')
         {
           for(var i=0;i<evt.eventDetails.length;i++)
        {
         
            
               if(evt.eventDetails[i].timeOut!==evt.eventDetails[i].timeOut)
                 {
          		 toast.show({
    			 horizontalAlign: 'left',
   			verticalAlign: 'bottom',
   			 duration: 5000,
  			  text: "Please Select Bathroom TimeOut"
   		  		});

  			 return false;

                  }
           } 
         }
     
   
 
      this.$.createtemplate.createEventTemplate(evt);
  }

  _successSave() {
     var type=this._view;
     this._hideCreateTemplateView();
     this.$.basic.load();
   
     if(type=='WakeUp')
       {
      this.shadowRoot.querySelector('#subeventswake').load();
       }
      else if(type=='Inactivity')
       {
     this.shadowRoot.querySelector('#subeventsIn').load();
       }
      else if(type=='Breakfast')
       {
     this.shadowRoot.querySelector('#subeventsbf').load();
       }
       else if(type=='BathroomBreak')
       {
     this.shadowRoot.querySelector('#subeventsbath').load();
       }
       else
         {
       
      this.shadowRoot.querySelector('#subevents').load();
        }
      
 
 }
  _error(event)
    {
    var error = event.detail.error[0];
     var toast = this.$.toast;
    if (error != undefined) 
        {
        if (error.context.startsWith("java.sql.SQLException: Duplicate entry"))
          {


            
             toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 10000,
    text: "Existing EventName."
  });



        }
     else if(error.context.startsWith("The date is not a valid date Detail time"))
         {

              
             toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 10000,
    text: "Enter Time in 'Add Event.'"
  });
         }

       }
      console.log(event.detail.error[0]);
     
      
}

   category(e)
   {
     
     if(e.detail=='')
      {
       this._view="gen";
      }
      else
      {
     this._view=e.detail;
      }
      
   }

}

window.customElements.define('ith-add-template-view', IthAddTemplateView);
