/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_DRAWER_STATE = "UPDATE_DRAWER_STATE";
export const SET_SCREEN_SIZE = 'SET_SCREEN_SIZE';
export const SET_PAGE_IMPORT_IN_PROGRESS = 'SET_PAGE_IMPORT_IN_PROGRESS';



export const navigate = path => (dispatch, getState) => {
  // Extract the page name from path.
  let page = path === "/" ? 'patient-dashboard' : path.slice(1);

  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  if(getState().app.screenSize !== 'large'){
    dispatch(updateDrawerState(false));
  }
};

// Shows 'not-found' page on failure of current page import.
const loadPage = page => dispatch => {
  dispatch(setPageImportInProgress(true));
  dispatch(updatePage(page));
  import(`../components/${page}-page.js`)
    .then(() => {
      dispatch(setPageImportInProgress(false));
    })
    .catch(err => {
      console.warn(err);
      import("../components/not-found-page.js").then(() => {
        dispatch(updatePage('not-found'));
        dispatch(setPageImportInProgress(false));
      });
    });
};

const setPageImportInProgress = (value) => {
  return {
    type: SET_PAGE_IMPORT_IN_PROGRESS,
    value
  };
}

const updatePage = page => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

// Toggle drawer.
export const updateDrawerState = opened => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    });
  }
};

export const setScreenSize = (size) => {
  return {
    type: SET_SCREEN_SIZE,
    value: size
  }
}


