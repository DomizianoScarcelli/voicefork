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
    let response = MyReservationsIntentResponse(code:.success, userActivity: nil)
    
    let APIResponse: [[String: Any]] = [
      [
        "restaurant": "Dar solito marione",
        "dateTime": Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: Date()),
        "numberOfPeople": 2
      ],
      [
        "restaurant": "Da mi frate er pagnottaro",
        "dateTime": Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: Date()),
        "numberOfPeople": 4
      ],
      [
        "restaurant": "Dal paninaro",
        "dateTime": Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: Date()),
        "numberOfPeople": 1
      ],
      [
        "restaurant": "Dar mutanda",
        "dateTime": Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: Date()),
        "numberOfPeople": 3
      ]
    ]
    
    var reservationList: [Reservation] = []
    
    for reservation in APIResponse{
      let reservationObject = Reservation.init(identifier: reservation["restaurant"] as? String, display: reservation["restaurant"] as! String) as Reservation
      reservationObject.restaurant = reservation["restaurant"] as? String
      reservationObject.dateTime = reservation["dateTime"] as? DateComponents
      reservationObject.numberOfPeople = reservation["numberOfPeople"] as? NSNumber
      reservationList.append(reservationObject)
    }
    
    response.reservationList = reservationList
    completion(response)
  }
  
  
}
