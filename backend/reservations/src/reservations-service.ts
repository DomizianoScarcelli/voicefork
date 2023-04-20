import ReservationsRepository from "./reservations-repository";

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class ReservationsService {
	repository: ReservationsRepository

	constructor() {
		this.repository = new ReservationsRepository()
	}

    //TO IMPLEMENT
}

export default ReservationsService