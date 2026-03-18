import type { HomePageProps } from "../types/page-props";

export const homePageDraft: HomePageProps = {
  hero: {
    eyebrow: "Next Co-Op Pick",
    title: "Choose the next co-op game before game night stalls.",
    description:
      "Start with R.E.P.O.-like games, lighter alternatives, and recommendation paths that help your group decide what to boot next.",
    signals: ["next-game picks", "lighter alternatives", "voice-chaos filters"],
    supportNote:
      "Built for the moment when the group finishes one breakout hit and needs the clearest next pick.",
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
      description: "The first recommendation page for the highest-priority keyword."
    },
    {
      label: "Games like Lethal Company",
      href: "/games-like/lethal-company/",
      description: "A closely related intent with broader mainstream awareness."
    },
    {
      label: "Best chaotic co-op games",
      href: "/best/chaotic-coop-games/",
      description: "Evergreen list post that supports multiple internal links."
    },
    {
      label: "Best proximity chat horror games",
      href: "/best/proximity-chat-horror-games/",
      description: "A mechanics-first angle that can rank outside of the slang term."
    }
  ],
  topPicks: [
    { label: "Games like R.E.P.O.", href: "/games-like/repo/" },
    { label: "Games like Lethal Company", href: "/games-like/lethal-company/" },
    { label: "Best chaotic co-op games", href: "/best/chaotic-coop-games/" },
    {
      label: "Best physics-based co-op horror games",
      href: "/best/physics-based-coop-horror-games/"
    },
    {
      label: "Best proximity chat horror games",
      href: "/best/proximity-chat-horror-games/"
    },
    {
      label: "R.E.P.O. vs Lethal Company",
      href: "/features/repo-vs-lethal-company/"
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
    { label: "Games like R.E.P.O.", href: "/games-like/repo/" },
    { label: "What is friendslop?", href: "/explained/what-is-friendslop/" },
    { label: "Best chaotic co-op games", href: "/best/chaotic-coop-games/" }
  ]
};
