import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser : null,
  loading:false,
  error:null

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinStart: (state) => {
        state.loading = true;
    },
    signinSuccess: (state,action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null
    },
    signinFailer: (state, action) => {
      state.error = action.payload;
      state.loading= false;
    },
    updateUserStart:(state)=>{
      state.loading = true;
    },
    updateUserSuccess:(state,action)=>{
      state.currentUser = action.payload;
      state.loading= false;
      state.error =null;
    },
    updateUserFailer:(state, action)=>{
      state.loading = false;
      state.error = action.payload
    }
  },
})


export const { signinStart, signinSuccess, signinFailer ,
updateUserStart, updateUserSuccess, updateUserFailer} = userSlice.actions

export default userSlice.reducer