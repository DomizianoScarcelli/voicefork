//
//  Reservation+Intents.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 22/04/23.
//
import Foundation
import Intents

extension Reservation {
  @available(iOSApplicationExtension 14.0, watchOSApplicationExtension 7.0, *)
  convenience init(restaurant: Restaurant) {
    self.init(identifier: restaurant.identifier,
              display: "Ristorante molto matto",
              subtitle: "subtitle",
              image: INImage(named: "da_beppe"))
  }
}
