//
//  IntentViewController.swift
//  BookRestaurantUI
//
//  Created by Domiziano Scarcelli on 04/04/23.
//

import IntentsUI
import IntentKit

// As an example, this extension's Info.plist has been configured to handle interactions for INSendMessageIntent.
// You will want to replace this or add other intents as appropriate.
// The intents whose interactions you wish to handle must be declared in the extension's Info.plist.

// You can test this example integration by saying things to Siri like:
// "Send a message using <myApp>"

class IntentViewController: UIViewController, INUIHostedViewControlling {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        NSLog("VoiceForkDebug: View loaded")
        // Do any additional setup after loading the view.

    }
        
    // MARK: - INUIHostedViewControlling
    
    // Prepare your view controller for the interaction to handle.
    func configureView(for parameters: Set<INParameter>, of interaction: INInteraction, interactiveBehavior: INUIInteractiveBehavior, context: INUIHostedViewContext, completion: @escaping (Bool, Set<INParameter>, CGSize) -> Void) {
      
        guard let intent = interaction.intent as? BookRestaurantIntent else {
            NSLog("VoiceForkDebug: Failed at first step!")
            completion(false, Set(), .zero)
            return
        }
      NSLog("VoiceForkDebug: I'm in configure view!")
      NSLog("VoiceForkDebug: the intentHandlingStatus is \(interaction.intentHandlingStatus)")
      NSLog("VoiceForkDebug: the whole interaction is \(interaction)")
      if interaction.intentHandlingStatus == .success {
        NSLog("VoiceForkDebug: I'm inside the success")
          if let response = interaction.intentResponse as? BookRestaurantIntentResponse {
            NSLog("VoiceForkDebug: I'm handling the response")
          let viewController = ReservationConfirmedViewController(for: intent, with: response)
            attachChild(viewController)
            NSLog("VoiceForkDebug: Succeded!")
              completion(true, parameters, desiredSize)
          }
        }
        completion(false, parameters, .zero) //TODO: originally uncommented
      }
    
      private func attachChild(_ viewController: UIViewController) {
        NSLog("VoiceForkDebug: I'm about to attach the child")
        addChild(viewController)
        NSLog("VoiceForkDebug: I attached the child")
        
        NSLog("VoiceForkDebug: the viewcontroller is \(viewController)")
        NSLog("VoiceForkDebug: the viewcontroller.view is \(String(describing: viewController.view))")
        if viewController.view == nil {
          NSLog("VoiceForkDebug: the viewcontroller.view is nil (1)")
        }
        if let subview = viewController.view {
          NSLog("VoiceForkDebug: I'm handling the subview")
            view.addSubview(subview)
            subview.translatesAutoresizingMaskIntoConstraints = false
          NSLog("VoiceForkDebug: I finished handling the subview")
          

//            // Set the child controller's view to be the exact same size as the parent controller's view.
//            subview.widthAnchor.constraint(equalTo: view.widthAnchor).isActive = true
//            subview.heightAnchor.constraint(equalTo: view.heightAnchor).isActive = true
//
//            subview.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
//            subview.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
        }

//        viewController.didMove(toParent: self)
    }
    
//    var desiredSize: CGSize {
//        return self.extensionContext!.hostedViewMaximumAllowedSize
//    }
      private var desiredSize: CGSize {
          let width = self.extensionContext?.hostedViewMaximumAllowedSize.width ?? 320
          return CGSize(width: width, height: 150)
      }
    
}
