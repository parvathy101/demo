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
  ADD_SELECTED_TEMPLATES_TO_PATIENT,
} from '../actions/event-template-selection';
import { createSelector } from 'reselect';
import { patientIdSelector } from './app';

export const patientEventTemplates = (
  state = { }, action) => {
  switch (action.type) {
    case ADD_SELECTED_TEMPLATES_TO_PATIENT:
      //Existing templates
      let aCurrentTemplates = (state[action.patientId] && state[action.patientId].templates) || [];
      return {
        ...state,
        [action.patientId]: {
            ...state[action.patientId],
            templates: [...aCurrentTemplates, ...action.templates]
        }
      };
    default:
      return state;
  }
};

export const patientTemplatesSelector = state => state.patientEventTemplates;
export const getPatientEventTemplates = createSelector(
    patientIdSelector,
    patientTemplatesSelector,
    (patientId, patientWiseTemplates) => {
      return patientWiseTemplates[patientId] && patientWiseTemplates[patientId].templates;
    });