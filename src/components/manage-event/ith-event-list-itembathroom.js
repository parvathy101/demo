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
import '../../elements/ith-dropdown-menu/ith-dropdown-menu.js';
import '@polymer/paper-toast/paper-toast.js';

class IthEventListItemBathroom extends PolymerElement {
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
     <!-- <template is="dom-repeat" items="[[type]]" as="item">

      <div class="layout horizontal">

        <div class="flex-1 title-content cell-content border" id="type">[[item]]</div>
         <div class="flex-3 desc-content border">
          
           <ith-dropdown-menu 
            class="flex-1"
            id="tag" 
             value="{{event.tag}}"
            label="Sensor Used"
            name="tag"
            items="[[sensors]]"
            on-value-changed="_value"
          </ith-dropdown-menu> 

        </div>
        </div>
      </template>-->

         
      <div class="layout horizontal">

        <div class="flex-1 title-content cell-content border" id="inside">Inside Sensor</div>
         <div class="flex-3 desc-content border">
          
           <ith-dropdown-menu 
            class="flex-1"
            id="insidetag" 
             value="{{event.tag}}"
            label="Sensor Used"
            name="tag"
            items="[[insidesensors]]"
            on-value-changed="_insidevalue"
          </ith-dropdown-menu> 

        </div>
        </div>

       <div class="layout horizontal">

        <div class="flex-1 title-content cell-content border" id="outside">Outside Sensor</div>
         <div class="flex-3 desc-content border">
          
           <ith-dropdown-menu 
            class="flex-1"
            id="outsidetag" 
             value="{{event.tag}}"
            label="Sensor Used"
            name="tag"
            items="[[outsidesensors]]"
            on-value-changed="_outsidevalue"
          </ith-dropdown-menu> 

        </div>
        </div>

     
        <div class="layout horizontal">
          <div class="layout horizontal  flex-8">
             
             <ith-dropdown-menu 
              style ="width:500px; height:100px; margin-left:20px"
              label="Bathroom TimeOut" 
              name="timeout"
              id="timeout"
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
      _insidesensorList: {
        type: Array,
        value: []
      },
      _outsidesensorList: {
        type: Array,
        value: []
      },
      item: Object,
     email: {
            type: String,
            observer: '_changePage'
        },
       selectedsensors: {
          type: Array,
          value: []
      },
     insidesensors: {
          type: Array,
          value: []
      },
     outsidesensors: {
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
            type: String,
            observer: '_change'
        },
     type: {
        type: Array,
        value: function(){
          return ['Inside Sensor','Outside Sensor']
        }
      },
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





_changePage()
{

 // this.$.bf.checked=false;
  //this.$.missed.checked=false;
 this.$.timeout.value="";
 this.$.insidetag.value=""; 
    this.$.outsidetag.value="";
 //this.outsidesensors.length=0;
 //   this.insidesensors.length=0;
  this.selectedsensors.length=0; 
this.$.searchdev.getDetails(this.email);

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
    this.insidesensors=evts; 
    this.outsidesensors=evts;
    
}

  load(aaa)
   {
   
 // this.$.bf.checked=false;
  //this.$.missed.checked=false;
   this.$.timeout.value="";
    this.$.insidetag.value=""; 
    this.$.outsidetag.value="";
   // this.outsidesensors.length=0;
   // this.insidesensors.length=0;
   this.selectedsensors.length=0; 
    this.$.searchdev.getDetails(aaa);
   }
  
  sensorList()
  {
   
     this.selectedsensors.length=0; 
     var ilength=this._insidesensorList.length;
     var olength=this._outsidesensorList.length;
    if(this._insidesensorList[ilength-1]==undefined||this._outsidesensorList[olength-1]==undefined)
     {
     this.selectedsensors.length=0;
     }
     else
      {
     this.selectedsensors.push(this._insidesensorList[ilength-1]); 
     this.selectedsensors.push(this._outsidesensorList[olength-1]);
      }
     var tag=[];
     var evt={};
     evt.tag=this.selectedsensors;
      evt.description = "";
      evt.category="";
      evt.timeOut=parseInt(this.$.timeout.value);
    //  evt.duration=this.$.timeout.value;
    
      this.dispatchEvent(new CustomEvent("add-event", { detail: evt }));
  }
_insidevalue(e)
  {
    
    if(e.target.value!="")
     {
      this._insidesensorList.push(e.target.value);
     }
      var temp = [];
     for (var i = 0; i < this.outsidesensors.length; i++) {
         var dev = this.outsidesensors[i];
         if (dev == e.target.value) {
         } else {
             temp.push(this.outsidesensors[i]);
         }
     }
    
     this.outsidesensors = temp;
    
    
  }
 _outsidevalue(e)
  {
      
   
    if(e.target.value!="")
     {
      this._outsidesensorList.push(e.target.value);
     }

     var temp = [];
     for (var i = 0; i < this.insidesensors.length; i++) {
         var dev = this.insidesensors[i];
         if (dev == e.target.value) {
         } else {
             temp.push(this.insidesensors[i]);
         }
     }

     this.insidesensors = temp;
    
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


window.customElements.define('ith-event-list-itembathroom', IthEventListItemBathroom);
