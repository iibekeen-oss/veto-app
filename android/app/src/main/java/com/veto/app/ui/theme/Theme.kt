package com.veto.app.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = VetoNeonGreen,
    onPrimary = VetoDarkBackground,
    secondary = VetoGlowingRed,
    onSecondary = VetoTextWhite,
    background = VetoDarkBackground,
    surface = VetoDarkSurface,
    surfaceVariant = VetoDarkSurfaceVariant,
    onBackground = VetoTextWhite,
    onSurface = VetoTextWhite,
    outline = VetoBorderSubtle
)

@Composable
fun VetoTheme(
    content: @Composable () -> Unit
) {
    val colorScheme = DarkColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as? Activity)?.window
            window?.statusBarColor = VetoDarkBackground.toArgb()
            window?.navigationBarColor = VetoDarkBackground.toArgb()
            if (window != null) {
                WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
            }
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
