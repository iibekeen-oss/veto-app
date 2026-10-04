package com.veto.app.data

import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.postgrest.postgrest
import io.github.jan.supabase.storage.Storage
import io.github.jan.supabase.storage.storage
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
 * Project URL: https://dieldnvdgqoywloczad.supabase.co
 * Connected to Real-time stance counters: pro_count and con_count
 * Storage Bucket: rebuttals
 */
object SupabaseConfig {
    const val SUPABASE_URL = "https://dieldnvdgqoywloczad.supabase.co"
    // Publishable / Anon key (matches DEFAULT_SUPABASE_ANON_KEY in the web client)
    var supabaseKey = "sb_publishable_QLbsGQdXLVZutx_vcSieJg_05ec6"

    val client: SupabaseClient by lazy {
        createSupabaseClient(
            supabaseUrl = SUPABASE_URL,
            supabaseKey = supabaseKey
        ) {
            install(Postgrest)
            install(Realtime)
            install(Storage)
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

@Serializable
data class RebuttalEntity(
    val id: String? = null,
    val title: String,
    val content: String,
    val category: String,
    val veto_level: Int = 3,
    val is_opposition: Boolean = true,
    val video_url: String? = null,
    val pro_count: Long = 1,
    val con_count: Long = 0,
    val created_at: String? = null
)

/**
 * Supabase Repository for Realtime Pro/Con Voting & Rebuttal Submission
 */
class VetoStanceRepository(private val client: SupabaseClient = SupabaseConfig.client) {

    /**
     * Insert a new Rebuttal record into Supabase:
     * - title: Rebuttal Headline text
     * - content: Kinetic Thesis text
     * - category: Selected category (BIOMECHANICS)
     * - veto_level: 3
     * - is_opposition: true
     */
    suspend fun insertRebuttal(
        title: String,
        content: String,
        category: String = "BIOMECHANICS",
        vetoLevel: Int = 3,
        isOpposition: Boolean = true,
        videoBytes: ByteArray? = null,
        fileName: String? = null
    ): Result<RebuttalEntity> {
        return try {
            var uploadedVideoUrl: String? = null

            // 1. Upload video to Supabase Storage bucket 'rebuttals' if provided
            if (videoBytes != null && fileName != null) {
                val bucket = client.storage.from("rebuttals")
                val path = "videos/$fileName"
                bucket.upload(path, videoBytes)
                uploadedVideoUrl = bucket.publicUrl(path)
            }

            val entity = RebuttalEntity(
                title = title,
                content = content,
                category = category,
                veto_level = vetoLevel,
                is_opposition = isOpposition,
                video_url = uploadedVideoUrl,
                pro_count = 1,
                con_count = 0
            )

            // 2. Insert into 'debates' or 'veto_posts'
            try {
                client.postgrest["debates"].insert(entity)
            } catch (e: Exception) {
                client.postgrest["veto_posts"].insert(entity)
            }

            Result.success(entity)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    /**
     * Increment the PRO (+) stance count in Supabase
     */
    suspend fun incrementProCount(postId: String, currentProCount: Long): Result<Long> {
        return try {
            val newCount = currentProCount + 1
            client.postgrest["veto_posts"].update(
                mapOf("pro_count" to newCount)
            ) {
                filter {
                    eq("id", postId)
                }
            }
            Result.success(newCount)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    /**
     * Increment the CON (-) stance count in Supabase
     */
    suspend fun incrementConCount(postId: String, currentConCount: Long): Result<Long> {
        return try {
            val newCount = currentConCount + 1
            client.postgrest["veto_posts"].update(
                mapOf("con_count" to newCount)
            ) {
                filter {
                    eq("id", postId)
                }
            }
            Result.success(newCount)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    /**
     * Subscribe to Realtime postgres changes for pro_count and con_count
     */
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
}
