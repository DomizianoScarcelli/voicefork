import Foundation
import UIKit
import SiriIntentFramework
import Intents
import os.log

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  var bridge: RCTBridge!

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let jsCodeLocation: URL

    jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "frontend", initialProperties: nil, launchOptions: launchOptions)
    let rootViewController = UIViewController()
    rootViewController.view = rootView

    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()

    return true
  }
  
  func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {

          os_log("TK421: Continue type = %{public}s", userActivity.activityType)
          
          guard userActivity.activityType == NSUserActivity.getRestaurantsActivityType else {
                  os_log("TK421: Can't continue unknown NSUserActivity type = %{public}s", userActivity.activityType)
                  return false
          }
          
//          guard let window = window,
//              let rootViewController = window.rootViewController as? UINavigationController else {
//                  os_log("TK421: Failed to access root view controller.")
//                  return false
//          }
    
            print("I still cannot access to your restaurants!")
          
//          restorationHandler(rootViewController.viewControllers)
          
          return true
      }
}


