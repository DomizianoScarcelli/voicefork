import { Reservation } from "@prisma/client"

type ReservationInfo = {
    id: number,
    id_user: number,
    id_restaurant: number,
    date: string,
    time: string,
    n_people: number
}

export { ReservationInfo }