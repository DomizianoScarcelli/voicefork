package com.frontend.tasks

import android.content.Intent
import android.os.Bundle
import android.util.Log

class TestActivity {
    private val TAG = "TestActivity"

    fun logIntent(intent: Intent) {
        val bundle: Bundle = intent.extras ?: return

        Log.d(TAG, "======= logIntent ========= %s")
        Log.d(TAG, "Logging intent data start")

        bundle.keySet().forEach { key ->
            Log.d(TAG, "[$key=${bundle.get(key)}]");
        }

        Log.d(TAG, "Logging intent data complete")
    }
}