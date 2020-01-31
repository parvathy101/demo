import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-list/iron-list.js';
import './shared-styles/shared-styles.js';
import './shared-styles/input-styles.js';
import './shared-styles/paper-button-styles.js';
import './smart/smart-search.js';
import "./smart/smart-config.js";
import './api/telehealthcareflow-getsubscriberdetails.js';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@vaadin/vaadin-combo-box/vaadin-combo-box.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@polymer/paper-toast/paper-toast.js';

class MyManageSensors extends PolymerElement {
    static get template() {
    return html`
      <style include="shared-styles input-styles paper-button-styles">
      *{ -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; margin:0;padding:0;}
        :host {
          display: block;
          position: relative;
          background-color: var(--pale-blue-grey);
          @apply --layout-vertical;
          margin: 26px 80px 0px 80px;
        }
      paper-toast {
        width: 300px;
        margin-left: calc(50vw - 150px);
        margin-bottom: calc(50vw - 150px);
        background:#e5ebef;
        color:#2f3042;
      }
        .title {
          font-size: 18px;
          font-family: 'Roboto-Bold';
          color: var(--app-accent-color);
      
        }
        .list
         {
          width:100%;
          height:auto;   /**changed from 70px**/
          position: relative;
          /**margin-left:26px;**/
          padding:10px 20px;
         }

         .dropdown-container {
          min-width: 100%;
         }
         .from-drop-down{
          margin-right: 16px;
        }
        .time
         {
        width:100%;
        height:70px;
      
         }
       .btn-container
        {
         color:#11367a;
        /** margin: 40px 40px 50px 0px;
        margin-left:40px;**/
        margin-top:2rem;
        /** background-color:#11367a**/
        }

        /** added new css **/
        th,td{
          padding:10px;
        }
        td{
          border-left: 2px solid var(--medium-blue-grey);
          border-bottom: 2px solid var(--medium-blue-grey);
        }
        tr:nth-child(odd){
          background-color:#e5ebef;
        }
        tr:nth-child(even){
          background-color:#ecf2f6;
        }
        td:last-child{
          border-right:2px solid var(--medium-blue-grey);
        }
        .scroll-x{
          overflow-x:auto;
        }
        #tag{
          padding-top:1rem;
        }
        .content-custom{
          padding-left: 45px;
          padding-right: 45px;
          padding-bottom: 20px;
          padding-top: 20px;
          background-color: #fff;
          min-height: 200px;
        }
        paper-button{
          padding:15px 20px;
        }
        .custom_top_header{
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
        }
        @media (max-width:800px){
          .custom_top_header{
            display:block;
          }
          .btn-container{
            display:inline-block
          }
          #tag{
            display:inline-block;
            margin-top:1rem;
          }
        }
      </style>

      <div class="content-title">
        <h2>Sensor Trigger History</h2>
      </div>

         <div class="title-container">
          <div class="list title custom_top_header">
           <ith-dropdown-menu
              id="tag" 
              label="Sensor"
              name="tag"
              items="[[sensors]]" class="from-drop-down" placeholder="Select Sensor">
            </ith-dropdown-menu> 
            <vaadin-date-picker id="start" label="Select Date" class="from-drop-down" placeholder="Start"></vaadin-date-picker>
         <!-- <vaadin-date-picker id="end" label="End Date" class="from-drop-down" placeholder="End" disabled></vaadin-date-picker>-->
          <!-- <div class="layout horizontal time">
                <ith-dropdown-menu id="timefrom" placeholder="From" items="[[]]" class="from-drop-down" label="Time From"></ith-dropdown-menu>
                <ith-dropdown-menu id="timeto" placeholder="To" items="[[]]" label="Time To" class="from-drop-down" ></ith-dropdown-menu>
              </div>-->
             <div class="btn-container">
              <paper-button class="filledWhite" on-tap="_Search">Search</paper-button>
          </div>
         </div>

        <!-- start newly added code -->
            
               <iron-ajax 
                 id="ajax11"
                 url="http://[[server]]/php/api/smart/getSensorTrigHistory3.php"
                 body='{"subscriber":"[[url]]"}'
                 last-response="{{response}}"
                  on-response="handleResponse"
headers="[[_createHeaders(_sessionId)]]"
                 method="post"
                  handle-as="json"
                 content-type="application/json"
              > </iron-ajax>
                 
                <template is="dom-repeat" items="[[response.records]]" as="item" id="itemlist" scroll-target="document" selected-item="{{selectedItem}}" selection-enabled grid>

                

                 </template>

              
             
          <!-- end newly added code -->


          <!-- start newly added code -->
            <div class="card-content">
              <div class="content-custom" hidden="[[!hide]]">
               <div class="scroll-x">
        <div class="filledWhite">
<paper-button  on-tap="_click1"><iron-icon icon="ithings-icons:arrow-back"></iron-icon></paper-button>
[[nextPage]]
<paper-button  on-tap="_click"><iron-icon icon="icons:arrow-forward"></iron-icon></paper-button>
</div>
                 <iron-ajax 
                   id="ajax1"
                   url="http://[[server]]/php/api/smart/getSensorTrigHistoryNew.php"
                   body='{"subscriber":"[[url]]","page":"[[nextPage]]"}'
                   last-response="{{response}}"
                    on-response="handleResponse1"
headers="[[_createHeaders(_sessionId)]]"
                   method="post"
                    handle-as="json"
                   content-type="application/json">
                  </iron-ajax>
                  <table cellspacing="0"  style="width:100%; border:1px; text-align:center;"><tr style="background:#11367a; color:#fff;"><th width="10%">DeviceId</th><th width="20%">Time</th><th width="10%">Sensor</th><th width="20%">ActionType Desc</th><th width="30%">Subscriber</th><th width="10%">Facility Name</th></tr>
                    <template is="dom-repeat" items="{{response.records}}" as="item" id="itemlist" scroll-target="document" selected-item="{{selectedItem}}" selection-enabled grid>
                    <tr>
                     <td>[[item.deviceId]]</td><td>{{_getTime(item.timeStamp)}}</td><td> [[item.tag]]</td><td> [[item.actionTypeDesc]]</td><td>[[item.subscriber]]</td><td> [[item.facilityName]]</td>
                     
                    </tr>
                  </template>
                  </table>
                </div>
              </div>
            </div>
          <!-- end newly added code -->

<!-- start newly added code -->
            
               <iron-ajax 
                 id="ajax12"
                 url="http://[[server]]/php/api/smart/getSensorTrigHistorySearch3.php"
                 body='{"subscriber":"[[url]]","sensorTag":"[[tag]]","dateStr":"[[start]]"}'
                 last-response="{{response}}"
                  on-response="handleResponse2"
headers="[[_createHeaders(_sessionId)]]"
                 method="post"
                  handle-as="json"
                 content-type="application/json"
              > </iron-ajax>
                 
                <template is="dom-repeat" items="[[response.records]]" as="item" id="itemlist" scroll-target="document" selected-item="{{selectedItem}}" selection-enabled grid>

                

                 </template>




    <div class="card-content">
              <div class="content-custom" hidden="[[!hide1]]">
               <div class="scroll-x">
   <div class="filledWhite">
<paper-button  on-tap="_clickSearch1"><iron-icon icon="ithings-icons:arrow-back"></iron-icon></paper-button>
[[nextSearchPage]]
<paper-button  on-tap="_clickSearch"><iron-icon icon="icons:arrow-forward"></iron-icon></paper-button>
</div>
                <iron-ajax 
                   id="ajax2"
                   url="http://[[server]]/php/api/smart/getSensorTrigHistoryNew.php"
                    body='{"subscriber":"[[url]]","sensorTag":"[[tag]]","dateStr":"[[start]]","page":"[[nextSearchPage]]"}'
                   last-response="{{response}}"
                    on-response="handleResponse1"
                   method="post"
                    handle-as="json"
headers="[[_createHeaders(_sessionId)]]"
                   content-type="application/json">
                  </iron-ajax>
             
                  <table cellspacing="0"  style="width:100%; border:1px; text-align:center;"><tr style="background:#11367a; color:#fff;"><th width="10%">DeviceId</th><th width="20%">Time</th><th width="10%">Sensor</th><th width="20%">ActionType Desc</th><th width="30%">Subscriber</th><th width="10%">Facility Name</th></tr>
                   <template is="dom-repeat" items="{{response.records}}" as="item" id="itemlist" scroll-target="document" selected-item="{{selectedItem}}" selection-enabled grid>
                    <tr>
                      <td>[[item.deviceId]]</td><td>{{_getTime(item.timeStamp)}}</td><td> [[item.tag]]</td><td> [[item.actionTypeDesc]]</td><td>[[item.subscriber]]</td><td> [[item.facilityName]]</td>
                    </tr>
                  </template>
                  </table>
                </div>
              </div>
            </div>
          </div>
<paper-toast id="toast"></paper-toast>
      </div>
<telehealthcareflow-getsubscriberdetails id="searchdev" on-subscriber-details="_saveDevice" on-session-expired="_session"></telehealthcareflow-getsubscriberdetails>
 <smart-config id="globals"></smart-config>
        `;
  }

  static get properties() {

 return { 
      response: { 
      type: Object   
       },

      sub: {
          type: Object
      },
      deviceId: {
          type: String
      },
 sensors: {
          type: Array,
          value: []
      },
       email: {
            type: String,
            observer: '_changePage'
        },
_sessionId: {
          type: String
        },
        server: {
            type: String
        },
     _timePeriod: {
        type: Array,
        value: function(){
          return ['0:00','1:00','1:30','2:00','3:00','3:30','4:00','4:30','5:00','6:00','6:30','7:00',
                 '7:30','8:00','8:30','9:00','10:00','11:00','12:00','12:30','13:00','13:30','14:00','14:30',
                 '15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00',
                 '20:30','21:00','21:30','22:00','22:30','23:00']
        }
      },
       url: {
            type: String
        },
       subscriber: {
            type: String
        },
      hide: {
          type: Boolean,
          value: true
      },
       hide1: {
          type: Boolean,
          value: false
      },
     tag: {
            type: String
        },
      start: {
            type: String
        },
countPage: {
            type: Number
           

        },

sessionexpire: {
            type: Boolean,
           value: false

        },
searchCountPage: {
            type: Number
           

        },


nextSearchPage: {
            type: Number,
 value: 0

        },

      nextPage: {
            type: Number,
            value: 0

        }

        };
 
     
  }

   handleResponse1(r) {
      console.log(r.detail+"--1");
      var responses = r.detail.response.responses[0].session;
if(responses!=undefined)
{



this.sessionexpire = true;
 var toast = this.$.toast;
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Session Expired. Please login again"
  });

}

     }


handleResponse2(e) {

var request = e.detail;
  var response = request.response;
var totval= JSON.stringify(response);
var val1 = totval.toString();
var countdata = val1.substr(val1.lastIndexOf(':')+1, val1.length - 1);

var countop = countdata.substring(0, countdata.indexOf("}"));
this.searchCountPage = countop;

this.nextSearchPage = 1;
this.$.ajax2.generateRequest();

var responses = e.detail.response.responses[0].session;
if(responses!=undefined)
{



this.sessionexpire = true;
 var toast = this.$.toast;
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Session Expired. Please login again"
  });

}
       //console.log(r)
     }


 handleResponse(e) {

 var responses = e.detail.response.records[0].countVal;
if(responses!=undefined)
{
this.countPage = responses;

this.nextPage = 1;

}
if(responses==undefined)
{
var response1 = e.detail.response.responses[0].session;
if(response1!=undefined)
{
 
this.sessionexpire = true;
 var toast = this.$.toast;
  toast.show({
    horizontalAlign: 'left',
    verticalAlign: 'bottom',
    duration: 5000,
    text: "Session Expired. Please login again"
  });
}

}

/*var request = e.detail;
  var responses = request.response;
 // alert(responses);
var totval= JSON.stringify(responses);
var val1 = totval.toString();
var countdata = val1.substr(val1.lastIndexOf(':')+1, val1.length - 1);

var countop = countdata.substring(0, countdata.indexOf("}"));*/
this.nextPage = 1;
this.$.ajax1.generateRequest();


     }

   loadData(email) 
   {
     this.email=null;
     this.email = email;
     this.$.searchdev.getDetails(email);
     this.url=this.email;
     this.$.tag.value=null;
     this.$.start.value=null;
     this.server=this.$.globals.server;
     this.nextPage = 1;
     this.nextSearchPage = 1;
     this.tag=null;
     this.start=null;
this._sessionId = this.$.globals.sessionId;
    this.$.ajax11.generateRequest();
    
  }


_createHeaders(sess) {
 
      var hdrs = {};
      //var sess = this.$.globals.sessionId;
      
      if (sess != undefined) {
        //hdrs["Session-Id"] = sess;
hdrs["Authorization"] = sess;
      }
  // alert(JSON.stringify(hdrs));
      return hdrs;
  }


_eq(str1, str2){
    return str1 === str2;
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
     evts.push("All");
    this.sensors=evts;
    
    

}

_Search()
{
   if(this.$.tag.value=="All")
     {
this.tag=null;
     }
   else
     {
this.tag=this.$.tag.value;
     }

this.start=this.$.start.value;

//var end=this.$.end.value;
//var timefrom=this.$.timefrom.value;
//var timeto=this.$.timeto.value;
this.hide=false;
this.hide1=true;
//this.nextPage = 1;
this.nextSearchPage = 1;
//console.log("dfddd"+this.tag+"--"+this.start+"--"+end+"--"+timefrom+"--"+timeto);
this.$.ajax12.generateRequest();

}
_click()
{


if(this.nextPage <= this.countPage)
{
this.nextPage = this.nextPage+1;
}

else
{
this.nextPage = 1;
}
this.$.ajax1.generateRequest();
}

_click1()
{


if(this.nextPage >= 1)

{

this.nextPage = this.nextPage-1;

}
else
{
this.nextPage = this.countPage;
}
this.$.ajax1.generateRequest();
}

_clickSearch()
{


if(this.nextSearchPage <= this.searchCountPage)
{
this.nextSearchPage = this.nextSearchPage+1;
}

else
{
this.nextSearchPage = 1;
}
this.$.ajax2.generateRequest();
}

_clickSearch1()
{


if(this.nextSearchPage >= 1)

{

this.nextSearchPage = this.nextSearchPage-1;

}
else
{
this.nextPage = this.searchCountPage;
}
this.$.ajax2.generateRequest();
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

_changePage()
{

    this.url=null;
    // this.load(this.email);
  
}

_getTime(dt) {
      
      var odt = new Date(parseInt(dt));
    // alert(odt);
      var m = odt.getMinutes();
      if (m< 10)
      {
       m = "0" + m;
      }
      var mn = odt.getMonth()+1;
       if (mn< 10)
      {
       mn = "0" + mn;
      }
      var s = odt.getSeconds();
      if (s< 10)
      {
       s = "0" + s;
      }
      

     // console.log(odt.getDate()+"--"+odt.toUTCString()+"----"+odt.getHours()+":"+m);
      return odt.getFullYear()+"-"+mn+"-"+odt.getDate()+"  "+odt.getHours() + ":" + m +":"+s;
     
  }
}

 window.customElements.define('my-managesensors', MyManageSensors);
