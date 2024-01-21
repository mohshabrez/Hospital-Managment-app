import { configureStore } from "@reduxjs/toolkit";
import {PatientSlice} from "./redux/PatientSlice";
import {WardSlice} from "./redux/WardSlice";


export default configureStore({
    reducer:{
         patients: PatientSlice.reducer,
         wards: WardSlice.reducer
    }
})