import { PrismaClient, Reservation } from "../../node_modules/.prisma/client" // TODO: rimetti import { PrismaClient, Reservation } from "@prisma/client"
import { ReservationInfo } from "../shared/types"

const prisma: PrismaClient = new PrismaClient()

/**
 * The repository exposes methods that interacts with the database to put, modify and retrieve data
 */
class ReservationsRepository {
	async CreateReservation(id_user: number, id_restaurant: number, dateTime: Date, n_people: number): Promise<Reservation> {
		const reservation = await prisma.reservation.create({
			data: {
				id_user: id_user,
				id_restaurant: id_restaurant,
				dateTime: dateTime,
				n_people: n_people
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

	async GetReservationsByUserId(id: number): Promise<Reservation[] | null> {
		const reservations = await prisma.reservation.findMany({
			where: {
				id_user: id,
			},
		})
		return reservations
	}

	async GetReservationsByRestaurantId(id: number): Promise<Reservation[] | null> {
		const reservations = await prisma.reservation.findMany({
			where: {
				id_restaurant: id,
			},
		})
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
		const result = !!await prisma.reservation.update({
			where: {
				id: id,
			},
			data: {
				dateTime: newDateTime,
			},
		})
		
		return result
	}

	async UpdateNumPeople(id: number, newNumPeople: number): Promise<boolean> {
		const result = !!await prisma.reservation.update({
			where: {
				id: id,
			},
			data: {
				n_people: newNumPeople,
			},
		})
		
		return result
	}

}

export default ReservationsRepository;