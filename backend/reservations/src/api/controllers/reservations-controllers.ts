import { Request, Response, NextFunction } from "express"
import ReservationsService from "../../service/reservations-service"

const service = new ReservationsService()
const ReservationsController = {
	createReservation: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id_user, id_restaurant, dateTime, n_people } = req.body
			const data = await service.CreateReservation(id_user, id_restaurant, dateTime, n_people)
			res.json({
				message: "Reservation was created successfully!",
				data: data,
			})
		} catch (err) {
			next(err)
		}
	},

	getReservationsByUserId: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const data = await service.GetReservationsByUserId(parseInt(id))
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

	getReservationsByRestaurantId: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const data = await service.GetReservationsByRestaurantId(parseInt(id))
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

	
}

export default ReservationsController