import Foundation

@objc(SiriRN)
public class SiriRN: NSObject {
  
//   init(message: String) {
//     self.message = message
//   }

  private var message = "Daje roma daje"

  @objc
  func handleNearbyRestaurantsIntent(_ callback: RCTResponseSenderBlock){
    callback([message])
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  };

  @objc
  func constantsToExport() -> [String: Any] {
    return ["initialMessage": ""]
  }
}
