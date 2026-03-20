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
      label: "R.E.P.O. vs Lethal Company",
      href: "/features/repo-vs-lethal-company/",
      description: "Use this when the group is stuck between the two closest overlap picks."
    },
    {
      label: "Games like R.E.P.O. but less scary",
      href: "/features/repo-less-scary-alternatives/",
      description: "A cleaner route when the chaos is welcome but the fear needs to come down."
    },
    {
      label: "Best proximity chat horror games",
      href: "/best/proximity-chat-horror-games/",
      description: "Open this when the voice mechanic matters more than any single game title."
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
      label: "Games like R.E.P.O. but less scary",
      href: "/features/repo-less-scary-alternatives/",
      description: "A faster route for groups that want funny co-op mistakes without the same dread curve."
    },
    {
      label: "Best proximity chat horror games",
      href: "/best/proximity-chat-horror-games/",
      description: "Open the voice-first shortlist when your group mainly cares about callouts, separation, and panic."
    },
    {
      label: "Best Cheap Co-Op Horror Games Under $10",
      href: "/best/cheap-coop-horror-games-under-10/",
      description: "The budget route when price is the first filter and the group still wants strong co-op stories."
    }
  ],
  browseByVibe: [
    { label: "Funny", href: "/best/chaotic-coop-games/" },
    { label: "Scary", href: "/best/physics-based-coop-horror-games/" },
    { label: "Cheap", href: "/best/cheap-coop-horror-games-under-10/" },
    { label: "4-player", href: "/best/chaotic-coop-games/" },
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
      label: "What Is Friendslop?",
      href: "/explained/what-is-friendslop/",
      description: "The glossary route when the term is new but the energy of the games already makes sense."
    },
    {
      label: "Best Physics-Based Co-Op Horror Games",
      href: "/best/physics-based-coop-horror-games/",
      description: "A sharper branch for readers who specifically want object chaos, bad handling, and public mistakes."
    }
  ]
};
