package com.frontend.data

import com.frontend.data.models.RestaurantModel
import retrofit2.Call
import retrofit2.http.GET

interface ApiInterface {
    @GET("get-all-restaurants")
    fun getAllRestaurants(): Call<List<RestaurantModel>>
}