import RestaurantService from "./restaurant-repository"
import { Express, Request, Response, NextFunction } from "express"

/**
 *  The api exposes the REST API endpoints, but has no business logic inside apart basic error handling
 */
const restaurantAPI = (app: Express) => {
	const service = new RestaurantService()
	app.post("/create-restaurant", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, address } = req.body
			const data = await service.CreateRestaurant(name, address)
			res.json(data)
		} catch (err) {
			next(err)
		}
	})

	app.get("/find-restaurant/:id", async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const data = await service.GetRestaurantById(parseInt(id))
			res.json(data)
		} catch (err) {
			next(err)
		}
	})

	app.get("/all-restaurants", async (req: Request, res: Response, next: NextFunction) => {
		console.log("Getting all restaurants...")
		try {
			const data = await service.GetAllRestaurants()
			res.json(data)
		} catch (err) {
			console.log("here")
			next(err)
		}
	})
}

export default restaurantAPI
