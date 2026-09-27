package com.veto.app.data

enum class Stance {
    PRO, // + (Support / Neon Green)
    CON  // - (Opposition / Glowing Red)
}

data class VetoComment(
    val id: String,
    val author: String,
    val handle: String,
    val content: String,
    val stance: Stance,
    val timestamp: String,
    val likes: Int = 0
)

data class VetoPost(
    val id: String,
    val round: Int, // 0 for Initial Thesis, 1+ for Rebuttals
    val creatorName: String,
    val handle: String,
    val title: String,
    val summary: String,
    val videoDuration: String,
    val category: String,
    val proCount: Int,
    val conCount: Int,
    val userStance: Stance? = null,
    val comments: List<VetoComment> = emptyList(),
    val debateTopic: String = "LIFTING STANDARDS & DOGMA"
) {
    val isOriginal: Boolean get() = round == 0
}

object MockData {
    val sampleComments = listOf(
        VetoComment(
            id = "c1",
            author = "Marcus Vance",
            handle = "@vance_power",
            content = "Mechanical tension is king. If you bounce off the chest you are deloading the pecs at the highest stretch point. Keep it paused.",
            stance = Stance.PRO,
            timestamp = "2m ago",
            likes = 42
        ),
        VetoComment(
            id = "c2",
            author = "Elena Rostova",
            handle = "@rostova_oly",
            content = "For dynamic power athletes, stretch-shortening cycle (SSC) training yields superior neural drive. Complete pause is dogmatic.",
            stance = Stance.CON,
            timestamp = "14m ago",
            likes = 89
        ),
        VetoComment(
            id = "c3",
            author = "Dr. Cole Davies",
            handle = "@biomech_cole",
            content = "The 2024 Schoenfeld meta-analysis confirms lengthened partials with loaded stretch stimulate greater titin stiffness.",
            stance = Stance.PRO,
            timestamp = "32m ago",
            likes = 127
        ),
        VetoComment(
            id = "c4",
            author = "Jaxson Kane",
            handle = "@kane_iron",
            content = "Tell that to powerlifters who blew their pectoralis major tendons using hyper-exaggerated arch. Safety over ego.",
            stance = Stance.CON,
            timestamp = "1h ago",
            likes = 31
        )
    )

    val samplePosts = listOf(
        VetoPost(
            id = "post-0",
            round = 0,
            creatorName = "Dante Wolfe",
            handle = "@wolfe_strength",
            title = "Touch & Go Bench Is A Waste Of Time",
            summary = "If you don't pause at least 1 full second on the sternum, you're training momentum, not myofibrillar hypertrophy. Stop cheating your chest.",
            videoDuration = "0:48",
            category = "HYPERTROPHY",
            proCount = 1420,
            conCount = 890,
            comments = sampleComments,
            debateTopic = "BENCH PRESS INTEGRITY"
        ),
        VetoPost(
            id = "post-1",
            round = 1,
            creatorName = "Tariq Owens",
            handle = "@owens_kinetics",
            title = "Rebuttal: Stretch-Shortening Cycle Builds Real Athleticism",
            summary = "Wolf is treating powerlifting federation rules as biological law. Explosive reversal maximizes elastic recoil and fast-twitch recruitment.",
            videoDuration = "0:56",
            category = "KINESIOLOGY",
            proCount = 930,
            conCount = 1680,
            comments = sampleComments.take(2),
            debateTopic = "BENCH PRESS INTEGRITY"
        ),
        VetoPost(
            id = "post-2",
            round = 2,
            creatorName = "Sarah Chen, CSCS",
            handle = "@chen_physio",
            title = "Counter: The Tendon Shear Ratio Under Max Load",
            summary = "Kinetic analysis reveals 43% higher subacromial impingement probability during uncontrolled bounce transitions at >85% 1RM.",
            videoDuration = "1:12",
            category = "SPORTS PHYSIO",
            proCount = 2150,
            conCount = 420,
            comments = sampleComments.takeLast(2),
            debateTopic = "BENCH PRESS INTEGRITY"
        )
    )
}
