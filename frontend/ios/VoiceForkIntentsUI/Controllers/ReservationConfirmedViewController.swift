/*
See LICENSE folder for this sample’s licensing information.

Abstract:
A view controller that confirms a reservation was placed.
*/

import UIKit
import Intents
import IntentKit


class ReservationConfirmedViewController: UIViewController {
  
  private var intent: INIntent
  private var intentResponse: INIntentResponse
  
  @IBOutlet var confirmedView: ReservationConfirmedView!
  
  init(for inputIntent: INIntent, with response: INIntentResponse) {
    intent = inputIntent
    intentResponse = response
    super.init(nibName: "ReservationConfirmedView", bundle: Bundle(for: ReservationConfirmedView.self))
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    confirmedView.restaurantImage.applyRoundedCorners()
    if let intent = intent as? BookRestaurantIntent {
      // Manage the BookRestaurantIntent View
      confirmedView.reservationMessageLabel.text = "Reservation confirmed!"
      confirmedView.restaurantNameLabel.text = intent.restaurant
      confirmedView.restaurantImage.image = UIImage(named: "da_beppe")
      let calendar = Calendar.current
      let dateTime = calendar.date(byAdding: intent.time!, to: calendar.date(from: intent.date!)!)
      confirmedView.reservationDateTimeLabel.text = DateTimeUtils.dateToNaturalLanguage(from: dateTime!)
      confirmedView.numberOfPeopleLable.text = "For \(intent.numberOfPeople ?? 2) people"
    } else if intent is MyReservationsIntent {
      // Manage the MyReservationsIntent
      guard let intentResponse = intentResponse as? MyReservationsIntentResponse else {return}
      confirmedView.reservationMessageLabel.text = "Reservation details"
      NSLog("VoiceForkDebug: \(intentResponse)")
      confirmedView.restaurantNameLabel.text = intentResponse.restaurantName
      confirmedView.restaurantImage.image = UIImage(named: "da_beppe")
      let calendar = Calendar.current
      let dateTime = calendar.date(byAdding: intentResponse.time!, to: calendar.date(from: intentResponse.date!)!)
      confirmedView.reservationDateTimeLabel.text = DateTimeUtils.dateToNaturalLanguage(from: dateTime!)
      confirmedView.numberOfPeopleLable.text = "For \(intentResponse.numberOfPeople ?? 2) people"
//      confirmedView.backgroundColor = UIColor.lightGray
    }
  }
  
}

class ReservationConfirmedView: UIView {
    @IBOutlet weak var reservationMessageLabel: UILabel!
    @IBOutlet weak var reservationDateTimeLabel: UILabel!
    @IBOutlet weak var restaurantNameLabel: UILabel!
    @IBOutlet weak var restaurantImage: UIImageView!
    @IBOutlet weak var numberOfPeopleLable: UILabel!
}
