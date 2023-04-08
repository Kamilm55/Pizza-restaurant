import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
// interface objectInt {
//   img:string;
//   title:string;
//   extra:Array<object>;
//   price:number;
//   quantity:number;
//   total:number;
// }

interface cartState {
    dataArr:Array<object>;
    cartQuantity:Number;

}
// Product	Name	Extra	Price	Quantity	Total
// Define the initial state using that type
const initialState: cartState = {
    dataArr:[],
    cartQuantity:0,
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addProduct : (state , action) => {
         state.dataArr.push(action.payload);
        //  state.cartQuantity += action.payload.quantity;
    },
    resetCart: () => {
        return initialState;
    },
  },
})

export const {addProduct ,resetCart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCartDatas = (state: RootState) => state.cart.dataArr
// export const selectCartCount = (state: RootState) => state.cart.cartQuantity

export default cartSlice.reducer