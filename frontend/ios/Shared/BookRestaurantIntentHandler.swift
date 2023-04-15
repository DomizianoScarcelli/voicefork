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
  public func resolveNumberOfPeople(for intent: BookRestaurantIntent, with completion: @escaping (BookRestaurantNumberOfPeopleResolutionResult) -> Void) {
    guard let numberOfPeople = intent.numberOfPeople else {
      completion(BookRestaurantNumberOfPeopleResolutionResult.needsValue())
      return
                 
    }
    completion(BookRestaurantNumberOfPeopleResolutionResult.success(with: Int(truncating: numberOfPeople)))
  }
  
  
  public func resolveRestaurant(for intent: BookRestaurantIntent, with completion: @escaping (INStringResolutionResult) -> Void) {
    guard let restaurant = intent.restaurant else {
      completion(INStringResolutionResult.needsValue())
      return
    }
//    if restaurant == "asd" {
//      completion(INStringResolutionResult.confirmationRequired(with: restaurant))
//      return
//    }
    completion(INStringResolutionResult.success(with: restaurant))
  }

  public func resolveDate(for intent: BookRestaurantIntent, with completion: @escaping (INDateComponentsResolutionResult) -> Void) {
    
    //TODO: Allows to pick time only in the future
    guard let dateComponents = intent.date else {
      completion(INDateComponentsResolutionResult.needsValue())
      return
    }
      let resolvedComponents = DateComponents(year: dateComponents.year, month: dateComponents.month, day: dateComponents.day)
      completion(INDateComponentsResolutionResult.success(with: resolvedComponents))

  }
  
  public func resolveTime(for intent: BookRestaurantIntent, with completion: @escaping (INDateComponentsResolutionResult) -> Void) {
    guard let time = intent.time else {
      completion(INDateComponentsResolutionResult.needsValue())
      return
    }
    completion(INDateComponentsResolutionResult.success(with: time))
  }
  
//  public func resolveNumPeople(for intent: BookRestaurantIntent, with completion: @escaping (INStringResolutionResult) -> Void) {
//    completion(INStringResolutionResult.success(with: "10"))
//  }
//
  
//  @available(iOSApplicationExtension 13.0, *)
//  public func resolveRestaurant(for intent: BookRestaurantIntent, with completion: @escaping (RestaurantResolutionResult) -> Void) {
//
//    // Build the list of available restaurants
//    var restaurantList: [Restaurant] = [Restaurant]()
//
//    getAddressList {_address in
//      let names = [_address.zipCode, _address.city]
//      for name in names {
//        let restaurant = Restaurant(identifier: name, display: name)
//        restaurant.name = name
//        restaurantList.append(restaurant)
//      }
//
//      guard let restaurant = intent.restaurant else {
//        completion(RestaurantResolutionResult.disambiguation(with: restaurantList))
//        return
//      }
//      completion(RestaurantResolutionResult.success(with: restaurant))
//    }
//
//  }
  
  
    
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

