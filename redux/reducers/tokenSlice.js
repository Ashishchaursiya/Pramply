import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
  authToken:'',
 
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
   
  
    setToken: (state, action) => {
      state.authToken = action.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { setToken} = tokenSlice.actions

export default tokenSlice.reducer