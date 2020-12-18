import { createSlice } from "@reduxjs/toolkit";

/**
 *
 * @param {Array} array - An array of something.
 * @param {Object} action - An action object that has and index and an item attributes.
 */
function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item;
    }
    return {
      ...item,
      ...action.item,
    };
  });
}

export const composerApplicationSlice = createSlice({
  name: "composerApplication",
  initialState: {
    idCounter: 5,
    applications: [
      {
        id: 1,
        name: "DemoA-App",
        packageName: "@visdom-poc/demo-a",
        microfrontendKey: "demo-a",
      },
      {
        id: 2,
        name: "DemoB-App",
        packageName: "@visdom-poc/demo-b",
        microfrontendKey: "demo-b",
      },
      {
        id: 3,
        name: "ProgressApp",
        packageName: "@visdom/progressview",
        microfrontendKey: "progressview",
      },
      {
        id: 4,
        name: "StatusApp",
        packageName: "@visdom/statusview",
        microfrontendKey: "statusview",
      },
      {
        id: 5,
        name: "ComposerApp",
        packageName: "@visdom-poc/composer",
        microfrontendKey: "composer",
      },
    ],
  },
  reducers: {
    load: (state, action) => {
      return {
        application: state.applications.find((app) => app.id === action.payload.id),
      };
    },
    create: (state, action) => {
      let newId = state.idCounter + 1;
      let newItem = {
        ...action.payload.item,
        id: newId,
      };
      return {
        ...state,
        idCounter: newId,
        applications: [...state.applications, newItem],
      };
    },
    remove: (state, action) => {
      return {
        ...state,
        applications: state.applications.filter((app) => app.id !== action.payload.id),
      };
    },
    update: (state, action) => {
      let payloadId = parseInt(action.payload.id);
      const newState = { ...state };
      const index = newState.applications.findIndex((app) => app.id === payloadId);
      newState.applications = updateObjectInArray(state.applications, {
        index: index,
        item: action.payload.item,
      });
      return newState;
    },
  },
});

// Export actions.
export const {
  load,
  create,
  remove,
  update,
} = composerApplicationSlice.actions;

// Export a selector for the applications.
export const selectComposerApplications = (state) =>
  state.composerApplication.applications;

// Finally, export the reducer as default.
export default composerApplicationSlice.reducer;
