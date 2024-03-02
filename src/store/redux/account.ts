import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: 'account',
  initialState: {
      keyPair: null,
      userInfo: null,
  },
  reducers: {
    getAccount: (state)=>{
      return state
    },
    setAccount: (state, action)=>{
      state = action.payload
    },
    removeAccount: (state)=>{
      state.keyPair = null
      state.userInfo = null
    },
  }
})

export const getAccount = accountSlice.actions.getAccount
export const setAccount = accountSlice.actions.setAccount
export const removeAccount = accountSlice.actions.removeAccount

export default accountSlice.reducer