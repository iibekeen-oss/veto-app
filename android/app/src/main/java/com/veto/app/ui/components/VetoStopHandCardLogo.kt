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
import androidx.compose.ui.geometry.CornerRadius
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

/**
 * VetoStopHandCardLogo:
 * Glowing Red "Stop Hand / Veto Card" vector icon:
 * 1. Angled Red Referee / Veto Card in the background with glowing crimson gradient (#FF3333).
 * 2. Raised tactical Stop Hand (palm facing forward, 4 fingers + thumb) with clean vector geometry.
 * 3. Intense radial halo & kinetic shockwave ring.
 * 4. Stenciled "VETO" text badge across the card.
 */
@Composable
fun VetoStopHandCardLogo(
    modifier: Modifier = Modifier,
    size: Dp = 42.dp
) {
    Box(
        modifier = modifier
            .size(size)
            .clip(RoundedCornerShape(12.dp))
            .background(VetoDarkBackground)
            .border(1.dp, VetoGlowingRed.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
    ) {
        Canvas(modifier = Modifier.matchParentSize()) {
            val w = this.size.width
            val h = this.size.height

            // 1. Glowing Radial Halo in Crimson Red
            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(
                        VetoGlowingRed.copy(alpha = 0.45f),
                        VetoGlowingRed.copy(alpha = 0.15f),
                        Color.Transparent
                    ),
                    center = Offset(w * 0.5f, h * 0.5f),
                    radius = w * 0.48f
                ),
                radius = w * 0.48f,
                center = Offset(w * 0.5f, h * 0.5f)
            )

            // 2. The Angled "Veto Card" (Ref Penalty / Absolute Veto Card)
            rotate(degrees = 12f, pivot = Offset(w * 0.52f, h * 0.48f)) {
                // Card Body
                drawRoundRect(
                    brush = Brush.linearGradient(
                        colors = listOf(Color(0xFFFF5555), VetoGlowingRed, Color(0xFFB30000)),
                        start = Offset(w * 0.28f, h * 0.14f),
                        end = Offset(w * 0.76f, h * 0.82f)
                    ),
                    topLeft = Offset(w * 0.28f, h * 0.14f),
                    size = Size(w * 0.46f, h * 0.66f),
                    cornerRadius = CornerRadius(w * 0.08f, w * 0.08f)
                )

                // High-tech specular card border
                drawRoundRect(
                    color = Color.White.copy(alpha = 0.6f),
                    topLeft = Offset(w * 0.28f, h * 0.14f),
                    size = Size(w * 0.46f, h * 0.66f),
                    cornerRadius = CornerRadius(w * 0.08f, w * 0.08f),
                    style = Stroke(width = 1.4f)
                )

                // Stenciled "VETO" across card top
                val cardPaint = android.graphics.Paint().apply {
                    color = android.graphics.Color.WHITE
                    textSize = w * 0.08f
                    isFakeBoldText = true
                    textAlign = android.graphics.Paint.Align.CENTER
                }
                drawContext.canvas.nativeCanvas.drawText("VETO", w * 0.51f, h * 0.32f, cardPaint)
            }

            // 3. The Raised Tactical "Stop Hand" in the foreground
            // Palm base
            drawRoundRect(
                color = Color.White,
                topLeft = Offset(w * 0.34f, h * 0.48f),
                size = Size(w * 0.28f, h * 0.26f),
                cornerRadius = CornerRadius(w * 0.06f, w * 0.06f)
            )

            // 4 Raised Fingers (Index, Middle, Ring, Pinky)
            val fingerWidth = w * 0.052f
            val fingerSpacing = w * 0.064f
            val startFingerX = w * 0.35f

            // Index
            drawRoundRect(
                color = Color.White,
                topLeft = Offset(startFingerX, h * 0.28f),
                size = Size(fingerWidth, h * 0.24f),
                cornerRadius = CornerRadius(fingerWidth / 2, fingerWidth / 2)
            )
            // Middle (tallest)
            drawRoundRect(
                color = Color.White,
                topLeft = Offset(startFingerX + fingerSpacing, h * 0.24f),
                size = Size(fingerWidth, h * 0.28f),
                cornerRadius = CornerRadius(fingerWidth / 2, fingerWidth / 2)
            )
            // Ring
            drawRoundRect(
                color = Color.White,
                topLeft = Offset(startFingerX + fingerSpacing * 2, h * 0.26f),
                size = Size(fingerWidth, h * 0.26f),
                cornerRadius = CornerRadius(fingerWidth / 2, fingerWidth / 2)
            )
            // Pinky
            drawRoundRect(
                color = Color.White,
                topLeft = Offset(startFingerX + fingerSpacing * 3, h * 0.34f),
                size = Size(fingerWidth, h * 0.18f),
                cornerRadius = CornerRadius(fingerWidth / 2, fingerWidth / 2)
            )

            // Thumb extended leftwards
            val thumbPath = Path().apply {
                moveTo(w * 0.35f, h * 0.54f)
                quadraticBezierTo(w * 0.22f, h * 0.48f, w * 0.24f, h * 0.42f)
                quadraticBezierTo(w * 0.28f, h * 0.38f, w * 0.35f, h * 0.46f)
                close()
            }
            drawPath(thumbPath, color = Color.White)

            // Palm red tactical highlight icon
            drawCircle(
                color = VetoGlowingRed,
                radius = w * 0.045f,
                center = Offset(w * 0.48f, h * 0.60f)
            )
        }
    }
}
