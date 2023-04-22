//
//  LocationManager.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 22/04/23.
//
import MapKit
import CoreLocation

public class LocationManager {

  var manager: CLLocationManager

  init() {
    manager = CLLocationManager()
  }


  public func handleLocation() {
//    locationManager.requestAlwaysAuthorization()
    manager.requestWhenInUseAuthorization()
    if CLLocationManager.locationServicesEnabled() {
//      manager.delegate = view
      manager.desiredAccuracy = kCLLocationAccuracyNearestTenMeters
      manager.startUpdatingLocation()
    }
  }
  public func getCurrentLocation() -> (latitude: Double, longitude: Double)? {
    guard let locValue: CLLocationCoordinate2D = manager.location?.coordinate else {
      return nil
    }
    return (latitude: locValue.latitude, longitude: locValue.longitude)

  }
}
