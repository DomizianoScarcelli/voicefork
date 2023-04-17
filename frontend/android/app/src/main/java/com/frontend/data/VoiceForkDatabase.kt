package com.frontend.data

import android.os.Build
import androidx.annotation.RequiresApi
import com.frontend.utils.Reservation
import java.time.LocalDate
import java.time.LocalTime

@RequiresApi(Build.VERSION_CODES.O)
class VoiceForkDatabase {
    private val reservations: HashSet<Reservation> = hashSetOf(Reservation(1, "Trattoria da Luigi", LocalTime.of(3, 15, 10), LocalDate.of(2023, 4, 15), 2))

    fun getReservations(): HashSet<Reservation> {
        return reservations
    }

    fun addReservation(res: Reservation) {
        reservations.add(res)
    }
}