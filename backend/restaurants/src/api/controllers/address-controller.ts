import { Request, Response, NextFunction } from "express"
import RestaurantService from "../../service/restaurant-service"

const service = new RestaurantService()
const AddressController = {
	getAllAddresses: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await service.GetAllAddresses()
			res.json(data)
		} catch (err) {
			next(err)
		}
	},
}

export default AddressController
