export interface NavItem {
  label: string;
  href: string;
}

export interface FriendLink {
  title: string;
  url: string;
  description: string;
}

export const SITE = {
  name: '闪电猫',
  englishName: 'SpeedCAT',
  title: '闪电猫 SpeedCAT 套餐价格与使用教程｜iflashcat.mom',
  description:
    '了解闪电猫 SpeedCAT 公开参考套餐价格、流量及付款周期，查看 Windows、ClashParty、Android、iOS 客户端教程与节点连接问题指南。',
  domain: 'https://iflashcat.mom',
  url: 'https://iflashcat.mom',
  heroTitle: '闪电猫 SpeedCAT｜套餐价格与节点使用指南',
  heroSubtitle:
    '查看闪电猫公开参考套餐、流量和付款周期，了解客户端订阅导入、节点使用及常见连接问题。',
  keywords: [
    '闪电猫',
    'SpeedCAT',
    '闪电猫套餐',
    '闪电猫价格',
    '闪电猫节点',
    '闪电猫订阅',
    '闪电猫使用教程',
    '闪电猫 Clash',
    '闪电猫 ClashParty',
    '闪电猫客户端',
    '闪电猫购买指南',
    '闪电猫常见问题',
  ],
};

export const NAV_LINKS: NavItem[] = [
  { label: '首页', href: '/' },
  { label: '套餐价格', href: '/pricing/' },
  { label: '使用教程', href: '/guides/' },
  { label: '常见问题', href: '/faq/' },
];

export const FRIEND_LINKS: FriendLink[] = [
  {
    title: '机场测评',
    url: 'https://jichangreview.net',
    description: '专业网络服务评测与稳定性分析参考',
  },
  {
    title: '机场教程',
    url: 'https://jichangguide.net',
    description: '客户端配置与网络工具使用指南',
  },
];
