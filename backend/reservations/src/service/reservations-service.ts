import ReservationsRepository from '../repository/reservations-repository'
import {Reservation} from '@prisma/client'
import {Context} from '../shared/types'

//TODO: Debug
import {comptueAverageContext, contextToVector} from '../utils/contextUtils'
import {distanceBetweenCoordinates} from '../utils/locationUtils'
import {l2Distance, cosineSimilarity} from '../utils/distances'
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
    ) {
        const newReservation = await this.repository.CreateReservation(
            id_user,
            id_restaurant,
            dateTime,
            n_people,
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

    async GetDistanceBetweenContext(inputContext: Context): Promise<any> {
        const avgContext = comptueAverageContext(inputContext.id_restaurant)
        const inputContextWithCentroidDistance: Context = {
            ...inputContext,
            centroidDistance: distanceBetweenCoordinates(
                inputContext.restaurantLocation,
                avgContext.restaurantLocation,
            ),
        }
        const avgVector = contextToVector(avgContext)
        const inputVector = contextToVector(inputContextWithCentroidDistance)
        const similarity = l2Distance(avgVector, inputVector)
        return {
            inputContext: inputContextWithCentroidDistance,
            averageContext: avgContext,
            distance: similarity,
        }
    }
}

export default ReservationsService
