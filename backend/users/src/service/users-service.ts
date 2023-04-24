import UsersRepository from "../repository/users-repository"
import { UserInfo } from "../shared/types"

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class UsersService {
	repository: UsersRepository

	constructor() {
		this.repository = new UsersRepository()
	}

    async CreateUser(name: string, surname: string, email: string, password: string, role: string) {
		const newUser = await this.repository.CreateUser(name, surname, email, password, role)
		return newUser
	}

	async Login(email: string, password: string): Promise<UserInfo | null> {
		const userId = await this.repository.GetUserIdByEmail(email)
		if (userId !== null) {
			const checkPass = await this.repository.CheckPassword(userId, password)
			if (checkPass) {
				const result = await this.repository.GetUserById(userId)
				return result
			}
		}

		return null
	}

	async GetAllUsers(): Promise<UserInfo[]> {
		const users = await this.repository.GetAllUsers()
		return users
	}

	async GetUserById(id: number): Promise<UserInfo | null> {
		const user_info = await this.repository.GetUserById(id)
		return user_info
	}

	async DeleteUser(id: number): Promise<UserInfo | null> {
		const user = await this.repository.GetUserById(id)
		if (user == null) return null

		const result = await this.repository.DeleteUser(id)
		return result
	}

	async UpdateAvatar(id: number, avatar: string): Promise<UserInfo | null> {
		const user = await this.repository.UpdateAvatar(id, avatar)
		if (user == null) return null
		else return user
	}

	async UpdatePassword(id: number, oldPassword: string, newPassword: string): Promise<boolean> {
		const checkPass = await this.repository.CheckPassword(id, oldPassword)
		if (checkPass) {
			const result = await this.repository.UpdatePassword(id, newPassword)
			return result
		}

		return false
	}
}

export default UsersService