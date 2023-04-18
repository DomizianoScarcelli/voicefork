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
  
  private func renderReservation(name: String, image: UIImage, dateTime: Date, numberOfPeople: Int) {
      confirmedView.restaurantNameLabel.text = name
      confirmedView.restaurantImage.image = image
      confirmedView.reservationDateTimeLabel.text = DateTimeUtils.dateToNaturalLanguage(from: dateTime)
    confirmedView.numberOfPeopleLable.text = "For \(numberOfPeople) people"
    
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    confirmedView.restaurantImage.applyRoundedCorners()
    if let intent = intent as? BookRestaurantIntent {
      // Manage the BookRestaurantIntent View
      confirmedView.reservationMessageLabel.text = "Reservation confirmed!"
      let calendar = Calendar.current
      let dateTime = calendar.date(byAdding: intent.time!, to: calendar.date(from: intent.date!)!)
      let image = UIImage(named: "da_beppe")
      renderReservation(name: intent.restaurant!, image: image!, dateTime: dateTime!, numberOfPeople: intent.numberOfPeople as! Int)
    } else if intent is MyReservationsIntent {
      // Manage the MyReservationsIntent
      guard let intentResponse = intentResponse as? MyReservationsIntentResponse else {return}
      guard let reservationList = intentResponse.reservationList else {return}
      confirmedView.reservationMessageLabel.text = "Reservation details"
      
      if reservationList.count == 1 {
        // If there is only one reservation, display it
        let reservation = reservationList[0]
        let image = UIImage(named: "da_beppe")
        let dateTime = Calendar.current.date(from: reservation.dateTime!)
        renderReservation(name: reservation.restaurant!, image: image!, dateTime: dateTime!, numberOfPeople: reservation.numberOfPeople as! Int)
      } else {
        //Otherwise display an interactive list
      }
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
