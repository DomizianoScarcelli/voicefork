//
//  NearbyRestaurantsIntentHandler.swift
//  SiriIntentFramework
//
//  Created by Domiziano Scarcelli on 03/04/23.
//

import Intents
import IntentsUI

public class BookRestaurantIntentHandler: NSObject, BookRestaurantIntentHandling {
  public func resolveName(for intent: BookRestaurantIntent, with completion: @escaping (INStringResolutionResult) -> Void) {
    guard let name = intent.name else {
      completion(INStringResolutionResult.needsValue())
      return
    }
    completion(INStringResolutionResult.success(with: name))
  }

  public func resolveRestaurant(for intent: BookRestaurantIntent, with completion: @escaping (RestaurantResolutionResult) -> Void) {
    guard let restaurant = intent.restaurant else {
      checkSimilarRestaurant(by: intent.name!) { restaurantList in
        completion(RestaurantResolutionResult.disambiguation(with: restaurantList))
      }
      return
    }
    completion(RestaurantResolutionResult.success(with: restaurant))

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

  public func resolveNumberOfPeople(for intent: BookRestaurantIntent, with completion: @escaping (BookRestaurantNumberOfPeopleResolutionResult) -> Void) {
    guard let numberOfPeople = intent.numberOfPeople else {
      completion(BookRestaurantNumberOfPeopleResolutionResult.needsValue())
      return
    }
    completion(BookRestaurantNumberOfPeopleResolutionResult.success(with: Int(truncating: numberOfPeople)))
  }

  public func confirm(intent: BookRestaurantIntent, completion: @escaping (BookRestaurantIntentResponse) -> Void) {
    completion(BookRestaurantIntentResponse(code: .ready, userActivity: nil))
  }


  public func handle(intent: BookRestaurantIntent, completion: @escaping (BookRestaurantIntentResponse) -> Void) {
    // Call the completion handler with the response to the original intent
    completion(BookRestaurantIntentResponse(code: .success, userActivity: nil))
  }

  private func checkSimilarRestaurant(by name: String, threshold: Double = 1.0, _ callback: @escaping (_ restaurantList: [Restaurant]) -> ()) {

    HTTPRequestUtils.findMatchingRestaurant(query: name) { restaurant in
      NSLog("VoiceForkDebug: HTTP REQUEST WITH: name \(name) and \(restaurant)")
      let response = restaurant
        .filter { $0.nameDistance <= threshold }

      var result: [Restaurant] = []
      for entry in response {
        if #available(iOSApplicationExtension 14.0, *) {
          result.append(Restaurant(searchResult: entry))
        } else {
          result.append(Restaurant(restaurant: entry.restaurant))
        }
      }
      callback(result)
    }
  }

}

