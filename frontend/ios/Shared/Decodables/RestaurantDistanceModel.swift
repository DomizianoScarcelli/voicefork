//
//  RestaurantDistanceModel.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 22/04/23.
//

import Foundation

public struct RestaurantDistanceModel: Decodable {
  var restaurant: RestaurantModel
  var distance: Double
}
