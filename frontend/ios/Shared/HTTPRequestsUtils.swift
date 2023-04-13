//
//  HTTPRequestsUtils.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 13/04/23.
//

import Foundation

public func getAddressList(_ callback: @escaping (_ _address: Address) -> ()){
  let url = URL(string: "https://random-data-api.com/api/v2/addresses")!
  
  NSLog("VoiceForkDebug: At the start")

  let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
    DispatchQueue.main.async {
      guard let data = data else {
          return
      }
      let decoder = JSONDecoder()
      let address = try! decoder.decode(Address.self, from: data)
      NSLog("VoiceForkDebug: Object is \(address)")
      callback(address)
    }

  }
  task.resume()
  
  NSLog("VoiceForkDebug: Finished!")
}
