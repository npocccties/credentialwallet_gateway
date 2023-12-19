import { pagePath } from ".";

import { NavItemProps } from "@/types/Sidebar";

// TODO: ヘルプリンクの遷移先は未定
export const sidebarItems: Array<NavItemProps> = [
  { name: "バッジ一覧", link: "/" },
  { name: "バッジインポート", link: pagePath.badge.import },
  {
    name: "分析",
    link: process.env.NEXT_PUBLIC_E_PORTFOLIO_URL,
    external: true,
    newWindow: true,
    targetTabName: "portfolio",
  },
  { name: "ヘルプ", link: process.env.NEXT_PUBLIC_HELP_LINK, external: true, newWindow: true, targetTabName: "help" },
];
