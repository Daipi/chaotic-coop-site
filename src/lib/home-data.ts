import type { HomePageProps } from "../types/page-props";

export const homePageDraft: HomePageProps = {
  hero: {
    eyebrow: "Next Co-Op Pick",
    title: "Find the next co-op game before the group tabs out.",
    description:
      "Start from the game you just finished, the tone you want tonight, or the tie-breaker your group is arguing about.",
    signals: ["after R.E.P.O.", "less scary pivots", "voice-chat horror"],
    supportNote:
      "Built for the moment when someone says 'something like this' and nobody agrees on the next install.",
    primaryCta: {
      label: "Start with R.E.P.O.-like games",
      href: "/games-like/repo/"
    },
    secondaryCta: {
      label: "Compare R.E.P.O. vs Lethal Company",
      href: "/features/repo-vs-lethal-company/"
    }
  },
  shortcuts: [
    {
      label: "Games like R.E.P.O.",
      href: "/games-like/repo/",
      description: "Start here if the group wants more panic, physics mistakes, and funny failures."
    },
    {
      label: "Games like Lethal Company",
      href: "/games-like/lethal-company/",
      description: "Best when voice tension, salvage pressure, and small-group fear are the draw."
    },
    {
      label: "Games like Content Warning",
      href: "/games-like/content-warning/",
      description: "The best branch when the group wants lighter horror, shareable runs, and social chaos."
    },
    {
      label: "Games like Phasmophobia",
      href: "/games-like/phasmophobia/",
      description: "Best when the group wants voice-led horror, ghost-hunt tension, and a longer replay runway."
    }
  ],
  topPicks: [
    {
      label: "Games like R.E.P.O.",
      href: "/games-like/repo/",
      description: "The clearest first click if your group wants the closest overall follow-up to R.E.P.O."
    },
    {
      label: "R.E.P.O. vs Lethal Company",
      href: "/features/repo-vs-lethal-company/",
      description: "Use the tie-breaker page when the choice is between visible chaos and comms-driven tension."
    },
    {
      label: "Games like Lethal Company",
      href: "/games-like/lethal-company/",
      description: "Best for groups chasing proximity-chat fear, salvage pressure, and short horror runs."
    },
    {
      label: "Games like Content Warning",
      href: "/games-like/content-warning/",
      description: "The cleanest route for groups that want camera-loop comedy, lighter horror, and easy yeses."
    },
    {
      label: "Games like Phasmophobia",
      href: "/games-like/phasmophobia/",
      description: "The strongest title-led route for players who want proximity voice, dread, and longer-term co-op mastery."
    },
    {
      label: "Best Cheap Co-Op Horror Games Under $10",
      href: "/best/cheap-coop-horror-games-under-10/",
      description: "The budget route when price is the first filter and the group still wants strong co-op stories."
    },
    {
      label: "Best Co-Op Horror Games for 4 Players",
      href: "/best/co-op-horror-games-for-4-players/",
      description: "Use this route when exactly four people are ready and the group wants the cleanest fit for tonight."
    }
  ],
  browseByVibe: [
    { label: "Funny", href: "/best/chaotic-coop-games/" },
    { label: "Scary", href: "/best/physics-based-coop-horror-games/" },
    { label: "Cheap", href: "/best/cheap-coop-horror-games-under-10/" },
    { label: "2-player", href: "/best/co-op-horror-games-for-2-players/" },
    { label: "4-player", href: "/best/co-op-horror-games-for-4-players/" },
    { label: "Beginner-friendly", href: "/best/co-op-horror-games-for-beginners/" },
    { label: "Physics", href: "/best/physics-based-coop-horror-games/" },
    { label: "Proximity chat", href: "/best/proximity-chat-horror-games/" }
  ],
  explainers: [
    { label: "What is friendslop?", href: "/explained/what-is-friendslop/" },
    {
      label: "What makes a physics co-op horror game?",
      href: "/explained/what-makes-a-physics-coop-horror-game/"
    }
  ],
  comparisons: [
    {
      label: "R.E.P.O. vs Lethal Company",
      href: "/features/repo-vs-lethal-company/",
      description:
        "Best first tie-breaker when the group is choosing between physics spectacle and comms-driven salvage tension."
    },
    {
      label: "R.E.P.O. vs Content Warning",
      href: "/features/repo-vs-content-warning/",
      description:
        "Use this when the group is split between louder pressure-chaos and lighter social-comedy energy."
    },
    {
      label: "Content Warning vs Lethal Company",
      href: "/features/content-warning-vs-lethal-company/",
      description:
        "A high-intent route when the choice is lighter social chaos versus a cleaner horror loop."
    },
    {
      label: "Phasmophobia vs Lethal Company",
      href: "/features/phasmophobia-vs-lethal-company/",
      description:
        "The clearest split between deeper ghost-hunt systems and faster first-night comms pressure."
    },
    {
      label: "R.E.P.O. vs PANICORE",
      href: "/features/repo-vs-panicore/",
      description:
        "Use this when the group is choosing between visible spectacle and shorter, harsher fear."
    },
    {
      label: "R.E.P.O. vs Phasmophobia",
      href: "/features/repo-vs-phasmophobia/",
      description:
        "Best when the decision is quick physics chaos versus deeper long-term mastery."
    },
    {
      label: "PANICORE vs Lethal Company",
      href: "/features/panicore-vs-lethal-company/",
      description:
        "Use this when the group wants to choose between stealth-heavy fear and the cleaner default buy."
    },
    {
      label: "Phasmophobia vs PANICORE",
      href: "/features/phasmophobia-vs-panicore/",
      description:
        "Best when the question is longer investigation depth versus shorter pressure spikes."
    },
    {
      label: "Phasmophobia vs Content Warning",
      href: "/features/phasmophobia-vs-content-warning/",
      description:
        "Use this when the group is split between a hobby horror game and an easier mixed-group night."
    },
    {
      label: "PANICORE vs Content Warning",
      href: "/features/panicore-vs-content-warning/",
      description:
        "Best for groups deciding between sharper fear and lighter social-chaos momentum."
    }
  ],
  fresh: [
    {
      label: "Content Warning vs Lethal Company",
      href: "/features/content-warning-vs-lethal-company/",
      description:
        "The fastest route when the group is split between easy laughter and a clearer horror loop."
    },
    {
      label: "Phasmophobia vs Lethal Company",
      href: "/features/phasmophobia-vs-lethal-company/",
      description:
        "Use this when the decision is deeper ghost-hunt mastery versus faster comms-driven tension."
    },
    {
      label: "R.E.P.O. vs Content Warning",
      href: "/features/repo-vs-content-warning/",
      description:
        "A strong next click when the group is choosing between louder physics panic and softer social-chaos comedy."
    }
  ]
};
