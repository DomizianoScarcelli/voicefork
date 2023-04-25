//
//  GetNearbyRestaurantsIntentHandler.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 22/04/23.
//

import UIKit
import Intents

public class GetNearbyRestaurantsIntentHandler: NSObject, GetNearbyRestaurantsIntentHandling {
  public func resolveRestaurantList(for intent: GetNearbyRestaurantsIntent, with completion: @escaping (RestaurantResolutionResult) -> Void) {
    let locationManager = LocationManager()
    locationManager.handleLocation()
    guard let coordinates = locationManager.getCurrentLocation() else {
      locationManager.handleLocation()
      return
    }

    guard let restaurantList = intent.restaurantList else {
      HTTPRequestUtils.getNearbyRestaurants(
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        maxDistance: 100000000) { restaurants in
        var restaurantList: [Restaurant] = []

        for restaurant in restaurants {
          if #available(iOSApplicationExtension 14.0, *) {
            restaurantList.append(Restaurant(restaurantDistance: restaurant))
          } else {
            restaurantList.append(Restaurant(restaurant: restaurant.restaurant))
          }
        }
        completion(RestaurantResolutionResult.disambiguation(with: restaurantList))
        return
      }
      return
    }
    completion(RestaurantResolutionResult.success(with: restaurantList))

  }


  public func handle(intent: GetNearbyRestaurantsIntent, completion: @escaping (GetNearbyRestaurantsIntentResponse) -> Void) {
    completion(GetNearbyRestaurantsIntentResponse(code: .success, userActivity: nil))
  }


}
