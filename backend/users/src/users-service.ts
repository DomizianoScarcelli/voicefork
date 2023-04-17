import UsersRepository from "./users-repository";

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class UsersService {
	repository: UsersRepository

	constructor() {
		this.repository = new UsersRepository()
	}

    //TO IMPLEMENT
}

export default UsersService