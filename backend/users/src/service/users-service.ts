import UsersRepository from "../repository/users-repository"
import { User } from "@prisma/client"
import { UserInfo } from "../shared/types"

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

	async GetUserById(id: number): Promise<UserInfo | null> {
		const user_info = await this.repository.GetUserById(id)
		return user_info
	}

	async DeleteUser(id: number): Promise<User | null> {
		const user = await this.repository.DeleteUser(id)
		if (user == null) return null

		const result = await this.repository.DeleteUser(id)
		return result
	}

	async UpdateAvatar(id: number, avatar: string): Promise<UserInfo | null> {
		const user = await this.repository.UpdateAvatar(id, avatar)
		if (user == null) return null
		else return user
	}
}

export default UsersService