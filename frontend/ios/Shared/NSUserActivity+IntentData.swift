//
//  NSUserActivity+IntentData.swift
//  SiriIntentFramework
//
//  Created by Domiziano Scarcelli on 03/04/23.
//

import Foundation
import Intents

extension NSUserActivity {
    
    public static let getRestaurantsActivityType = "com.domizianoscarcelli.intentkit.getrestaurants"
    
    public static var getRestaurantsActivity: NSUserActivity {
        let userActivity = NSUserActivity(activityType: NSUserActivity.getRestaurantsActivityType)
        
        userActivity.title = "NearbyRestaurants"
        userActivity.persistentIdentifier = NSUserActivityPersistentIdentifier(NSUserActivity.getRestaurantsActivityType)
        userActivity.isEligibleForPrediction = true
        userActivity.suggestedInvocationPhrase = "Nearby Restaurants"
        
        return userActivity
    }
}
