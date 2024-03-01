import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
  subscriptionData:null,
 
}

export const subScriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
   
  
    setSubscription: (state, action) => {
      state.subscriptionData = action.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const {setSubscription} = subScriptionSlice.actions

export default subScriptionSlice.reducer