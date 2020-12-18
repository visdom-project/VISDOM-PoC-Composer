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

export const roleSlice = createSlice({
  name: "roleConfiguration",
  initialState: {
    defaultRole: 4,
    idCounter: 4,
    roles: [
      {
        id: 1,
        name: "Administrator",
        description:
          "Administrators are responsible for maintaining the application.",
        defaultView: {
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
      },
      {
        id: 2,
        name: "Teacher",
        description: "Teachers are responsible for teaching students.",
        defaultView: {
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
      },
      {
        id: 3,
        name: "Teaching assistant",
        description:
          "Teaching assistants assist in everyday teaching acitivities.",
        defaultView: {
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
      },
      {
        id: 4,
        name: "Student",
        description:
          "Students are enrolled to various courses to learn the preseted topics.",
        defaultView: {
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
      },
    ],
  },
  reducers: {
    create: (state, action) => {
      let newId = state.idCounter + 1;
      let newItem = {
        name: action.payload.item.name,
        description: action.payload.item.description,
        id: newId,
      };
      return {
        ...state,
        idCounter: newId,
        roles: [...state.roles, newItem],
      };
    },
    remove: (state, action) => {
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload.id),
      };
    },
    update: (state, action) => {
      let payloadId = parseInt(action.payload.id);
      const newState = { ...state };
      const index = newState.roles.findIndex((role) => role.id === payloadId);
      newState.roles = updateObjectInArray(state.roles, {
        index: index,
        item: action.payload.item,
      });
      return newState;
    },
    updateDefaultRole: (state, action) => {
      return {
        ...state,
        defaultRole: action.payload.item.defaultRole.id,
      };
    },
  },
});

export default roleSlice.reducer;
