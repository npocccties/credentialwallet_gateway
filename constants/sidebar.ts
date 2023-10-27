import { pagePath } from ".";

export const sidebarItems: Array<{ name: string; link?: string; external?: boolean }> = [
  { name: "バッジ一覧", link: "/" },
  { name: "バッジインポート", link: pagePath.badge.import },
  { name: "分析", link: process.env.NEXT_PUBLIC_E_PORTFOLIO_URL, external: true },
];
