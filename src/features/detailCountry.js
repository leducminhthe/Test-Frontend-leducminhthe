import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios';

export const fetchDataDetail = createAsyncThunk(
    "detail/fetchDataDetail", 
    async ({ code }) => {
        try {
            return await Axios.get(`https://restcountries.com/v2/alpha/${ code }`).then((response) => {
                return response.data;
            })
        } catch (error) {
            console.error("Error: " + error.message);
        }
  });

export const countryDetail = createSlice({
  name: 'apiCountryDetail',
  initialState: {
    detail: '',
    status: null,
  },
  reducers: {},
  extraReducers: {
    [fetchDataDetail.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchDataDetail.fulfilled]: (state, action) => {
      state.status = 'success';
      state.detail = action.payload;
    },
    [fetchDataDetail.rejected]: (state) => {
      state.status = 'failed';
    },
 }
})

export const { bookMarkCountry, removeBookMarkCountry } = countryDetail.actions;

export default countryDetail.reducer;