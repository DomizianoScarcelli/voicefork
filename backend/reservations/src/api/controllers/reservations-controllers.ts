import { Request, Response, NextFunction } from "express"
import ReservationsService from "../../service/reservations-service"

const service = new ReservationsService()
const ReservationsController = {
	createReservation: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id_user, id_restaurant, date, time, n_people } = req.body
			const data = await service.CreateReservation(id_user, id_restaurant, date, time, n_people)
			res.json({
				message: "Reservation was created successfully!",
				data: data,
			})
		} catch (err) {
			next(err)
		}
	},

	// createUser: async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const { name, surname, username, email, password, role } = req.body
	// 		const data = await service.CreateUser(name, surname, username, email, password, role)
	// 		res.json({
	// 			message: "User was created successfully!",
	// 			data: data,
	// 		})
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// },

	// login: async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const { email, username, password } = req.body
	// 		const data = await service.Login(email, username, password)
	// 		if (data == null) {
	// 			res.status(404).json({
	// 				error: `Resource not found`,
	// 				message: `The specified username/email and password does not match with any user`,
	// 			})
	// 		}
	// 		res.json(data)
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// },

	// getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const data = await service.GetAllUsers()
	// 		res.json(data)
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// },

    // getUserById: async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const { id } = req.params
	// 		const data = await service.GetUserById(parseInt(id))
	// 		if (data == null) {
	// 			res.status(404).json({
	// 				error: `Resource not found`,
	// 				message: `No user was found with id: ${id}`,
	// 			})
	// 		}
	// 		res.json(data)
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// },

    // deleteUser: async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const { id } = req.params
	// 		const data = await service.DeleteUser(parseInt(id))
	// 		if (data == null) {
	// 			res.json({
	// 				error: "User not found",
	// 				message: `Can't delete User with id ${id}`,
	// 			})
	// 		}
	// 		res.json({
	// 			message: `User with id ${id} was deleted successfully!`,
	// 		})
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// },

	// updateAvatar: async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const { id, avatar } = req.body
	// 		const data = await service.UpdateAvatar(id, avatar)
	// 		if (data == null) {
	// 			res.json({
	// 				error: "User not found",
	// 				message: `User with id ${id} is not in the database`,
	// 			})
	// 		}
	// 		res.json({
	// 			message: `The avatar of the user with id ${id} was updated successfully`
	// 		})
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// },

	// updatePassword: async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const { id, oldPassword, newPassword } = req.body
	// 		const result = await service.UpdatePassword(id, oldPassword, newPassword)
	// 		if (!result) {
	// 			res.json({
	// 				error: "User not found",
	// 				message: `User with id ${id} not found in the database or old password not matching`,
	// 			})
	// 		}
	// 		res.json({
	// 			message: `The password of the user with id ${id} was updated successfully`
	// 		})
	// 	} catch (err) {
	// 		next(err)
	// 	}
	// },
}

export default ReservationsController