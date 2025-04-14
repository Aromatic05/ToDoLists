// 卡片数据服务

// 卡片数据
const cardsData = {
  home: [
    { id: 1, title: "今日概览", content: "查看您今天的摘要信息和重要提醒", tags: ["今日", "概览"] },
    { id: 2, title: "任务清单", content: "您有 3 个待办任务需要完成", tags: ["任务", "待办"] },
    { id: 3, title: "日历", content: "下次会议：今天下午 3:00", tags: ["日历", "会议"] },
    { id: 4, title: "最近笔记", content: "查看您最近编辑的文档和笔记", tags: ["笔记", "文档"] },
    { id: 5, title: "天气预报", content: "今天：晴朗，22°C", tags: ["天气", "预报"] },
    { id: 6, title: "热门新闻", content: "关注今日热点事件和要闻", tags: ["新闻", "热点"] },
  ],
  discover: [
    { id: 1, title: "推荐应用", content: "基于您的兴趣为您推荐的热门应用", tags: ["应用", "推荐"] },
    { id: 2, title: "流行趋势", content: "发现当下流行的技术和设计趋势", tags: ["趋势", "技术"] },
    { id: 3, title: "精选文章", content: "本周精选的高质量阅读内容", tags: ["文章", "阅读"] },
    { id: 4, title: "新功能介绍", content: "了解平台最新推出的功能和更新", tags: ["功能", "更新"] },
    { id: 5, title: "开发者社区", content: "加入我们的开发者社区，分享您的见解", tags: ["社区", "开发"] },
    { id: 6, title: "设计资源", content: "探索高质量的设计资源和工具", tags: ["设计", "资源"] },
    { id: 7, title: "学习路径", content: "根据您的兴趣定制的学习计划", tags: ["学习", "成长"] },
    { id: 8, title: "活动日历", content: "即将举行的线上和线下活动", tags: ["活动", "日历"] }
  ],
  home_next: [
    { id: 7, title: "健康数据", content: "查看您的健康指标和活动统计", tags: ["健康", "数据"] },
    { id: 8, title: "财务概览", content: "本月支出和预算跟踪", tags: ["财务", "预算"] },
    { id: 9, title: "旅行计划", content: "您即将到来的旅行和行程安排", tags: ["旅行", "计划"] },
    { id: 10, title: "媒体推荐", content: "根据您的喜好推荐的音乐和影视作品", tags: ["媒体", "推荐"] },
    { id: 11, title: "学习进度", content: "您正在学习的课程和进度更新", tags: ["学习", "进度"] },
    { id: 12, title: "提醒事项", content: "重要的提醒和即将到来的事件", tags: ["提醒", "事件"] }
  ],
  discover_next: [
    { id: 9, title: "创意工作坊", content: "参与互动创意活动和挑战", tags: ["创意", "工作坊"] },
    { id: 10, title: "新兴科技", content: "了解最前沿的科技发展和创新", tags: ["科技", "创新"] },
    { id: 11, title: "专家访谈", content: "各领域专家分享的独到见解", tags: ["访谈", "专家"] },
    { id: 12, title: "案例研究", content: "深入分析成功项目背后的故事", tags: ["案例", "研究"] },
    { id: 13, title: "社区贡献", content: "查看社区成员的杰出贡献", tags: ["社区", "贡献"] },
    { id: 14, title: "合作机会", content: "寻找项目合作伙伴和机会", tags: ["合作", "机会"] }
  ],
  profile: [
    { id: 1, title: "个人资料", content: "更新您的个人信息和联系方式", tags: ["个人", "资料"] },
    { id: 2, title: "活动记录", content: "查看您的最近活动和操作历史", tags: ["活动", "历史"] },
    { id: 3, title: "安全设置", content: "管理账号安全和隐私选项", tags: ["安全", "隐私"] },
    { id: 4, title: "个人偏好", content: "自定义您的使用体验和界面设置", tags: ["偏好", "设置"] },
    { id: 5, title: "统计数据", content: "您的使用情况和数据分析", tags: ["统计", "分析"] }
  ],
  favorites: [
    { id: 1, title: "收藏内容", content: "您最近收藏的文章和资源", tags: ["收藏", "内容"] },
    { id: 2, title: "收藏项目", content: "您参与或关注的项目", tags: ["项目", "关注"] },
    { id: 3, title: "收藏文档", content: "您标记为重要的文档和参考资料", tags: ["文档", "参考"] },
    { id: 4, title: "媒体库", content: "您收集的图片、音频和视频", tags: ["媒体", "收集"] },
    { id: 5, title: "收藏音乐", content: "您喜爱的音乐和播放列表", tags: ["音乐", "播放列表"] },
    { id: 6, title: "收藏视频", content: "您最近观看和收藏的视频", tags: ["视频", "收藏"] }
  ],
  settings: [
    { id: 1, title: "外观设置", content: "更改主题、颜色和布局", tags: ["外观", "主题"] },
    { id: 2, title: "通知管理", content: "控制接收的通知类型和频率", tags: ["通知", "提醒"] },
    { id: 3, title: "隐私控制", content: "管理数据共享和访问权限", tags: ["隐私", "权限"] },
    { id: 4, title: "帮助中心", content: "获取支持和查看常见问题解答", tags: ["帮助", "支持"] },
    { id: 5, title: "账号设置", content: "管理您的账号和订阅信息", tags: ["账号", "订阅"] }
  ]
};

// 获取下一组卡片的标题配置
const nextSetTitles = {
  home: "探索更多",
  discover: "精选内容",
  profile: "更多信息",
  favorites: "更多收藏",
  settings: "高级设置"
};

/**
 * 获取指定视图的所有卡片
 * @param {string} viewId - 视图ID
 * @returns {Array} - 卡片数组
 */
export function getCardsForView(viewId) {
  return cardsData[viewId] || [];
}

/**
 * 获取指定视图的下一组卡片
 * @param {string} viewId - 视图ID
 * @returns {Array} - 卡片数组
 */
export function getNextCardsForView(viewId) {
  const nextSetKey = `${viewId}_next`;
  return cardsData[nextSetKey] || [];
}

/**
 * 获取指定视图的下一组卡片的标题
 * @param {string} viewId - 视图ID
 * @returns {string} - 标题
 */
export function getNextSetTitle(viewId) {
  return nextSetTitles[viewId] || "更多内容";
}

export default {
  getCardsForView,
  getNextCardsForView,
  getNextSetTitle
};