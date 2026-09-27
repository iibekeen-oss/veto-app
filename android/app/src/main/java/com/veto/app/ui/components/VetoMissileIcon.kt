package com.veto.app.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.veto.app.ui.theme.VetoGlowingRed
import com.veto.app.ui.theme.VetoNeonGreen

/**
 * VetoMissileIcon: Custom Vector Canvas Icon for Jetpack Compose
 * - High-tech Interceptor Missile (representing VETO / Objection) angled upwards (~45 degrees)
 * - "VETO" text stenciled along the fuselage side
 * - Blazing glowing flame / jet trail in Glowing Red (#FF3333) with yellow-white core
 * - Subtle Neon Green (#00FF66) outline aura for high-contrast visibility on #121212
 */
@Composable
fun VetoMissileIcon(
    modifier: Modifier = Modifier,
    size: Dp = 36.dp
) {
    Canvas(
        modifier = modifier.size(size)
    ) {
        val w = this.size.width
        val h = this.size.height

        // 1. Subtle Neon Green Aura / Targeting Halo in the background
        drawCircle(
            brush = Brush.radialGradient(
                colors = listOf(
                    VetoNeonGreen.copy(alpha = 0.25f),
                    VetoNeonGreen.copy(alpha = 0.08f),
                    Color.Transparent
                ),
                center = Offset(w * 0.5f, h * 0.5f),
                radius = w * 0.52f
            ),
            radius = w * 0.52f,
            center = Offset(w * 0.5f, h * 0.5f)
        )

        // 2. Blazing Glowing Jet Trail in Glowing Red (#FF3333)
        // Outer red flame thrust
        val flameOuterPath = Path().apply {
            moveTo(w * 0.32f, h * 0.64f)
            cubicTo(w * 0.22f, h * 0.68f, w * 0.12f, h * 0.80f, w * 0.05f, h * 0.95f)
            lineTo(w * 0.22f, h * 0.76f)
            lineTo(w * 0.14f, h * 0.98f)
            lineTo(w * 0.28f, h * 0.77f)
            lineTo(w * 0.22f, h * 1.00f)
            cubicTo(w * 0.30f, h * 0.88f, w * 0.34f, h * 0.78f, w * 0.36f, h * 0.67f)
            close()
        }
        drawPath(
            path = flameOuterPath,
            brush = Brush.linearGradient(
                colors = listOf(Color(0xFFFFDD00), VetoGlowingRed, Color.Transparent),
                start = Offset(w * 0.35f, h * 0.65f),
                end = Offset(w * 0.08f, h * 0.98f)
            )
        )

        // Inner hot core jet flame (yellow to white)
        val flameCorePath = Path().apply {
            moveTo(w * 0.33f, h * 0.65f)
            lineTo(w * 0.20f, h * 0.85f)
            lineTo(w * 0.27f, h * 0.74f)
            lineTo(w * 0.23f, h * 0.92f)
            lineTo(w * 0.32f, h * 0.72f)
            close()
        }
        drawPath(
            path = flameCorePath,
            brush = Brush.linearGradient(
                colors = listOf(Color.White, Color(0xFFFFCC00)),
                start = Offset(w * 0.33f, h * 0.65f),
                end = Offset(w * 0.20f, h * 0.88f)
            )
        )

        // 3. Neon Green Silhouette Glow behind Missile Body
        val auraPath = Path().apply {
            moveTo(w * 0.30f, h * 0.68f)
            lineTo(w * 0.22f, h * 0.76f)
            lineTo(w * 0.32f, h * 0.76f)
            lineTo(w * 0.72f, h * 0.36f)
            lineTo(w * 0.88f, h * 0.12f) // Nose tip
            lineTo(w * 0.64f, h * 0.28f)
            lineTo(w * 0.24f, h * 0.50f)
            lineTo(w * 0.32f, h * 0.44f)
            lineTo(w * 0.42f, h * 0.54f)
            close()
        }
        drawPath(
            path = auraPath,
            color = VetoNeonGreen,
            style = Stroke(width = w * 0.08f, cap = StrokeCap.Round, join = StrokeJoin.Round)
        )

        // 4. Missile Body & Hull
        // Rear Guidance Fins
        val lowerFin = Path().apply {
            moveTo(w * 0.27f, h * 0.67f)
            lineTo(w * 0.16f, h * 0.76f)
            lineTo(w * 0.22f, h * 0.84f)
            lineTo(w * 0.31f, h * 0.75f)
            close()
        }
        drawPath(lowerFin, color = Color(0xFF1E1E24))
        drawPath(lowerFin, color = VetoNeonGreen, style = Stroke(width = 1.5f))

        val upperFin = Path().apply {
            moveTo(w * 0.33f, h * 0.61f)
            lineTo(w * 0.24f, h * 0.50f)
            lineTo(w * 0.32f, h * 0.44f)
            lineTo(w * 0.41f, h * 0.53f)
            close()
        }
        drawPath(upperFin, color = Color(0xFF1E1E24))
        drawPath(upperFin, color = VetoNeonGreen, style = Stroke(width = 1.5f))

        // Main Missile Fuselage
        val fuselage = Path().apply {
            moveTo(w * 0.30f, h * 0.66f)
            lineTo(w * 0.64f, h * 0.32f)
            lineTo(w * 0.73f, h * 0.23f)
            cubicTo(w * 0.79f, h * 0.17f, w * 0.84f, h * 0.13f, w * 0.88f, h * 0.12f)
            cubicTo(w * 0.87f, h * 0.16f, w * 0.83f, h * 0.21f, w * 0.77f, h * 0.27f)
            lineTo(w * 0.68f, h * 0.36f)
            lineTo(w * 0.34f, h * 0.70f)
            close()
        }
        drawPath(
            fuselage,
            brush = Brush.linearGradient(
                colors = listOf(Color(0xFF222228), Color(0xFF4A4A56), Color(0xFFE2E8F0)),
                start = Offset(w * 0.25f, h * 0.75f),
                end = Offset(w * 0.85f, h * 0.15f)
            )
        )
        drawPath(
            fuselage,
            color = VetoNeonGreen,
            style = Stroke(width = 1.8f)
        )

        // Warhead Cone tip in glowing red
        val warhead = Path().apply {
            moveTo(w * 0.73f, h * 0.23f)
            cubicTo(w * 0.79f, h * 0.17f, w * 0.84f, h * 0.13f, w * 0.88f, h * 0.12f)
            cubicTo(w * 0.87f, h * 0.16f, w * 0.83f, h * 0.21f, w * 0.77f, h * 0.27f)
            close()
        }
        drawPath(warhead, color = VetoGlowingRed)

        // 5. "VETO" Stencil text along the missile body
        // Rendered using rotate & high-contrast native Android Paint
        rotate(degrees = -45f, pivot = Offset(w * 0.5f, h * 0.5f)) {
            val paintShadow = android.graphics.Paint().apply {
                color = android.graphics.Color.BLACK
                textSize = w * 0.17f
                isFakeBoldText = true
                textAlign = android.graphics.Paint.Align.CENTER
                letterSpacing = 0.15f
            }
            val paintText = android.graphics.Paint().apply {
                color = android.graphics.Color.WHITE
                textSize = w * 0.16f
                isFakeBoldText = true
                textAlign = android.graphics.Paint.Align.CENTER
                letterSpacing = 0.15f
            }

            drawContext.canvas.nativeCanvas.drawText("VETO", w * 0.5f, h * 0.54f, paintShadow)
            drawContext.canvas.nativeCanvas.drawText("VETO", w * 0.5f, h * 0.53f, paintText)
        }
    }
}
