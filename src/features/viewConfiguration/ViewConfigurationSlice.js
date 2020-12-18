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

export const viewConfigurationSlice = createSlice({
  name: "viewConfiguration",
  initialState: {
    defaultView: 1,
    idCounter: 6,
    views: [
      {
        id: 1,
        name: "Progressview",
        description: "This page will render the ProgressView microfrontend.",
        microfrontends: [
          {
            name: "Progressview",
            microfrontendKey: "progressview",
          },
        ],
      },
      {
        id: 2,
        name: "Statusview",
        description: "This page will render the StatusView microfrontend.",
        microfrontends: [
          {
            name: "Statusview",
            microfrontendKey: "statusview",
          },
        ],
      },
      {
        id: 3,
        name: "DemoA",
        description: "This page will render the DemoA microfrontend.",
        microfrontends: [
          {
            name: "DemoA",
            microfrontendKey: "demo-a",
          },
        ],
      },
      {
        id: 4,
        name: "DemoB",
        description: "This page will render the DemoB microfrontend.",
        microfrontends: [
          {
            name: "DemoB",
            microfrontendKey: "demo-b",
          },
        ],
      },
      {
        id: 5,
        name: "DemoA and DemoB",
        description:
          "This page will render both the DemoA and the DemoB related microfrontends.",
        microfrontends: [
          {
            name: "DemoA",
            microfrontendKey: "demo-a",
          },
          {
            name: "DemoB",
            microfrontendKey: "demo-b",
          },
        ],
      },
      {
        id: 6,
        name: "Composer",
        description:
          "This page will render the composer in the composer. How strange.",
        microfrontends: [
          {
            name: "Composer",
            microfrontendKey: "composer",
          },
        ],
      },
    ],
  },
  reducers: {
    load: (state, action) => {
      return {
        view: state.views.find((view) => view.id === action.id),
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
        views: [...state.views, newItem],
      };
    },
    remove: (state, action) => {
      return {
        ...state,
        views: state.views.filter((view) => view.id !== action.payload.id),
      };
    },
    update: (state, action) => {
      let payloadId = parseInt(action.payload.id);
      const newState = { ...state };
      const index = newState.views.findIndex((view) => view.id === payloadId);
      newState.views = updateObjectInArray(state.views, {
        index: index,
        item: action.payload.item,
      });
      return newState;
    },
    updateDefaultView: (state, action) => {
      return {
        ...state,
        defaultView: action.payload.item.defaultView.id
      }
    },
  },
});

// Export actions.
export const { load, create, remove, update } = viewConfigurationSlice.actions;

// Export selector for views.
export const selectViewConfigurations = (state) =>
  state.viewConfiguration.views;

export const selectViewConfiguration = (state) => state.viewConfiguration.views;

// Finally, export the reducer as default.
export default viewConfigurationSlice.reducer;
