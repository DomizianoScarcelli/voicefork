import { Express } from "express";
import UsersController from "./controllers/users-controllers";

/**
 *  The api exposes the REST API endpoints, but has no business logic inside apart basic error handling
 */
const usersAPI = (app: Express) => {
	/**
	 * Creates a new user with the provided username, email, password, name, surname and avatar
	 */
	app.post("/create-user", UsersController.createUser)

	/**
	 * Allows the user to login
	 */
	app.post("/login", UsersController.login)

	/**
	 * Returns the users' info 
	 */
	app.get("/get-all-users", UsersController.getAllUsers)

	/**
	 * Returns the user's info with the specified ID
	 */
	app.get("/get-user/:id", UsersController.getUserById)

	/**
	 * Remove the user with the specified ID
	 */
	app.delete("/delete-user/:id", UsersController.deleteUser)

	/**
	 * Update the user's avatar
	 */
	app.post("/update-avatar", UsersController.updateAvatar)

	/**
	 * Update the user's avatar
	 */
	app.post("/update-password", UsersController.updatePassword)

	//TO DO: UPDATE USER INFO


}

export default usersAPI