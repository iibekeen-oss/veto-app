package com.veto.app.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
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
                // Interactive Text Input
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

                // Send Button
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
                        .border(
                            width = if (isProSelected) 1.dp else 0.dp,
                            color = if (isProSelected) VetoNeonGreen else Color.Transparent,
                            shape = RoundedCornerShape(6.dp)
                        )
                        .clickable { selectedStance = Stance.PRO }
                        .padding(horizontal = 12.dp, vertical = 6.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "+",
                            color = if (isProSelected) VetoNeonGreen else VetoTextMuted,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 14.sp
                        )
                        Text(
                            text = "PRO",
                            color = if (isProSelected) VetoNeonGreen else VetoTextMuted,
                            fontWeight = FontWeight.Bold,
                            fontSize = 11.sp
                        )
                    }
                }

                // CON Toggle Option (-)
                val isConSelected = selectedStance == Stance.CON
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (isConSelected) VetoGlowingRedSubtle else Color.Transparent)
                        .border(
                            width = if (isConSelected) 1.dp else 0.dp,
                            color = if (isConSelected) VetoGlowingRed else Color.Transparent,
                            shape = RoundedCornerShape(6.dp)
                        )
                        .clickable { selectedStance = Stance.CON }
                        .padding(horizontal = 12.dp, vertical = 6.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "-",
                            color = if (isConSelected) VetoGlowingRed else VetoTextMuted,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 14.sp
                        )
                        Text(
                            text = "CON",
                            color = if (isConSelected) VetoGlowingRed else VetoTextMuted,
                            fontWeight = FontWeight.Bold,
                            fontSize = 11.sp
                        )
                    }
                }
            }
        }
    }
}

/**
 * VetoCommentItem: Displays audience reply with glowing left border indicating stance.
 */
@Composable
fun VetoCommentItem(
    comment: VetoComment,
    modifier: Modifier = Modifier
) {
    val isPro = comment.stance == Stance.PRO
    val stanceColor = if (isPro) VetoNeonGreen else VetoGlowingRed
    val stanceGlow = if (isPro) VetoNeonGreenGlow else VetoGlowingRedGlow

    Row(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(VetoDarkSurface)
            .border(
                width = 1.dp,
                color = VetoBorderSubtle,
                shape = RoundedCornerShape(8.dp)
            )
            .padding(12.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // Glowing Indicator Bar on Left
        Box(
            modifier = Modifier
                .width(4.dp)
                .height(44.dp)
                .clip(RoundedCornerShape(2.dp))
                .background(stanceColor)
                .shadow(elevation = 6.dp, spotColor = stanceGlow)
        )

        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = comment.author,
                        color = VetoTextWhite,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = comment.handle,
                        color = VetoTextMuted,
                        fontSize = 12.sp
                    )
                }

                // Stance indicator chip
                Text(
                    text = if (isPro) "+ PRO" else "- CON",
                    color = stanceColor,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold
                )
            }

            Text(
                text = comment.content,
                color = VetoTextLightGray,
                fontSize = 13.sp,
                lineHeight = 18.sp
            )

            Text(
                text = comment.timestamp,
                color = VetoTextMuted,
                fontSize = 11.sp
            )
        }
    }
}
