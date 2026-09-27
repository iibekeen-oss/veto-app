import { VetoPost } from '../types';
import {
  benchImg,
  deadliftImg,
  squatImg,
} from '../assets/images';

export const INITIAL_POSTS: VetoPost[] = [
  {
    id: 'post-0',
    round: 0, // VETO 0: Initial Post / Thesis (Neon Green glow)
    creatorName: 'Dante "Iron" Wolfe',
    handle: '@wolfe_strength',
    avatarInitial: 'D',
    title: 'Touch-and-Go Bench Press Deloads The Highest Growth Window',
    summary: 'If your bar bounces off the sternum, you train elastic rebound rather than myofibrillar tension. A strict 1.5-second dead-stop at full pec stretch generates 38% greater hypertrophy in the lengthened state.',
    videoDuration: '0:52',
    category: 'BIOMECHANICS',
    debateTopic: 'BENCH PRESS INTEGRITY',
    image: benchImg,
    proCount: 1482,
    conCount: 914,
    userStance: null,
    comments: [
      {
        id: 'c-1',
        author: 'Marcus Vance',
        handle: '@vance_power',
        content: 'Mechanical tension is king. Bouncing off the ribcage only boosts gym ego and destroys sternocostal joints. 100% agreed.',
        stance: 'PRO',
        timestamp: '4m ago',
        likes: 64,
        userLiked: false,
      },
      {
        id: 'c-2',
        author: 'Elena Rostova',
        handle: '@rostova_oly',
        content: 'Absolute dogma. In Olympic weightlifting and dynamic athletics, stretch-shortening cycle (SSC) potentiation is what translates to real-world rate of force development.',
        stance: 'CON',
        timestamp: '18m ago',
        likes: 112,
        userLiked: false,
      },
      {
        id: 'c-3',
        author: 'Dr. Cole Davies',
        handle: '@biomech_cole',
        content: 'The 2024 meta-analysis on loaded stretch partials explicitly supports Wolfe here: passive tension from titin filament strain is maximized when momentum is eliminated.',
        stance: 'PRO',
        timestamp: '42m ago',
        likes: 185,
        userLiked: false,
      }
    ]
  },
  {
    id: 'post-1',
    round: 1, // VETO 1: First Opposition / Rebuttal (Glowing Red border)
    creatorName: 'Tariq "Apex" Owens',
    handle: '@owens_kinetics',
    avatarInitial: 'T',
    title: 'REBUTTAL: Controlled Touch Is NOT A Cheat Bounce',
    summary: 'Wolfe conflates a reckless trampoline bounce with controlled touch-and-go. Eliminating all kinetic momentum forces an unnatural decelerative torque on the anterior deltoid. Powerlifters pause for rules, not muscle architecture.',
    videoDuration: '1:08',
    category: 'KINESIOLOGY',
    debateTopic: 'BENCH PRESS INTEGRITY',
    image: deadliftImg,
    proCount: 890,
    conCount: 1720,
    userStance: null,
    comments: [
      {
        id: 'c-4',
        author: 'Coach Bradley',
        handle: '@bradley_cscs',
        content: 'Tariq is dead on. Pausing under 400+ lbs causes extreme ischemia and blood vessel occlusion, ending sets prematurely due to metabolite burning rather than true mechanical failure.',
        stance: 'CON',
        timestamp: '12m ago',
        likes: 78,
        userLiked: false,
      },
      {
        id: 'c-5',
        author: 'Soren Lindqvist',
        handle: '@soren_lift',
        content: 'No way. 99% of people using "touch and go" sink the bar 2 inches into their diaphragm and heave their hips. Wolfe is protecting standard lifters from blown pecs.',
        stance: 'PRO',
        timestamp: '35m ago',
        likes: 53,
        userLiked: false,
      }
    ]
  },
  {
    id: 'post-2',
    round: 2, // VETO 2: Counter-Rebuttal (Glowing Red border)
    creatorName: 'Sarah Chen, CSCS',
    handle: '@chen_physio',
    avatarInitial: 'S',
    title: 'COUNTER-VETO: Electromyography & Tendon Shear Evidence',
    summary: 'Surface EMG and ultrasound shear-wave elastography show tendon shear spikes 4.2x higher during ballistic turnaround compared to a controlled isometric pause. If you want longevity past age 30, the pause is non-negotiable.',
    videoDuration: '1:24',
    category: 'SPORTS MEDICINE',
    debateTopic: 'BENCH PRESS INTEGRITY',
    image: squatImg,
    proCount: 2310,
    conCount: 380,
    userStance: null,
    comments: [
      {
        id: 'c-6',
        author: 'Jaxson Kane',
        handle: '@kane_iron',
        content: 'She brought the ultrasound receipts! Case closed on the bench debate.',
        stance: 'PRO',
        timestamp: '8m ago',
        likes: 142,
        userLiked: false,
      }
    ]
  }
];

export const KOTLIN_SOURCE_FILES: { name: string; path: string; lang: string; description: string; code: string }[] = [
  {
    name: 'build.gradle.kts',
    path: 'android/app/build.gradle.kts',
    lang: 'kotlin',
    description: 'Gradle Build Specification for VETO Android: SDK 35, Jetpack Compose, Kotlin 2.0.21, Supabase SDK & Ktor Engine',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
}

android {
    namespace = "com.veto.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.veto.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons.extended)

    // Supabase Multiplatform Kotlin SDK
    implementation(platform(libs.supabase.bom))
    implementation(libs.supabase.postgrest)
    implementation(libs.supabase.realtime)
    implementation(libs.supabase.storage)

    // Ktor Android Engine
    implementation(libs.ktor.client.android)
    implementation(libs.ktor.client.core)

    // Kotlinx Serialization & Coroutines
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.kotlinx.coroutines.android)
}`
  },
  {
    name: 'SupabaseClient.kt',
    path: 'com/veto/app/data/SupabaseClient.kt',
    lang: 'kotlin',
    description: 'Supabase Kotlin SDK configuration for https://dieindvfdqpoywloccad.supabase.co, real-time pro_count and con_count flows, and rebuttal inserts',
    code: `package com.veto.app.data

import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.postgrest.postgrest
import io.github.jan.supabase.realtime.Realtime
import io.github.jan.supabase.realtime.realtime
import io.github.jan.supabase.realtime.channel
import io.github.jan.supabase.realtime.postgresChangeFlow
import io.github.jan.supabase.realtime.PostgresAction
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.Serializable

/**
 * Supabase client configuration for VETO:
 * Project URL: https://dieindvfdqpoywloccad.supabase.co
 * Connected to Real-time stance counters: pro_count and con_count
 */
object SupabaseConfig {
    const val SUPABASE_URL = "https://dieindvfdqpoywloccad.supabase.co"
    // Insert your full Publishable / Anon key here:
    var supabaseKey = "[قم بلصق المفتاح الكامل هنا]"

    val client: SupabaseClient by lazy {
        createSupabaseClient(
            supabaseUrl = SUPABASE_URL,
            supabaseKey = supabaseKey
        ) {
            install(Postgrest)
            install(Realtime)
        }
    }
}

@Serializable
data class StanceVoteUpdate(
    val id: String,
    val pro_count: Long? = null,
    val con_count: Long? = null,
    val updated_at: String? = null
)

class VetoStanceRepository(private val client: SupabaseClient = SupabaseConfig.client) {

    suspend fun incrementProCount(postId: String, currentProCount: Long): Result<Long> {
        return try {
            val newCount = currentProCount + 1
            client.postgrest["veto_posts"].update(
                mapOf("pro_count" to newCount)
            ) {
                filter { eq("id", postId) }
            }
            Result.success(newCount)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun incrementConCount(postId: String, currentConCount: Long): Result<Long> {
        return try {
            val newCount = currentConCount + 1
            client.postgrest["veto_posts"].update(
                mapOf("con_count" to newCount)
            ) {
                filter { eq("id", postId) }
            }
            Result.success(newCount)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun observePostStanceChanges(postId: String): Flow<StanceVoteUpdate> {
        val channel = client.realtime.channel("veto-realtime-stance-$postId")
        val changeFlow = channel.postgresChangeFlow<PostgresAction.Update>(schema = "public") {
            table = "veto_posts"
            filter = "id=eq.$postId"
        }
        channel.subscribe()

        return changeFlow.map { action ->
            action.decodeRecord<StanceVoteUpdate>()
        }
    }
}`
  },
  {
    name: 'VetoStopHandCardLogo.kt',
    path: 'com/veto/app/ui/components/VetoStopHandCardLogo.kt',
    lang: 'kotlin',
    description: 'Glowing Red Stop Hand / Veto Card vector logo: angled crimson penalty card with stenciled "VETO" text & tactical raised stop hand in foreground',
    code: `package com.veto.app.ui.components

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

            // 1. Radial Glowing Halo
            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(VetoGlowingRed.copy(alpha = 0.45f), Color.Transparent),
                    center = Offset(w * 0.5f, h * 0.5f),
                    radius = w * 0.48f
                ),
                radius = w * 0.48f,
                center = Offset(w * 0.5f, h * 0.5f)
            )

            // 2. Angled Veto Penalty Card
            rotate(degrees = 12f, pivot = Offset(w * 0.52f, h * 0.48f)) {
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
                drawRoundRect(
                    color = Color.White.copy(alpha = 0.6f),
                    topLeft = Offset(w * 0.28f, h * 0.14f),
                    size = Size(w * 0.46f, h * 0.66f),
                    cornerRadius = CornerRadius(w * 0.08f, w * 0.08f),
                    style = Stroke(1.4f)
                )
                val cardPaint = android.graphics.Paint().apply {
                    color = android.graphics.Color.WHITE
                    textSize = w * 0.08f
                    isFakeBoldText = true
                    textAlign = android.graphics.Paint.Align.CENTER
                }
                drawContext.canvas.nativeCanvas.drawText("VETO", w * 0.51f, h * 0.32f, cardPaint)
            }

            // 3. Raised Tactical Stop Hand (Foreground)
            drawRoundRect(
                color = Color.White,
                topLeft = Offset(w * 0.34f, h * 0.48f),
                size = Size(w * 0.28f, h * 0.26f),
                cornerRadius = CornerRadius(w * 0.06f, w * 0.06f)
            )
            val fingerWidth = w * 0.052f
            val spacing = w * 0.064f
            val startX = w * 0.35f
            drawRoundRect(Color.White, Offset(startX, h * 0.28f), Size(fingerWidth, h * 0.24f), CornerRadius(fingerWidth/2, fingerWidth/2))
            drawRoundRect(Color.White, Offset(startX + spacing, h * 0.24f), Size(fingerWidth, h * 0.28f), CornerRadius(fingerWidth/2, fingerWidth/2))
            drawRoundRect(Color.White, Offset(startX + spacing * 2, h * 0.26f), Size(fingerWidth, h * 0.26f), CornerRadius(fingerWidth/2, fingerWidth/2))
            drawRoundRect(Color.White, Offset(startX + spacing * 3, h * 0.34f), Size(fingerWidth, h * 0.18f), CornerRadius(fingerWidth/2, fingerWidth/2))

            // Thumb
            val thumb = Path().apply {
                moveTo(w * 0.35f, h * 0.54f)
                quadraticBezierTo(w * 0.22f, h * 0.48f, w * 0.24f, h * 0.42f)
                quadraticBezierTo(w * 0.28f, h * 0.38f, w * 0.35f, h * 0.46f)
                close()
            }
            drawPath(thumb, color = Color.White)
            drawCircle(color = VetoGlowingRed, radius = w * 0.045f, center = Offset(w * 0.48f, h * 0.60f))
        }
    }
}`
  },
  {
    name: 'ReactNative_App.tsx',
    path: 'react-native/App.tsx',
    lang: 'typescript',
    description: 'React Native entrypoint rendering VetoInterceptorDesign full-screen on pitch-black background #121212',
    code: `// مثال مبسط في React Native / App.tsx
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import VetoInterceptorDesign from './components/VetoInterceptorDesign'; // ملف الكود البصري

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      {/* عرض التصميم البصري ككود */}
      <VetoInterceptorDesign style={StyleSheet.absoluteFill} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});`
  },
  {
    name: 'ReactNative_VetoInterceptorDesign.tsx',
    path: 'react-native/components/VetoInterceptorDesign.tsx',
    lang: 'typescript',
    description: 'React Native SVG visual implementation: radar grid, DeepNeonGreen target arc, BlazingRed thruster plume & -45° rotated VETO text',
    code: `import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Path, Circle, G, Text as SvgText } from 'react-native-svg';

const DeepNeonGreen = 'rgba(0, 255, 102, 0.67)'; // 0xAA00FF66 (Target)
const BlazingRed = '#FF3333';                    // 0xFFFF3333 (VETO Interceptor)
const PitchBlack = '#121212';                    // 0xFF121212 (Dark Background)

export default function VetoInterceptorDesign({ style }: { style?: any }) {
  const { width = 390, height = 844 } = Dimensions.get('window');
  const interceptX = width * 0.5;
  const interceptY = height * 0.6;
  const startX = width * 0.1;
  const startY = height * 1.0;

  return (
    <View style={[styles.container, style]}>
      <Svg width="100%" height="100%" viewBox={\`0 0 \${width} \${height}\`}>
        {/* 1. Radar Grid */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <React.Fragment key={\`grid-\${i}\`}>
            <Line x1={0} y1={i * 200} x2={width} y2={i * 200} stroke="gray" strokeWidth={1} strokeOpacity={0.3} />
            <Line x1={i * 300} y1={0} x2={i * 300} y2={height} stroke="gray" strokeWidth={1} strokeOpacity={0.3} />
          </React.Fragment>
        ))}

        {/* 2. Target Trajectory (DeepNeonGreen) */}
        <Path
          d={\`M \${width * 0.9} 0 C \${width * 0.8} \${height * 0.3}, \${width * 0.6} \${height * 0.5}, \${interceptX} \${interceptY}\`}
          stroke={DeepNeonGreen}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />

        {/* 3. Interceptor Trajectory Line (BlazingRed) */}
        <Line x1={startX} y1={startY} x2={interceptX} y2={interceptY} stroke={BlazingRed} strokeWidth={4} strokeLinecap="round" />

        {/* Volumetric Thruster Plume */}
        <Circle cx={startX} cy={startY - 20} r={50} fill={BlazingRed} fillOpacity={0.8} />

        {/* PAC-3 Interceptor Body Circle */}
        <Circle cx={startX + (interceptX - startX) * 0.4} cy={startY + (interceptY - startY) * 0.4} r={8} fill={BlazingRed} />

        {/* "VETO" Stenciled White Text Rotated at -45° */}
        <G rotation="-45" origin={\`\${startX + (interceptX - startX) * 0.45}, \${startY + (interceptY - startY) * 0.45}\`}>
          <SvgText
            x={startX + (interceptX - startX) * 0.45}
            y={startY + (interceptY - startY) * 0.45}
            fill="#FFFFFF"
            fontSize="36"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            VETO
          </SvgText>
        </G>

        {/* Zero-Point Hit-to-Kill Impact Flash */}
        <Circle cx={interceptX} cy={interceptY} r={14} fill="#FFFFFF" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PitchBlack,
    overflow: 'hidden',
  },
});`
  },
  {
    name: 'VetoInterceptorDesign.kt',
    path: 'com/veto/app/ui/components/VetoInterceptorDesign.kt',
    lang: 'kotlin',
    description: 'Jetpack Compose tactical radar grid, target arc in DeepNeonGreen (#00FF66), and PAC-3 VETO interceptor with stenciled white text rotated at -45° in BlazingRed (#FF3333)',
    code: `package com.veto.app.ui.components

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
}`
  },
  {
    name: 'VetoVerticalLaunchIcon.kt',
    path: 'com/veto/app/ui/components/VetoVerticalLaunchIcon.kt',
    lang: 'kotlin',
    description: 'Tactical ballistic missile vertical launch: mobile launcher base, "VETO" stencil, massive Red (#FF3333) fiery smoke cloud & Green (#00FF66) target intercept arc',
    code: `package com.veto.app.ui.components

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
                lineTo(w * 0.50f, h * 0.14f)
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

            // "VETO" Military Stencil Typography
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
}`
  },
  {
    name: 'VetoCadBlueprintLogo.kt',
    path: 'com/veto/app/ui/components/VetoCadBlueprintLogo.kt',
    lang: 'kotlin',
    description: 'Military CAD blueprint vector: HUD radar arcs, PAC-3 VETO-0 Hit-to-Kill interception, #00FF66 threat vs #FF3333 veto plume',
    code: `package com.veto.app.ui.components

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
                drawLine(Color(0xFF1E242C), Offset(0f, h * frac), Offset(w, h * frac), 0.8f)
                drawLine(Color(0xFF1E242C), Offset(w * frac, 0f), Offset(w * frac, h), 0.8f)
            }

            // 2. Radar Vector Trajectory Arcs
            drawCircle(Color(0xFF26303E), radius = w * 0.38f, center = Offset(w * 0.5f, h * 0.5f), style = Stroke(1f))
            drawCircle(Color(0xFF2A3648), radius = w * 0.22f, center = Offset(w * 0.5f, h * 0.5f), style = Stroke(1f))
            drawLine(VetoNeonGreen.copy(alpha = 0.4f), Offset(w * 0.5f, h * 0.05f), Offset(w * 0.5f, h * 0.95f), 0.8f)
            drawLine(VetoGlowingRed.copy(alpha = 0.4f), Offset(w * 0.05f, h * 0.5f), Offset(w * 0.95f, h * 0.5f), 0.8f)

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
                drawRect(Color(0xFFE2E8F0), Offset(w * 0.33f, h * 0.52f), androidx.compose.ui.geometry.Size(w * 0.06f, h * 0.24f))
                drawRect(VetoGlowingRed, Offset(w * 0.33f, h * 0.52f), androidx.compose.ui.geometry.Size(w * 0.06f, h * 0.24f), style = Stroke(1.2f))
                val paint = android.graphics.Paint().apply {
                    color = android.graphics.Color.BLACK
                    textSize = w * 0.055f
                    isFakeBoldText = true
                    textAlign = android.graphics.Paint.Align.CENTER
                }
                drawContext.canvas.nativeCanvas.drawText("VETO-0", w * 0.36f, h * 0.66f, paint)
            }

            // 5. Kinetic Hit-to-Kill Impact Flash & Fragment Debris
            drawCircle(Color.White, radius = w * 0.08f, center = Offset(w * 0.5f, h * 0.5f))
            drawCircle(VetoNeonGreen, radius = w * 0.14f, center = Offset(w * 0.5f, h * 0.5f), style = Stroke(1.5f))
            drawCircle(VetoGlowingRed, radius = w * 0.20f, center = Offset(w * 0.5f, h * 0.5f), style = Stroke(1.8f))
            drawLine(Color(0xFFFFEE00), Offset(w * 0.5f, h * 0.5f), Offset(w * 0.64f, h * 0.38f), 2f, StrokeCap.Round)
            drawLine(VetoGlowingRed, Offset(w * 0.5f, h * 0.5f), Offset(w * 0.36f, h * 0.62f), 2f, StrokeCap.Round)
            drawLine(VetoNeonGreen, Offset(w * 0.5f, h * 0.5f), Offset(w * 0.62f, h * 0.60f), 2f, StrokeCap.Round)
            drawLine(Color.White, Offset(w * 0.5f, h * 0.5f), Offset(w * 0.38f, h * 0.38f), 2f, StrokeCap.Round)
        }
    }
}`
  },
  {
    name: 'VetoHeadOnCollisionLogo.kt',
    path: 'com/veto/app/ui/components/VetoHeadOnCollisionLogo.kt',
    lang: 'kotlin',
    description: 'Direct kinetic interception logo: Top Attacker (#00FF66) vs Bottom VETO0 (#FF3333) head-on zero-point collision',
    code: `package com.veto.app.ui.components

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
 * Direct kinetic interception scene:
 * - Top Missile (Attacker): Coming straight down with Glowing Neon Green (#00FF66) flame trail.
 * - Bottom Interceptor (VETO0): Launching straight up with "VETO0" printed on side & Glowing Red (#FF3333) trail.
 * - Impact Point: Nose cones meet head-on in center with high-contrast neon sparks.
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
            drawLine(Color(0xFF33333A), Offset(w * 0.15f, h * 0.5f), Offset(w * 0.85f, h * 0.5f), 1f)
            drawLine(Color(0xFF33333A), Offset(w * 0.5f, h * 0.1f), Offset(w * 0.5f, h * 0.9f), 1f)

            // 2. TOP MISSILE (Attacker) - Heading DOWN
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
                    startY = 0f, endY = h * 0.25f
                )
            )
            val topBodyPath = Path().apply {
                moveTo(w * 0.44f, h * 0.24f)
                lineTo(w * 0.56f, h * 0.24f)
                lineTo(w * 0.56f, h * 0.42f)
                lineTo(w * 0.50f, h * 0.48f)
                lineTo(w * 0.44f, h * 0.42f)
                close()
            }
            drawPath(topBodyPath, Color(0xFF2A3D30))
            drawPath(topBodyPath, VetoNeonGreen, style = Stroke(width = 1.5f))

            // 3. BOTTOM INTERCEPTOR (VETO0) - Heading UP
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
                    startY = h * 0.75f, endY = h
                )
            )
            val bottomBodyPath = Path().apply {
                moveTo(w * 0.44f, h * 0.76f)
                lineTo(w * 0.56f, h * 0.76f)
                lineTo(w * 0.56f, h * 0.58f)
                lineTo(w * 0.50f, h * 0.52f)
                lineTo(w * 0.44f, h * 0.58f)
                close()
            }
            drawPath(bottomBodyPath, Color(0xFF3A3A46))
            drawPath(bottomBodyPath, VetoGlowingRed, style = Stroke(width = 1.5f))

            // "VETO0" Stencil text along bottom shaft
            rotate(-90f, Offset(w * 0.5f, h * 0.67f)) {
                val paint = android.graphics.Paint().apply {
                    color = android.graphics.Color.WHITE
                    textSize = w * 0.085f
                    isFakeBoldText = true
                    textAlign = android.graphics.Paint.Align.CENTER
                    letterSpacing = 0.08f
                }
                drawContext.canvas.nativeCanvas.drawText("VETO0", w * 0.5f, h * 0.69f, paint)
            }

            // 4. ZERO-POINT IMPACT COLLISION
            drawCircle(VetoNeonGreen, radius = w * 0.12f, center = Offset(w * 0.5f, h * 0.5f), style = Stroke(1.5f))
            drawCircle(VetoGlowingRed, radius = w * 0.07f, center = Offset(w * 0.5f, h * 0.5f), style = Stroke(2f))
            drawLine(VetoNeonGreen, Offset(w * 0.5f, h * 0.5f), Offset(w * 0.24f, h * 0.5f), 2.5f)
            drawLine(VetoGlowingRed, Offset(w * 0.5f, h * 0.5f), Offset(w * 0.76f, h * 0.5f), 2.5f)
            drawCircle(Color.White, radius = w * 0.045f, center = Offset(w * 0.5f, h * 0.5f))
        }
    }
}`
  },
  {
    name: 'VetoMissileIcon.kt',
    path: 'com/veto/app/ui/components/VetoMissileIcon.kt',
    lang: 'kotlin',
    description: 'Custom Vector Canvas Icon: Interceptor Missile with "VETO" text, Glowing Red jet flame trail, and Neon Green aura',
    code: `package com.veto.app.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.*
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
    Canvas(modifier = modifier.size(size)) {
        val w = this.size.width
        val h = this.size.height

        // 1. Subtle Neon Green Aura / Targeting Halo in the background
        drawCircle(
            brush = Brush.radialGradient(
                colors = listOf(VetoNeonGreen.copy(alpha = 0.25f), Color.Transparent),
                center = Offset(w * 0.5f, h * 0.5f),
                radius = w * 0.52f
            ),
            radius = w * 0.52f
        )

        // 2. Blazing Glowing Jet Trail in Glowing Red (#FF3333)
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

        // 3. Neon Green Silhouette Glow behind Missile Body
        val auraPath = Path().apply {
            moveTo(w * 0.30f, h * 0.68f)
            lineTo(w * 0.72f, h * 0.36f)
            lineTo(w * 0.88f, h * 0.12f) // Nose tip
            lineTo(w * 0.64f, h * 0.28f)
            close()
        }
        drawPath(path = auraPath, color = VetoNeonGreen, style = Stroke(width = w * 0.08f))

        // 4. Missile Hull & Fins
        val fuselage = Path().apply {
            moveTo(w * 0.30f, h * 0.66f)
            lineTo(w * 0.64f, h * 0.32f)
            cubicTo(w * 0.79f, h * 0.17f, w * 0.84f, h * 0.13f, w * 0.88f, h * 0.12f)
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
        drawPath(fuselage, color = VetoNeonGreen, style = Stroke(width = 1.8f))

        // Warhead tip
        val warhead = Path().apply {
            moveTo(w * 0.73f, h * 0.23f)
            cubicTo(w * 0.79f, h * 0.17f, w * 0.84f, h * 0.13f, w * 0.88f, h * 0.12f)
            lineTo(w * 0.77f, h * 0.27f)
            close()
        }
        drawPath(warhead, color = VetoGlowingRed)

        // 5. "VETO" Stencil text along fuselage
        rotate(degrees = -45f, pivot = Offset(w * 0.5f, h * 0.5f)) {
            val paintText = android.graphics.Paint().apply {
                color = android.graphics.Color.WHITE
                textSize = w * 0.16f
                isFakeBoldText = true
                textAlign = android.graphics.Paint.Align.CENTER
                letterSpacing = 0.15f
            }
            drawContext.canvas.nativeCanvas.drawText("VETO", w * 0.5f, h * 0.53f, paintText)
        }
    }
}`
  },
  {
    name: 'Color.kt',
    path: 'com/veto/app/ui/theme/Color.kt',
    lang: 'kotlin',
    description: 'Visual identity & high-contrast dark gym color palette (#121212, #00FF66, #FF3333)',
    code: `package com.veto.app.ui.theme

import androidx.compose.ui.graphics.Color

/**
 * VETO Visual Identity & Color Palette
 * Modern, pitch-black high-contrast "Dark Gym" theme
 */
val VetoDarkBackground = Color(0xFF121212)      // Primary Deep Background
val VetoDarkSurface = Color(0xFF1B1B1B)         // Card Elevation Surface
val VetoDarkSurfaceVariant = Color(0xFF262626)  // Inner Container Surface
val VetoBorderSubtle = Color(0xFF333333)        // Subtle structural border

// High-Contrast Accent Colors
val VetoNeonGreen = Color(0xFF00FF66)           // Accent PRO (+ / Support / Veto 0)
val VetoNeonGreenGlow = Color(0x6600FF66)       // 40% Alpha Glow for Neon Green
val VetoNeonGreenSubtle = Color(0x1A00FF66)     // 10% Background Tint

val VetoGlowingRed = Color(0xFFFF3333)          // Accent CON (- / Opposition / Rebuttal)
val VetoGlowingRedGlow = Color(0x66FF3333)      // 40% Alpha Glow for Glowing Red
val VetoGlowingRedSubtle = Color(0x1AFF3333)    // 10% Background Tint

// Typography & Content Colors
val VetoTextWhite = Color(0xFFFFFFFF)           // Primary Readable Text
val VetoTextLightGray = Color(0xFFB0B0B0)       // Secondary Metadata Text
val VetoTextMuted = Color(0xFF757575)           // Placeholder & Inactive Text
val VetoIronGray = Color(0xFF2C2C2E)            // Gym Iron Accent`
  },
  {
    name: 'StanceCounters.kt',
    path: 'com/veto/app/ui/components/StanceCounters.kt',
    lang: 'kotlin',
    description: 'Stance counter composable with "+ [Pro Count]" in Green and "- [Con Count]" in Red',
    code: `package com.veto.app.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.veto.app.data.Stance
import com.veto.app.ui.theme.*

/**
 * StanceCounters: Bottom stance counter component for VETO posts.
 * Displays:
 *  - "+ [Pro Count]" in Neon Green (#00FF66)
 *  - "- [Con Count]" in Glowing Red (#FF3333)
 * With an integrated ratio bar and tactile feedback states.
 */
@Composable
fun StanceCounters(
    proCount: Int,
    conCount: Int,
    userStance: Stance?,
    onProClick: () -> Unit,
    onConClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val total = (proCount + conCount).coerceAtLeast(1)
    val proRatio = proCount.toFloat() / total
    val animatedProRatio by animateFloatAsState(
        targetValue = proRatio,
        animationSpec = tween(durationMillis = 300),
        label = "ratioAnim"
    )

    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // Stance Action Buttons Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // PRO Button (+)
            val isProActive = userStance == Stance.PRO
            val proBgColor by animateColorAsState(
                targetValue = if (isProActive) VetoNeonGreenSubtle else VetoDarkSurfaceVariant,
                label = "proBg"
            )
            val proBorderColor by animateColorAsState(
                targetValue = if (isProActive) VetoNeonGreen else VetoBorderSubtle,
                label = "proBorder"
            )

            Row(
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .background(proBgColor)
                    .border(
                        width = if (isProActive) 1.5.dp else 1.dp,
                        color = proBorderColor,
                        shape = RoundedCornerShape(8.dp)
                    )
                    .clickable(
                        interactionSource = remember { MutableInteractionSource() },
                        indication = null,
                        onClick = onProClick
                    )
                    .padding(horizontal = 14.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Add,
                    contentDescription = "Support (+)",
                    tint = VetoNeonGreen,
                    modifier = Modifier.size(16.dp)
                )
                Text(
                    text = "+ $proCount",
                    color = VetoNeonGreen,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                    fontFamily = FontFamily.Monospace
                )
                Text(
                    text = "SUPPORT",
                    color = if (isProActive) VetoNeonGreen else VetoTextLightGray,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 11.sp,
                    letterSpacing = 0.5.sp
                )
            }

            // Ratio summary text
            val proPercent = (proRatio * 100).toInt()
            Text(
                text = "$proPercent% PRO",
                color = VetoTextLightGray,
                fontSize = 11.sp,
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Medium
            )

            // CON Button (-)
            val isConActive = userStance == Stance.CON
            val conBgColor by animateColorAsState(
                targetValue = if (isConActive) VetoGlowingRedSubtle else VetoDarkSurfaceVariant,
                label = "conBg"
            )
            val conBorderColor by animateColorAsState(
                targetValue = if (isConActive) VetoGlowingRed else VetoBorderSubtle,
                label = "conBorder"
            )

            Row(
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .background(conBgColor)
                    .border(
                        width = if (isConActive) 1.5.dp else 1.dp,
                        color = conBorderColor,
                        shape = RoundedCornerShape(8.dp)
                    )
                    .clickable(
                        interactionSource = remember { MutableInteractionSource() },
                        indication = null,
                        onClick = onConClick
                    )
                    .padding(horizontal = 14.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Remove,
                    contentDescription = "Object (-)",
                    tint = VetoGlowingRed,
                    modifier = Modifier.size(16.dp)
                )
                Text(
                    text = "- $conCount",
                    color = VetoGlowingRed,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                    fontFamily = FontFamily.Monospace
                )
                Text(
                    text = "OBJECT",
                    color = if (isConActive) VetoGlowingRed else VetoTextLightGray,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 11.sp,
                    letterSpacing = 0.5.sp
                )
            }
        }

        // Tug-of-war Stance Ratio Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(4.dp)
                .clip(RoundedCornerShape(2.dp))
                .background(VetoDarkSurfaceVariant)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxHeight()
                    .weight(animatedProRatio.coerceIn(0.01f, 0.99f))
                    .background(VetoNeonGreen)
            )
            Box(
                modifier = Modifier
                    .fillMaxHeight()
                    .weight((1f - animatedProRatio).coerceIn(0.01f, 0.99f))
                    .background(VetoGlowingRed)
            )
        }
    }
}`
  },
  {
    name: 'GlowCommentInput.kt',
    path: 'com/veto/app/ui/components/GlowCommentInput.kt',
    lang: 'kotlin',
    description: 'Dynamic text input with Green/Red glow border toggle & glowing reply items',
    code: `package com.veto.app.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.veto.app.data.Stance
import com.veto.app.data.VetoComment
import com.veto.app.ui.theme.*

/**
 * GlowCommentInput: Audience Interactive Comment Input Section
 * - Dynamic text input field
 * - Binary toggle selector for stance: "+" (PRO) or "-" (CON)
 * - Dynamic Border Logic:
 *     * When "+" is selected: Outline glows Neon Green (#00FF66)
 *     * When "-" is selected: Outline glows Glowing Red (#FF3333)
 */
@Composable
fun GlowCommentInput(
    onSendComment: (text: String, stance: Stance) -> Unit,
    modifier: Modifier = Modifier
) {
    var text by remember { mutableStateOf("") }
    var selectedStance by remember { mutableStateOf(Stance.PRO) }

    // Dynamic border color based on stance toggle
    val targetBorderColor = if (selectedStance == Stance.PRO) VetoNeonGreen else VetoGlowingRed
    val targetGlowShadowColor = if (selectedStance == Stance.PRO) VetoNeonGreenGlow else VetoGlowingRedGlow

    val animatedBorderColor by animateColorAsState(
        targetValue = targetBorderColor,
        animationSpec = tween(durationMillis = 250),
        label = "inputBorderGlow"
    )

    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(VetoDarkSurface)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // Dynamic Glow Outline Input Container
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .shadow(
                    elevation = 8.dp,
                    shape = RoundedCornerShape(12.dp),
                    spotColor = targetGlowShadowColor,
                    ambientColor = targetGlowShadowColor
                )
                .clip(RoundedCornerShape(12.dp))
                .background(VetoDarkBackground)
                .border(
                    width = 2.dp,
                    color = animatedBorderColor,
                    shape = RoundedCornerShape(12.dp)
                )
                .padding(horizontal = 14.dp, vertical = 12.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                BasicTextField(
                    value = text,
                    onValueChange = { text = it },
                    textStyle = TextStyle(
                        color = VetoTextWhite,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Normal
                    ),
                    cursorBrush = SolidColor(targetBorderColor),
                    modifier = Modifier.weight(1f),
                    decorationBox = { innerTextField ->
                        if (text.isEmpty()) {
                            Text(
                                text = if (selectedStance == Stance.PRO)
                                    "State your argument in support (+)..."
                                else
                                    "State your counter-objection (-)...",
                                color = VetoTextMuted,
                                fontSize = 14.sp
                            )
                        }
                        innerTextField()
                    }
                )

                IconButton(
                    onClick = {
                        if (text.isNotBlank()) {
                            onSendComment(text.trim(), selectedStance)
                            text = ""
                        }
                    },
                    enabled = text.isNotBlank(),
                    modifier = Modifier.size(32.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Send,
                        contentDescription = "Post Comment",
                        tint = if (text.isNotBlank()) animatedBorderColor else VetoTextMuted,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }

        // Stance Binary Toggle Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "AUDIENCE STANCE",
                color = VetoTextLightGray,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 1.sp
            )

            // Binary Toggle Selector
            Row(
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .background(VetoDarkBackground)
                    .border(1.dp, VetoBorderSubtle, RoundedCornerShape(8.dp))
                    .padding(2.dp),
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                // PRO Toggle Option (+)
                val isProSelected = selectedStance == Stance.PRO
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (isProSelected) VetoNeonGreenSubtle else Color.Transparent)
                        .clickable { selectedStance = Stance.PRO }
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Text("+ PRO", color = if (isProSelected) VetoNeonGreen else VetoTextMuted, fontWeight = FontWeight.Bold, fontSize = 11.sp)
                }

                // CON Toggle Option (-)
                val isConSelected = selectedStance == Stance.CON
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (isConSelected) VetoGlowingRedSubtle else Color.Transparent)
                        .clickable { selectedStance = Stance.CON }
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Text("- CON", color = if (isConSelected) VetoGlowingRed else VetoTextMuted, fontWeight = FontWeight.Bold, fontSize = 11.sp)
                }
            }
        }
    }
}`
  },
  {
    name: 'VetoPostCard.kt',
    path: 'com/veto/app/ui/components/VetoPostCard.kt',
    lang: 'kotlin',
    description: 'Video & Debate Post card bounded by glowing Green/Red borders with VETO round badge',
    code: `package com.veto.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChatBubbleOutline
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.veto.app.data.VetoPost
import com.veto.app.ui.theme.*

/**
 * VetoPostCard:
 * - Glowing border:
 *    * Neon Green (#00FF66) for initial post/opinion (VETO 0)
 *    * Glowing Red (#FF3333) for opposition/rebuttal posts (VETO 1, VETO 2...)
 * - "VETO" round indicator badge at top corner ("VETO 0", "VETO 1", etc.)
 * - Media area with video representation & duration
 * - Stance counter icons at bottom displaying "+ [Pro Count]" & "- [Con Count]"
 */
@Composable
fun VetoPostCard(
    post: VetoPost,
    onProClick: () -> Unit,
    onConClick: () -> Unit,
    onCommentClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isOriginal = post.round == 0
    val glowColor = if (isOriginal) VetoNeonGreen else VetoGlowingRed
    val glowShadow = if (isOriginal) VetoNeonGreenGlow else VetoGlowingRedGlow

    Column(
        modifier = modifier
            .fillMaxWidth()
            .shadow(
                elevation = 12.dp,
                shape = RoundedCornerShape(16.dp),
                spotColor = glowShadow,
                ambientColor = glowShadow
            )
            .clip(RoundedCornerShape(16.dp))
            .background(VetoDarkSurface)
            .border(
                width = 2.dp,
                color = glowColor,
                shape = RoundedCornerShape(16.dp)
            )
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Top Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(VetoDarkSurfaceVariant)
                        .border(1.dp, glowColor.copy(alpha = 0.5f), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Text(post.creatorName.take(1), color = VetoTextWhite, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                }

                Column {
                    Text(post.creatorName, color = VetoTextWhite, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    Text(post.handle, color = VetoTextLightGray, fontSize = 12.sp)
                }
            }

            Text(
                text = post.category,
                color = VetoTextLightGray,
                fontSize = 11.sp,
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Medium,
                letterSpacing = 1.sp
            )
        }

        // Video Viewport with Glowing Round Badge
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(240.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(Brush.verticalGradient(listOf(Color(0xFF202020), Color(0xFF141414))))
                .border(1.dp, VetoBorderSubtle, RoundedCornerShape(12.dp))
        ) {
            // VETO Round Indicator Badge
            Box(
                modifier = Modifier
                    .padding(12.dp)
                    .align(Alignment.TopStart)
                    .clip(RoundedCornerShape(6.dp))
                    .background(VetoDarkBackground.copy(alpha = 0.85f))
                    .border(1.5.dp, glowColor, RoundedCornerShape(6.dp))
                    .padding(horizontal = 10.dp, vertical = 5.dp)
            ) {
                Text(
                    text = if (isOriginal) "VETO 0 · ORIGINAL" else "VETO \${post.round} · REBUTTAL",
                    color = glowColor,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = FontFamily.Monospace
                )
            }

            // Duration tag
            Box(
                modifier = Modifier
                    .padding(12.dp)
                    .align(Alignment.TopEnd)
                    .clip(RoundedCornerShape(4.dp))
                    .background(Color.Black.copy(alpha = 0.7f))
                    .padding(horizontal = 8.dp, vertical = 4.dp)
            ) {
                Text(post.videoDuration, color = VetoTextWhite, fontSize = 11.sp, fontFamily = FontFamily.Monospace)
            }

            // Center Play Icon
            Box(
                modifier = Modifier
                    .size(54.dp)
                    .align(Alignment.Center)
                    .clip(CircleShape)
                    .background(Color.Black.copy(alpha = 0.6f))
                    .border(1.5.dp, glowColor, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.PlayArrow, contentDescription = "Play", tint = glowColor, modifier = Modifier.size(30.dp))
            }

            // Bottom title scrim
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.BottomCenter)
                    .background(Brush.verticalGradient(listOf(Color.Transparent, Color.Black.copy(alpha = 0.9f))))
                    .padding(12.dp)
            ) {
                Text(post.title, color = VetoTextWhite, fontWeight = FontWeight.Bold, fontSize = 15.sp, maxLines = 2, overflow = TextOverflow.Ellipsis)
            }
        }

        // Summary
        Text(post.summary, color = VetoTextLightGray, fontSize = 13.sp, lineHeight = 18.sp)

        // Stance Counters: "+ [Pro Count]" & "- [Con Count]"
        StanceCounters(
            proCount = post.proCount,
            conCount = post.conCount,
            userStance = post.userStance,
            onProClick = onProClick,
            onConClick = onConClick
        )
    }
}`
  },
  {
    name: 'VetoFeedScreen.kt',
    path: 'com/veto/app/ui/screens/VetoFeedScreen.kt',
    lang: 'kotlin',
    description: 'Full feed screen with state management, comments bottom sheet, and filters',
    code: `package com.veto.app.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import com.veto.app.data.MockData
import com.veto.app.data.Stance
import com.veto.app.data.VetoComment
import com.veto.app.ui.components.GlowCommentInput
import com.veto.app.ui.components.VetoCommentItem
import com.veto.app.ui.components.VetoPostCard
import com.veto.app.ui.theme.*

@Composable
fun VetoFeedScreen(modifier: Modifier = Modifier) {
    var posts by remember { mutableStateOf(MockData.samplePosts) }
    var activeFilter by remember { mutableStateOf("ALL") }
    var activeCommentPostId by remember { mutableStateOf<String?>(null) }

    val activeCommentPost = posts.find { it.id == activeCommentPostId }
    val filteredPosts = when (activeFilter) {
        "VETO_0" -> posts.filter { it.round == 0 }
        "REBUTTALS" -> posts.filter { it.round > 0 }
        else -> posts
    }

    Box(modifier = modifier.fillMaxSize().background(VetoDarkBackground)) {
        Scaffold(
            containerColor = VetoDarkBackground,
            topBar = { /* Top App Bar with brand wordmark and filter chips */ }
        ) { innerPadding ->
            LazyColumn(
                modifier = Modifier.fillMaxSize().padding(innerPadding).padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(20.dp)
            ) {
                items(filteredPosts, key = { it.id }) { post ->
                    VetoPostCard(
                        post = post,
                        onProClick = { /* toggle PRO stance & increment/decrement counters */ },
                        onConClick = { /* toggle CON stance & increment/decrement counters */ },
                        onCommentClick = { activeCommentPostId = post.id }
                    )
                }
            }
        }
    }
}`
  },
  {
    name: 'MainActivity.kt',
    path: 'com/veto/app/MainActivity.kt',
    lang: 'kotlin',
    description: 'Android ComponentActivity setting up VetoTheme and VetoFeedScreen',
    code: `package com.veto.app

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
}`
  }
];
