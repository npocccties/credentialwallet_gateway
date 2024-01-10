import { NavItemProps } from "@/types/Sidebar";

// TODO: ヘルプリンクの遷移先は未定
export const sidebarItems: Array<NavItemProps> = [
  { name: "マイウォレット", link: "/" },
  {
    name: "分析",
    link: process.env.NEXT_PUBLIC_E_PORTFOLIO_LINK,
    external: true,
  },
  {
    name: "ヘルプ",
    link: process.env.NEXT_PUBLIC_HELP_LINK,
    external: true,
    newWindow: true,
    targetTabName: "help",
  },
];
