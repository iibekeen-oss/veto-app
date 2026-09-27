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
import androidx.compose.ui.geometry.Size
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
 * VetoVerticalLaunchIcon:
 * Photorealistic 3D vector app icon inspired by real tactical ballistic missile vertical launch:
 * - Sleek military interceptor missile launching vertically upwards from heavy launcher base.
 * - Typography: "VETO" stenciled in sharp white high-contrast military lettering along fuselage.
 * - Massive volumetric fire and exhaust smoke cloud glowing intense Red (#FF3333) on #121212.
 * - Descending target trajectory arc with Glowing Green (#00FF66) line intersecting missile nosecone.
 */
@Composable
fun VetoVerticalLaunchIcon(
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

            // 1. Mobile Launcher Platform Base at bottom
            drawRect(
                color = Color(0xFF1E2026),
                topLeft = Offset(w * 0.25f, h * 0.88f),
                size = Size(w * 0.50f, h * 0.10f)
            )
            drawLine(
                color = VetoGlowingRed.copy(alpha = 0.8f),
                start = Offset(w * 0.30f, h * 0.94f),
                end = Offset(w * 0.70f, h * 0.94f),
                strokeWidth = 1.2f
            )

            // 2. Volumetric Fire & Exhaust Smoke Cloud Glowing Red (#FF3333)
            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(Color.White, Color(0xFFFFAA22), VetoGlowingRed, Color(0xFF4A1818), Color.Transparent),
                    center = Offset(w * 0.5f, h * 0.84f),
                    radius = w * 0.35f
                ),
                radius = w * 0.35f,
                center = Offset(w * 0.5f, h * 0.84f)
            )

            // 3. Vertical Rocket Core Thruster Flame
            val flamePath = Path().apply {
                moveTo(w * 0.46f, h * 0.74f)
                lineTo(w * 0.54f, h * 0.74f)
                lineTo(w * 0.58f, h * 0.88f)
                lineTo(w * 0.42f, h * 0.88f)
                close()
            }
            drawPath(flamePath, color = Color.White)

            // 4. Vertical Military Interceptor Missile Shaft
            val shaftPath = Path().apply {
                moveTo(w * 0.45f, h * 0.28f)
                lineTo(w * 0.55f, h * 0.28f)
                lineTo(w * 0.55f, h * 0.74f)
                lineTo(w * 0.45f, h * 0.74f)
                close()
            }
            drawPath(
                shaftPath,
                brush = Brush.horizontalGradient(
                    colors = listOf(Color(0xFF1E2026), Color(0xFF3C404E), Color(0xFFDCE2ED), Color(0xFF1A1C22))
                )
            )
            drawPath(shaftPath, color = VetoGlowingRed, style = Stroke(width = 1.2f))

            // Aerodynamic Nosecone
            val nosePath = Path().apply {
                moveTo(w * 0.45f, h * 0.28f)
                lineTo(w * 0.50f, h * 0.14f) // Tip meeting target trajectory
                lineTo(w * 0.55f, h * 0.28f)
                close()
            }
            drawPath(nosePath, color = Color(0xFFE2E8F0))
            drawPath(nosePath, color = VetoGlowingRed, style = Stroke(width = 1f))

            // Guidance / Stabilizer Fins
            val leftFin = Path().apply {
                moveTo(w * 0.45f, h * 0.68f)
                lineTo(w * 0.35f, h * 0.76f)
                lineTo(w * 0.45f, h * 0.74f)
                close()
            }
            drawPath(leftFin, color = Color(0xFF22252C))
            drawPath(leftFin, color = VetoGlowingRed, style = Stroke(0.8f))

            val rightFin = Path().apply {
                moveTo(w * 0.55f, h * 0.68f)
                lineTo(w * 0.65f, h * 0.76f)
                lineTo(w * 0.55f, h * 0.74f)
                close()
            }
            drawPath(rightFin, color = Color(0xFF22252C))
            drawPath(rightFin, color = VetoGlowingRed, style = Stroke(0.8f))

            // "VETO" Military Stencil Typography along the dark shaft
            rotate(degrees = -90f, pivot = Offset(w * 0.5f, h * 0.51f)) {
                val paint = android.graphics.Paint().apply {
                    color = android.graphics.Color.WHITE
                    textSize = w * 0.08f
                    isFakeBoldText = true
                    textAlign = android.graphics.Paint.Align.CENTER
                    letterSpacing = 0.1f
                }
                drawContext.canvas.nativeCanvas.drawText("VETO", w * 0.5f, h * 0.53f, paint)
            }

            // 5. Descending Target Trajectory Arc (Neon Green #00FF66)
            val targetArc = Path().apply {
                moveTo(w * 0.86f, h * 0.06f)
                quadraticBezierTo(w * 0.68f, h * 0.10f, w * 0.50f, h * 0.14f)
            }
            drawPath(
                targetArc,
                color = VetoNeonGreen,
                style = Stroke(width = 2.5f, cap = StrokeCap.Round)
            )

            // Zero-Point Collision Sparks at Nosecone (x=50%, y=14%)
            drawCircle(color = Color.White, radius = w * 0.05f, center = Offset(w * 0.50f, h * 0.14f))
            drawCircle(color = VetoNeonGreen, radius = w * 0.02f, center = Offset(w * 0.50f, h * 0.14f))
            drawLine(VetoNeonGreen, Offset(w * 0.50f, h * 0.14f), Offset(w * 0.62f, h * 0.08f), 1.8f, StrokeCap.Round)
            drawLine(VetoGlowingRed, Offset(w * 0.50f, h * 0.14f), Offset(w * 0.38f, h * 0.10f), 1.8f, StrokeCap.Round)
            drawLine(Color(0xFFFFDD00), Offset(w * 0.50f, h * 0.14f), Offset(w * 0.56f, h * 0.20f), 1.5f, StrokeCap.Round)
        }
    }
}
