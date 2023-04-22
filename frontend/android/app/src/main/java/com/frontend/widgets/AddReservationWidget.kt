package com.frontend.widgets

import android.appwidget.AppWidgetManager
import android.content.Context
import android.os.Build
import android.util.Log
import android.widget.RemoteViews
import androidx.annotation.RequiresApi
import com.frontend.R
import com.frontend.data.VoiceForkDatabase
import com.google.assistant.appactions.widgets.AppActionsWidgetExtension
import java.sql.Time
import java.sql.Timestamp
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@RequiresApi(Build.VERSION_CODES.O)
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
    private var reservationTime = ""
    private var numberOfPeople = ""
    init {
        val optionsBundle = appWidgetManager.getAppWidgetOptions(appWidgetId)
        val bii = optionsBundle.getString(AppActionsWidgetExtension.EXTRA_APP_ACTIONS_BII)
        hasBii = !bii.isNullOrBlank()
        val params = optionsBundle.getBundle(AppActionsWidgetExtension.EXTRA_APP_ACTIONS_PARAMS)

        if (params != null) {
            //TO DO: ADD ALL POSSIBLE CASES IN WHICH PARAM VALUES ARE NOT SPECIFIED IN THE REQUEST
            if (params.getString("restaurantName").isNullOrBlank() or params.getString("reservationDate").isNullOrBlank() or params.getString("reservationTime").isNullOrBlank() or params.getString("numberOfPeople").isNullOrBlank()) {
                val ttsText = context.resources.getString(R.string.add_reservation_no_params)  + " " + context.resources.getString(R.string.add_reservation_example)
                setTts(ttsText, ttsText)
            } else {
                //TODO: CHECK PARAMETERS
                restaurantName = params.getString("restaurantName").toString()
                reservationDate = params.getString("reservationDate").toString()
                reservationTime = params.getString("reservationTime").toString()
                numberOfPeople = params.getString("numberOfPeople").toString()

                //RESTAURANT
                // boh me immagino "vedi se esiste un ristorante con quel nome..."

                //RESERVATION DATE AND TIME
                // TODO: check if date and time are formatted correctly

                // TODO: set format in 12 hours
                // val formatTime = DateTimeFormatter.ofPattern("HH:mm:ss")
                // val newReservationTime = LocalDateTime.parse(reservationTime, formatTime)
                // val reFormatTime = DateTimeFormatter.ofPattern("HH:mm a")
                // reservationTime = newReservationTime.format(reFormatTime).toString()

                // format date
                val formatData = DateTimeFormatter.ofPattern("yyyy-MM-dd")
                val currentDate = LocalDateTime.now().format(formatData).toString()
                val cmp = currentDate.compareTo(reservationDate.format(formatData))

                when {
                    cmp > 0 -> {
                        // current date is after the reservation date -> ERROR
                        val ttsText = context.resources.getString(R.string.add_reservation_wrong_reservationDate)
                        setTts(ttsText, ttsText)
                    }
                    cmp < 0 -> {
                        // current date is before the reservation date
                        // check if the reservation date is for tomorrow
                        val tomorrow = LocalDateTime.now().plusDays(1).format(formatData).toString()
                        if (tomorrow.equals(reservationDate.format(formatData))) {
                            reservationDate = "Tomorrow"
                        } else {
                            // TODO: format data in a fancy way (eg: 2020-04-22 -> April 22)
                            
                        }
                    }
                    else -> {
                        // Both dates are equal -> Today
                        reservationDate = "Today"
                    }
                }


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
        reservationTime: String,
        numberOfPeople: String,
    ) {
        views.setTextViewText(
            R.id.appwidgetReservations,
            restaurantName + " " + reservationDate + " " + reservationTime + " " + numberOfPeople
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
        setDataToWidget(restaurantName, reservationDate, reservationTime, numberOfPeople)
        val ttsText = context.resources.getString(R.string.add_reservation_ok, restaurantName, reservationDate, reservationTime, numberOfPeople.toInt())
        setTts(ttsText, ttsText)
        updateWidget()
    }
}