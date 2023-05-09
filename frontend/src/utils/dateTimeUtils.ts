export const getCurrentDate = () => {
    const date = new Date()
    date.setTime( date.getTime() - date.getTimezoneOffset()*60*1000 )
    return date.toISOString().split('T')[0]
}

export const getCurrentTime = () => {
    const date = new Date()
    date.setTime( date.getTime() - date.getTimezoneOffset()*60*1000 )
    return date.toISOString().split('T')[1]
}

export const constructDateTimeFromString = (date: string, time: string) => {
    return new Date(date + " " + time)
}

export const getNextReservableTime = () => {
    const currentTime = getCurrentTime()
    const currentHour = Number(currentTime.split(':')[0])
    return (currentHour + 1).toString().concat(":00")
}

export const getReservableTimes = (date: Date) => {
    const currentDateString = getCurrentDate()
    const inputDateString = date.toISOString().split('T')[0]
    let resevableHours = []
    let minHour = 0

    if (currentDateString === inputDateString) {
        const currentTime = getCurrentTime()
        const currentHour = Number(currentTime.split(':')[0])
        minHour = currentHour + 1
    }

    for (let i = minHour; i < 24; i++) {
        resevableHours.push(i.toString().concat(":00"))
    }

    return resevableHours
}