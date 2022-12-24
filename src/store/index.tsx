import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { todoReducer } from "../reducers/todo";
// import { todoReducer } from "~/reducers/todo";
import { widgetReducer } from "../reducers/widget";
import { createLogger } from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  widget: widgetReducer,
  todo: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({});

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [logger],
});

export const persistor = persistStore(store);
