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

export const devices = (
  state = {
    1: {
      id: 1,
      name: 'Bed sensor'
    },
    2: {
      id: 2,
      name: 'Bedroom movement sensor'
    },
    3: {
      id: 3,
      name: 'Kitchen movement sensor'
    },
    4: {
      id: 4,
      name: 'Kitchen fridge door sensor'
    },
    5: {
      id: 5,
      name: 'Front door sensor'
    },
    6: {
      id: 6,
      name: 'Back door sensor'
    }
  }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const devicesSelector = state => state.devices;

export const getDevices = createSelector(
  devicesSelector,
  (devices) => {
    let aDevices = Object.values(devices);
    return [...aDevices];
  }
);