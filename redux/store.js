import { configureStore } from '@reduxjs/toolkit';
import socialReducer from './reducers/socialAccountsSlice';
import tokenReducer from "./reducers/tokenSlice"
import subscriptionReducer from "./reducers/subscriptionSlice"
import paymentReducer from "./reducers/paymentFailedSlice"
import locationReducer from "./reducers/countryLocation"
import videoReducer from "./reducers/videoCallSlice"
import topicReducer from "./reducers/topicLevelSlice"
 
export default configureStore({
    reducer: {
        tokenInStore: tokenReducer,
        socialAccounts: socialReducer,
        subscriptionInStore: subscriptionReducer,
        paymentFailed: paymentReducer,
        location: locationReducer,
        videoData:videoReducer,
        topicLevelData:topicReducer
       
      },
})