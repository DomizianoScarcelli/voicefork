import UsersService from "./users-service";
import { Express, Request, Response, NextFunction } from "express";

/**
 *  The api exposes the REST API endpoints, but has no business logic inside apart basic error handling
 */
const usersAPI = (app: Express) => {
	const service = new UsersService()
}

export default usersAPI