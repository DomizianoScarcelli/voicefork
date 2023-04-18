package com.frontend.widgets

import android.appwidget.AppWidgetManager
import android.content.Context
import android.util.Log
import android.widget.RemoteViews
import com.frontend.R
import com.frontend.data.VoiceForkDatabase
import com.google.assistant.appactions.widgets.AppActionsWidgetExtension
import java.sql.Time
import java.sql.Timestamp

class AddReservationWidget (
    private val context: Context,
    private val appWidgetManager: AppWidgetManager,
    private val appWidgetId: Int,
    layout: Int,
) {
    private val TAG = "AddReservationWidget"
    private val views = RemoteViews(context.packageName, layout)
    private val repository = VoiceForkDatabase
    private val hasBii: Boolean
    private var restaurantName = ""
    private var reservationDate = ""
    private var numberOfPeople = ""
    init {
        val optionsBundle = appWidgetManager.getAppWidgetOptions(appWidgetId)
        val bii = optionsBundle.getString(AppActionsWidgetExtension.EXTRA_APP_ACTIONS_BII)
        hasBii = !bii.isNullOrBlank()
        val params = optionsBundle.getBundle(AppActionsWidgetExtension.EXTRA_APP_ACTIONS_PARAMS)

        if (params != null) {
            //TO DO: ADD ALL POSSIBLE CASES IN WHICH PARAM VALUES ARE NOT SPECIFIED IN THE REQUEST
            if (params.getString("restaurantName").isNullOrBlank() or params.getString("reservationDate").isNullOrBlank() or params.getString("numberOfPeople").isNullOrBlank()) {
                val ttsText = context.resources.getString(R.string.add_reservation_no_params)  + " " + context.resources.getString(R.string.add_reservation_example)
                setTts(ttsText, ttsText)
            } else {
                restaurantName = params.getString("restaurantName").toString()
                reservationDate = params.getString("reservationDate").toString()
                numberOfPeople = params.getString("numberOfPeople").toString()

                //TODO: CHECK PARAMETERS
                //RESTAURANT
                // boh me immagino "vedi se esiste un ristorante con quel nome..."
                //DATE AND TIME

                //NUMBER OF PEOPLE
                if (numberOfPeople.toInt() <= 0) {
                    val ttsText = context.resources.getString(R.string.add_reservation_wrong_numberOfPeople)
                    setTts(ttsText, ttsText)
                }
            }
        } else {
            val ttsText = context.resources.getString(R.string.add_reservation_no_params)  + " " + context.resources.getString(R.string.add_reservation_example)
            setTts(ttsText, ttsText)
        }
    }

    fun updateAppWidget() {
        AddReservation()
    }

    /**
     * Sets title, duration and distance data to widget
     */
    private fun setDataToWidget(
        restaurantName: String,
        reservationDate: String,
        numberOfPeople: String,
    ) {
        views.setTextViewText(
            R.id.appwidgetReservations,
            restaurantName + " " + reservationDate + " " + numberOfPeople
        )
        appWidgetManager.updateAppWidget(appWidgetId, views)
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
     * Instruct the widget manager to update the widget
     */
    private fun updateWidget() {
        appWidgetManager.updateAppWidget(appWidgetId, views)
    }

    /**
     * Create and observe the last activity LiveData.
     */
    private fun AddReservation() {
        setDataToWidget(restaurantName, reservationDate, numberOfPeople)
        val ttsText = context.resources.getString(R.string.add_reservation_ok, restaurantName, reservationDate, numberOfPeople.toInt())
        setTts(ttsText, ttsText)
        updateWidget()
    }
}