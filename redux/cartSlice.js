import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "react-toastify";

/* const item = localStorage.getItem("cartItems") === null ? [] : JSON.parse(localStorage.getItem("cartItems")); */

const cartSlice = createSlice ({
    name: 'cart',
    initialState: {
        products: [],
        subtotal: 0,
        discount: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {

            const products = state.products
            
            //Array İçindeki verilerin Json.strıngfy ile eşitliğinin kontrol edilmesi JSON.stringify(item.removeItems).length === JSON.stringify(action.payload.removeItems).length
            const itemInCart = state.products.find((item) => item._id === action.payload._id) 
            if (itemInCart) {
                itemInCart.quantity++
            }
            else {
                state.products.push({ ...action.payload, quantity : 1})
            }

            state.subtotal += action.payload.price
            state.discount += action.payload.discount === null ? 0 : action.payload.price - action.payload.discount
            state.total += action.payload.discount === null ? action.payload.price * action.payload.quantity : action.payload.discount * action.payload.quantity

            toast.success("Ürün Sepete Eklendi", {autoClose: 1000})

            /* localStorage.setItem("cartItems", JSON.stringify(state.products))
            localStorage.setItem("subtotal" , JSON.stringify(state.subtotal))
            localStorage.setItem("discount" , JSON.stringify(state.discount))
            localStorage.setItem("total" , JSON.stringify(state.total)) */
        },
      deleteProduct: (state, action) => { 
          state.products = state.products.filter((item) => item._id !== action.payload._id)

          state.subtotal -= action.payload.price * action.payload.quantity
          state.discount -= action.payload.discount === null ? 0 : (action.payload.price - action.payload.discount) * action.payload.quantity
          state.total -= action.payload.discount === null ? action.payload.price * action.payload.quantity : action.payload.discount * action.payload.quantity

          toast.success("Ürün Sepetten Silindi")
        },

        increase : (state, action) => {
          const cartItem = state.products.find((item) => item._id === action.payload._id) 
          cartItem.quantity += 1

          state.subtotal += cartItem.price
          state.discount += cartItem.discount === null ? 0 : cartItem.price - cartItem.discount
          state.total += cartItem.discount === null ? cartItem.price : cartItem.discount 
        },
        decrease : (state, action) => {
          const cartItem = state.products.find((item) => item._id === action.payload._id) 
          cartItem.quantity -= 1

          state.subtotal -= cartItem.price
          state.discount -= cartItem.discount === null ? 0 : cartItem.price - cartItem.discount
          state.total -= cartItem.discount === null ? cartItem.price : cartItem.discount 

          if(cartItem.quantity === 0){
            state.products = state.products.filter((item) => item._id !== action.payload._id)
          }
        },
        reset: (state, action) => {
          state.products = []
          state.subtotal = 0;
          state.discount = 0;
          state.total = 0;
      }
    },
})



export const {addProduct, deleteProduct, increase, decrease, reset} = cartSlice.actions;

export default cartSlice.reducer