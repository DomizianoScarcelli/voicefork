import UsersRepository from "../repository/users-repository"
import { User } from "@prisma/client"

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class UsersService {
	repository: UsersRepository

	constructor() {
		this.repository = new UsersRepository()
	}

    async CreateUser(name: string, surname: string, username: string, email: string, password: string, role: string) {
		const newUser = await this.repository.CreateUser(name, surname, username, email, password, role)
		return newUser
	}

	async GetUserById(id: number): Promise<User | null> {
		const user = await this.repository.GetUserById(id)
		return user
	}

	async DeleteUser(id: number): Promise<User | null> {
		const user = await this.repository.DeleteUser(id)
		if (user == null) return null

		const result = await this.repository.DeleteUser(id)
		return result
	}
}

export default UsersService