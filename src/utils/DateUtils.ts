import DateTimeProps from "../types/DateTime"

export function getPreviousDay(day: string) {
    switch (day) {
        case 'SUN': return 'SAT'
        case 'MON': return 'SUN'
        case 'TUE': return 'MON'
        case 'WED': return 'TUE'
        case 'THR': return 'WED'
        case 'FRI': return 'THR'
        case 'SAT': return 'FRI'
    }
}

export function getNextDay(day: string) {
    switch (day) {
        case 'SUN': return 'MON'
        case 'MON': return 'TUE'
        case 'TUE': return 'WED'
        case 'WED': return 'THR'
        case 'THR': return 'FRI'
        case 'FRI': return 'SAT'
        case 'SAT': return 'SUN'
    }
}

export function getPreviousDateTime(dateTime: DateTimeProps) {
    const currentDate = new Date(dateTime.year, dateTime.month-1, dateTime.date);
    const previousDateTimestamp = currentDate.getTime() - (24 * 60 * 60 * 1000)
    const previousDate = new Date(previousDateTimestamp)
    return { 
        year: previousDate.getFullYear(), 
        month: previousDate.getMonth() + 1, 
        date: previousDate.getDate(), 
        day: getPreviousDay(dateTime.day)
    } as DateTimeProps
}

export function getNextDateTime(dateTime: DateTimeProps) {
    const currentDate = new Date(dateTime.year, dateTime.month - 1, dateTime.date);
    const previousDateTimestamp = currentDate.getTime() + (24 * 60 * 60 * 1000)
    const previousDate = new Date(previousDateTimestamp)
    return { 
        year: previousDate.getFullYear(), 
        month: previousDate.getMonth() + 1, 
        date: previousDate.getDate(), 
        day: getNextDay(dateTime.day)
    } as DateTimeProps
}