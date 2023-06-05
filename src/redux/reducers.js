import { createSlice } from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state, action) => {
      state.user = null;
    },
  },
});

export const { login, logOut } = userSlice.actions;

const rootReducer = combineReducers({
    // you can add more reducers here
    user: userSlice.reducer,
})

const persistConfig ={
    key: 'root',
    storage, 
}

export default persistReducer(persistConfig, rootReducer)