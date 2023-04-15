//
//  DateTimeUtils.swift
//  IntentKit
//
//  Created by Domiziano Scarcelli on 13/04/23.
//
import Foundation

public class DateTimeUtils {
  public static func dateToNaturalLanguage(from date: Date) -> String {
    let calendar = Calendar.current
    let formatter = DateFormatter()
    formatter.dateStyle = .medium
    formatter.timeStyle = .short
    
    let now = Date()

    if calendar.isDateInTomorrow(date) {
        formatter.dateFormat = "'Tomorrow at' h:mm a"
    } else if calendar.isDateInToday(date) {
        formatter.dateFormat = "'Today at' h:mm a"
    } else if date > now {
        formatter.dateFormat = "EEEE 'at' h:mm a"
    } else {
        formatter.dateFormat = "MMM d 'at' h:mm a"
    }

    let dateString = formatter.string(from: date)
    return dateString
  }
      
}
