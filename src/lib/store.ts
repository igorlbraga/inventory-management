import { combineReducers, configureStore } from "@reduxjs/toolkit"

import { persistReducer } from "redux-persist"
import persistStore from "redux-persist/es/persistStore"
import globalReducer from "./features/global/globalSlice"

import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["global"]
}

const rootReducer = combineReducers({
    global: globalReducer,
})

export const makePersistentStore = () => {
    const store = configureStore({
        reducer: persistReducer(persistConfig, rootReducer),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            })
    })

    return {
        store,
        persistor: persistStore(store)
    }
}

export type AppPersistentStoreRef = ReturnType<typeof makePersistentStore>
export type AppStore = AppPersistentStoreRef["store"]
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]