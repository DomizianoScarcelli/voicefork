import ReservationsRepository from "../repository/reservations-repository"
import { Reservation } from "../../node_modules/.prisma/client" // TODO: rimetti import { Reservation } from "@prisma/client"
import { ReservationInfo } from "../shared/types"

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class ReservationsService {
	repository: ReservationsRepository

	constructor() {
		this.repository = new ReservationsRepository()
	}

    async CreateReservation(id_user: number, id_restaurant: number, dateTime: Date, n_people: number) {
		const newReservation = await this.repository.CreateReservation(id_user, id_restaurant, dateTime, n_people)
		return newReservation
	}

	async GetReservationsByUserId(id: number): Promise<Reservation[] | null> {
		const reservations = await this.repository.GetReservationsByUserId(id)
		return reservations
	}

	async GetReservationsByRestaurantId(id: number): Promise<Reservation[] | null> {
		const reservations = await this.repository.GetReservationsByRestaurantId(id)
		return reservations
	}
}

export default ReservationsService