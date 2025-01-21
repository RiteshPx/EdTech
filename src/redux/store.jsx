import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import CartSliceReduce from './Slices/CartSlice'

const store = configureStore({
    reducer :{
        cart : CartSliceReduce,
    }
})

export default store