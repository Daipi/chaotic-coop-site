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
    { label: "4-player", href: "/best/co-op-horror-games-for-4-players/" },
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
    { label: "R.E.P.O. vs Lethal Company", href: "/features/repo-vs-lethal-company/" },
    {
      label: "Games like R.E.P.O. but less scary",
      href: "/features/repo-less-scary-alternatives/"
    }
  ],
  fresh: [
    {
      label: "Best Chaotic Co-Op Games",
      href: "/best/chaotic-coop-games/",
      description: "Use the broad shortlist when the group wants funny breakdowns more than a strict one-game match."
    },
    {
      label: "Best Co-Op Horror Games for 4 Players",
      href: "/best/co-op-horror-games-for-4-players/",
      description: "The buying route when exactly four people are ready and the group wants the shortest path to a fit."
    },
    {
      label: "Best Physics-Based Co-Op Horror Games",
      href: "/best/physics-based-coop-horror-games/",
      description: "A sharper branch for readers who specifically want object chaos, bad handling, and public mistakes."
    }
  ]
};
