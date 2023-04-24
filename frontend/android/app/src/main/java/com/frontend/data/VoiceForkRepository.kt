package com.frontend.data

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.lifecycle.MutableLiveData
import com.frontend.data.models.RestaurantModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

val retrofit = APINetwork.getApiClient().create(ApiInterface::class.java)

class VoiceForkRepository {
    fun getAllRestaurants() {
        val restaurants = retrofit.getAllRestaurants()

        restaurants.enqueue(object : Callback<List<RestaurantModel>?> {
            override fun onResponse(call: Call<List<RestaurantModel>?>, response: Response<List<RestaurantModel>?>) {
                val responseBody = response.body()!!
                Log.d("test", responseBody.toString())

            }

            override fun onFailure(call: Call<List<RestaurantModel>?>, t: Throwable) {
                Log.d("test", t.message.toString())
            }
        })
    }

}