import { Express } from "express";
import ReservationsController from "./controllers/reservations-controllers";

/**
 *  The api exposes the REST API endpoints, but has no business logic inside apart basic error handling
 */
const reservationsAPI = (app: Express) => {
	/**
	 * Creates a new reservation with the provided id_user, id_restaurant, date, time and n_people
	 */
	app.post("/create-reservation", ReservationsController.createReservation)

	/**
	 * Returns the reservation with the specified ID.
	 */
	app.get("/find-reservation/:id", ReservationsController.getReservationById)

	/**
	 * Returns the reservations with the specified user ID.
	 */
	app.get("/find-user-reservations/:id", ReservationsController.getReservationsByUserId)

	/**
	 * Returns the reservations with the specified restaurant ID.
	 */
	app.get("/find-restaurant-reservations/:id", ReservationsController.getReservationsByRestaurantId)

	/**
	 * Deletes the reservation with the specified ID.
	 */
	app.delete("/delete-reservation/:id", ReservationsController.deleteReservation)

}

export default reservationsAPI