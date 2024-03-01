import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
     socialAccounts : {imgPath:'',url:''}
 
}

export const socialAccountSlice = createSlice({
  name: 'socialAccounts',
  initialState,
  reducers: {
   
  
    setSocialAccountsInStore: (state, action) => {
      state.socialAccounts = action.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { setSocialAccountsInStore} = socialAccountSlice.actions

export default socialAccountSlice.reducer