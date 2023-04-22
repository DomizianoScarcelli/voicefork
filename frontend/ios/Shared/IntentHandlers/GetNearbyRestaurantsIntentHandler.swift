//
//  GetNearbyRestaurantsIntentHandler.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 22/04/23.
//

import UIKit
import Intents

public class GetNearbyRestaurantsIntentHandler: NSObject, GetNearbyRestaurantsIntentHandling {
  public func handle(intent: GetNearbyRestaurantsIntent, completion: @escaping (GetNearbyRestaurantsIntentResponse) -> Void) {
    let locationManager = LocationManager()
    locationManager.handleLocation()
    guard let coordinates = locationManager.getCurrentLocation() else {
      locationManager.handleLocation()
      return
    }
    intent.coordinates = Coordinates(latitude: coordinates.latitude, longitude: coordinates.longitude)
    var response = GetNearbyRestaurantsIntentResponse(code: .success, userActivity: nil)

    HTTPRequestUtils.getNearbyRestaurants(
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      maxDistance: 100000000) { restaurants in
        response.restaurantList = restaurants.map {Restaurant(restaurant: $0.restaurant)}
        NSLog("VoiceForkDebug: computed restaurant list\(response.restaurantList)")
        completion(response)
    }
  }


}
