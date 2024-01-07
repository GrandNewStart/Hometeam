import membersReducer from './members'
import daysReducer from './days'
const { configureStore } = require("@reduxjs/toolkit")

export const store = configureStore({
    reducer: {
        members: membersReducer,
        days: daysReducer,
    }
})