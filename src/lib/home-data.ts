import type { HomePageProps } from "../types/page-props";

export const homePageDraft: HomePageProps = {
  hero: {
    eyebrow: "Chaotic Co-Op Finder",
    title: "Find chaotic co-op games worth your next game night.",
    description:
      "Start with R.E.P.O.-like games, proximity chat horror, and physics-heavy co-op picks that create panic and funny fails.",
    primaryCta: {
      label: "Start with R.E.P.O.-like games",
      href: "/games-like/repo/"
    },
    secondaryCta: {
      label: "What is friendslop?",
      href: "/explained/what-is-friendslop/"
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

