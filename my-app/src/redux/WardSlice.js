import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../utils/constants"

const initialState = {
    wards: [],
    status: "idle",
    error: null
}

export const fetchwards = createAsyncThunk(
    "wards/fetchwards", async () => {
        const response = await axios.get(`${BASE_URL}/wards`)
        return response.data
    }
)

export const addward = createAsyncThunk(
    "wards/addwardAsync", async (newward) => {
        const response = await axios.post(`${BASE_URL}/wards`, newward)
        return response.data.ward
    }
)

export const updatewardAsync = createAsyncThunk(
    "wards/updatewardAsync", async ({ wardId, updatedward}) => {
        const response = await axios.post(`${BASE_URL}/wards/${wardId}`, updatedward )
        return response.data.ward
    }
)

export const deleteward = createAsyncThunk(
    "wards/deleteward", async (wardId) => {
        const response = await axios.delete(`${BASE_URL}/wards/${wardId}`)
        return response.data.ward
    }
)


export const WardSlice = createSlice({
    name: "wards",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchwards.pending, (state) => {
            state.status = "loading"
        }).addCase(fetchwards.fulfilled, (state, action) => {
            state.status = "success";
            state.wards = action.payload
        }).addCase(fetchwards.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }).addCase(addward.pending, (state) => {
            state.status = "loading"
        }).addCase(addward.fulfilled, (state, action) => {
            state.status = "success";
            state?.wards?.push(action.payload)
        }).addCase(addward.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }).addCase(updatewardAsync.pending, (state) => {
            state.status = "pending"
        }).addCase(updatewardAsync.fulfilled, (state, action) => {
            state.status = "success";
            const updatedward = action.payload;
            const index = state?.wards?.findIndex((s) => s?._id === updatedward?._id)
            if(index !== -1){
                state.wards[index] = updatedward
            }
        }).addCase(updatewardAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message
        }).addCase(deleteward.pending, (state) => {
            state.status = "loading";
        }).addCase(deleteward.fulfilled, (state, action) => {
            state.status = "success";
            const deletedward = action.payload;
            state.wards = state?.wards?.filter(
              (ward) => ward?._id !== deletedward?._id
            );
        }).addCase(deleteward.rejected, (state, action) => {
            state.status = "error";
           state.error = action.error.message
        }).addDefaultCase((state, action) => {})

    }
})

export default WardSlice.reducer;