//
//  Distanceutils.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 25/04/23.
//

import Foundation

public class DistanceUtils {
  public static  func parseDistance(distance: Double) -> String {
    if distance < 1000 {
      return "\(Int(round(distance)))m"
    }
    else {
      return "\(round(distance/1000)/10)km"
    }
  }
}
