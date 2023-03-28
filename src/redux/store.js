import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { localAPI } from './slices/localApi'

export const store = configureStore({
  reducer: {
    [localAPI.reducerPath]: localAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(localAPI.middleware),
})

setupListeners(store.dispatch)