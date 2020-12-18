import { combineReducers, createStore } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { persistReducer, persistStore } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import composerApplicationReducer from "./features/composerApplication/composerApplicationSlice";
import viewConfigurationReducer from "./features/viewConfiguration/ViewConfigurationSlice";
import RoleConfigurationReducer from "./features/roles/roleSlice";
import SessionSlice from "./features/session/sessionSlice";

const rootReducer = combineReducers({
  viewConfiguration: viewConfigurationReducer,
  composerApplication: composerApplicationReducer,
  roleConfiguration: RoleConfigurationReducer,
  session: SessionSlice,
  form: reduxFormReducer,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const ComposerStorage = createStore(persistedReducer, undefined);
export const ComposerPersistor = persistStore(ComposerStorage);

export default ComposerStorage;
