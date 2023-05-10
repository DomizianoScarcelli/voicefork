import {Request, Response, NextFunction} from 'express'
import RestaurantService from '../../service/restaurant-service'
import {
    LatLng,
    RestaurantDistanceResult,
    RestaurantSearchResult,
} from '../../shared/types'
import {Restaurant} from '@prisma/client'
import {SortingStrategy} from '../../shared/enums'

const service = new RestaurantService()
const RestaurantController = {
    createRestaurant: async (
        req: Request<{}, {}, Restaurant, {}>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const restaurant = req.body

            const data = await service.CreateRestaurant(restaurant)
            res.json({
                message: 'Restaurant was created successfully!',
                data: data,
            })
        } catch (err) {
            next(err)
        }
    },

    deleteRestaurant: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {id} = req.params
            const data = await service.DeleteRestaurant(parseInt(id))
            if (data == null) {
                res.json({
                    error: 'Restaurant not found',
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

    getRestaurantById: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {id} = req.params
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

    getRestaurantsByIds: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {ids} = req.params
            const data = await service.GetRestaurantsByIds(JSON.parse(ids))
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    getAllRestaurants: async (
        req: Request<
            {},
            {},
            {},
            {
                page: number
            }
        >,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {page} = req.query
            let data: Restaurant[] = []
            if (page != undefined) {
                data = await service.GetAllRestaurants(page)
            } else {
                data = await service.GetAllRestaurants()
            }
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    searchRestaurants: async (
        req: Request<
            {},
            {},
            {},
            {
                query: string
                page: number
                limit?: number
                latitude?: number
                longitude?: number
                maxDistance?: number
            }
        >,
        res: Response,
        next: NextFunction,
    ) => {
        let data: RestaurantSearchResult[]
        try {
            const {query, limit, latitude, longitude, page} = req.query
            let {maxDistance} = req.query
            if (latitude != undefined && longitude != undefined) {
                if (maxDistance == undefined) maxDistance = Infinity
                const coordinates: LatLng = {
                    latitude: latitude,
                    longitude: longitude,
                }
                data = await service.SearchRestaurants(query, page, limit, {
                    coordinates: coordinates,
                    maxDistance: maxDistance,
                })
            } else {
                data = await service.SearchRestaurants(query, page, limit)
            }
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    findRestaurantsNearby: async (
        req: Request<
            {},
            {},
            {},
            {
                latitude: number
                longitude: number
                maxDistance: number
                limit?: number
                minRating?: number
                sortedBy?: typeof SortingStrategy
                pageNumber?: number
            }
        >,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {
                latitude,
                longitude,
                maxDistance,
                limit,
                minRating,
                pageNumber,
            } = req.query
            const coordinates: LatLng = {
                latitude: latitude,
                longitude: longitude,
            }
            let data: RestaurantDistanceResult[]

            if (minRating != undefined) {
                data = await service.GetTopRatedRestaurants(
                    coordinates,
                    maxDistance,
                    minRating,
                    limit,
                    pageNumber,
                )
            } else {
                data = await service.GetRestaurantsNearCoordinates(
                    coordinates,
                    maxDistance,
                    limit,
                    pageNumber,
                )
            }
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    getRestaurantImage: async (
        req: Request<
            {},
            {},
            {},
            {
                imageName: string
            }
        >,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {imageName} = req.query
            const image = await service.GetRestaurantImage(imageName)
            res.json({image: image})
        } catch (err) {
            next(err)
        }
    },
}

export default RestaurantController
