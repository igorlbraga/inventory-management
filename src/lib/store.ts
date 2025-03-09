/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import { api } from "./api";

import {
    persistStore,
    persistReducer,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { setupListeners } from "@reduxjs/toolkit/query";

/* REDUX PERSISTENCE */

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window === "undefined"
        ? createNoopStorage()
        : createWebStorage("local");

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["global"],
};
const rootReducer = combineReducers({
    global: globalReducer,
    [api.reducerPath]: api.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE */
export const makePersistentStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(api.middleware),
    });
    return {
        store,
        persistor: persistStore(store)
    }
};

/* REDUX TYPES */
export type AppPersistentStoreRef = ReturnType<typeof makePersistentStore>;
export type AppStore = AppPersistentStoreRef["store"]
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];