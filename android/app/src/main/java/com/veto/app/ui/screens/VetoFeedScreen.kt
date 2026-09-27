package com.veto.app.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.FitnessCenter
import androidx.compose.material.icons.filled.Whatshot
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.veto.app.data.MockData
import com.veto.app.data.Stance
import com.veto.app.data.VetoComment
import com.veto.app.data.VetoPost
import com.veto.app.data.VetoStanceRepository
import com.veto.app.ui.components.GlowCommentInput
import com.veto.app.ui.components.VetoCommentItem
import com.veto.app.ui.components.VetoInterceptorDesign
import com.veto.app.ui.components.VetoVerticalLaunchIcon
import com.veto.app.ui.components.VetoStopHandCardLogo
import com.veto.app.ui.components.VetoPostCard
import com.veto.app.ui.theme.*
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VetoFeedScreen(
    modifier: Modifier = Modifier
) {
    var posts by remember { mutableStateOf(MockData.samplePosts) }
    var activeFilter by remember { mutableStateOf("ALL") }
    var activeCommentPostId by remember { mutableStateOf<String?>(null) }
    val coroutineScope = rememberCoroutineScope()
    val stanceRepository = remember { VetoStanceRepository() }

    val activeCommentPost = posts.find { it.id == activeCommentPostId }

    val filteredPosts = when (activeFilter) {
        "VETO_0" -> posts.filter { it.round == 0 }
        "REBUTTALS" -> posts.filter { it.round > 0 }
        else -> posts
    }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(VetoDarkBackground)
    ) {
        Scaffold(
            containerColor = VetoDarkBackground,
            topBar = {
                // Top App Bar
                Surface(
                    color = VetoDarkBackground,
                    border = null,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 12.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                VetoStopHandCardLogo(size = 40.dp)
                                Text(
                                    text = "VETO",
                                    color = VetoTextWhite,
                                    fontSize = 20.sp,
                                    fontWeight = FontWeight.Black,
                                    fontFamily = FontFamily.Monospace,
                                    letterSpacing = 2.sp
                                )
                            }

                            // Active Debate Round Counter
                            Row(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(6.dp))
                                    .background(VetoDarkSurface)
                                    .border(1.dp, VetoBorderSubtle, RoundedCornerShape(6.dp))
                                    .padding(horizontal = 8.dp, vertical = 4.dp),
                                horizontalArrangement = Arrangement.spacedBy(4.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Whatshot,
                                    contentDescription = "Hot Debates",
                                    tint = VetoGlowingRed,
                                    modifier = Modifier.size(14.dp)
                                )
                                Text(
                                    text = "3 ACTIVE ROUNDS",
                                    color = VetoTextLightGray,
                                    fontSize = 10.sp,
                                    fontFamily = FontFamily.Monospace,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        // Filter Segmented Controls
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            FilterChip(
                                label = "ALL ROUNDS",
                                isSelected = activeFilter == "ALL",
                                onClick = { activeFilter = "ALL" }
                            )
                            FilterChip(
                                label = "VETO 0 (ORIGIN)",
                                isSelected = activeFilter == "VETO_0",
                                onClick = { activeFilter = "VETO_0" }
                            )
                            FilterChip(
                                label = "REBUTTALS",
                                isSelected = activeFilter == "REBUTTALS",
                                onClick = { activeFilter = "REBUTTALS" }
                            )
                        }
                    }
                }
            }
        ) { innerPadding ->
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(20.dp),
                contentPadding = PaddingValues(top = 8.dp, bottom = 90.dp)
            ) {
                items(filteredPosts, key = { it.id }) { post ->
                    VetoPostCard(
                        post = post,
                        onProClick = {
                            var targetCount = post.proCount.toLong()
                            posts = posts.map { current ->
                                if (current.id == post.id) {
                                    val wasPro = current.userStance == Stance.PRO
                                    val wasCon = current.userStance == Stance.CON
                                    val updatedPro = if (wasPro) current.proCount - 1 else current.proCount + 1
                                    targetCount = updatedPro.toLong()
                                    current.copy(
                                        userStance = if (wasPro) null else Stance.PRO,
                                        proCount = updatedPro,
                                        conCount = if (wasCon) current.conCount - 1 else current.conCount
                                    )
                                } else current
                            }
                            // Coroutine call triggering Supabase pro_count real-time update
                            coroutineScope.launch {
                                stanceRepository.incrementProCount(post.id, targetCount)
                            }
                        },
                        onConClick = {
                            var targetCount = post.conCount.toLong()
                            posts = posts.map { current ->
                                if (current.id == post.id) {
                                    val wasCon = current.userStance == Stance.CON
                                    val wasPro = current.userStance == Stance.PRO
                                    val updatedCon = if (wasCon) current.conCount - 1 else current.conCount + 1
                                    targetCount = updatedCon.toLong()
                                    current.copy(
                                        userStance = if (wasCon) null else Stance.CON,
                                        conCount = updatedCon,
                                        proCount = if (wasPro) current.proCount - 1 else current.proCount
                                    )
                                } else current
                            }
                            // Coroutine call triggering Supabase con_count real-time update
                            coroutineScope.launch {
                                stanceRepository.incrementConCount(post.id, targetCount)
                            }
                        },
                        onCommentClick = {
                            activeCommentPostId = post.id
                        }
                    )
                }
            }
        }

        // Audience Discussion Bottom Sheet / Drawer
        AnimatedVisibility(
            visible = activeCommentPost != null,
            enter = slideInVertically(initialOffsetY = { it }),
            exit = slideOutVertically(targetOffsetY = { it }),
            modifier = Modifier.align(Alignment.BottomCenter)
        ) {
            if (activeCommentPost != null) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .fillMaxHeight(0.78f)
                        .clip(RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp))
                        .background(VetoDarkSurface)
                        .border(
                            width = 1.dp,
                            color = VetoBorderSubtle,
                            shape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp)
                        )
                ) {
                    // Drawer Drag Handle & Header
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .width(36.dp)
                                .height(4.dp)
                                .clip(CircleShape)
                                .background(VetoTextMuted)
                                .align(Alignment.CenterHorizontally)
                        )

                        Spacer(modifier = Modifier.height(12.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(
                                    text = "AUDIENCE DEBATE ARENA",
                                    color = VetoTextWhite,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 1.sp
                                )
                                Text(
                                    text = "Post: ${activeCommentPost.title}",
                                    color = VetoTextMuted,
                                    fontSize = 11.sp,
                                    maxLines = 1
                                )
                            }

                            IconButton(
                                onClick = { activeCommentPostId = null },
                                modifier = Modifier.size(32.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Close,
                                    contentDescription = "Close",
                                    tint = VetoTextLightGray
                                )
                            }
                        }
                    }

                    // Comments List with Glowing Indicator Borders
                    LazyColumn(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp),
                        verticalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        items(activeCommentPost.comments) { comment ->
                            VetoCommentItem(comment = comment)
                        }
                    }

                    // Dynamic Glow Comment Input (at bottom of drawer)
                    GlowCommentInput(
                        onSendComment = { text, stance ->
                            val newComment = VetoComment(
                                id = "c_${System.currentTimeMillis()}",
                                author = "Current User",
                                handle = "@iron_disciple",
                                content = text,
                                stance = stance,
                                timestamp = "Just now"
                            )
                            posts = posts.map { post ->
                                if (post.id == activeCommentPost.id) {
                                    post.copy(comments = listOf(newComment) + post.comments)
                                } else post
                            }
                        }
                    )
                }
            }
        }
    }
}

@Composable
private fun FilterChip(
    label: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(6.dp))
            .background(if (isSelected) VetoNeonGreenSubtle else VetoDarkSurface)
            .border(
                width = 1.dp,
                color = if (isSelected) VetoNeonGreen else VetoBorderSubtle,
                shape = RoundedCornerShape(6.dp)
            )
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp, vertical = 6.dp)
    ) {
        Text(
            text = label,
            color = if (isSelected) VetoNeonGreen else VetoTextLightGray,
            fontSize = 11.sp,
            fontFamily = FontFamily.Monospace,
            fontWeight = FontWeight.Bold
        )
    }
}
