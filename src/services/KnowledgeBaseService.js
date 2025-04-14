// 知识库数据服务

// 知识库初始数据
const knowledgeBaseData = [
  {
    id: 1,
    title: "Vue.js 基础知识",
    content: "Vue.js 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。",
    tags: ["Vue", "前端", "JavaScript"]
  },
  {
    id: 2,
    title: "Tauri 应用开发",
    content: "Tauri 是一个为所有主要桌面平台构建更小、更快、更安全的桌面应用程序的框架。它允许您使用 Web 技术开发桌面应用，同时利用底层操作系统的本地功能。",
    tags: ["Tauri", "桌面应用", "Rust"]
  },
  {
    id: 3,
    title: "Vite 构建工具",
    content: "Vite 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：一个开发服务器和一套构建指令。Vite 利用浏览器原生 ES 模块导入功能，实现了极速的热模块更新（HMR）。",
    tags: ["Vite", "构建工具", "前端"]
  },
  {
    id: 4,
    title: "CSS 动画技巧",
    content: "CSS 动画允许您逐渐改变从一种样式到另一种样式的元素。您可以根据需要更改任意多的属性，任意多次。要使用 CSS 动画，您必须首先指定一些关键帧。关键帧包含元素在某些时候的样式。",
    tags: ["CSS", "动画", "设计"]
  },
  {
    id: 5,
    title: "响应式设计原则",
    content: "响应式设计是一种使网站或应用程序能够根据用户使用的设备自动调整布局的方法。这种方法使用弹性布局、弹性图像和 CSS3 媒体查询来适应不同的屏幕尺寸和视口。",
    tags: ["响应式设计", "CSS", "前端"]
  }
];

/**
 * 搜索知识库
 * @param {string} query - 搜索查询字符串
 * @returns {Array} - 搜索结果数组
 */
export function searchKnowledge(query) {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const lowercaseQuery = query.toLowerCase();
  
  // 根据标题、内容和标签进行搜索
  return knowledgeBaseData.filter(item => {
    return (
      item.title.toLowerCase().includes(lowercaseQuery) || 
      item.content.toLowerCase().includes(lowercaseQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }).map(item => ({
    id: item.id,
    title: item.title,
    preview: item.content.substring(0, 100) + (item.content.length > 100 ? '...' : ''),
    content: item.content,
    tags: item.tags
  }));
}

/**
 * 获取知识条目
 * @param {number} id - 知识条目ID
 * @returns {Object|null} - 知识条目对象或null
 */
export function getKnowledgeItem(id) {
  return knowledgeBaseData.find(item => item.id === id) || null;
}

/**
 * 获取所有知识条目
 * @returns {Array} - 所有知识条目数组
 */
export function getAllKnowledgeItems() {
  return [...knowledgeBaseData];
}

export default {
  searchKnowledge,
  getKnowledgeItem,
  getAllKnowledgeItems
};