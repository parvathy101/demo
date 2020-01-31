import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-button/paper-button';
import '../../shared-styles/paper-button-styles';
import '../../icons/ithings-icons.js';
import './ith-edit-event-add-edit-dialog.js';
import '../../api/telehealthcareflow-getsubscriberdetails.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '../../shared-styles/shared-styles';
import '../../shared-styles/input-styles';
import '../../elements/ith-multi-select/ith-multi-select.js';
import '../../shared-styles/add-event-param-styles';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-toast/paper-toast.js';

class IthEditEventListItemInAct extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-factors iron-flex-alignment paper-button-styles add-event-param-styles input-styles">
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
        paper-toast {
        width: 300px;
        margin-left: calc(50vw - 150px);
        margin-bottom: calc(50vw - 150px);
        background:#e5ebef;
        color:#2f3042;
      }
      </style>
     <template is="dom-repeat" items="[[sel]]" as="item">

      <div class="layout horizontal">

        <div class="flex-1 title-content cell-content border" id="tag">[[item]]</div>
        
        </div>
       </template>

          <div class="layout horizontal">
          <div class="layout horizontal  flex-8">
             
             <ith-dropdown-menu 
                
style ="width:500px; height:100px; margin-left:20px"
              label="Inactivity Threshold" 
              name="inact"
              id="inact"
              items="[[_minMaxValue]]"
            </ith-dropdown-menu>
             
          


         </div>
           <paper-toast id="toast"></paper-toast>
          </div>
           
      
     <ith-edit-event-add-edit-dialog id="addeditevent" on-edited-event="EditedEvent" email="[[email]]"></ith-edit-event-add-edit-dialog>
     <telehealthcareflow-getsubscriberdetails id="searchdev" on-subscriber-details="_saveDevice" on-session-expired="_session"></telehealthcareflow-getsubscriberdetails>
    `;
  }

  static get properties() {
    return {
      _eventList: {
        type: Array,
        value: []
      },
      item: Object,
     email: {
            type: String,
            observer: '_changePage'
        },
     sensors: {
          type: Array,
          value: []
      },
     subscriber: {
          type: Object
      },
currentPage: {
            type: String,
            notify: true,
            observer: '_changePage'
        },
     _minMaxValue: {
        type: Array,
        value: function(){
          return []
        }
      },
      sel: {
          type: Array,
          value: []
      }
    }
  }
    connectedCallback(){
   
    super.connectedCallback();
   
   //this.$.searchdev.getDetails(this.email);
    var thresh= [];

    for(var i=1;i<=60;i++){
      thresh.push(i+" min")
    }
    this.set('_minMaxValue', thresh);
     
  }
static get observers() {
    return ['_setradio(selected)'];
  }
_change(e)
{ 

  var ev =[];
   ev.push(e.target.value);
     if(e.target.checked)
     {
   this.sensors.push(e.target.value);
     }
     else
      {
          var temp = [];
     for (var i = 0; i < this.sensors.length; i++) {
         var dev = this.sensors[i];
         if (dev == e.target.value) {
         } else {
             temp.push(this.sensors[i]);
         }
     }

     this.sensors = temp;
      }
  
}


_changePage()
{

  this.$.inact.value=undefined;
    this.sensors.length=0;
    this.subscriber=null;
this.$.searchdev.getDetails(this.email);

}
  
  _editEvent() {
    this.$.addeditevent.open();
    this.$.addeditevent.load(this.item.name,this.item.description,this.item.category,this.item.tag,this.item.time,this.item.timeType,this.item.duration,this.item.startTime,this.item.endTime);
    
  }

  _deleteEvent() {
    this.dispatchEvent(new CustomEvent('delete-event', {detail: {id: this.item.id}}));
  }


 EditedEvent(event) {
      var evt = event.detail;
      var evts = [];
      for (var i = 0; i < this._eventList.length; i++) {
          evts.push(this._eventList[i]);
          
      }
      evt.sequence = this._eventList.length + 1;
      evts.push(evt);
      this._eventList = evts;
     this.dispatchEvent(new CustomEvent('edit-event', {detail:{list:this._eventList}}));
    
  }
    getEvent() {
      return this._eventList;
  }

  _saveDevice(event)
{
// alert(this.email+"sefws")
  /*   var mapped = {};
      var evts = []; 

   for (var i = 0; i < ev.detail.data.devices.length; i++)
   {
    var evt = ev.detail.data.devices[i];
          mapped[evt.tag] = evt;
          evts.push(evt.tag);
    }
    this.sensors=evts;*/


   if (event.detail.data != undefined) {
          this.subscriber = event.detail.data;
      }  
    
    

}


  load(aaa)
   {
      this.$.inact.value=undefined;
     this.subscriber=null;
    this.sensors.length=0;
    this.$.searchdev.getDetails(aaa);
   }
  
  sensorList()
  {
   
   var tag=[];
   var evt={};
    //  evt.tag=this.sensors;
    //  evt.name = "zsS"+Math.random();
     // evt.description = "";
     // evt.category="";

      evt.timeOut=parseInt(this.$.inact.value);
   //  return evt;
      this.dispatchEvent(new CustomEvent("add-event", { detail: evt }));
  }

  eload(dev,gen)
   {
     //this.$.searchdev.getDetails(this.email);
    this.sel=dev;
    this.$.inact.value=gen+" min";
 
   
  
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
 
}

window.customElements.define('ith-edit-event-list-iteminact', IthEditEventListItemInAct);
