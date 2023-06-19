import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userslice";
import podcastReducer from "./slices/podcastSlice"
 export default configureStore({
    reducer:{
        user:userReducer,
        podcasts:podcastReducer,
    }
 })