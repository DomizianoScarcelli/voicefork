import { PrismaClient, User } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient();

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
				avatar: ""
			},
		})
		return user
	}

	async GetUserById(id: number): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		})
		return user
	}

	async DeleteUser(id: number): Promise<User | null> {
		const user = await prisma.user.delete({
			where: {
				id: id,
			},
		})
		return user
	}
}

export default UsersRepository;