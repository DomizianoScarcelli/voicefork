package com.frontend.widgets

import android.appwidget.AppWidgetManager
import android.content.Context
import android.util.Log
import android.widget.RemoteViews
import com.frontend.R
import com.frontend.data.VoiceForkDatabase
import com.google.assistant.appactions.widgets.AppActionsWidgetExtension

class ReservationWidget (
    private val context: Context,
    private val appWidgetManager: AppWidgetManager,
    private val appWidgetId: Int,
    layout: Int,
    ) {
        private val TAG = "ReservationWidget"
        private val views = RemoteViews(context.packageName, layout)
        private val repository = VoiceForkDatabase
        private val hasBii: Boolean

        init {
            val optionsBundle = appWidgetManager.getAppWidgetOptions(appWidgetId)
            val bii = optionsBundle.getString(AppActionsWidgetExtension.EXTRA_APP_ACTIONS_BII)
            hasBii = !bii.isNullOrBlank()
        }

        fun updateAppWidget() {
            Log.d(TAG, hasBii.toString());
            observeAndUpdateReservations()
        }

        /**
         * Sets title, duration and distance data to widget
         */
        private fun setDataToWidget(
            reservationList: Array<String>
        ) {
            views.setTextViewText(
                R.id.appwidgetReservations,
                reservationList.joinToString(separator = ", ")
            )
        }

        private fun setTts(
            speechText: String,
            displayText: String,
        ) {
            val appActionsWidgetExtension: AppActionsWidgetExtension =
                AppActionsWidgetExtension.newBuilder(appWidgetManager)
                    .setResponseSpeech(speechText)  // TTS to be played back to the user
                    .setResponseText(displayText)  // Response text to be displayed in Assistant
                    .build()

            // Update widget with TTS
            appActionsWidgetExtension.updateWidget(appWidgetId)
        }

        /**
         * Formats and sets no activity data to Widget
         */
        private fun setNoReservationsDataWidget() {
            val appwidgetTypeTitleText = context.getString((R.string.widget_no_data))
            val emptyArray = arrayOf<String>()
            setDataToWidget(emptyArray)
        }

        /**
         * Instruct the widget manager to update the widget
         */
        private fun updateWidget() {
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }

        /**
         * Create and observe the last activity LiveData.
         */
        private fun observeAndUpdateReservations() {
            val reservationsData = repository.getData()

            if (reservationsData.isEmpty()) {
                setNoReservationsDataWidget()
                updateWidget()
            } else {
                setDataToWidget(reservationsData)
                setTts("Your last reservations are:" + reservationsData.joinToString(separator = ", "), "Your last reservations are:")
                updateWidget()
            }
        }
}