import { addListener, createSlice } from "@reduxjs/toolkit";
import { parse } from "dotenv";
import { updateCart } from "../utils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[]}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((i) => i._id === item._id)


            if (existingItem){
                state.cartItems = state.cartItems.map((x) => x._id===existingItem._id)? item: x
            } else{
                state.cartItems = [...state.cartItems, item]
            }
            return updateCart(state)
        },

    }
})

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer