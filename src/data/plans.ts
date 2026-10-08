export interface RegularPlanCycle {
  cycle: 'monthly' | 'quarterly' | 'halfYearly' | 'yearly';
  cycleName: string;
  price: number;
  periodText: string;
}

export interface PlanItem {
  id: string;
  name: string;
  category: 'regular' | 'annual';
  monthlyTraffic?: string;
  annualTraffic?: string;
  trafficRule: string;
  description: string;
  prices: RegularPlanCycle[];
  statusNotice?: string;
  tag?: string;
}

export const AFF_LINK = 'https://varnexa.lingdongaff.com/#/?code=HHoxxHGa';
export const AFF_REL = 'sponsored nofollow noopener';
export const AFF_TARGET = '_blank';
export const AFF_BUTTON_TEXT = '前往指定订阅平台';

export const PRICE_DISCLAIMER =
  '本页面展示的是 SpeedCAT 公开资料中的参考套餐，并不代表当前全部在售。实际价格、流量、服务权益以及是否可通过指定推广平台购买，请以最终购买页面为准。指定推广入口与 SpeedCAT 套餐的销售关系尚待核实。';

export const FOOTER_DISCLAIMER =
  '本站为闪电猫 SpeedCAT 套餐资料与使用指南页面，包含指定合作推广入口。公开参考价格及服务权益可能发生调整，购买前请以实际提供方公布的信息为准。';

// 4 种常规套餐（每种 4 个付款周期 = 16 个价格选项）
export const REGULAR_PLANS: PlanItem[] = [
  {
    id: 'mini-cat',
    name: '迷你猫',
    category: 'regular',
    monthlyTraffic: '100GB/月',
    trafficRule: '每月 100GB，按月自动重置',
    description: '轻度日常浏览、即时通讯及学术查阅用户的高性价比入门选择。',
    tag: '轻量入门',
    prices: [
      { cycle: 'monthly', cycleName: '月付', price: 20, periodText: '¥20 / 月' },
      { cycle: 'quarterly', cycleName: '季付', price: 57, periodText: '¥57 / 季' },
      { cycle: 'halfYearly', cycleName: '半年付', price: 108, periodText: '¥108 / 半年' },
      { cycle: 'yearly', cycleName: '年付', price: 192, periodText: '¥192 / 年' },
    ],
  },
  {
    id: 'speed-cat',
    name: '闪电猫',
    category: 'regular',
    monthlyTraffic: '200GB/月',
    trafficRule: '每月 200GB，按月自动重置',
    description: '品牌主力套餐，适合主流高清视频、多设备工作与日常频繁访问。',
    tag: '主力推荐',
    prices: [
      { cycle: 'monthly', cycleName: '月付', price: 40, periodText: '¥40 / 月' },
      { cycle: 'quarterly', cycleName: '季付', price: 114, periodText: '¥114 / 季' },
      { cycle: 'halfYearly', cycleName: '半年付', price: 216, periodText: '¥216 / 半年' },
      { cycle: 'yearly', cycleName: '年付', price: 384, periodText: '¥384 / 年' },
    ],
  },
  {
    id: 'thunder-cat',
    name: '霹雳猫',
    category: 'regular',
    monthlyTraffic: '500GB/月',
    trafficRule: '每月 500GB，按月自动重置',
    description: '中重度大流量用户优选，支持高频次 4K 流媒体播放与大文件下载需求。',
    tag: '充沛大额',
    prices: [
      { cycle: 'monthly', cycleName: '月付', price: 100, periodText: '¥100 / 月' },
      { cycle: 'quarterly', cycleName: '季付', price: 285, periodText: '¥285 / 季' },
      { cycle: 'halfYearly', cycleName: '半年付', price: 540, periodText: '¥540 / 半年' },
      { cycle: 'yearly', cycleName: '年付', price: 960, periodText: '¥960 / 年' },
    ],
  },
  {
    id: 'thor-cat',
    name: '雷神猫',
    category: 'regular',
    monthlyTraffic: '1000GB/月',
    trafficRule: '每月 1000GB (1TB)，按月自动重置',
    description: '顶配海量流量档位，适合工作室团队协作、跨国媒体制作与超大规模数据传输。',
    tag: '海量极速',
    prices: [
      { cycle: 'monthly', cycleName: '月付', price: 200, periodText: '¥200 / 月' },
      { cycle: 'quarterly', cycleName: '季付', price: 570, periodText: '¥570 / 季' },
      { cycle: 'halfYearly', cycleName: '半年付', price: 1080, periodText: '¥1080 / 半年' },
      { cycle: 'yearly', cycleName: '年付', price: 1920, periodText: '¥1920 / 年' },
    ],
  },
];

// 3 种年付专属套餐（每种 1 个付款周期 = 3 个价格选项）
export const ANNUAL_PLANS: PlanItem[] = [
  {
    id: 'special-annual',
    name: '特惠年付小包',
    category: 'annual',
    annualTraffic: '50GB / 每30天',
    trafficRule: '每 30 天周期分配 50GB，非一次性到账',
    description: '公开参考档位，适合极轻量备用用户。当前是否在售请以购买平台页面为准。',
    tag: '特惠备用',
    statusNotice: '是否仍在售以购买平台为准',
    prices: [
      { cycle: 'yearly', cycleName: '年付', price: 98, periodText: '¥98 / 年' },
    ],
  },
  {
    id: 'meteor-cat',
    name: '流星猫',
    category: 'annual',
    annualTraffic: '全年总流量 600GB',
    trafficRule: '全年总流量 600GB，总流量不按月重置，有效期内自由支配',
    description: '长期低频或用量波动用户优选，无每月用不完清零的顾虑。',
    tag: '年付灵动',
    prices: [
      { cycle: 'yearly', cycleName: '年付', price: 260, periodText: '¥260 / 年' },
    ],
  },
  {
    id: 'flying-cat',
    name: '飞天猫',
    category: 'annual',
    annualTraffic: '全年总流量 5000GB (5TB)',
    trafficRule: '全年总流量 5000GB，总流量不按月重置，大额度灵活按需分配',
    description: '适合整年高流量、但各月份使用并不均匀的企业或进阶创作者。',
    tag: '年度旗舰',
    prices: [
      { cycle: 'yearly', cycleName: '年付', price: 1800, periodText: '¥1800 / 年' },
    ],
  },
];

// 合计 7 种套餐，19 个价格选项
export const ALL_PLANS: PlanItem[] = [...REGULAR_PLANS, ...ANNUAL_PLANS];
