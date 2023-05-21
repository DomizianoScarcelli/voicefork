export const getCurrentDateToString = () => {
    const date = createNewDate()
    return date.toISOString().split('T')[0]
}

export const getCurrentTimeToString = () => {
    const date = createNewDate()
    return date.toISOString().split('T')[1]
}

export const constructDateTimeFromString = (date: string, time: string) => {
    const dateTime = new Date(date + " " + time)
    dateTime.setTime(dateTime.getTime() - dateTime.getTimezoneOffset()*60*1000)
    return dateTime
}

export const getNextReservableTime = () => {
    const currentTime = getCurrentTimeToString()
    const currentHour = Number(currentTime.split(':')[0])
    return (currentHour + 1).toString().concat(":00")
}

export const getReservableTimes = (date: Date) => {
    const currentDateString = getCurrentDateToString()
    const inputDateString = date.toISOString().split('T')[0]
    let resevableHours = []
    let minHour = 0

    if (currentDateString === inputDateString) {
        const currentTime = getCurrentTimeToString()
        const currentHour = Number(currentTime.split(':')[0])
        minHour = currentHour + 1
    }
    
    for (let i = minHour; i < 24; i++) {
        resevableHours.push(i.toString().concat(":00"))
        resevableHours.push(i.toString().concat(":30"))
    }

    return resevableHours
}

export const createNewDate = () => {
    const date = new Date()
    date.setTime(date.getTime() - date.getTimezoneOffset()*60*1000)
    return date
}