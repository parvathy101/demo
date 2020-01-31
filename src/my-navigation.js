/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icon/iron-icon";
import './shared-styles/shared-styles.js';
import './icons/ithings-icons.js';
import '@vaadin/vaadin-upload/vaadin-upload.js';
import './api/telehealthcareflow-getsubscriberdetails.js';
import '@polymer/iron-ajax/iron-ajax.js';
import "./smart/smart-config.js";

class MyNavigation extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }

        img {
            height: 54px;
            width: auto;
            border: 3px solid white;
            border-radius: 50%;
        }

        .fullname {
            font-size: 18px;
            font-weight: bold;
            margin-left: 16px;
            text-transform: none;
        }

        a {
            display: block;
            text-decoration: none;
            line-height: 20px;
            font-size: 14px;
            color: var(--app-text-color);
            text-transform: uppercase;
            box-sizing: border-box;
            outline: none;
        }

        .nav-list{
          padding:15px;
        }

        iron-icon{
            width: 20px;
            height: 20px;
            margin-right: 10px;
            margin-left: 37px;
        }

        .backmenu {
            background-color: #E5EBEF;
            border-bottom: 1px solid var(--medium-blue-grey);
            padding:15px;
        }

        .mainmenu {
            background-color: #ECF2F6;
        }

        .globalmenu {
            background-color: #E5EBEF;
            border-top: 1px solid var(--medium-blue-grey);
        }

        a[selected] {
          color: var(--app-accent-color);
          background-color: white;
        }

        a iron-icon{
          --iron-icon-fill-color: var(--app-text-color);
        }

        a[selected] iron-icon{
          --iron-icon-fill-color: var(--app-accent-color);
        }

        .info {
            height: 98px;
        }

        @media (max-width:1199px){
          iron-icon{
            margin-right: 10px;
            margin-left: 10px;
          }
        }
        @media (max-width:800px){
          iron-icon{
            margin-right: 0;
            margin-left: 0;
          }
          .nav-list a{
            font-size:12px;
          }
        }

      </style>

      <template is="dom-if" if="[[showMenu]]">
          <iron-selector selected="[[currentPage]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <template is="dom-if" if="[[showPrevious]]">
                <div class="backmenu">
                    <a name="[[prevPage]]" href="#/[[prevPage]]">
                        <iron-icon icon="ithings-icons:arrow-back"></iron-icon>
                        [[previousLabel]]
                    </a>
                </div>
            </template>
            <div class="mainmenu">
                <template is="dom-if" if="[[showProfile]]">

                  
                  
                     <div class = "flexchild" style="width:100%"> 
                      <template is="dom-if" if="{{_lookuser(email)}}">


                       <paper-button on-tap="{{_lookuser(email)}}">
 <form action = "http://[[server]]/php/api/photoload.php?name=[[subscriber.name]]&mail=[[subscriber.email]]" method = "POST" enctype = "multipart/form-data">
         
         
         
			
			<iron-ajax 
                 auto id="ajax"
                 url="http://[[server]]/php/api/getPhoto.php"
                 body='{"subscriber":"[[subscriber.email]]"}'
                 last-response="{{response}}"
                  on-response="handleResponse"
                 method="post"
                  handle-as="json"
                 content-type="application/json"
              > </iron-ajax>
                 
                <template is="dom-repeat" items="[[response.records]]" as="item" id="itemlist" scroll-target="document" selected-item="{{selectedItem}}" selection-enabled grid>

                

                 </template>
      
                           <label for="fileField">

  <img src="{{photourl}}" onerror="this.src='https://dummyimage.com/60x60/2f3042/2f3042'" style="width:80px; height:80px; margin-left:20px;" id="img">

<input type="file" id="fileField" name="image" accept="image/*" style="display: none;" onchange="form.submit()">

</form>
                        
 
                        <div class="fullname flex">[[name]]</div>
                     </a>
                   </paper-button>
                    </template>
                       </div><br/>
                </template>
                <template is="dom-repeat" items="[[currentNavigation]]">
                  <div class="nav-list">
                    <a name="[[item.page]]" href="[[_getQueryParms(item.parms)]]#/[[item.page]]">
                        <iron-icon icon="ithings-icons:[[item.icon]]"></iron-icon>
                        [[item.label]]
                    </a>
                  </div>
                </template>
            </div>
            <div class="globalmenu">
                <template is="dom-repeat" items="[[globals]]">
                  <div class="nav-list">
                    <a name="[[item.page]]" href="#/[[item.page]]">
                        <iron-icon icon="ithings-icons:[[item.icon]]"></iron-icon>
                        [[item.label]]
                    </a>
                  </div>
                </template>
            </div>
          </iron-selector>
      </template>
     <telehealthcareflow-getsubscriberdetails id="getdetails" on-subscriber-details="_setupSubscriber"></telehealthcareflow-getsubscriberdetails>
<smart-config id="globals"></smart-config>
    `;
  }

    static get properties() {
      return {
        showProfile: {
            type: Boolean,
            value: false
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
photourl: {
            type: String
        },
         
        prevPage: {
            type: String,
            value: "serviceusers"
        },
        previousLabel: {
            type: String,
            value: "Service User List"
        },
        showPrevious: {
            type: Boolean,
            value: false
        },
        rootPath: {
            type: String,
            reflectToAttribute: true
        },
        server: {
            type: String
        },
        currentPage: {
            type: String,
            notify: true,
            observer: '_changeNavigation'
        },
        currentNavigation: {
            type: Array,
            reflectToAttribute: true
        },
        globals: {
            type: Array,
            value: [
                { label: "MY ACCOUNT", page: "accountpage", icon: "account" }, 
                { label: "SUPPORT", page: "supportpage", icon: "support" }, 
                { label: "CONTACT", page: "contactpage", icon: "contact" }
            ]
        },
        firstlevel: {
            type: Object,
            value: {
                "tecadmin": [ 
                    { label: "SERVICE PROVIDER DETAILS", page: "providerdetails" }, 
                    { label: "USERS", page: "providerusers" }
                ],
                "tecassessor": [ 
                    { label: "SERVICE USERS", page: "serviceusers" }, 
                  //  { label: "CARE HOMES", page: "carehomes" }
                ],
                "techassistant": [
                    { label: "DEVICES", page: "devicespage" }
                ],
            }
        },
        secondlevel: {
            type: Object,
            value: { 
                "SERVICE USER": [ 
                    { label: "GENERAL DETAILS", page: "subscribergeneral", icon: "edit-patient", parms: ["email", "name"] }, 
                    { label: "MANAGE EVENTS", page: "manageevents", icon: "manage-events", parms: ["email", "name"] }, 
                    { label: "MANAGE DEVICES", page: "managedevices", icon: "manage-devices", parms: ["email", "name"]}, 
                    { label: "MANAGE CAREGIVERS", page: "managecaretakers", icon: "manage-categories", parms: ["email", "name"]},
                    { label: "EVENT HISTORY", page: "eventhistory", icon: "manage-events", parms: ["email", "name"]},
		    { label: "SENSOR EVENT HISTORY", page: "managesensors", icon: "manage-categories", parms: ["email", "name"]},
                    
                ],
                "CARE HOME": [ 
                    { label: "GENERAL DETAILS", page: "carehomegeneral" }, 
                    { label: "MANAGE EVENTS", page: "managehomeevents" }, 
                    { label: "MANAGE DEVICES", page: "managehomedevices" }
                ]
            }
        },
        pageNavigation: {
            type: Object,
            value: {}
        },
        showMenu: {
            type: Boolean,
            value: true
        },
        roleName: {
            type: String,
            observer: "_changeNavigation"
        },
        previousPage: {
            type: Object,
            value: {}
        },
        subRoute: {
            type: Object,
            observer: "_changeNavigation"
        }
      };
      return {
          session: {
              type: String,
              value: ""
          },
          currentWall: {
              type: String,
              value: "Visitor",
              notify: true,
              observer: "_handleCurrentWallChange"
          },
          search: {
              type: Object,
              value: { wall: "Visitor" }
          },
          images: {
              type: Array,
              notify: true,
              value: [],
              observer: '_handleSearchResult'
          },
          wallImages: {
              type: Array,
              notify: true,
              value: []
          },
          dataContext: {
              type: String,
              value: ""
          },
         subscriber: {
            type: Object
        },
        phone: {
            type: String
        },
        response: {
          type: String
        },
        selectedItem:{
              type: Object
          }
        };
  }
  ready() {
      super.ready();
      this.pageNavigation = {};
      this.pageNavigation['login'] = [];
      this.pageNavigation['subscribergeneral'] = this.secondlevel["SERVICE USER"];
      this.pageNavigation['manageevents'] = this.secondlevel["SERVICE USER"];
      this.pageNavigation['managedevices'] = this.secondlevel["SERVICE USER"];
      this.pageNavigation['managecaretakers'] = this.secondlevel["SERVICE USER"];
      this.pageNavigation['eventhistory'] = this.secondlevel["SERVICE USER"];
      this.pageNavigation['managesensors'] = this.secondlevel["SERVICE USER"];


      this.pageNavigation['carehomegeneral'] = this.secondlevel["CARE HOME"];
      this.pageNavigation['managehomeevents'] = this.secondlevel["CARE HOME"];
      this.pageNavigation['managehomedevices'] = this.secondlevel["CARE HOME"];

      this.previousPage['subscribergeneral'] = { page: "serviceusers", label: "Service Users" };
      this.previousPage['manageevents'] = { page: "serviceusers", label: "Service Users" };
      this.previousPage['managedevices'] = { page: "serviceusers", label: "Service Users" };
      this.previousPage['managecaretakers'] = { page: "serviceusers", label: "Service Users" };
      this.previousPage['eventhistory'] = { page: "serviceusers", label: "Service Users" };
      this.previousPage['managesensors'] = { page: "serviceusers", label: "Service Users" };
      /*"   var upload = this.$.ImageURL;
          if (upload != null) {
              upload.addEventListener("upload-request", this._uploadRequest.bind(this));
              upload.addEventListener("upload-response", this._uploaded.bind(this));
          }
          this.session = this.$.globals.sessionId;*/

    // alert(this.email);
     this.server=this.$.globals.server;
     
    
  }
       setupData(ctx) {
          this.dataContext = ctx;
          this._handleCurrentWallChange();
          this.session = this.$.globals.sessionId;
      }

 _handleSearchResult() {
          var images = [];
          for (var i = 0; i < this.images.length; i++) {
            var one = {};
            var cnt = 0;
            one.documentId = this.images[i].documentId;
            one.fileName = this.images[i].fileName;

            images.push(one);
          }

          this.wallImages = images;
      }

      _handleCurrentWallChange() {
          this.search = {};
          this.search.wall = this.currentWall;
          this.$.searchDocuments.search();
      }

      _uploaded(event) {
          console.log("Uploaded file " + event);
          var docid = event.detail.xhr.responseText
          var one = {};
          one.documentId = docid;

          var images = this.wallImages;
          images.push(one);
          this.wallImages = images;
      }

      _uploadRequest(event) {
          console.log('upload xhr after open: ', event.detail.xhr);

          event.detail.formData.append('SessionId', this.$.globals.sessionId);
          event.detail.formData.append('wall', this.currentWall);
      }

  _changeNavigation(page) {
      if (this.currentPage == 'login') {
          this.showMenu = false;
      } else {
          this.showMenu = true;

      }

      this.currentNavigation = this.pageNavigation[this.currentPage];

      if (this.currentNavigation == undefined) {
          var role = this.roleName;
          if (role == 'DefaultRole') {
              role = "tecadmin";
          }
          this.currentNavigation = this.firstlevel[role];
      }

      this.name = this.subRoute.__queryParams["name"];
      this.email = this.subRoute.__queryParams["email"];
      if (this.name != undefined) {
          this.showProfile = true;
      } else {
          this.showProfile = false;
      }
this._lookuser(this.email);
 this.server=this.$.globals.server;

      var previous = this.previousPage[this.currentPage];
      if (previous != undefined) {
          this.showPrevious = true;
          this.previousLabel = previous.label;
          this.prevPage = previous.page;
      } else {
          this.showPrevious = false;
          this.showProfile = false;
          this.previousLabel = "";
          this.prevPage = "";
      }
      
  }

  _getQueryParms(parms) {
      var query = "";
      if (parms != undefined) {
          query = "?";
          for (var i = 0; i < parms.length; i++) {
              query += parms[i] + "=" + this.subRoute.__queryParams[parms[i]] + "&";

          }

      }

      return query;
  }
   _lookuser(email)
{
    // alert(email);
     this.server=this.$.globals.server;
      this.$.getdetails.getDetails(this.email);
      return true;

}

_setupSubscriber(event) {
      if (event.detail.data != undefined) {
          this.subscriber = event.detail.data;
      }
    // window.open("http://178.128.165.237/php/api/fileupload.php?phone="+this.subscriber.phone+"");
    // window.open('http://178.128.165.237/php/api/fileupload1.php?phone='+this.subscriber.phone+'','1547458331664','width=450,height=100,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=200,top=200 ');
     //alert("http://178.128.165.237/php/api/fileupload.php?phone="+this.subscriber.phone+"");
  }
handleResponse(e)
    {

    var request = e.detail;
  var response = request.response;
var totval= JSON.stringify(response);
var val1 = totval.toString();

var countdata = val1.substr(val1.lastIndexOf(':')+2, val1.length - 1);

//var countop = countdata.substr(countdata.lastIndexOf('\"')+1, countdata.length+1);

var urlimg = countdata.substring(0, countdata.lastIndexOf('\"')-4);
 if(urlimg!='')
 {
this.photourl = "http://"+this.server+"/php/photos/"+urlimg+".jpg";
 }
 else
  {
   this.photourl=null;
  }
//alert(urlimg+"sss");
//this.photourl = "http://178.128.165.237/php/photos/"+urlimg+".jpg";
//this.countPage = countop;
//this.$.img.src=url;

 
    }
   
}

window.customElements.define('my-navigation', MyNavigation);
