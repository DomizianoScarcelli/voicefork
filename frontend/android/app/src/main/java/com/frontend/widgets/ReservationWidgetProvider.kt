package com.frontend.widgets

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import com.frontend.R

/**
 * Implementation of App Widget functionality.
 */
class ReservationWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {

            val currentWidget = ReservationWidget(context,
                appWidgetManager,
                appWidgetId,
                R.layout.reservations_widget)

            currentWidget.updateAppWidget()
        }
    }
}