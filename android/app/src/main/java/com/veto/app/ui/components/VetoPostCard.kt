package com.veto.app.ui.components

import androidx.compose.animation.AnimatedVisibility
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
import androidx.compose.runtime.*
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
import com.veto.app.data.Stance
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
        // Top Header: Creator info & Category
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Creator Avatar
                Box(
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(VetoDarkSurfaceVariant)
                        .border(1.dp, glowColor.copy(alpha = 0.5f), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = post.creatorName.take(1),
                        color = VetoTextWhite,
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp
                    )
                }

                Column {
                    Text(
                        text = post.creatorName,
                        color = VetoTextWhite,
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp
                    )
                    Text(
                        text = post.handle,
                        color = VetoTextLightGray,
                        fontSize = 12.sp
                    )
                }
            }

            // Category tag
            Text(
                text = post.category,
                color = VetoTextLightGray,
                fontSize = 11.sp,
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Medium,
                letterSpacing = 1.sp
            )
        }

        // Video Media Viewport bounded by glowing environment
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(240.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(
                    Brush.verticalGradient(
                        colors = listOf(
                            Color(0xFF202020),
                            Color(0xFF141414)
                        )
                    )
                )
                .border(1.dp, VetoBorderSubtle, RoundedCornerShape(12.dp))
        ) {
            // VETO Round Indicator Badge (Top-Left Corner)
            Box(
                modifier = Modifier
                    .padding(12.dp)
                    .align(Alignment.TopStart)
                    .clip(RoundedCornerShape(6.dp))
                    .background(VetoDarkBackground.copy(alpha = 0.85f))
                    .border(
                        width = 1.5.dp,
                        color = glowColor,
                        shape = RoundedCornerShape(6.dp)
                    )
                    .padding(horizontal = 10.dp, vertical = 5.dp)
            ) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(7.dp)
                            .clip(CircleShape)
                            .background(glowColor)
                    )
                    Text(
                        text = if (isOriginal) "VETO 0 · ORIGINAL" else "VETO ${post.round} · REBUTTAL",
                        color = glowColor,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.ExtraBold,
                        fontFamily = FontFamily.Monospace,
                        letterSpacing = 0.5.sp
                    )
                }
            }

            // Duration tag (Top-Right Corner)
            Box(
                modifier = Modifier
                    .padding(12.dp)
                    .align(Alignment.TopEnd)
                    .clip(RoundedCornerShape(4.dp))
                    .background(Color.Black.copy(alpha = 0.7f))
                    .padding(horizontal = 8.dp, vertical = 4.dp)
            ) {
                Text(
                    text = post.videoDuration,
                    color = VetoTextWhite,
                    fontSize = 11.sp,
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.SemiBold
                )
            }

            // Center Play Icon Callout
            Box(
                modifier = Modifier
                    .size(54.dp)
                    .align(Alignment.Center)
                    .clip(CircleShape)
                    .background(Color.Black.copy(alpha = 0.6f))
                    .border(1.5.dp, glowColor, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.PlayArrow,
                    contentDescription = "Play Video",
                    tint = glowColor,
                    modifier = Modifier.size(30.dp)
                )
            }

            // Bottom Media Scrim with title
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.BottomCenter)
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.9f))
                        )
                    )
                    .padding(12.dp)
            ) {
                Text(
                    text = post.title,
                    color = VetoTextWhite,
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
            }
        }

        // Argument Summary / Thesis
        Text(
            text = post.summary,
            color = VetoTextLightGray,
            fontSize = 13.sp,
            lineHeight = 18.sp
        )

        // Stance Counters: "+ [Pro Count]" in Green, "- [Con Count]" in Red
        StanceCounters(
            proCount = post.proCount,
            conCount = post.conCount,
            userStance = post.userStance,
            onProClick = onProClick,
            onConClick = onConClick
        )

        // Bottom Action Bar: Comments trigger & Share
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .clickable(onClick = onCommentClick)
                    .padding(vertical = 4.dp, horizontal = 6.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.ChatBubbleOutline,
                    contentDescription = "Audience Discussion",
                    tint = VetoTextLightGray,
                    modifier = Modifier.size(16.dp)
                )
                Text(
                    text = "${post.comments.size} Replies",
                    color = VetoTextLightGray,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium
                )
            }

            Row(
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .clickable { /* Share handler */ }
                    .padding(vertical = 4.dp, horizontal = 6.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Share,
                    contentDescription = "Share VETO",
                    tint = VetoTextLightGray,
                    modifier = Modifier.size(16.dp)
                )
                Text(
                    text = "Share",
                    color = VetoTextLightGray,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium
                )
            }
        }
    }
}
