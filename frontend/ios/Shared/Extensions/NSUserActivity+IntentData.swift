//
//  NSUserActivity+IntentData.swift
//  SiriIntentFramework
//
//  Created by Domiziano Scarcelli on 03/04/23.
//

import Foundation
import Intents

extension NSUserActivity {
    
  public static let bookRestaurantActivityType = "com.domizianoscarcelli.intentkit.bookrestaurants"
  public static let myReservationsActivityType = "com.domizianoscarcelli.intentkit.myreservations"
  public static let getNearbyRestaurantsActivityType = "com.domizianoscarcelli.intentkit.nearbyrestaurants"
  public static let searchForRestaurantsActivityType = "com.domizianoscarcelli.intentkit.searchrestaurants"


  public static var bookRestaurantActivity: NSUserActivity {
      let userActivity = NSUserActivity(activityType: NSUserActivity.bookRestaurantActivityType)
      userActivity.title = "BookRestaurant"
      userActivity.persistentIdentifier = NSUserActivityPersistentIdentifier(NSUserActivity.bookRestaurantActivityType)
      userActivity.isEligibleForPrediction = true
      userActivity.suggestedInvocationPhrase = "Book Restaurant"
      return userActivity
  }
  
  public static var myReservationsActivity: NSUserActivity {
      let userActivity = NSUserActivity(activityType: NSUserActivity.myReservationsActivityType)
      userActivity.title = "MyReservations"
      userActivity.persistentIdentifier = NSUserActivityPersistentIdentifier(NSUserActivity.myReservationsActivityType)
      userActivity.isEligibleForPrediction = true
      userActivity.suggestedInvocationPhrase = "Show my reservations"
      return userActivity
  }
  
  public static var getNearbyRestaurantsActivity: NSUserActivity {
      let userActivity = NSUserActivity(activityType: NSUserActivity.getNearbyRestaurantsActivityType)
      userActivity.title = "NearbyRestaurants"
      userActivity.persistentIdentifier = NSUserActivityPersistentIdentifier(NSUserActivity.getNearbyRestaurantsActivityType)
      userActivity.isEligibleForPrediction = true
      userActivity.suggestedInvocationPhrase = "Show me restaurants nearby"
      return userActivity
  }
}
