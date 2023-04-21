import { Request, Response, NextFunction } from "express"
import UsersService from "../../service/users-service"

const service = new UsersService()
const UsersController = {
	createUser: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, surname, username, email, password, role } = req.body
			const data = await service.CreateUser(name, surname, username, email, password, role)
			res.json({
				message: "User was created successfully!",
				data: data,
			})
		} catch (err) {
			next(err)
		}
	},

	login: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, username, password } = req.body
			const data = await service.Login(email, username, password)
			if (data == null) {
				res.status(404).json({
					error: `Resource not found`,
					message: `The specified username/email and password does not match with any user`,
				})
			}
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

    getUserById: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const data = await service.GetUserById(parseInt(id))
			if (data == null) {
				res.status(404).json({
					error: `Resource not found`,
					message: `No user was found with id: ${id}`,
				})
			}
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

    deleteUser: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const data = await service.DeleteUser(parseInt(id))
			if (data == null) {
				res.json({
					error: "User not found",
					message: `User with id ${id} is not in the database`,
				})
			}
			res.json({
				message: `User with id ${id} was deleted successfully!`,
				data: data,
			})
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

	updateAvatar: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id, avatar } = req.body
			const data = await service.UpdateAvatar(id, avatar)
			if (data == null) {
				res.json({
					error: "User not found",
					message: `User with id ${id} is not in the database`,
				})
			}
			res.json({
				message: `The avatar of the user with id ${id} was updated successfully`
			})
		} catch (err) {
			next(err)
		}
	},
}

export default UsersController