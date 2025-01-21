import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const CartSlice = createSlice({
    name : "Cart",
    initialState : [],
    reducers :{
        addToCart :(state,actions)=>{
          state.push(actions.payload);
         },
        removeFromCart :(state,actions)=>{ 
            return state.filter((item)=>item._id !== actions.payload)
        }
    }
})
export const {addToCart,removeFromCart} = CartSlice.actions;
export default CartSlice.reducer;