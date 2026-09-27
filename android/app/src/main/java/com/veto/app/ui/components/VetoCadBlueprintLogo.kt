package com.veto.app.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.veto.app.ui.theme.VetoBorderSubtle
import com.veto.app.ui.theme.VetoDarkBackground
import com.veto.app.ui.theme.VetoGlowingRed
import com.veto.app.ui.theme.VetoNeonGreen

/**
 * VetoCadBlueprintLogo:
 * Pure Jetpack Compose military CAD blueprint vector design of a tactical missile interception:
 * 1. Technical Layout: Subtle gray HUD grid lines, coordinate crosshairs, and radar trajectory arcs.
 * 2. Attacker Missile: Descending along parabolic arc with dense exhaust smoke glowing Neon Green (#00FF66).
 * 3. VETO-0 Interceptor: Sharp upward angle PAC-3 interceptor airframe, "VETO-0" stenciled in sharp white military font,
 *    volumetric exhaust smoke plume glowing vibrant Red (#FF3333).
 * 4. Kinetic Impact Zone: Direct nose-to-nose Hit-to-Kill impact in center with thermal flash & shrapnel debris.
 * 5. Set against pitch-black #121212 background with clean CAD vector telemetry.
 */
@Composable
fun VetoCadBlueprintLogo(
    modifier: Modifier = Modifier,
    size: Dp = 46.dp
) {
    Box(
        modifier = modifier
            .size(size)
            .clip(RoundedCornerShape(12.dp))
            .background(VetoDarkBackground)
            .border(1.dp, VetoBorderSubtle, RoundedCornerShape(12.dp))
    ) {
        Canvas(modifier = Modifier.matchParentSize()) {
            val w = this.size.width
            val h = this.size.height

            // 1. Subtle HUD grid lines
            for (i in 1..4) {
                val frac = i * 0.2f
                drawLine(
                    color = Color(0xFF1E242C),
                    start = Offset(0f, h * frac),
                    end = Offset(w, h * frac),
                    strokeWidth = 0.8f
                )
                drawLine(
                    color = Color(0xFF1E242C),
                    start = Offset(w * frac, 0f),
                    end = Offset(w * frac, h),
                    strokeWidth = 0.8f
                )
            }

            // 2. Radar Vector Trajectory Arcs
            drawCircle(
                color = Color(0xFF26303E),
                radius = w * 0.38f,
                center = Offset(w * 0.5f, h * 0.5f),
                style = Stroke(width = 1f)
            )
            drawCircle(
                color = Color(0xFF2A3648),
                radius = w * 0.22f,
                center = Offset(w * 0.5f, h * 0.5f),
                style = Stroke(width = 1f)
            )

            // Radar Crosshairs
            drawLine(
                color = VetoNeonGreen.copy(alpha = 0.4f),
                start = Offset(w * 0.5f, h * 0.05f),
                end = Offset(w * 0.5f, h * 0.95f),
                strokeWidth = 0.8f
            )
            drawLine(
                color = VetoGlowingRed.copy(alpha = 0.4f),
                start = Offset(w * 0.05f, h * 0.5f),
                end = Offset(w * 0.95f, h * 0.5f),
                strokeWidth = 0.8f
            )

            // 3. Attacker Missile Parabolic Trajectory (Neon Green #00FF66)
            val attackerTrail = Path().apply {
                moveTo(w * 0.88f, h * 0.12f)
                quadraticBezierTo(w * 0.72f, h * 0.26f, w * 0.50f, h * 0.50f)
            }
            drawPath(
                path = attackerTrail,
                brush = Brush.linearGradient(
                    colors = listOf(Color.Transparent, VetoNeonGreen, Color.White),
                    start = Offset(w * 0.88f, h * 0.12f),
                    end = Offset(w * 0.50f, h * 0.50f)
                ),
                style = Stroke(width = w * 0.06f, cap = StrokeCap.Round)
            )

            // 4. VETO-0 PAC-3 Interceptor Trajectory (Vibrant Red #FF3333)
            val vetoTrail = Path().apply {
                moveTo(w * 0.12f, h * 0.88f)
                quadraticBezierTo(w * 0.28f, h * 0.72f, w * 0.50f, h * 0.50f)
            }
            drawPath(
                path = vetoTrail,
                brush = Brush.linearGradient(
                    colors = listOf(Color.Transparent, VetoGlowingRed, Color(0xFFFF9933), Color.White),
                    start = Offset(w * 0.12f, h * 0.88f),
                    end = Offset(w * 0.50f, h * 0.50f)
                ),
                style = Stroke(width = w * 0.08f, cap = StrokeCap.Round)
            )

            // PAC-3 Interceptor Airframe with "VETO-0" Stencil
            rotate(degrees = -45f, pivot = Offset(w * 0.36f, h * 0.64f)) {
                drawRect(
                    color = Color(0xFFE2E8F0),
                    topLeft = Offset(w * 0.33f, h * 0.52f),
                    size = androidx.compose.ui.geometry.Size(w * 0.06f, h * 0.24f)
                )
                drawRect(
                    color = VetoGlowingRed,
                    topLeft = Offset(w * 0.33f, h * 0.52f),
                    size = androidx.compose.ui.geometry.Size(w * 0.06f, h * 0.24f),
                    style = Stroke(1.2f)
                )
                val paint = android.graphics.Paint().apply {
                    color = android.graphics.Color.BLACK
                    textSize = w * 0.055f
                    isFakeBoldText = true
                    textAlign = android.graphics.Paint.Align.CENTER
                }
                drawContext.canvas.nativeCanvas.drawText("VETO-0", w * 0.36f, h * 0.66f, paint)
            }

            // 5. Kinetic Hit-to-Kill Impact Flash & Fragment Debris
            drawCircle(
                color = Color.White,
                radius = w * 0.08f,
                center = Offset(w * 0.5f, h * 0.5f)
            )
            drawCircle(
                color = VetoNeonGreen,
                radius = w * 0.14f,
                center = Offset(w * 0.5f, h * 0.5f),
                style = Stroke(1.5f)
            )
            drawCircle(
                color = VetoGlowingRed,
                radius = w * 0.20f,
                center = Offset(w * 0.5f, h * 0.5f),
                style = Stroke(1.8f)
            )

            // Debris sparks
            drawLine(Color(0xFFFFEE00), Offset(w * 0.5f, h * 0.5f), Offset(w * 0.64f, h * 0.38f), 2f, StrokeCap.Round)
            drawLine(VetoGlowingRed, Offset(w * 0.5f, h * 0.5f), Offset(w * 0.36f, h * 0.62f), 2f, StrokeCap.Round)
            drawLine(VetoNeonGreen, Offset(w * 0.5f, h * 0.5f), Offset(w * 0.62f, h * 0.60f), 2f, StrokeCap.Round)
            drawLine(Color.White, Offset(w * 0.5f, h * 0.5f), Offset(w * 0.38f, h * 0.38f), 2f, StrokeCap.Round)
        }
    }
}
