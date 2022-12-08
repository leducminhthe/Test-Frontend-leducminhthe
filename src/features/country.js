import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios';

export const fetchDataCountry = createAsyncThunk(
  "data/fetchDataCountry", 
  async ({search}) => {
      try {
          return await Axios.get('https://api.covid19api.com/summary').then((response) => {
              if(search == '2') {
                var sort = response.data.Countries.sort((a, b) => {
                  return b.TotalDeaths - a.TotalDeaths;
                })
              } else if (search == '3') {
                var sort = response.data.Countries.sort((a, b) => {
                  return a.TotalRecovered - b.TotalRecovered;
                })
              } else {
                var sort = response.data.Countries.sort((a, b) => {
                  return b.TotalConfirmed - a.TotalConfirmed;
                })
              }
              return sort;
          })
      } catch (error) {
          console.error("Error: " + error.message);
          return [];
      }
});

export const countries = createSlice({
  name: 'apiCountries',
  initialState: {
    data: [],
    status: null,
  },
  reducers: {},
  extraReducers: {
    [fetchDataCountry.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchDataCountry.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [fetchDataCountry.rejected]: (state) => {
      state.status = 'failed';
    },
  }
})

export default countries.reducer;