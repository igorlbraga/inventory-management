"use client"

import { AppPersistentStoreRef, makePersistentStore } from "@/lib/store"
import { setupListeners } from "@reduxjs/toolkit/query"
import React, { useRef } from 'react'
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

type Props = {
    children: React.ReactNode
}

const StoreProvider = ({ children }: Props) => {
    const storeRef = useRef<AppPersistentStoreRef>(undefined)

    if (!storeRef.current) {
        storeRef.current = makePersistentStore()
    }

    setupListeners(storeRef.current.store.dispatch)

    return (
        <Provider store={storeRef.current.store}>
            <PersistGate loading={null} persistor={storeRef.current.persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default StoreProvider