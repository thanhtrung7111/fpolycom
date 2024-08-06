import { combineSlices, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import localStorage from "redux-persist/es/storage";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import userReducer from "../reducer/userReducer";
import commonReducer from "../reducer/commonReducer";
import cartReducer from "../reducer/cartReducer";
import storeReducer from "../reducer/storeReducer";
// import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const rootPersistConfig = {
  key: "root",
  storage: sessionStorage,
  blacklist: ["common", "user", "cart", "store"],
  // stateReconciler: autoMergeLevel2, // ADDED
};

const userPersistConfig = {
  key: "userProfile",
  storage: sessionStorage,
  version: 1,
  whitelist: ["currentUser"],
};

const rootReducer = combineSlices({
  user: persistReducer(userPersistConfig, userReducer),
  common: commonReducer,
  cart: cartReducer,
  store: storeReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
