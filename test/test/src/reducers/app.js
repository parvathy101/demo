/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {
  UPDATE_PAGE,
  UPDATE_DRAWER_STATE,
  SET_SCREEN_SIZE,
  SET_PAGE_IMPORT_IN_PROGRESS
} from '../actions/app';

export const app = (
  state = {
    drawerOpened: false,
    screenSize: 'large', 
    page:'', 
    patientId: 123456,
    user: {
      fullName: 'Nirmal Baldaniya'
    }
  }, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    case SET_PAGE_IMPORT_IN_PROGRESS: 
      return {
        ...state,
        pageImportInProgress: action.value
      }  
    case UPDATE_DRAWER_STATE:
      return {
          ...state,
          drawerOpened: action.opened
      };
    case SET_SCREEN_SIZE:
      return {
        ...state,
        screenSize: action.value
      }
    default:
      return state;
  }
};

export const patientIdSelector = (state) => state.app.patientId;
