package com.veto.app.ui.components

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
import androidx.compose.material.icons.filled.Close
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
                    text = "REBUTTAL",
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
                    text = "VETO",
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
}
