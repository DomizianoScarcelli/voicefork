/*
See LICENSE folder for this sample’s licensing information.

Abstract:
A view controller that confirms a reservation was placed.
*/

import UIKit
import Intents
import IntentKit


class ReservationConfirmedViewController: UIViewController {
  
  private let intent: BookRestaurantIntent
  private let intentResponse: BookRestaurantIntentResponse
    
  
    @IBOutlet var confirmedView: ReservationConfirmedView!
  
    init(for bookingIntent: BookRestaurantIntent, with response: BookRestaurantIntentResponse) {
      intent = bookingIntent
      intentResponse = response
      super.init(nibName: "ReservationConfirmedView", bundle: Bundle(for: ReservationConfirmedView.self))
  }
  
  required init?(coder aDecoder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
//    confirmedView = view as? ReservationConfirmedView
    confirmedView.restaurantNameLabel.text = intent.restaurant?.name
    confirmedView.reservationDateTimeLabel.text = "Tomorrow at 10am"
    confirmedView.restaurantImage.applyRoundedCorners()
    confirmedView.restaurantImage.image = UIImage(named: "da_beppe")
    let calendar = Calendar.current
    let dateTime = calendar.date(byAdding: intent.time!, to: calendar.date(from: intent.date!)!)
    confirmedView.reservationDateTimeLabel.text = DateTimeUtils.dateToNaturalLanguage(from: dateTime!)
  }

}

class ReservationConfirmedView: UIView {
    @IBOutlet weak var reservationDateTimeLabel: UILabel!
    @IBOutlet weak var restaurantNameLabel: UILabel!
    @IBOutlet weak var testLabel: UILabel!
    @IBOutlet weak var restaurantImage: UIImageView!
}
