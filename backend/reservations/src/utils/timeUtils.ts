import {DateTime} from 'luxon'
import {TimeFormat} from '../shared/types'

export const timeToSecondsFromMidnight = (timeString: TimeFormat): number => {
    const time = DateTime.fromFormat(timeString, 'HH:mm')
    const hour = time.hour
    const minute = time.minute

    // Calculate the total number of seconds
    const totalSeconds = hour * 3600 + minute * 60
    return totalSeconds
}
