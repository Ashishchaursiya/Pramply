import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
  failedStatus:'',
 
}

export const PaymentSlice = createSlice({
  name: 'paymentFailed',
  initialState,
  reducers: {
   
  
    setPaymentfailedStatus: (state, action) => {
      state.failedStatus = action.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const {setPaymentfailedStatus} = PaymentSlice.actions

export default PaymentSlice.reducer