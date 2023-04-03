//
//  NearbyRestaurantsIntentHandler.swift
//  SiriIntentFramework
//
//  Created by Domiziano Scarcelli on 03/04/23.
//

import UIKit
import Intents
import os.log

public class NearbyRestaurantsIntentHandler: NSObject, NearbyRestaurantsIntentHandling {
    
    public func confirm(intent: NearbyRestaurantsIntent, completion: @escaping (NearbyRestaurantsIntentResponse) -> Void) {
        os_log("TK421: %{public}s", "\(#function)")
        completion(NearbyRestaurantsIntentResponse(code: .ready, userActivity: nil))
    }
    
    public func handle(intent: NearbyRestaurantsIntent, completion: @escaping (NearbyRestaurantsIntentResponse) -> Void) {
        os_log("TK421: %{public}s", "\(#function)")
      completion(NearbyRestaurantsIntentResponse(code: .success, userActivity: nil))
    }
    
    
}

