/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { createSelector } from 'reselect';
import { eventTemplatesSelector } from './event-templates';

import {
  UPDATE_SEARCH_QUERY,
  SEARCH_REQUEST_SUCCEED,
  SEARCH_REQUEST_FAILED,
  ADD_TO_SELECTION,
  REMOVE_FROM_SELECTION,
  RESET,
  PAGE_LOAD_FAILED
} from '../actions/event-template-selection';

export const eventTemplateSelection = (
  state = { searchQuery: "", searchRequestInProgress: false, searchFailureReason: "", searchResult: null, selection: [], pageLoadFailed: false }, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.query,
        searchRequestInProgress: true
      };
    case PAGE_LOAD_FAILED:
      return {
        ...state,
        pageLoadFailed: true
      };
    case SEARCH_REQUEST_SUCCEED:
      //Create new array of Ids from search result's array of object
      let aSearchResultsId = [];
      (action.searchResult || []).forEach(resultItem => {
        aSearchResultsId.push(resultItem.id);
      });

      return {
        ...state,
        searchResult: aSearchResultsId,
        searchRequestInProgress: false
      };
    case SEARCH_REQUEST_FAILED:
      return {
        ...state,
        searchFailureReason: action.error.message,
        searchRequestInProgress: false
      };
    case RESET:
      return {
        ...state,
        searchQuery: '',
        searchRequestInProgress: false,
        searchFailureReason: '',
        searchResult: null,
        selection: [],
        pageLoadFailed: false
      };
    case ADD_TO_SELECTION:
      return {
        ...state,
        selection: [...state.selection, action.eventTemplateId]
      };
    case REMOVE_FROM_SELECTION:
      return {
        ...state,
        selection: [...state.selection].filter(templateId => templateId !== action.eventTemplateId)
      };
    default:
      return state;
  }
};


export const searchResultSelector = state => state.eventTemplateSelection.searchResult;

export const getSearchResult = createSelector(
  searchResultSelector,
  eventTemplatesSelector,
  (searchResults, eventTemplates) => {
    console.log('searchResults', searchResults);
    console.log('eventTemplates', eventTemplates);
    if (!searchResults) {
      return [];
    }

    return searchResults.map(templateId => eventTemplates[templateId]);
  }
);


export const selectedTemplateSelector = state => state.eventTemplateSelection.selection;

export const getSelectedTemplates = createSelector(
  selectedTemplateSelector,
  eventTemplatesSelector,
  (selectedTemplates, eventTemplates) => {
    console.log('selectedTemplates', selectedTemplates);
    console.log('eventTemplates', eventTemplates);
    if (!selectedTemplates.length) {
      return [];
    }

    return selectedTemplates.map(templateId => eventTemplates[templateId]);
  }
);
