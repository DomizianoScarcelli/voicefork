import { Request, Response, NextFunction } from "express"
import { Prisma } from '@prisma/client'
import UsersService from "../../service/users-service"

const service = new UsersService()
const UsersController = {
	createUser: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, surname, email, password, role } = req.body
			const data = await service.CreateUser(name, surname, email, password, role)
			res.json({
				message: "User was created successfully!",
				data: data,
			})
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code === 'P2002') {
					return res.status(422).send("The email address is already in use. Please, choose another one.");
				}
			  }
			  throw err
		}
	},

	login: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body
			const data = await service.Login(email, password)
			if (data == null) {
				res.status(404).json({
					error: `Resource not found`,
					message: `The specified email and password do not match with any user`,
				})
			}
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

	getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await service.GetAllUsers()
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
					message: `Can't delete User with id ${id}`,
				})
			}
			res.json({
				message: `User with id ${id} was deleted successfully!`,
			})
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

	updatePassword: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id, oldPassword, newPassword } = req.body
			const result = await service.UpdatePassword(id, oldPassword, newPassword)
			if (!result) {
				res.json({
					error: "User not found",
					message: `User with id ${id} not found in the database or old password not matching`,
				})
			}
			res.json({
				message: `The password of the user with id ${id} was updated successfully`
			})
		} catch (err) {
			next(err)
		}
	},

	getUserAvatar: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { imageName } = req.params
            const image = await service.GetUserAvatar(imageName)
            res.json({image: image})
        } catch (err) {
            next(err)
        }
    },
}

export default UsersController