import { PrismaClient, Reservation } from "@prisma/client"
import { ReservationInfo } from "../shared/types"

const prisma: PrismaClient = new PrismaClient()

/**
 * The repository exposes methods that interacts with the database to put, modify and retrieve data
 */
class ReservationsRepository {
	// async CreateUser(name: string, surname: string, username: string, email: string, password: string, role: string): Promise<User> {
	// 	const user = await prisma.user.create({
	// 		data: {
	// 			name: name,
	// 			surname: surname,
	// 			username: username,
	// 			email: email,
	// 			password: password,
	// 			role: Role[role as keyof typeof Role],
	// 			avatar: ""
	// 		},
	// 	})

	// 	return user
	// }

	// async GetAllUsers(): Promise<UserInfo[]> {
	// 	const users = await prisma.user.findMany({
	// 		select: {
	// 			id: true,
	// 			name: true,
	// 			surname: true,
	// 			username: true,
	// 			email: true,
	// 			avatar: true
	// 		},
	// 	})

	// 	return users
	// }

	// async GetUserById(id: number): Promise<UserInfo | null> {
	// 	const user_info = await prisma.user.findUnique({
	// 		where: {
	// 			id: id,
	// 		},
	// 		select: {
	// 			id: true,
	// 			name: true,
	// 			surname: true,
	// 			username: true,
	// 			email: true,
	// 			avatar: true
	// 		},
	// 	})

	// 	return user_info
	// }

	// async CheckPassword(id: number, password: string): Promise<boolean> {
	// 	const checkPass = !!await prisma.user.findFirst({
	// 		where: {
	// 			AND: [
	// 				{ id: id },
	// 				{ password: password },
	// 			]
	// 		},
	// 	})

	// 	return checkPass
	// }

	// async GetUserIdByEmailorUsername(email: string, username: string): Promise<number | null> {
	// 	const userId = await prisma.user.findFirst({
	// 		where: {
	// 			OR: [
	// 				{ username: username },
	// 				{ email: email },
	// 			]
	// 		}, 
	// 		select: {
	// 			id: true
	// 		}
	// 	})

	// 	if (userId !== null) return userId.id
	// 	return null
	// }

	// async Login(email: string, username: string, password: string): Promise<UserInfo | null> {
	// 	const userId = await prisma.user.findFirst({
	// 		where: {
	// 			OR: [
	// 				{ username: username },
	// 				{ email: email }
	// 			]
	// 		}, 
	// 		select: {
	// 			id: true
	// 		}
	// 	})

	// 	if (userId !== null && await this.CheckPassword(userId.id, password)) {
	// 		const user_info = await prisma.user.findFirst({
	// 			where: {
	// 				id: userId.id,
	// 			},
	// 			select: {
	// 				id: true,
	// 				name: true,
	// 				surname: true,
	// 				username: true,
	// 				email: true,
	// 				avatar: true
	// 			},
	// 		})

	// 		return user_info
	// 	}

	// 	return null
	// }

	// async DeleteUser(id: number): Promise<User | null> {		
	// 	const user = await prisma.user.delete({
	// 		where: {
	// 			id: id
	// 		}
	// 	})

	// 	return user
	// }

	// async UpdateAvatar(id: number, avatar: string): Promise<UserInfo | null> {
	// 	const user = await prisma.user.update({
	// 		where: {
	// 			id: id,
	// 		},
	// 		data: {
	// 			avatar: avatar,
	// 		},
	// 	})

	// 	return user
	// }

	// async UpdatePassword(id: number, newPassword: string): Promise<boolean> {
	// 	const result = !!await prisma.user.update({
	// 		where: {
	// 			id: id,
	// 		},
	// 		data: {
	// 			password: newPassword,
	// 		},
	// 	})
		
	// 	return result
	// }
}

export default ReservationsRepository;