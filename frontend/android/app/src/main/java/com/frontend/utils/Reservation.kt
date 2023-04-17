package com.frontend.utils

import java.time.LocalDate
import java.time.LocalTime

class Reservation(
        private val id: Int,
        private val name: String,
        private val time: LocalTime,
        private val date: LocalDate,
        private val people: Int,
    ) {
        private fun getId(): Int {
            return id
        }

        fun getName(): String {
            return name
        }

        private fun getTime(): LocalTime {
            return time
        }

        private fun getDate(): LocalDate {
            return date
        }

        private fun getPeople(): Int {
            return people
        }

    }