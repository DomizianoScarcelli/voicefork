//
//  Coordinates+Extension.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 22/04/23.
//
import Foundation
extension Coordinates{
  convenience init(latitude: Double, longitude: Double) {
    self.init(identifier: "\(latitude), \(longitude)", display: "\(latitude), \(longitude)")
    self.latitude = NSNumber(value: latitude)
    self.longitude = NSNumber(value: longitude)
  }
}
