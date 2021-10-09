import { configureStore } from '@reduxjs/toolkit'
import ringReducer from './features/ringReducer'

const store = configureStore({
    reducer: {
        ring: ringReducer
    },
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
