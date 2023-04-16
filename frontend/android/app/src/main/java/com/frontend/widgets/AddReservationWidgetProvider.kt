package com.frontend.widgets

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import com.frontend.R

class AddReservationWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {

            val currentWidget = AddReservationWidget(context,
                appWidgetManager,
                appWidgetId,
                R.layout.reservations_widget)

            currentWidget.updateAppWidget()
        }
    }
}