import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
  country:'',
 
}

export const countrySlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
   
  
    setCountry: (state, action) => {
      state.country = action.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const {setCountry} = countrySlice.actions

export default countrySlice.reducer