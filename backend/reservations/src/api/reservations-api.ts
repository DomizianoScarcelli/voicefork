import { Express } from "express";
import ReservationsController from "./controllers/reservations-controllers";

/**
 *  The api exposes the REST API endpoints, but has no business logic inside apart basic error handling
 */
const reservationsAPI = (app: Express) => {
	/**
	 * Creates a new reservation with the provided id_user, id_restaurant, date, time and n_people
	 */
	app.post("/create-user", ReservationsController.createReservation)

	// /**
	//  * Creates a new user with the provided username, email, password, name, surname and avatar
	//  */
	// app.post("/create-user", UsersController.createUser)

	// /**
	//  * Allows the user to login
	//  */
	// app.post("/login", UsersController.login)

	// /**
	//  * Returns the users' info 
	//  */
	// app.get("/get-all-users", UsersController.getAllUsers)

	// /**
	//  * Returns the user's info with the specified ID
	//  */
	// app.get("/get-user/:id", UsersController.getUserById)

	// /**
	//  * Remove the user with the specified ID
	//  */
	// app.delete("/delete-user/:id", UsersController.deleteUser)

	// /**
	//  * Update the user's avatar
	//  */
	// app.post("/update-avatar", UsersController.updateAvatar)

	// /**
	//  * Update the user's avatar
	//  */
	// app.post("/update-password", UsersController.updatePassword)

	// //TO DO: UPDATE USER INFO


}

export default reservationsAPI