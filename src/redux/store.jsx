import { configureStore } from '@reduxjs/toolkit'
import MyCourseSliceReduce from './Slices/CartSlice'

const store = configureStore({
    reducer :{
        MyCourse : MyCourseSliceReduce,
    }
})

export default store