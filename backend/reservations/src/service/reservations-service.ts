import ReservationsRepository from "../repository/reservations-repository"
import { ReservationInfo } from "../shared/types"

/**
 * The service exposes methods that contains business logic and make use of the Repository to access the database indirectly
 */
class ReservationsService {
	repository: ReservationsRepository

	constructor() {
		this.repository = new ReservationsRepository()
	}

    // async CreateUser(name: string, surname: string, username: string, email: string, password: string, role: string) {
	// 	const newUser = await this.repository.CreateUser(name, surname, username, email, password, role)
	// 	return newUser
	// }

	// async Login(email: string, username: string, password: string): Promise<UserInfo | null> {
	// 	const userId = await this.repository.GetUserIdByEmailorUsername(email, username)
	// 	if (userId !== null) {
	// 		const checkPass = await this.repository.CheckPassword(userId, password)
	// 		if (checkPass) {
	// 			const result = await this.repository.GetUserById(userId)
	// 			return result
	// 		}
	// 	}

	// 	return null
	// }

	// async GetAllUsers(): Promise<UserInfo[]> {
	// 	const users = await this.repository.GetAllUsers()
	// 	return users
	// }

	// async GetUserById(id: number): Promise<UserInfo | null> {
	// 	const user_info = await this.repository.GetUserById(id)
	// 	return user_info
	// }

	// async DeleteUser(id: number): Promise<UserInfo | null> {
	// 	const user = await this.repository.GetUserById(id)
	// 	if (user == null) return null

	// 	const result = await this.repository.DeleteUser(id)
	// 	return result
	// }

	// async UpdateAvatar(id: number, avatar: string): Promise<UserInfo | null> {
	// 	const user = await this.repository.UpdateAvatar(id, avatar)
	// 	if (user == null) return null
	// 	else return user
	// }

	// async UpdatePassword(id: number, oldPassword: string, newPassword: string): Promise<boolean> {
	// 	const checkPass = await this.repository.CheckPassword(id, oldPassword)
	// 	if (checkPass) {
	// 		const result = await this.repository.UpdatePassword(id, newPassword)
	// 		return result
	// 	}

	// 	return false
	// }
}

export default ReservationsService