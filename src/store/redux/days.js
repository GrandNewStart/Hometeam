import { createSlice } from '@reduxjs/toolkit'

const daysSlice = createSlice({
    name: 'days',
    initialState: {
        list: [
            { dateTime: { year: 2023, month: 11, date: 23, day: 'THR' }, teamId: '영철팀ID', tasks: [] },
            { dateTime: { year: 2023, month: 11, date: 24, day: 'FRI' }, teamId: '영철팀ID', tasks: [] },
            { dateTime: { year: 2023, month: 11, date: 25, day: 'SAT' }, teamId: '영철팀ID', tasks: [] },
            { 
                dateTime: {
                    year: 2023, 
                    month: 11, 
                    date: 26, 
                    day: 'SUN', 
                },
                teamId: '영철팀ID', 
                tasks: [
                    { id: 0, name: '캣 타워 당근', memberIds: [ '철수ID', '영희ID' ], status: 'new' },
                    { id: 1, name: '신발 세탁 맡긴거 찾아오기', memberIds: [ '철수ID' ], status: 'pending' },
                    { id: 2, name: '빨래 걷기', memberIds: [ '철수ID' ], status: 'in_progress' },
                    { id: 3, name: '음식물 쓰레기 버리기', memberIds: [ '영희ID' ], status: 'done' },
                    { id: 4, name: '고양이 화장실 청소', memberIds: [ '영희ID' ], status: 'pending' },
                    { id: 5, name: '이불 빨래', memberIds: ['영희ID' ], status: 'pending' },
                    { id: 6, name: '장보기', memberIds: ['철수ID', '영희ID' ], status: 'pending' },
                ]
             },
        ]
    },
    reducers: {
        getDay: (state)=>{},
        addDay: (state, action)=>{},
        updateDay: (state, action)=>{
            const day = action.payload
            let newList = [...state.list]
            for (let i=0; i<newList.length; i++) {
                if (newList[i].dateTime.year === day.dateTime.year && 
                    newList[i].dateTime.month === day.dateTime.month && 
                    newList[i].dateTime.date === day.dateTime.date) {
                    newList[i] = day
                    state.list = newList
                }
            }
        },
    }
})

export const getDay = daysSlice.actions.getDay
export const addDay = daysSlice.actions.addDay
export const updateDay = daysSlice.actions.updateDay
export default daysSlice.reducer