export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
  relatedLink?: {
    text: string;
    href: string;
  };
}

export const FAQ_LIST: FaqItem[] = [
  {
    question: '1. 闪电猫 SpeedCAT 有哪些参考套餐？',
    answer:
      '根据公开资料记录，SpeedCAT 参考套餐分为两大类：常规按月重置套餐与年付专属套餐。常规套餐包含迷你猫（100GB/月）、闪电猫（200GB/月）、霹雳猫（500GB/月）以及雷神猫（1000GB/月）；年付专属套餐包含特惠年付小包（50GB/每30天，售卖状态待核实）、流星猫（全年总流量 600GB 不按月清零）和飞天猫（全年总流量 5000GB 不按月清零）。全网共有 7 种公开套餐配置。',
    relatedLink: {
      text: '查看完整套餐详情',
      href: '/pricing/',
    },
  },
  {
    question: '2. 闪电猫最低月付参考价格是多少？',
    answer:
      '在四种常规套餐中，按月计费的最低公开参考价为「迷你猫」的 ¥20/月，提供每月 100GB 流量。如果按年付折算，特惠年付小包的公开参考价格为 ¥98/年（约合 ¥8.17/月），但该档位属于历史特惠档，当前是否处于可售状态请以实际购买页面为准。',
    relatedLink: {
      text: '套餐价格与选购攻略',
      href: '/guides/speedcat-plans/',
    },
  },
  {
    question: '3. 迷你猫和闪电猫套餐有什么区别？',
    answer:
      '两者的主要区别在于每月流量额度与价格层级：迷你猫月费参考价为 ¥20，每月提供 100GB 流量，适合日常社交聊天、网页查阅及少量视频播放的新手；闪电猫是品牌核心主力款，月费参考价为 ¥40，每月提供 200GB 流量，适合经常观看 1080P/4K 高清流媒体、跨国远程办公与日常高频使用的用户。两者流量均按月重置。',
    relatedLink: {
      text: '流量计算与需求分析',
      href: '/guides/speedcat-data/',
    },
  },
  {
    question: '4. 流星猫的全年 600GB 如何计算？',
    answer:
      '流星猫为年付专属套餐，参考价格为 ¥260/年。其核心特色是「总流量不按月重置」：在为期 365 天的服务周期内，系统一次性给予 600GB 流量，用户可以按需自由支配。例如某个用量高峰月消耗 120GB，而在用量低谷月仅消耗 10GB，剩余流量均会保留至下月继续使用，直至 1 年到期或 600GB 消耗完毕。',
    relatedLink: {
      text: '月度与年度套餐详细对比',
      href: '/guides/speedcat-data/',
    },
  },
  {
    question: '5. 飞天猫的全年流量是否每月重置？',
    answer:
      '不每月重置。飞天猫同样属于年付专属套餐，参考价格为 ¥1800/年，提供全年总流量 5000GB（约 5TB）。这 5000GB 为整年统一资金池，在 1 年的订购有效期内随用随扣，不会在月末或月初强制归零，非常适合季度性大额传输、多终端共享或视频创作者使用。',
    relatedLink: {
      text: '六种套餐如何选择',
      href: '/guides/speedcat-plans/',
    },
  },
  {
    question: '6. 闪电猫订阅如何导入客户端？',
    answer:
      '导入通用步骤为：首先在订阅平台复制专属的订阅 URL 地址；随后打开所使用的代理客户端（如 Windows 上的 Clash Verge / NekoBox、ClashParty 或移动端客户端）；在客户端的「配置 / 订阅」界面粘贴该链接并点击「下载 / 保存」；客户端成功拉取节点列表后，切换代理模式为「规则（Rule）」并勾选可用节点即可启动代理。',
    relatedLink: {
      text: 'Windows 客户端配置指南',
      href: '/guides/speedcat-windows/',
    },
  },
  {
    question: '7. ClashParty 无法连接怎么办？',
    answer:
      '遇到 ClashParty 连接失败，建议按以下顺序排查：① 检查订阅配置是否更新成功，若节点列表为空则需重新拉取订阅；② 检查系统代理开关是否已在设置中开启；③ 核对系统时间是否精准同步，时间偏差超过 1 分钟会导致 TLS 握手失败；④ 切换不同地区的节点进行连通性测试；⑤ 检查本地防火墙或安全杀毒软件是否拦截了代理核心端口。',
    relatedLink: {
      text: 'ClashParty 订阅与节点切换教程',
      href: '/guides/speedcat-clashparty/',
    },
  },
  {
    question: '8. 节点延迟高如何处理？',
    answer:
      '节点延迟受本地宽带运营商、国际出口路由以及物理距离等多重因素影响。遇到延迟高时：① 首先分清「延迟（Ping/RTT）」与「带宽速度（Mbps）」的区别，延迟主要影响握手响应，而速度影响视频加载；② 在客户端内执行延迟测速，优先选择邻近地区（如香港、日本、新加坡）的低延迟节点；③ 避开晚高峰骨干网拥堵时段；④ 检查本地是否开启了全局模式导致所有国内流量绕路。',
    relatedLink: {
      text: '节点延迟与线路选择指南',
      href: '/guides/speedcat-nodes/',
    },
  },
  {
    question: '9. 月付和年付应该如何选择？',
    answer:
      '选择策略取决于用量稳定度和预算习惯：如果你是初次接触闪电猫，建议优先选择「迷你猫」或「闪电猫」的月付周期，实际体验网络稳定性后再作后续规划；如果确认网络符合预期且每月用量固定，选择常规套餐的年付周期能享受更低的平均成本；若你使用频率不固定、时多时少，则建议选择「流星猫」或「飞天猫」这种全年总流量不按月清零的年付专属套餐。',
    relatedLink: {
      text: '套餐价格与付款周期全解析',
      href: '/guides/speedcat-plans/',
    },
  },
  {
    question: '10. 为什么购买页面的实际价格可能不同？',
    answer:
      '本站所有套餐数据均整理自 SpeedCAT 的历史公开参考文档，并不属于实时同步的官方销售接口。指定推广入口与 SpeedCAT 之间具体的产品销售关系尚待核实。服务提供方可能会根据网络资源成本、限时活动、节点调整或汇率变动等因素更新套餐定价和在售类目，购买前请务必以最终结算页面展示的套餐规格与实际金额为准。',
    relatedLink: {
      text: '常见问题与连接排查',
      href: '/guides/speedcat-troubleshooting/',
    },
  },
  {
    question: '11. 手机端（Android 与 iOS）如何配置订阅？',
    answer:
      'Android 设备推荐使用主流通用代理工具（如 Clash Meta for Android、NekoBox），通过添加订阅链接直接导入并设置分流；iOS 设备则需通过非中国大陆 Apple ID 在 App Store 安装支持通用订阅协议的工具（如 Shadowrocket 等），扫描二维码或导入链接即可开启连接。移动端切换 Wi-Fi 与 5G/4G 时，建议检查路由策略是否依旧有效。',
    relatedLink: {
      text: '手机端使用教程（Android/iOS）',
      href: '/guides/speedcat-mobile/',
    },
  },
  {
    question: '12. 导入订阅时提示格式错误或更新失败怎么解决？',
    answer:
      '订阅更新失败通常由以下原因引起：① 复制链接时遗漏了参数或携带了多余空格；② 本地网络阻断了订阅服务器的域名解析，可临时切换移动热点重试；③ 订阅转换格式不兼容，部分较旧客户端无法直接解析现代通用订阅，需在客户端中选择兼容模式。若依然无法解析，可在排查指南中参考完整的排错清单。',
    relatedLink: {
      text: '订阅失败与无法连接排查指南',
      href: '/guides/speedcat-troubleshooting/',
    },
  },
];
