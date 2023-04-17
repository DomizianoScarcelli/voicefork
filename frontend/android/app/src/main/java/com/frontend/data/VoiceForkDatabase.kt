package com.frontend.data

class VoiceForkDatabase {
    companion object {
        fun getData(): Array<String> {
            //Just a test, this should be a function that retrieve the right data from db
            val data: Array<String> = arrayOf("Trattoria da Mario", "Ristorante da Carlo", "Pizzeria Margherita", "Prova prova sasa");
            return data;
        }
    }
}