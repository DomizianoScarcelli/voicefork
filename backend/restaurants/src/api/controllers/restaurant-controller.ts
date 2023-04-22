import { Request, Response, NextFunction } from "express"
import RestaurantService from "../../service/restaurant-service"
import { LatLng } from "../../shared/types"

const service = new RestaurantService()
const RestaurantController = {
	createRestaurant: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, address, city } = req.body
			const data = await service.CreateRestaurant(name, address, city)
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
			const data = await service.GetRestaurantById(parseInt(id))
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

	getRestaurantsByIds: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { ids } = req.params
			const data = await service.GetRestaurantsByIds(JSON.parse(ids))
			res.json(data)
		} catch (err) {
			next(err)
		}
	},

	getAllRestaurants: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { localize } = req.query
			const data = await service.GetAllRestaurants()
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

	findRestaurantsNearby: async (req: Request<{}, {}, {}, { latitude: number; longitude: number; maxDistance: number; limit?: number }>, res: Response, next: NextFunction) => {
		try {
			const { latitude, longitude, maxDistance, limit } = req.query
			const coordinates: LatLng = { latitude: latitude, longitude: longitude }
			const data = await service.GetRestaurantsNearCoordinates(coordinates, maxDistance, limit)
			res.json(data)
		} catch (err) {
			next(err)
		}
	},
}

export default RestaurantController
