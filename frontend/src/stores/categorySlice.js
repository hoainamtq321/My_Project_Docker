import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosConfig";

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async ()=>{
        const res = await api.get("/categories");
        return res.data;
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState:{
        items:[],
        loading: false,
        error: null,
        loaded: false,
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchCategories.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state,action) =>{
                state.items = action.payload;
                state.loading = false;
                state.loaded = true;
            })
            .addCase(fetchCategories.rejected, (state,action) =>{
                state.error =  action.error.message;
                state.loading = false;
            });
    },
});

export default categorySlice.reducer;
