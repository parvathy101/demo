/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_SEARCH_QUERY = "EVENT_TEMPLATE_SELECTION_UPDATE_SEARCH_QUERY";
export const SEARCH_REQUEST_SUCCEED = "EVENT_TEMPLATE_SELECTION_SEARCH_REQUEST_SUCCEED";
export const SEARCH_REQUEST_FAILED = "EVENT_TEMPLATE_SELECTION_SEARCH_REQUEST_FAILED";
export const RESET = "EVENT_TEMPLATE_SELECTION_RESET";
export const PAGE_LOAD_FAILED = "EVENT_TEMPLATE_SELECTION_PAGE_LOAD_FAILED";
export const ADD_TO_SELECTION = "EVENT_TEMPLATE_SELECTION_ADD";
export const REMOVE_FROM_SELECTION = "EVENT_TEMPLATE_SELECTION_REMOVE";
export const ADD_SELECTED_TEMPLATES_TO_PATIENT = "EVENT_TEMPLATE_SELECTION_ADD_SELECTED_TEMPLATES_TO_PATIENT";

let lastSearchRequest;
let searchRequestTimer;


// Toggle drawer.
export const search = (query, noDelay) => (dispatch, getState) => {
  //dispatch an action to update search term
  dispatch({
    type: UPDATE_SEARCH_QUERY,
    query
  });

  //Load fragment
  import(`../components/manage-event/ith-manage-event-search-list-view.js`).catch(err => {
    console.error(err);
    dispatch({
      type: PAGE_LOAD_FAILED
    });
  });

  //Cancel previous timer
  searchRequestTimer && clearTimeout(searchRequestTimer);

  //schedule new search request, after delay of X ms, (1 second for now)
  searchRequestTimer = setTimeout(() => {
    //cancels in-progress search request & timer, if any.
    if (lastSearchRequest) {
      lastSearchRequest.abort();
      lastSearchRequest = undefined;
    }
    dispatch(sendSearchRequest());
  }, noDelay ? 0: 1000);
};

const sendSearchRequest = () => (dispatch, getState) => {
  let query = getState().eventTemplateSelection.searchQuery;
  if(!query) {
    return;
  }

  const controller = new AbortController();
  let signal = controller.signal;
  lastSearchRequest = controller;

  fetch('https://ithings-health.firebaseapp.com/api/search?q=' + query, { signal, method: 'GET' }).then(res => {

    //On response of search request, dispatch an action
    if (!res.ok) {
      onSearchFailed(res.status);
      return;
    }

    res.json().then(jsonResponse => {
      dispatch({
        type: SEARCH_REQUEST_SUCCEED,
        searchResult: jsonResponse
      });
    }).catch(error => {
      console.error(error);
      dispatch({
        type: SEARCH_REQUEST_FAILED,
        error: {
          message: 'Failed to parse event template response'
        }
      });
    });

  }).catch(error => {
    //Note: Invoked when network is not available.
    //On failure of search request, dispatch an action
    onSearchFailed(0);
  });
}

const onSearchFailed = (status) => (dispatch, getState) => {
  let message;
  if (status >= 500 || status <= 599) {
    message = 'Failed to retrieve event templates due to Server Error.';
  } else if (status >= 400 || status <= 499) {
    message = 'Failed to retrieve event templates due to Client Error.';
  } else if (status === 0) {
    message = 'Failed to retrieve event templates from server due to Network Error.'
  } else {
    message = 'Failed to retrieve event templates.';
  }

  console.error(message);
  dispatch({
    type: SEARCH_REQUEST_FAILED,
    error: {
      message
    }
  });
}


export const addToSelection = (eventTemplateId) => (dispatch, getState) => {
  if(!eventTemplateId) {
    throw new Error("eventTemplateId not specified");
  }
  if (!getState().eventTemplateSelection.selection.includes(eventTemplateId)) {
    dispatch({
      type: ADD_TO_SELECTION,
      eventTemplateId
    });
  }
}


export const removeFromSelection = (eventTemplateId) => (dispatch, getState) => {
  if (getState().eventTemplateSelection.selection.includes(eventTemplateId)) {
    dispatch({
      type: REMOVE_FROM_SELECTION,
      eventTemplateId
    });
  }
}


const addTemplatesToPatient = (patientId, templates) => {
  return new Promise((resolve, reject) => {
    let patientTemplates = templates.map((eventTemplateId) => {
      return {
        id: Number.parseInt(Math.random()*10000),
        patientId,
        eventTemplateId,
        active: true,
        eventSettings: {},
        paramSettings: {}
      }
    });
    resolve(patientTemplates);
  })
};

/**
 * Adds selected EventTemplates to the current patient
 */
export const addSelected = () => (dispatch, getState) => {
  //Throw illegal state exception if current patient isn't found.
  let patientId = getState().app.patientId;
  if (!patientId) {
    throw new Error('Current patient isn\'t found.');
  }

  addTemplatesToPatient(patientId, getState().eventTemplateSelection.selection).then(function(aPatientEventTemplates){
     //dispatch action to add selected templates to the paient.
    dispatch({
      type: ADD_SELECTED_TEMPLATES_TO_PATIENT,
      templates: aPatientEventTemplates,
      patientId: getState().app.patientId
    });
  });
 

  dispatch(reset());
}

export const reset = () => {
  //cancels in-progress search request & timer, if any.
  if (lastSearchRequest) {
    lastSearchRequest.abort();
    lastSearchRequest = undefined;
  }
  return {
    type: RESET
  };
}