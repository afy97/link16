import { createSlice } from '@reduxjs/toolkit'

export const ringSlice = createSlice({
    name: 'ring',
    initialState: {
        index: 0,
    },
    reducers: {
        increment: (state) => {
            state.index += 1
        },
        decrement: (state) => {
            state.index -= 1
        },
        incrementByAmount: (state, action) => {
            state.index += action.payload
        }
    },
})

export const {
    increment,
    decrement,
    incrementByAmount
} = ringSlice.actions

export default ringSlice.reducer
