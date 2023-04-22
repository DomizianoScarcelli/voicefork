//
//  NearbyRestaurantsIntentHandler.swift
//  SiriIntentFramework
//
//  Created by Domiziano Scarcelli on 03/04/23.
//

import Intents
import IntentsUI

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
    
    checkSimilarRestaurant(by: restaurant) { restaurantList in
      NSLog("VoiceForkDebug: Checking similarity of name: \(restaurant)")
      NSLog("VoiceForkDebug: returing the list: \(restaurantList)")
      NSLog("VoiceForkDebug: condition \(restaurant) == \(restaurantList[0].name): \(restaurant == restaurantList[0].name)")
      if restaurant == restaurantList[0].name {
        completion(INStringResolutionResult.success(with: restaurant))
      }
      completion(INStringResolutionResult.disambiguation(with: restaurantList.map { $0.name }))
    }
    
//    completion(INStringResolutionResult.success(with: restaurant))
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

  public func confirm(intent: BookRestaurantIntent, completion: @escaping (BookRestaurantIntentResponse) -> Void) {
    completion(BookRestaurantIntentResponse(code: .ready, userActivity: nil))
  }


  public func handle(intent: BookRestaurantIntent, completion: @escaping (BookRestaurantIntentResponse) -> Void) {
    // Call the completion handler with the response to the original intent
    completion(BookRestaurantIntentResponse(code: .success, userActivity: nil))
  }

  private func checkSimilarRestaurant(by name: String, threshold: Int = 100, _ callback: @escaping (_ restaurantList: [RestaurantModel]) -> ()) {
    
    HTTPRequestUtils.findMatchingRestaurant(query: name) { _restaurant in
      NSLog("VoiceForkDebug: HTTP REQUEST WITH: name \(name) and \(_restaurant)")
      let response = _restaurant
        .filter { Int($0.distance) <= threshold }
        .map { $0.restaurant }
      
      callback(response)
    }
  }

}

