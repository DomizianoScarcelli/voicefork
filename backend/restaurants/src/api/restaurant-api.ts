import {Express} from 'express'
import RestaurantController from './controllers/restaurant-controller'

/**
 * The restaurant API endpoints for creating, retrieving, updating and deleting restaurants.
 */
const restaurantAPI = (app: Express) => {
    /**
     * Creates a new restaurant with the provided name, address, street number and city.
     */
    app.post('/create-restaurant', RestaurantController.createRestaurant)

    /**
     * Deletes the restaurant with the specified ID.
     */
    app.delete('/delete-restaurant/:id', RestaurantController.deleteRestaurant)

    /**
     * Returns the restaurant with the specified ID.
     */
    app.get('/find-restaurant/:id', RestaurantController.getRestaurantById)

    /**
     * Returns the restaurant with the specified ID.
     */
    app.get('/find-restaurants/:ids', RestaurantController.getRestaurantsByIds)

    /**
     * Returns a list of all restaurants.
     */
    app.get('/all-restaurants', RestaurantController.getAllRestaurants)

    /**
     * Given a restaurant name, returns the list of the top 10 restaurants with the most similar name,
     * along with their distance from the provided restaurant.
     */
    app.get(
        '/find-similar-restaurant/',
        RestaurantController.findSimilarRestaurants,
    )

    /***
     * Given a set of coordinates and a maxDistance, returns the ordinate list of the restaurant that are nearby that location.
     */
    app.get(
        '/find-restaurants-nearby',
        RestaurantController.findRestaurantsNearby,
    )
}

export default restaurantAPI
