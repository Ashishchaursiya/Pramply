import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
  topicLevelQuestion:{topic:'',level:'',question:''},
 
}

export const topicLevelSlice = createSlice({
  name: 'topicLevelQuestion',
  initialState,
  reducers: {
   
  
    setTopicLevelQuestion: (state, action) => {
      state.topicLevelQuestion = action.payload
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { setTopicLevelQuestion} = topicLevelSlice.actions

export default topicLevelSlice.reducer