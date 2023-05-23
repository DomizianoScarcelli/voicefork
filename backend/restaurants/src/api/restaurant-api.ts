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
     * Allows to search for restaurants given a name, sorted by distance from the query name.
     * - query: the name of the restaurant we want to search
     * - limit: allows to limit the number of results
     * - latitude and longitude: if set, along with maxDistance, it will return only results within a certain geographical area
     * - maxDistance: the maximum distance from the coordinates where the resturant can be
     */
    app.get('/search-restaurants/', RestaurantController.searchRestaurants)

    /***
     * Given a set of coordinates and a maxDistance, returns the ordinate list of the restaurant that are nearby that location.
     */
    app.get(
        '/find-restaurants-nearby',
        RestaurantController.findRestaurantsNearby,
    )
    /***
     * Given a restaurant, it returns its image as a base64 string.
     */
    app.get('/restaurant-image', RestaurantController.getRestaurantImage)

    /***
     * Given a restaurant, it returns its image as a base64 string.
     */
    app.get('/restaurants-by-city', RestaurantController.getRestaurantsByCity)
}

export default restaurantAPI
