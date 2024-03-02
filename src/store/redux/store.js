import membersReducer from './members'
import daysReducer from './days'
import loadingReducer from './progressBar'
import accountReducer from './account'
const { configureStore } = require("@reduxjs/toolkit")

export const store = configureStore({
    reducer: {
        account: accountReducer,
        members: membersReducer,
        days: daysReducer,
        progressBar: loadingReducer
    }
})