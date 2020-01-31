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
  SEARCH_REQUEST_SUCCEED,
} from '../actions/event-template-selection';

export const eventTemplates = (
  state = { }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST_SUCCEED:
      let oCloneState = {...state};
      action.searchResult.forEach(template => {
        oCloneState[template.id] = template;
      });

      return oCloneState;
    default:
      return state;
  }
};

export const eventTemplatesSelector = state => state.eventTemplates;