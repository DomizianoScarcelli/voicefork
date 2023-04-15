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

  
  public static var bookRestaurantActivity: NSUserActivity {
      let userActivity = NSUserActivity(activityType: NSUserActivity.bookRestaurantActivityType)
      
      userActivity.title = "BookRestaurant"
      userActivity.persistentIdentifier = NSUserActivityPersistentIdentifier(NSUserActivity.bookRestaurantActivityType)
      userActivity.isEligibleForPrediction = true
      userActivity.suggestedInvocationPhrase = "Book Restaurant"
      
      return userActivity
  }
}
