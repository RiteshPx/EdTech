import { createSlice } from '@reduxjs/toolkit'

const MyCourseSlice = createSlice({
    name : "MyCourse",
    initialState : [],
    reducers :{
        addToMyCourse :(state,actions)=>{
          state.push(actions.payload);
         },
        // removeFromMyCourse:(state,actions)=>{ 
        //     return state.filter((item)=>item._id !== actions.payload)
        // }
    }
})
export const {addToMyCourse} = MyCourseSlice.actions;
export default MyCourseSlice.reducer;