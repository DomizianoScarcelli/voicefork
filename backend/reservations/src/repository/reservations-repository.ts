import {PrismaClient, Reservation} from '@prisma/client'
import {ReservationInfo} from '../shared/types'

const prisma: PrismaClient = new PrismaClient()

/**
 * The repository exposes methods that interacts with the database to put, modify and retrieve data
 */
class ReservationsRepository {
    async CreateReservation(
        id_user: number,
        id_restaurant: number,
        dateTime: Date,
        n_people: number,
        createdAtLatitude: number,
        createdAtLongitude: number,
        createdAtDate: Date,
    ): Promise<Reservation> {
        const reservation = await prisma.reservation.create({
            data: {
                id_user: id_user,
                id_restaurant: id_restaurant,
                dateTime: dateTime,
                n_people: n_people,
                createdAtLatitude: createdAtLatitude,
                createdAtLongitude: createdAtLongitude,
                createdAtDate: createdAtDate,
            },
        })

        return reservation
    }

    async GetReservationById(id: number): Promise<Reservation | null> {
        const reservation = await prisma.reservation.findUnique({
            where: {
                id: id,
            },
        })
        return reservation
    }

    async GetReservationsByUserId(id: number): Promise<Reservation[]> {
        const reservations = await prisma.reservation.findMany({
            where: {
                id_user: id,
            },
        })
        return reservations
    }

    async GetReservationsByRestaurantId(
        restaurantId: number,
    ): Promise<Reservation[]> {
        const reservations = await prisma.reservation.findMany({
            where: {
                id_restaurant: restaurantId,
            },
        })
        return reservations
    }

    async GetUserReservationsByRestaurantId(
        userid: number,
        restaurantId: number,
    ): Promise<Reservation[]> {
        const reservations = await prisma.reservation.findMany({
            where: {
                AND: {
                    id_restaurant: restaurantId,
                    id_user: userid,
                },
            },
        })
        return reservations
    }

    async GetAllReservations(): Promise<Reservation[]> {
        const reservations = await prisma.reservation.findMany()
        return reservations
    }

    async DeleteReservation(id: number): Promise<Reservation | null> {
        const reservation = await prisma.reservation.delete({
            where: {
                id: id,
            },
        })
        return reservation
    }

    async UpdateDateTime(id: number, newDateTime: Date): Promise<boolean> {
        const result = !!(await prisma.reservation.update({
            where: {
                id: id,
            },
            data: {
                dateTime: newDateTime,
            },
        }))

        return result
    }

    async UpdateNumPeople(id: number, newNumPeople: number): Promise<boolean> {
        const result = !!(await prisma.reservation.update({
            where: {
                id: id,
            },
            data: {
                n_people: newNumPeople,
            },
        }))

        return result
    }
}

export default ReservationsRepository
