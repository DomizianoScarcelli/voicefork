//
//  MyReservationsIntentHandler.swift
//  VoiceForkIntentsUI
//
//  Created by Domiziano Scarcelli on 15/04/23.
//

import UIKit
import Intents

public class MyReservationsIntentHandler: NSObject, MyReservationsIntentHandling {
  public func confirm(intent: MyReservationsIntent, completion: @escaping (MyReservationsIntentResponse) -> Void) {
    completion(MyReservationsIntentResponse(code: .ready, userActivity: nil))
  }
  
  public func handle(intent: MyReservationsIntent, completion: @escaping (MyReservationsIntentResponse) -> Void) {
    completion(MyReservationsIntentResponse(code: .success, userActivity: nil))
  }
  
  
}
