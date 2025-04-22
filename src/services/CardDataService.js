// 卡片数据服务

// 每页加载的卡片数量
const CARDS_PER_PAGE = 12;

// 卡片数据
const cardsData = {
  settings: [
    { id: 1, type: "setting", title: "外观设置", content: "更改主题、颜色和布局", tags: ["外观", "主题"] },
    { id: 2, type: "setting", title: "通知管理", content: "控制接收的通知类型和频率", tags: ["通知", "提醒"] },
    { id: 3, type: "setting", title: "隐私控制", content: "管理数据共享和访问权限", tags: ["隐私", "权限"] },
    { id: 4, type: "setting", title: "帮助中心", content: "获取支持和查看常见问题解答", tags: ["帮助", "支持"] },
    { id: 5, type: "setting", title: "账号设置", content: "管理您的账号和订阅信息", tags: ["账号", "订阅"] }
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