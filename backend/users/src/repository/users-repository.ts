import { PrismaClient, Role, User } from "@prisma/client"
import { UserInfo } from "../shared/types"

const prisma: PrismaClient = new PrismaClient()

/**
 * The repository exposes methods that interacts with the database to put, modify and retrieve data
 */
class UsersRepository {
	async CreateUser(name: string, surname: string, username: string, email: string, password: string, role: string): Promise<User> {
		const user = await prisma.user.create({
			data: {
				name: name,
				surname: surname,
				username: username,
				email: email,
				password: password,
				role: Role[role as keyof typeof Role],
				avatar: ""
			},
		})
		return user
	}

	async GetUserById(id: number): Promise<UserInfo | null> {
		const user_info = await prisma.user.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				name: true,
				surname: true,
				username: true,
				email: true,
				avatar: true
			},
		})
		return user_info
	}

	async Login(email: string, username: string, password: string): Promise<UserInfo | null> {
		const userExist = !!await prisma.user.findFirst({
			where: {
				OR: [
					{ username: username },
					{ email: email }
				]
			}
		})

		if (userExist) {
			const user_info = await prisma.user.findFirst({
				where: {
					AND: [
						{
							OR: [
								{ username: username },
								{ email: email }
							]
						},
						{ password: password }
					]
				},
				select: {
					id: true,
					name: true,
					surname: true,
					username: true,
					email: true,
					avatar: true
				},
			})

			return user_info
		}

		return null
	}

	async DeleteUser(id: number): Promise<User | null> {		
		const user = await prisma.user.delete({
			where: {
				id: id
			}
		})

		return user
	}

	async UpdateAvatar(id: number, avatar: string): Promise<UserInfo | null> {
		const user = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				avatar: avatar,
			},
		})
		return user
	}
}

export default UsersRepository;