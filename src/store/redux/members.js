import { createSlice } from '@reduxjs/toolkit'

const membersSlice = createSlice({
    name: 'members',
    initialState: {
        list: [
            { id: '철수ID', teamId: '영철팀ID', name: '철수', image: '', color: '#8EC5F9' },
            { id: '영희ID', teamId: '영철팀ID', name: '영희', image: '', color: '#EE7599' },
        ]
    },
    reducers: {
        addMember: (state, action)=>{},
        getMember: (state)=>{},
        removeMember: (state, action)=>{},
        updateMember: (state, action)=>{},
    }
})

export const addMember = membersSlice.actions.addMember
export const getMember = membersSlice.actions.getMember
export const removeMember = membersSlice.actions.removeMember
export const updateMember = membersSlice.actions.updateMember
export default membersSlice.reducer