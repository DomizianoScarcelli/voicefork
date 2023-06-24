import ReservationsRepository from '../repository/reservations-repository'
import {Reservation} from '@prisma/client'
import {ReservationContext, TimeFormat} from '../shared/types'
import {DateTime} from 'luxon'
import {
    computeAging,
    computeAverageContext,
    contextToVector,
    normalizeAverageAndInput,
    getNormalizedDistanceFromContext,
    weightVector,
} from '../utils/contextUtils'
import {distanceBetweenCoordinates} from '../utils/locationUtils'
import {l2Distance} from '../utils/distances'
import {DAYS_WEEK} from '../shared/enums'
import {timeToSecondsFromMidnight} from '../utils/timeUtils'
/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */

class ReservationsService {
    repository: ReservationsRepository

    constructor() {
        this.repository = new ReservationsRepository()
    }

    async CreateReservation(
        id_user: number,
        id_restaurant: number,
        dateTime: Date,
        n_people: number,
        createdAtLatitude: number,
        createdAtLongitude: number,
        createdAtDate: Date,
    ) {
        const newReservation = await this.repository.CreateReservation(
            id_user,
            id_restaurant,
            dateTime,
            n_people,
            createdAtLatitude,
            createdAtLongitude,
            createdAtDate,
        )
        return newReservation
    }

    async GetReservationById(id: number): Promise<Reservation | null> {
        const reservation = await this.repository.GetReservationById(id)
        return reservation
    }

    async GetReservationsByUserId(id: number): Promise<Reservation[] | null> {
        const reservations = await this.repository.GetReservationsByUserId(id)
        return reservations
    }

    async GetReservationsByRestaurantId(
        id: number,
    ): Promise<Reservation[] | null> {
        const reservations =
            await this.repository.GetReservationsByRestaurantId(id)
        return reservations
    }

    async GetAllReservations(): Promise<Reservation[]> {
        const reservations = await this.repository.GetAllReservations()
        return reservations
    }

    async DeleteReservation(id: number): Promise<Reservation | null> {
        const reservation = await this.repository.GetReservationById(id)
        if (reservation == null) return null

        const result = await this.repository.DeleteReservation(id)
        return result
    }

    async UpdateDateTime(id: number, newDateTime: Date): Promise<boolean> {
        const reservation = await this.repository.GetReservationById(id)
        if (reservation == null) return false

        const result = await this.repository.UpdateDateTime(id, newDateTime)
        return result
    }

    async UpdateNumPeople(id: number, newNumPeople: number): Promise<boolean> {
        const reservation = await this.repository.GetReservationById(id)
        if (reservation == null) return false

        const result = await this.repository.UpdateNumPeople(id, newNumPeople)
        return result
    }

    /**
     * Private util function that gets the ReservationContext array from the reservation that the user has made for the given restaurant ID
     * @param restaurantId The restaurant ID to consider
     * @returns The resulting ReservationContext array
     */
    private async getUserContext(userId: number, restaurantId: number) {
        let userContext: ReservationContext[] = []
        const reservations =
            await this.repository.GetUserReservationsByRestaurantId(
                userId,
                restaurantId,
            )

        for (let {
            id_restaurant,
            dateTime,
            n_people,
            createdAtLatitude,
            createdAtLongitude,
            createdAtDate,
        } of reservations) {
            const reservationContext: ReservationContext = {
                id_restaurant: id_restaurant,
                n_people: n_people,
                //TODO: Handle the case in which the LatLng is not available
                reservationLocation: {
                    latitude: createdAtLatitude!,
                    longitude: createdAtLongitude!,
                },
                currentDay: DateTime.fromJSDate(createdAtDate)
                    .weekday as DAYS_WEEK,
                reservationDay: DateTime.fromJSDate(dateTime)
                    .weekday as DAYS_WEEK,
                currentTime: DateTime.fromJSDate(createdAtDate).toFormat(
                    'HH:mm',
                ) as TimeFormat,
                reservationTime: DateTime.fromJSDate(dateTime).toFormat(
                    'HH:mm',
                ) as TimeFormat,
                timestamp: createdAtDate,
            }
            userContext.push(reservationContext)
        }
        return userContext.map(item => {
            return {...item, ageFactor: computeAging(item)}
        })
    }

    async GetDistanceBetweenContext(
        userId: number,
        inputContext: ReservationContext,
    ): Promise<any> {
        //Timestamps the input context with the current date and time
        inputContext.timestamp = new Date()

        const userContext = await this.getUserContext(
            parseInt(userId.toString()),
            parseInt(inputContext.id_restaurant.toString()), //Number to string to number trick otherwise prisma error
        )

        const avgContext = computeAverageContext(
            inputContext.id_restaurant,
            userContext,
        )

        const inputContextWithCentroidDistance: ReservationContext = {
            ...inputContext,
            centroidDistance: distanceBetweenCoordinates(
                inputContext.reservationLocation,
                avgContext.reservationLocation,
            ),
            timeDistanceFromCurrent: timeToSecondsFromMidnight(
                inputContext.currentTime!,
            ),
            timeDistanceFromReservation: timeToSecondsFromMidnight(
                inputContext.reservationTime!,
            ),
        }
        const avgVector = contextToVector(avgContext)

        const distancesWithAging = userContext.map(item =>
            getNormalizedDistanceFromContext(
                inputContextWithCentroidDistance,
                item,
                avgVector,
                avgContext,
            ),
        )

        let finalDistance = 0
        let totalAgeFactors = 0
        for (const {distance, ageFactor} of distancesWithAging) {
            finalDistance += distance * ageFactor
            totalAgeFactors += ageFactor
        }
        finalDistance /= totalAgeFactors

        console.log(
            'DEBUG NORMALIZED DISTANCES: ',
            distancesWithAging,
            finalDistance,
        )

        const MULTIPLE_CONTEXT_BOOST = 0.1

        if (finalDistance && avgContext.numberOfReservations) {
            finalDistance -=
                MULTIPLE_CONTEXT_BOOST *
                finalDistance *
                Math.log(Math.E + avgContext.numberOfReservations - 1)
        }
        return {
            inputContext: inputContextWithCentroidDistance,
            averageContext: avgContext,
            distance: finalDistance,
        }
    }
}

export default ReservationsService
