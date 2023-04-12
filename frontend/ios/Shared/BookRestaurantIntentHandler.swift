//
//  NearbyRestaurantsIntentHandler.swift
//  SiriIntentFramework
//
//  Created by Domiziano Scarcelli on 03/04/23.
//

import UIKit
import Intents
import os.log

public class BookRestaurantIntentHandler: NSObject, BookRestaurantIntentHandling {
  public func resolveDate(for intent: BookRestaurantIntent, with completion: @escaping (INDateComponentsResolutionResult) -> Void) {
    
    //TODO: Allows to pick time only in the future
    guard let dateComponents = intent.date else {
      completion(INDateComponentsResolutionResult.needsValue())
      return
    }
    
//    guard let date = dateComponents.date else {
//      completion(INDateComponentsResolutionResult.unsupported())
//      return
//    }
//
//    if date.timeIntervalSinceNow > 0 {
      let resolvedComponents = DateComponents(year: dateComponents.year, month: dateComponents.month, day: dateComponents.day)
      completion(INDateComponentsResolutionResult.success(with: resolvedComponents))
//        } else {
//          completion(INDateComponentsResolutionResult.success(with: dateComponents))
//            completion(INDateComponentsResolutionResult.unsupported())
//        }
  }
  
  
  public func resolveTime(for intent: BookRestaurantIntent, with completion: @escaping (INDateComponentsResolutionResult) -> Void) {
    guard let time = intent.time else {
      completion(INDateComponentsResolutionResult.needsValue())
      return
    }
    completion(INDateComponentsResolutionResult.success(with: time))
  }
  
  
  @available(iOSApplicationExtension 13.0, *)
  public func resolveRestaurant(for intent: BookRestaurantIntent, with completion: @escaping (RestaurantResolutionResult) -> Void) {
    
    // Build the list of available restaurants
    var restaurantList: [Restaurant] = [Restaurant]()
    let names = ["Da Beppe", "Da Mario"]
    for name in names {
      let restaurant = Restaurant(identifier: name, display: name)
      restaurant.name = name
      restaurantList.append(restaurant)
    }
    
    guard let restaurant = intent.restaurant else {
      completion(RestaurantResolutionResult.disambiguation(with: restaurantList))
      return
    }
    completion(RestaurantResolutionResult.success(with: restaurant))
  }
  
  
    
    public func confirm(intent: BookRestaurantIntent, completion: @escaping (BookRestaurantIntentResponse) -> Void) {
        NSLog("TK421: %{public}s", "\(#function)")
        completion(BookRestaurantIntentResponse(code: .ready, userActivity: nil))
    }
    
    public func handle(intent: BookRestaurantIntent, completion: @escaping (BookRestaurantIntentResponse) -> Void) {
      NSLog("TK421: %{public}s", "\(#function)")
      
      // Call the completion handler with the response to the original intent
      completion(BookRestaurantIntentResponse(code: .success, userActivity: nil))
    }
    
    
}

