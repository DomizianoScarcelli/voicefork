import ReservationsRepository from '../repository/reservations-repository'
import {Reservation} from '@prisma/client'
import {Context} from '../shared/types'

//TODO: Debug
import {pastContexts} from './context-data'
import {
    contextToVector,
    computeAverageVector,
    calculateL2Distance,
    cosineSimilarity,
} from '../utils/contextUtils'
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

    async GetDistanceBetweenContext(
        inputContext: Context,
    ): Promise<number | null> {
        //TODO: The coordinates can be computed not by absolute distance, but by:
        // - Computing the centroid of the stored contexts: this will be a point in coordinates that determines the average point where the user usually make the reservation
        // - For each context in the stored contexts, compute the distance between the point and the centroid
        // - Average all the distances when computing the averageVector
        // - Compute the distance between the inputContext coordinates and the centroid
        // By doing that you can have a "average distance" inside the avgVector and teh "current distance from the average point where the user usually make the reservation" in the inputVector
        // Then just compute the distance/similarity between the vectors.

        const inputVector = contextToVector(inputContext)
        const avgVector = computeAverageVector(inputContext.id_restaurant)
        if (avgVector) return cosineSimilarity(inputVector, avgVector)
        return null
    }
}

export default ReservationsService
