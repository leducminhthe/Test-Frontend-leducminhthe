import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './features/country';
import countryDetail  from './features/detailCountry';

export const store = configureStore({
  reducer: {
    countries: countryReducer,    
    detail: countryDetail,    
  },
})