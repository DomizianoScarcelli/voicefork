import {Request, Response, NextFunction} from 'express'
import ReservationsService from '../../service/reservations-service'
import {ReservationContext, TimeFormat, LatLng} from '../../shared/types'
import {DAYS_WEEK} from '../../shared/enums'

const service = new ReservationsService()
const ReservationsController = {
    createReservation: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {
                id_user,
                id_restaurant,
                dateTime,
                n_people,
                createdAtLatitude,
                createdAtLongitude,
                createdAtDate,
            } = req.body
            const data = await service.CreateReservation(
                id_user,
                id_restaurant,
                dateTime,
                n_people,
                createdAtLatitude,
                createdAtLongitude,
                createdAtDate,
            )
            res.json({
                message: 'Reservation was created successfully!',
                data: data,
            })
        } catch (err) {
            next(err)
        }
    },

    getReservationById: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {id} = req.params
            const data = await service.GetReservationById(parseInt(id))
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    getReservationsByUserId: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {id} = req.params
            const data = await service.GetReservationsByUserId(parseInt(id))
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    getReservationsByRestaurantId: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {id} = req.params
            const data = await service.GetReservationsByRestaurantId(
                parseInt(id),
            )
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    getAllReservations: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {localize} = req.query
            const data = await service.GetAllReservations()
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    deleteReservation: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {id} = req.params
            const data = await service.DeleteReservation(parseInt(id))
            if (data == null) {
                res.json({
                    error: 'Reservation not found',
                    message: `Reservation with id ${id} is not in the database`,
                })
            }
            res.json({
                message: `Reservation with id ${id} was deleted successfully!`,
                data: data,
            })
            res.json(data)
        } catch (err) {
            next(err)
        }
    },

    updateDateTime: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id, newDateTime} = req.body
            const result = await service.UpdateDateTime(id, newDateTime)
            if (!result) {
                res.json({
                    error: 'Reservation not found',
                    message: `Reservation with id ${id} not found in the database`,
                })
            }
            res.json({
                message: `The date/time of the reservation with id ${id} was updated successfully`,
            })
        } catch (err) {
            next(err)
        }
    },

    updateNumPeople: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {id, newNumPeople} = req.body
            const result = await service.UpdateNumPeople(id, newNumPeople)
            if (!result) {
                res.json({
                    error: 'Reservation not found',
                    message: `Reservation with id ${id} not found in the database`,
                })
            }
            res.json({
                message: `The number of people of the reservation with id ${id} was updated successfully`,
            })
        } catch (err) {
            next(err)
        }
    },

    getDistanceBetweenContext: async (
        req: Request<
            {},
            {},
            {},
            {
                id_user: number
                id_restaurant: number
                n_people: number
                latitude: number
                longitude: number
                currentDay: DAYS_WEEK
                reservationDay: DAYS_WEEK
                currentTime: TimeFormat
                reservationTime: TimeFormat
            }
        >,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const {
                id_user,
                id_restaurant,
                n_people,
                latitude,
                longitude,
                currentDay,
                reservationDay,
                currentTime,
                reservationTime,
            } = req.query

            const inputContext: ReservationContext = {
                id_restaurant,
                n_people,
                reservationLocation: {latitude, longitude},
                currentDay,
                reservationDay,
                currentTime,
                reservationTime,
            }
            const result = await service.GetDistanceBetweenContext(
                id_user,
                inputContext,
            )
            res.json(result)
        } catch (err) {
            next(err)
        }
    },
}

export default ReservationsController
