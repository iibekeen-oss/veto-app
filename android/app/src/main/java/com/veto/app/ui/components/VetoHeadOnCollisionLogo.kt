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
 * VetoHeadOnCollisionLogo:
 * Pure Jetpack Compose Canvas implementation of the direct kinetic interception scene:
 * - Top Missile (Attacker): Coming straight down with an intense Glowing Neon Green (#00FF66) flame trail.
 * - Bottom Interceptor (VETO0): Launching straight up with "VETO0" printed on side & Glowing Red (#FF3333) thruster trail.
 * - Impact Point: Nose cones meet head-on in center with high-contrast neon sparks on pitch black (#121212).
 */
@Composable
fun VetoHeadOnCollisionLogo(
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

            // 1. Radar Grid Lines
            drawLine(
                color = Color(0xFF33333A),
                start = Offset(w * 0.15f, h * 0.5f),
                end = Offset(w * 0.85f, h * 0.5f),
                strokeWidth = 1f
            )
            drawLine(
                color = Color(0xFF33333A),
                start = Offset(w * 0.5f, h * 0.1f),
                end = Offset(w * 0.5f, h * 0.9f),
                strokeWidth = 1f
            )

            // 2. TOP MISSILE (Attacker) - Heading DOWN
            // Neon Green Thruster Exhaust
            val topFlamePath = Path().apply {
                moveTo(w * 0.44f, h * 0.22f)
                cubicTo(w * 0.42f, h * 0.14f, w * 0.36f, h * 0.06f, w * 0.32f, 0f)
                lineTo(w * 0.68f, 0f)
                cubicTo(w * 0.64f, h * 0.06f, w * 0.58f, h * 0.14f, w * 0.56f, h * 0.22f)
                close()
            }
            drawPath(
                path = topFlamePath,
                brush = Brush.verticalGradient(
                    colors = listOf(Color.Transparent, VetoNeonGreen, Color.White),
                    startY = 0f,
                    endY = h * 0.25f
                )
            )

            // Top Missile Body
            val topBodyPath = Path().apply {
                moveTo(w * 0.44f, h * 0.24f)
                lineTo(w * 0.56f, h * 0.24f)
                lineTo(w * 0.56f, h * 0.42f)
                lineTo(w * 0.50f, h * 0.48f) // Downward Nose tip
                lineTo(w * 0.44f, h * 0.42f)
                close()
            }
            drawPath(
                path = topBodyPath,
                brush = Brush.horizontalGradient(
                    colors = listOf(Color(0xFF16221A), Color(0xFF2A3D30), Color(0xFFD4FCE0), Color(0xFF16221A))
                )
            )
            drawPath(path = topBodyPath, color = VetoNeonGreen, style = Stroke(width = 1.5f))

            // 3. BOTTOM INTERCEPTOR (VETO0) - Heading UP
            // Glowing Red Thruster Exhaust
            val bottomFlamePath = Path().apply {
                moveTo(w * 0.44f, h * 0.76f)
                cubicTo(w * 0.42f, h * 0.86f, w * 0.36f, h * 0.94f, w * 0.32f, h)
                lineTo(w * 0.68f, h)
                cubicTo(w * 0.64f, h * 0.94f, w * 0.58f, h * 0.86f, w * 0.56f, h * 0.76f)
                close()
            }
            drawPath(
                path = bottomFlamePath,
                brush = Brush.verticalGradient(
                    colors = listOf(Color.White, Color(0xFFFF9933), VetoGlowingRed, Color.Transparent),
                    startY = h * 0.75f,
                    endY = h
                )
            )

            // Bottom VETO0 Missile Body
            val bottomBodyPath = Path().apply {
                moveTo(w * 0.44f, h * 0.76f)
                lineTo(w * 0.56f, h * 0.76f)
                lineTo(w * 0.56f, h * 0.58f)
                lineTo(w * 0.50f, h * 0.52f) // Upward Nose tip meeting top missile
                lineTo(w * 0.44f, h * 0.58f)
                close()
            }
            drawPath(
                path = bottomBodyPath,
                brush = Brush.horizontalGradient(
                    colors = listOf(Color(0xFF1E1E24), Color(0xFF3A3A46), Color(0xFFE2E8F0), Color(0xFF1A1A20))
                )
            )
            drawPath(path = bottomBodyPath, color = VetoGlowingRed, style = Stroke(width = 1.5f))

            // VETO0 Text printed vertically along bottom interceptor
            rotate(degrees = -90f, pivot = Offset(w * 0.5f, h * 0.67f)) {
                val paint = android.graphics.Paint().apply {
                    color = android.graphics.Color.WHITE
                    textSize = w * 0.085f
                    isFakeBoldText = true
                    textAlign = android.graphics.Paint.Align.CENTER
                    letterSpacing = 0.08f
                }
                drawContext.canvas.nativeCanvas.drawText("VETO0", w * 0.5f, h * 0.69f, paint)
            }

            // 4. IMPACT POINT (Head-on Collision in the center)
            // Concentric shock rings
            drawCircle(
                color = VetoNeonGreen,
                radius = w * 0.12f,
                center = Offset(w * 0.5f, h * 0.5f),
                style = Stroke(width = 1.5f)
            )
            drawCircle(
                color = VetoGlowingRed,
                radius = w * 0.07f,
                center = Offset(w * 0.5f, h * 0.5f),
                style = Stroke(width = 2f)
            )

            // Kinetic Sparks
            drawLine(
                color = VetoNeonGreen,
                start = Offset(w * 0.5f, h * 0.5f),
                end = Offset(w * 0.24f, h * 0.5f),
                strokeWidth = 2.5f,
                cap = StrokeCap.Round
            )
            drawLine(
                color = VetoGlowingRed,
                start = Offset(w * 0.5f, h * 0.5f),
                end = Offset(w * 0.76f, h * 0.5f),
                strokeWidth = 2.5f,
                cap = StrokeCap.Round
            )
            drawLine(
                color = Color.White,
                start = Offset(w * 0.5f, h * 0.5f),
                end = Offset(w * 0.32f, h * 0.40f),
                strokeWidth = 1.8f,
                cap = StrokeCap.Round
            )
            drawLine(
                color = Color.White,
                start = Offset(w * 0.5f, h * 0.5f),
                end = Offset(w * 0.68f, h * 0.60f),
                strokeWidth = 1.8f,
                cap = StrokeCap.Round
            )

            // Core collision flare
            drawCircle(
                color = Color.White,
                radius = w * 0.045f,
                center = Offset(w * 0.5f, h * 0.5f)
            )
        }
    }
}
