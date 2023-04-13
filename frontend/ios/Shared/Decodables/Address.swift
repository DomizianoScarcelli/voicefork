//
//  Address.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 13/04/23.
//

import Foundation

public struct Address: Decodable {
    var id: Int
    var uid: String
    var city: String
    var streetName: String
    var streetAddress: String
    var secondaryAddress: String?
    var buildingNumber: String?
    var mailBox: String?
    var community: String?
    var zipCode: String
    var zip: String
    var postcode: String?
    var timeZone: String?
    var streetSuffix: String?
    var citySuffix: String?
    var cityPrefix: String?
    var state: String?
    var stateAbbr: String?
    var country: String
    var countryCode: String
    var latitude: Double?
    var longitude: Double?
    var fullAddress: String

    private enum CodingKeys: String, CodingKey {
        case id, uid, city
        case streetName = "street_name"
        case streetAddress = "street_address"
        case secondaryAddress = "secondary_address"
        case buildingNumber = "building_number"
        case mailBox = "mail_box"
        case community, zipCode = "zip_code", zip, postcode
        case timeZone = "time_zone"
        case streetSuffix = "street_suffix"
        case citySuffix = "city_suffix"
        case cityPrefix = "city_prefix"
        case state, stateAbbr = "state_abbr", country
        case countryCode = "country_code"
        case latitude, longitude
        case fullAddress = "full_address"
    }
}

