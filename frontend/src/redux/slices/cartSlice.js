import { addListener, createSlice } from "@reduxjs/toolkit";
import { parse } from "dotenv";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[]}

const addDecimals = (num)=>{
    return Math.round((num*100)/100).toFixed(2)
}
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

            // Price Calculation
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
            
            // Shiping Price - Free Shipping for orders above $100
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

            // Tax Price
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

            // Total Price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2)

            localStorage.setItem("cart", JSON.stringify(state))
        },

    }
})

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer