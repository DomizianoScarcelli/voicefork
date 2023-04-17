import RestaurantService from "./restaurant-service"
import { Express, Request, Response, NextFunction } from "express"

/**
 *  The api exposes the REST API endpoints, but has no business logic inside apart basic error handling
 */
const restaurantAPI = (app: Express) => {
	const service = new RestaurantService()

	app.post("/create-restaurant", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, street, number, city } = req.body
			const data = await service.CreateRestaurant(name, street, number, city)
			res.json(data)
		} catch (err) {
			next(err)
		}
	})

	app.get("/find-restaurant/:id", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const { localize } = req.query
			const parsedLocalize = localize == "True" ? true : false
			const data = await service.GetRestaurantById(parseInt(id), parsedLocalize)
			res.json(data)
		} catch (err) {
			next(err)
		}
	})

	app.get("/all-restaurants", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { localize } = req.query
			const parsedLocalize = localize == "True" ? true : false
			const data = await service.GetAllRestaurants(parsedLocalize)
			res.json(data)
		} catch (err) {
			next(err)
		}
	})

	app.get("/find-similar-restaurant/:query", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { query } = req.params
			const data = await service.GetRestaurantBySimilarName(query)
			res.json(data)
		} catch (err) {
			next(err)
		}
	})

	app.get("/all-addresses/", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await service.GetAllAddresses()
			res.json(data)
		} catch (err) {
			next(err)
		}
	})
}

export default restaurantAPI
