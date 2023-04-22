//
//  MyReservationsIntentHandler.swift
//  VoiceForkIntentsUI
//
//  Created by Domiziano Scarcelli on 15/04/23.
//

import UIKit
import Intents

public class MyReservationsIntentHandler: NSObject, MyReservationsIntentHandling {
  public func resolveReservation(for intent: MyReservationsIntent, with completion: @escaping (ReservationResolutionResult) -> Void) {
    if let reservation = intent.reservation {
      completion(ReservationResolutionResult.success(with: reservation))
      return
    }
    
    //TODO: if there are more than 1 active reservation, ask the user to pick one from a list of reservations
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
      reservationObject.available = true
      reservationList.append(reservationObject)

    }
    if reservationList.count == 0 {
      let nullReservationObject = Reservation.init(identifier: "null", display: "null") as Reservation
      nullReservationObject.available = false
      completion(ReservationResolutionResult.success(with: nullReservationObject))
      return
    }
    if reservationList.count == 1 {
      completion(ReservationResolutionResult.success(with: reservationList[0]))
      return
    }
    completion(ReservationResolutionResult.disambiguation(with: reservationList))
  }
  
  public func confirm(intent: MyReservationsIntent, completion: @escaping (MyReservationsIntentResponse) -> Void) {
    completion(MyReservationsIntentResponse(code: .ready, userActivity: nil))
  }
  
  public func handle(intent: MyReservationsIntent, completion: @escaping (MyReservationsIntentResponse) -> Void) {
    if intent.reservation?.available == false {
      completion(MyReservationsIntentResponse(code: .reservationsNotFound, userActivity: nil))
    }
    let response = MyReservationsIntentResponse(code:.success, userActivity: nil)
    completion(response)
  }
  
  
}
