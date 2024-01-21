import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../utils/constants"

const initialState = {
    patients: [],
    status: "idle",
    error: null
}

export const fetchPatients = createAsyncThunk(
    "patients/fetchPatients", async () => {
        const response = await axios.get(`${BASE_URL}/patients`)
        return response.data
    }
)

export const addPatient = createAsyncThunk(
    "patients/addPatientAsync", async (newPatient) => {
        const response = await axios.post(`${BASE_URL}/patients`, newPatient)
        return response.data.patient
    }
)

export const updatePatientAsync = createAsyncThunk(
    "patients/updatePatientAsync", async ({ PatientId, updatedPatient}) => {
        const response = await axios.post(`${BASE_URL}/patients/${PatientId}`, updatedPatient )
        return response.data.patient
    }
)

export const deletePatient = createAsyncThunk(
    "patients/deletePatient", async (PatientId) => {
        const response = await axios.delete(`${BASE_URL}/patients/${PatientId}`)
        return response.data.patient
    }
)


export const PatientSlice = createSlice({
    name: "Patients",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchPatients.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchPatients.fulfilled, (state, action) => {
            state.status = "success";
            state.patients = action.payload
        }).addCase(fetchPatients.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }).addCase(addPatient.pending, (state) => {
            state.status = "loading"
        }).addCase(addPatient.fulfilled, (state, action) => {
            state.status = "success";
            state?.patients?.push(action.payload)
        }).addCase(addPatient.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }).addCase(updatePatientAsync.pending, (state) => {
            state.status = "pending"
        }).addCase(updatePatientAsync.fulfilled, (state, action) => {
            state.status = "success";
            const updatedPatient = action.payload;
            const index = state?.patients?.data?.findIndex((s) => s?._id === updatedPatient?._id)
            if(index !== -1){
                state.patients.data[index] = updatedPatient
            }
        }).addCase(updatePatientAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }).addCase(deletePatient.pending, (state) => {
            state.status = "loading";
        }).addCase(deletePatient.fulfilled, (state, action) => {
            state.status = "success";
            const deletedPatient = action.payload;
            state.patients.data = state?.patients?.data?.filter(
              (patient) => patient?._id !== deletedPatient?._id
            );
        }).addCase(deletePatient.rejected, (state, action) => {
            state.status = "error";
           state.error = action.error.message
        }).addDefaultCase((state, action) => {})

    }
})

export default PatientSlice.reducer;