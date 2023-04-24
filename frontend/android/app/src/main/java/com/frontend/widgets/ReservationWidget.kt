package com.frontend.widgets

import android.appwidget.AppWidgetManager
import android.content.Context
import android.os.Build
import android.widget.RemoteViews
import androidx.annotation.RequiresApi
import com.frontend.R
import com.frontend.data.VoiceForkRepository
import com.frontend.utils.Reservation
import com.google.assistant.appactions.widgets.AppActionsWidgetExtension

class ReservationWidget (
    private val context: Context,
    private val appWidgetManager: AppWidgetManager,
    private val appWidgetId: Int,
    layout: Int,
    ) {
        private val TAG = "ReservationWidget"
        private val views = RemoteViews(context.packageName, layout)
        @RequiresApi(Build.VERSION_CODES.O)
        private val db = VoiceForkRepository()
        private val hasBii: Boolean

        init {
            val optionsBundle = appWidgetManager.getAppWidgetOptions(appWidgetId)
            val bii = optionsBundle.getString(AppActionsWidgetExtension.EXTRA_APP_ACTIONS_BII)
            hasBii = !bii.isNullOrBlank()
        }

        @RequiresApi(Build.VERSION_CODES.O)
        fun updateAppWidget() {
            observeAndUpdateReservations()
        }

        private fun setDataToWidget(
            reservationList: HashSet<String>
        ) {
            val widgetText = ""
            views.setTextViewText(
                R.id.reservation_list,
                widgetText
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
            //val appwidgetTypeTitleText = context.getString((R.string.widget_no_data))
            val emptyArray = HashSet<String>()
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
        @RequiresApi(Build.VERSION_CODES.O)
        private fun observeAndUpdateReservations() {
            VoiceForkRepository().getAllRestaurants()
            val reservationsData = HashSet<String>()

            if (reservationsData.isEmpty()) {
                setNoReservationsDataWidget()
                updateWidget()
            } else {
                setDataToWidget(reservationsData)
                setTts("Your upcoming reservations are:" + reservationsData.joinToString(separator = ", "), "Your last reservations are:")
                updateWidget()
            }
        }
}