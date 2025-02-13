import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Correct lowercase import

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage, // Corrected from `Storage` to `storage`
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Fixed incorrect parameter passing

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
