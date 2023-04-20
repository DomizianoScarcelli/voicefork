import ReservationsService from "./reservations-service";
import { Express, Request, Response, NextFunction } from "express";

/**
 *  The api exposes the REST API endpoints, but has no business logic inside apart basic error handling
 */
const reservationsAPI = (app: Express) => {
	const service = new ReservationsService()
}

export default reservationsAPI