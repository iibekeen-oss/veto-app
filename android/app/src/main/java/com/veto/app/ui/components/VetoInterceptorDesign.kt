package com.veto.app.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// معرفات الألوان من الوصف (AI Studio)
val DeepNeonGreen = Color(0xAA00FF66) // هدف (Target)
val BlazingRed = Color(0xFFFF3333)   // اعتراض (Intercept)
val PitchBlack = Color(0xFF121212)    // خلفية الداكنة

/**
 * VetoInterceptorDesign:
 * Jetpack Compose implementation of the tactical ballistic interception scene:
 * 1. Radar Grid & CAD Blueprint lines
 * 2. Target Trajectory in DeepNeonGreen (#00FF66)
 * 3. VETO Interceptor with blazing red plume & bold white "VETO" text
 */
@Composable
fun VetoInterceptorDesign(modifier: Modifier = Modifier) {
    Canvas(modifier = modifier.fillMaxSize().background(PitchBlack)) {
        // 1. رسم شبكة الرادار ورسم الأقواس التكتيكية (Blueprint / CAD)
        drawRadarGrid()

        // 2. رسم مسار الهدف (الصاروخ المهاجم) - بالأخضر
        drawTargetTrajectory()

        // 3. رسم الصاروخ الاعتراض (VETO) - بالأحمر
        drawInterceptorWithVetoText()
    }
}

private fun DrawScope.drawRadarGrid() {
    val strokeWidth = 1.dp.toPx()
    val color = Color.Gray.copy(alpha = 0.3f)
    // رسم شبكة مبسطة
    for (i in 0 until 5) {
        drawLine(color, Offset(0f, i * 200f), Offset(size.width, i * 200f), strokeWidth)
        drawLine(color, Offset(i * 300f, 0f), Offset(i * 300f, size.height), strokeWidth)
    }
}

private fun DrawScope.drawTargetTrajectory() {
    // مسار قوسي مائل من أعلى اليمين
    val path = Path().apply {
        moveTo(size.width * 0.9f, 0f)
        cubicTo(
            size.width * 0.8f, size.height * 0.3f,
            size.width * 0.6f, size.height * 0.5f,
            size.width * 0.5f, size.height * 0.6f // نقطة الاعتراض
        )
    }
    drawPath(path, color = DeepNeonGreen, style = Stroke(2.dp.toPx()))
}

private fun DrawScope.drawInterceptorWithVetoText() {
    val interceptorHeight = 300.dp.toPx()
    val startX = size.width * 0.1f // من أسفل اليسار صاعداً
    val endX = size.width * 0.5f // إلى نقطة الاعتراض
    val startY = size.height * 1f
    val endY = size.height * 0.6f

    // 1. رسم ذيل اللهب والدخان الكثيف (Red Thruster Plume)
    drawCircle(
        color = BlazingRed.copy(alpha = 0.8f),
        radius = 50.dp.toPx(),
        center = Offset(startX, startY - 20.dp.toPx())
    )

    // 2. رسم جسم الصاروخ (PAC-3 style) ككود برمجي مبسط
    drawCircle(
        color = BlazingRed,
        radius = 8.dp.toPx(),
        center = Offset(startX, startY - interceptorHeight / 2)
    )

    // 3. كتابة النص "VETO" على بدن الصاروخ
    // ملحوظة: كتابة النص على الـ Native Canvas تتطلب استخدام paint
    val paint = android.graphics.Paint().apply {
        color = android.graphics.Color.WHITE
        textSize = 36.sp.toPx()
        typeface = android.graphics.Typeface.DEFAULT_BOLD
    }
    // كتابة النص رأسياً أو مائلاً
    drawContext.canvas.nativeCanvas.save()
    drawContext.canvas.nativeCanvas.rotate(-45f, startX, startY - interceptorHeight / 2)
    drawContext.canvas.nativeCanvas.drawText("VETO", startX - 20.dp.toPx(), startY - interceptorHeight / 2, paint)
    drawContext.canvas.nativeCanvas.restore()
}
