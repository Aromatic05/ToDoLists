// 模拟数据
const mockItems = {
  home: [
    {
      id: '1',
      icon: 'mdi-home',
      title: '首页',
      type: 'base',
      cards: [
        { id: 1, type: "base", title: "今日概览", content: "查看您今天的摘要信息和重要提醒", tags: ["今日", "概览"] },
        { id: 2, type: "base", title: "任务清单", content: "您有 3 个待办任务需要完成", tags: ["任务", "待办"] },
        { id: 3, type: "base", title: "日历", content: "下次会议：今天下午 3:00", tags: ["日历", "会议"] }
      ]
    },
    {
      id: '2',
      icon: 'mdi-calendar',
      title: '日程安排',
      type: 'important',
      cards: [
        { id: 1, type: "base", title: "今日日程", content: "查看您今天的日程安排", tags: ["日程", "安排"] },
        { id: 2, type: "base", title: "会议提醒", content: "您今天有 2 个会议需要参加", tags: ["会议", "提醒"] },
        { id: 3, type: "base", title: "任务截止", content: "3 个任务即将到期", tags: ["任务", "截止"] }
      ]
    },
    {
      id: '3',
      icon: 'mdi-note',
      title: '待办事项',
      type: 'base',
      cards: [
        { id: 1, type: "base", title: "待办清单", content: "您有 8 个待办事项需要处理", tags: ["待办", "事项"] },
        { id: 2, type: "base", title: "已完成", content: "今天已完成 3 个任务", tags: ["完成", "任务"] },
        { id: 3, type: "base", title: "进行中", content: "2 个任务正在进行中", tags: ["进行", "任务"] }
      ]
    },
    {
      id: '4',
      icon: 'mdi-star',
      title: '重要事项',
      type: 'important',
      cards: [
        { id: 1, type: "base", title: "重要提醒", content: "这些是您标记为重要的事项", tags: ["重要", "事项"] },
        { id: 2, type: "base", title: "紧急任务", content: "这些任务需要优先处理", tags: ["紧急", "任务"] },
        { id: 3, type: "base", title: "重点关注", content: "这些是您需要特别关注的内容", tags: ["关注", "重点"] }
      ]
    }
  ],
  discover: [
    {
      id: '5',
      icon: 'mdi-compass',
      title: '发现',
      type: 'base',
      cards: [
        { id: 1, type: "base", title: "推荐内容", content: "为您推荐的热门内容", tags: ["推荐", "内容"] },
        { id: 2, type: "base", title: "热门话题", content: "当前最热门的话题讨论", tags: ["热门", "话题"] }
      ]
    },
    {
      id: '6',
      icon: 'mdi-trending-up',
      title: '热门',
      type: 'base',
      cards: [
        { id: 1, type: "base", title: "趋势分析", content: "当前最热门的趋势分析", tags: ["趋势", "分析"] },
        { id: 2, type: "base", title: "热门推荐", content: "根据您的兴趣推荐的内容", tags: ["热门", "推荐"] }
      ]
    }
  ],
  search: [
    {
      id: '7',
      icon: 'mdi-book',
      title: '知识库',
      type: 'base',
      cards: [
        { id: 1, type: "base", title: "知识库概览", content: "查看知识库的主要内容", tags: ["知识", "概览"] },
        { id: 2, type: "base", title: "最新内容", content: "知识库中的最新内容", tags: ["最新", "内容"] }
      ]
    }
  ],
  profile: [
    {
      id: '8',
      icon: 'mdi-account',
      title: '个人信息',
      type: 'base',
      cards: [
        { id: 1, type: "base", title: "个人资料", content: "查看和编辑您的个人信息", tags: ["个人", "资料"] },
        { id: 2, type: "base", title: "账号设置", content: "管理您的账号设置", tags: ["账号", "设置"] }
      ]
    }
  ]
};

class ListDataService {
  static getItemsForView(viewId) {
    return mockItems[viewId] || [];
  }

  static getCardsForList(listId) {
    // 在当前视图中查找指定ID的列表
    const currentView = Object.keys(mockItems).find(viewId =>
      mockItems[viewId].some(item => item.id === listId)
    );

    if (currentView) {
      const list = mockItems[currentView].find(item => item.id === listId);
      if (list && list.cards) {
        return list.cards;
      }
    }
    return [];
  }

  static addItem(viewId, item) {
    if (!mockItems[viewId]) {
      mockItems[viewId] = [];
    }
    mockItems[viewId].push({
      ...item,
      type: item.type || 'base',
      cards: item.cards || []
    });
    return mockItems[viewId];
  }

  static removeItem(viewId, itemId) {
    if (mockItems[viewId]) {
      mockItems[viewId] = mockItems[viewId].filter(item => item.id !== itemId);
    }
    return mockItems[viewId] || [];
  }

  static updateItem(viewId, updatedItem) {
    if (mockItems[viewId]) {
      const index = mockItems[viewId].findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        mockItems[viewId][index] = {
          ...updatedItem,
          type: updatedItem.type || 'base',
          cards: updatedItem.cards || []
        };
      }
    }
    return mockItems[viewId] || [];
  }

  static addCardToList(listId, card) {
    for (const viewId in mockItems) {
      const list = mockItems[viewId].find(item => item.id === listId);
      if (list) {
        if (!list.cards) {
          list.cards = [];
        }
        list.cards.push({
          ...card,
          type: card.type || 'base'
        });
        return list.cards;
      }
    }
    return [];
  }

  static removeCardFromList(listId, cardId) {
    for (const viewId in mockItems) {
      const list = mockItems[viewId].find(item => item.id === listId);
      if (list && list.cards) {
        list.cards = list.cards.filter(card => card.id !== cardId);
        return list.cards;
      }
    }
    return [];
  }
}

export default ListDataService; 