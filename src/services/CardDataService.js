// 卡片数据服务

// 每页加载的卡片数量
const CARDS_PER_PAGE = 12;

// 卡片数据
const cardsData = {
  // home: [
  //   { id: 1, type: "base", title: "今日概览", content: "查看您今天的摘要信息和重要提醒", tags: ["今日", "概览"] },
  //   { id: 2, type: "base", title: "任务清单", content: "您有 3 个待办任务需要完成", tags: ["任务", "待办"] },
  //   { id: 3, type: "base", title: "日历", content: "下次会议：今天下午 3:00", tags: ["日历", "会议"] },
  //   { id: 4, type: "base", title: "最近笔记", content: "查看您最近编辑的文档和笔记", tags: ["笔记", "文档"] },
  //   { id: 5, type: "base", title: "天气预报", content: "今天：晴朗，22°C", tags: ["天气", "预报"] },
  //   { id: 6, type: "base", title: "热门新闻", content: "关注今日热点事件和要闻", tags: ["新闻", "热点"] },
  // ],
  discover: [
    { id: 1, type: "base", title: "推荐应用", content: "基于您的兴趣为您推荐的热门应用", tags: ["应用", "推荐"] },
    { id: 2, type: "base", title: "流行趋势", content: "发现当下流行的技术和设计趋势", tags: ["趋势", "技术"] },
    { id: 3, type: "base", title: "精选文章", content: "本周精选的高质量阅读内容", tags: ["文章", "阅读"] },
    { id: 4, type: "base", title: "新功能介绍", content: "了解平台最新推出的功能和更新", tags: ["功能", "更新"] },
    { id: 5, type: "base", title: "开发者社区", content: "加入我们的开发者社区，分享您的见解", tags: ["社区", "开发"] },
    { id: 6, type: "base", title: "设计资源", content: "探索高质量的设计资源和工具", tags: ["设计", "资源"] },
    { id: 7, type: "base", title: "学习路径", content: "根据您的兴趣定制的学习计划", tags: ["学习", "成长"] },
    { id: 8, type: "base", title: "活动日历", content: "即将举行的线上和线下活动", tags: ["活动", "日历"] },
  ],
  profile: [
    { id: 1, type: "base", title: "个人资料", content: "更新您的个人信息和联系方式", tags: ["个人", "资料"] },
    { id: 2, type: "base", title: "活动记录", content: "查看您的最近活动和操作历史", tags: ["活动", "历史"] },
    { id: 3, type: "base", title: "安全设置", content: "管理账号安全和隐私选项", tags: ["安全", "隐私"] },
    { id: 4, type: "base", title: "个人偏好", content: "自定义您的使用体验和界面设置", tags: ["偏好", "设置"] },
    { id: 5, type: "base", title: "统计数据", content: "您的使用情况和数据分析", tags: ["统计", "分析"] }
  ],
  favorites: [
    { id: 1, type: "base", title: "收藏内容", content: "您最近收藏的文章和资源", tags: ["收藏", "内容"] },
    { id: 2, type: "base", title: "收藏项目", content: "您参与或关注的项目", tags: ["项目", "关注"] },
    { id: 3, type: "base", title: "收藏文档", content: "您标记为重要的文档和参考资料", tags: ["文档", "参考"] },
    { id: 4, type: "base", title: "媒体库", content: "您收集的图片、音频和视频", tags: ["媒体", "收集"] },
    { id: 5, type: "base", title: "收藏音乐", content: "您喜爱的音乐和播放列表", tags: ["音乐", "播放列表"] },
    { id: 6, type: "base", title: "收藏视频", content: "您最近观看和收藏的视频", tags: ["视频", "收藏"] }
  ],
  settings: [
    { id: 1, type: "base", title: "外观设置", content: "更改主题、颜色和布局", tags: ["外观", "主题"] },
    { id: 2, type: "base", title: "通知管理", content: "控制接收的通知类型和频率", tags: ["通知", "提醒"] },
    { id: 3, type: "base", title: "隐私控制", content: "管理数据共享和访问权限", tags: ["隐私", "权限"] },
    { id: 4, type: "base", title: "帮助中心", content: "获取支持和查看常见问题解答", tags: ["帮助", "支持"] },
    { id: 5, type: "base", title: "账号设置", content: "管理您的账号和订阅信息", tags: ["账号", "订阅"] }
  ],
  // 添加测试数据
  "1": [
    { id: 1, type: "base", title: "首页概览", content: "欢迎来到首页，这里展示了您的主要信息", tags: ["首页", "概览"] },
    { id: 2, type: "base", title: "今日任务", content: "您今天有 5 个待办事项需要完成", tags: ["任务", "待办"] },
    { id: 3, type: "base", title: "重要提醒", content: "别忘了下午 3 点的会议", tags: ["提醒", "会议"] }
  ],
  "2": [
    { id: 1, type: "base", title: "日程安排", content: "查看您今天的日程安排", tags: ["日程", "安排"] },
    { id: 2, type: "base", title: "会议提醒", content: "您今天有 2 个会议需要参加", tags: ["会议", "提醒"] },
    { id: 3, type: "base", title: "任务截止", content: "3 个任务即将到期", tags: ["任务", "截止"] }
  ],
  "3": [
    { id: 1, type: "base", title: "待办事项", content: "您有 8 个待办事项需要处理", tags: ["待办", "事项"] },
    { id: 2, type: "base", title: "已完成", content: "今天已完成 3 个任务", tags: ["完成", "任务"] },
    { id: 3, type: "base", title: "进行中", content: "2 个任务正在进行中", tags: ["进行", "任务"] }
  ],
  "4": [
    { id: 1, type: "base", title: "重要事项", content: "这些是您标记为重要的事项", tags: ["重要", "事项"] },
    { id: 2, type: "base", title: "紧急任务", content: "这些任务需要优先处理", tags: ["紧急", "任务"] },
    { id: 3, type: "base", title: "重点关注", content: "这些是您需要特别关注的内容", tags: ["关注", "重点"] }
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

// 存储每个视图的当前页码和已加载的卡片
const viewStates = {};

/**
 * 初始化视图状态
 * @param {string} viewId - 视图ID
 */
function initViewState(viewId) {
  if (!viewStates[viewId]) {
    viewStates[viewId] = {
      currentPage: 1,
      loadedCards: [],
      totalLoaded: 0
    };
  }
}

/**
 * 获取指定视图的当前页码
 * @param {string} viewId - 视图ID
 * @returns {number} - 当前页码
 */
function getCurrentPage(viewId) {
  initViewState(viewId);
  return viewStates[viewId].currentPage;
}

/**
 * 增加指定视图的页码
 * @param {string} viewId - 视图ID
 */
function incrementPage(viewId) {
  initViewState(viewId);
  viewStates[viewId].currentPage += 1;
}

/**
 * 获取指定视图的所有卡片
 * @param {string} viewId - 视图ID
 * @returns {Array} - 卡片数组
 */
function getCardsForView(viewId) {
  return cardsData[viewId] || [];
}

/**
 * 获取指定视图的下一组卡片
 * @param {string} viewId - 视图ID
 * @returns {Array} - 卡片数组
 */
function getNextCardsForView(viewId) {
  initViewState(viewId);
  const allCards = cardsData[viewId] || [];
  const currentPage = getCurrentPage(viewId);
  const startIndex = currentPage * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const nextCards = allCards.slice(startIndex, endIndex);
  
  if (nextCards.length > 0) {
    incrementPage(viewId);
    viewStates[viewId].totalLoaded += nextCards.length;
  }
  
  return nextCards;
}

/**
 * 检查是否还有更多卡片可加载
 * @param {string} viewId - 视图ID
 * @returns {boolean} - 是否还有更多卡片
 */
function hasMoreCards(viewId) {
  const allCards = cardsData[viewId] || [];
  const totalLoaded = viewStates[viewId]?.totalLoaded || 0;
  return totalLoaded < allCards.length;
}

/**
 * 重置指定视图的状态
 * @param {string} viewId - 视图ID
 */
function resetViewState(viewId) {
  if (viewStates[viewId]) {
    viewStates[viewId] = {
      currentPage: 1,
      loadedCards: [],
      totalLoaded: 0
    };
  }
}

/**
 * 获取指定视图的下一组卡片的标题
 * @param {string} viewId - 视图ID
 * @returns {string} - 标题
 */
function getNextSetTitle(viewId) {
  return nextSetTitles[viewId] || "更多内容";
}

class CardDataService {
  static addCard(viewId, card) {
    if (!cardsData[viewId]) {
      cardsData[viewId] = [];
    }
    cardsData[viewId].push({
      ...card,
      type: card.type || 'base'
    });
    return cardsData[viewId];
  }

  static removeCard(viewId, cardId) {
    if (cardsData[viewId]) {
      cardsData[viewId] = cardsData[viewId].filter(card => card.id !== cardId);
    }
    return cardsData[viewId] || [];
  }

  static updateCard(viewId, updatedCard) {
    if (cardsData[viewId]) {
      const index = cardsData[viewId].findIndex(card => card.id === updatedCard.id);
      if (index !== -1) {
        cardsData[viewId][index] = {
          ...updatedCard,
          type: updatedCard.type || 'base'
        };
      }
    }
    return cardsData[viewId] || [];
  }

  static getCardsForView(viewId) {
    return getCardsForView(viewId);
  }

  static getNextCardsForView(viewId) {
    return getNextCardsForView(viewId);
  }

  static hasMoreCards(viewId) {
    return hasMoreCards(viewId);
  }

  static resetViewState(viewId) {
    return resetViewState(viewId);
  }

  static getNextSetTitle(viewId) {
    return getNextSetTitle(viewId);
  }
}

export default CardDataService;