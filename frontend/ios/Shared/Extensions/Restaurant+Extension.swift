//
//  Restaurant+Extension.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 22/04/23.
//

import Foundation
extension Restaurant{
  convenience init(restaurant: RestaurantModel) {
    self.init(identifier: String(restaurant.id), display: restaurant.name)
    self.name = restaurant.name
  }
}
