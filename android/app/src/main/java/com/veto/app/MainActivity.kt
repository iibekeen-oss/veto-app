package com.veto.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.veto.app.ui.screens.VetoFeedScreen
import com.veto.app.ui.theme.VetoDarkBackground
import com.veto.app.ui.theme.VetoTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            VetoTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = VetoDarkBackground
                ) {
                    VetoFeedScreen()
                }
            }
        }
    }
}
