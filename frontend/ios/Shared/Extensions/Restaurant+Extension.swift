//
//  Restaurant+Extension.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 22/04/23.
//

import Foundation
import IntentsUI

extension Restaurant {
  convenience init(restaurant: RestaurantModel) {
    self.init(identifier: String(restaurant.id), display: restaurant.name)
    self.name = restaurant.name
  }

  @available(iOSApplicationExtension 14.0, *)
  convenience init (restaurantDistance: RestaurantDistanceModel) {
    self.init(identifier: String(restaurantDistance.restaurant.id), display: restaurantDistance.restaurant.name, subtitle: "\(restaurantDistance.restaurant.address) (\(DistanceUtils.parseDistance(distance: restaurantDistance.distance)))", image: INImage(named: "da_beppe"))
    self.name = restaurantDistance.restaurant.name
  }
}
