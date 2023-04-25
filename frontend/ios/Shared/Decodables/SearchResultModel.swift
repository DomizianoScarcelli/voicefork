//
//  SearchResultModel.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 25/04/23.
//

import Foundation

public struct SearchResultModel: Decodable {
  var restaurant: RestaurantModel
  var nameDistance: Double
  var locationDistance: Double?
}
