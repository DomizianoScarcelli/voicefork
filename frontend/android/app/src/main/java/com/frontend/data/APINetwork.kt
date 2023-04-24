package com.frontend.data

import android.os.Build
import androidx.annotation.RequiresApi
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

const val BASEURL = "http://localhost:3002"

@RequiresApi(Build.VERSION_CODES.O)
class APIInterface {
    companion object{
        private var retrofit: Retrofit?=null

        fun getAllRestaurants(): Retrofit {
            val gson = GsonBuilder()
                    .setLenient()
                    .create()
            val okHttpClient = OkHttpClient.Builder()
                    .readTimeout(100, TimeUnit.SECONDS)
                    .connectTimeout(100, TimeUnit.SECONDS)
                    .build()
            if (retrofit == null) {
                retrofit = Retrofit.Builder()
                        .baseUrl(BASEURL)
                        .client(okHttpClient)
                        .addConverterFactory(GsonConverterFactory.create(gson))
                        .build()
            }
            return retrofit!!
        }
    }
}