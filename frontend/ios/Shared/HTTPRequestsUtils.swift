//
//  HTTPRequestsUtils.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 13/04/23.
//

import Foundation

public class HTTPRequestUtils {
  
  private static func GET<T>(url: String, _ callback: @escaping(_ _decodable: T) -> ()) where T:Decodable{
    let url = URL(string: url)!
    let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
      DispatchQueue.main.async {
        guard let data = data else {
            return
        }
        let decoder = JSONDecoder()
        let decodable = try! decoder.decode(T.self, from: data)
        callback(decodable)
      }
    }
    task.resume()
  }
  
  //TODO: copy-pasted, I have to verify that this works
  private static func POST(url: String, parameters: [String:Any]) {
    // create the session object
    let session = URLSession.shared
    // now create the URLRequest object using the url object
    let url = URL(string:url)!
    var request = URLRequest(url: url)
    request.httpMethod = "POST" //set http method as POST
    // add headers for the request
    request.addValue("application/json", forHTTPHeaderField: "Content-Type") // change as per server requirements
    request.addValue("application/json", forHTTPHeaderField: "Accept")
    
    do {
      // convert parameters to Data and assign dictionary to httpBody of request
      request.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: .prettyPrinted)
    } catch let error {
      NSLog(error.localizedDescription)
      return
    }
    
    // create dataTask using the session object to send data to the server
    let task = session.dataTask(with: request) { data, response, error in
      
      if let error = error {
        NSLog("Post Request Error: \(error.localizedDescription)")
        return
      }
      
      // ensure there is valid response code returned from this HTTP response
      guard let httpResponse = response as? HTTPURLResponse,
            (200...299).contains(httpResponse.statusCode)
      else {
        NSLog("Invalid Response received from the server")
        return
      }
      
      // ensure there is data returned
      guard let responseData = data else {
        NSLog("nil Data received from the server")
        return
      }
      
      do {
        // create json object from data or use JSONDecoder to convert to Model stuct
        if let jsonResponse = try JSONSerialization.jsonObject(with: responseData, options: .mutableContainers) as? [String: Any] {
          print(jsonResponse)
          // TODO: handle json response
        } else {
          NSLog("data maybe corrupted or in wrong format")
          throw URLError(.badServerResponse)
        }
      } catch let error {
        NSLog(error.localizedDescription)
      }
    }
    task.resume()
  }
  
  public static func getAddressList(_ callback: @escaping (_ _address: AddressModel) -> ()){
    GET(url: "https://random-data-api.com/api/v2/addresses", callback)
  }
  
  public static func findMatchingRestaurant(_ callback: @escaping (_ _restaurant: RestaurantModel) -> ()){
    GET(url: "http://localhost:3000/all-restaurants", callback)
  }
}



