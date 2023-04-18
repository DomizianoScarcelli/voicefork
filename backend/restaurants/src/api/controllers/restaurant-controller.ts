import { Request, Response, NextFunction } from "express"
import RestaurantService from "../../service/restaurant-service"

const service = new RestaurantService()
const RestaurantController = {
	createRestaurant: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, street, number, city } = req.body
			const data = await service.CreateRestaurant(name, street, number, city)
			res.json({
				message: "Restaurant was created successfully!",
				data: data,
			})
		} catch (err) {
			next(err)
		}
	},

	deleteRestaurant: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const data = await service.DeleteRestaurant(parseInt(id))
			if (data == null) {
				res.json({
					error: "Restaurant not found",
					message: `Restaurant with id ${id} is not in the database`,
				})
			}
			res.json({
				message: `Restaurant with id ${id} was deleted successfully!`,
				data: data,
			})
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

	getRestaurantById: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const { localize } = req.query
			const parsedLocalize = localize == "True" ? true : false
			const data = await service.GetRestaurantById(parseInt(id), parsedLocalize)
			if (data == null) {
				res.status(404).json({
					error: `Resource not found`,
					message: `No restaurant was found with id: ${id}`,
				})
			}
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

	getAllRestaurants: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { localize } = req.query
			const parsedLocalize = localize == "True" ? true : false
			const data = await service.GetAllRestaurants(parsedLocalize)
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

	findSimilarRestaurants: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { query } = req.params
			const data = await service.GetRestaurantBySimilarName(query)
			res.json(data)
		} catch (err) {
			next(err)
		}
	},
}

export default RestaurantController
