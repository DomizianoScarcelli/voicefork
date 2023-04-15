//
//  RequestsUtils.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 13/04/23.
//

import Foundation

public func fetch(_ urlString: String) -> JSONSerialization {
  let url = URL(string: urlString)!
  var object: Optional<JSONSerialization> = nil

  let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
      guard let data = data else { return }
      NSLog(String(data: data, encoding: .utf8)!)
    object = try! JSONSerialization.jsonObject(with: data, options: []) as! JSONSerialization
//      print(String(data: data, encoding: .utf8)!)
  }
  
  task.resume()
  guard let object else {
    return JSONSerialization()
  }
  return object
}
