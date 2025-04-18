// 主题管理服务

// 主题列表
const themes = [
  { name: "SkyBlue", light: "skyblue-light", dark: "skyblue-dark", color: "#1478DC" },
  { name: "Red", light: "red-light", dark: "red-dark", color: "#F44336" },
  { name: "Green", light: "green-light", dark: "green-dark", color: "#4CAF50" },
  { name: "Blue", light: "blue-light", dark: "blue-dark", color: "#2196F3" },
  { name: "Yellow", light: "yellow-light", dark: "yellow-dark", color: "#FFC107" },
  { name: "Purple", light: "purple-light", dark: "purple-dark", color: "#9C27B0" },
  { name: "Ivory", light: "ivory-light", dark: "ivory-dark", color: "#FFFFF0" },
];

// Theme color mapping for quick access
const themeColors = themes.reduce((acc, theme) => {
  acc[theme.name] = theme.color;
  return acc;
}, {});

/**
 * 获取系统主题偏好（深色/浅色）
 * @returns {boolean} - 是否为深色主题
 */
export function getSystemThemePreference() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * 从本地存储加载主题偏好
 * @returns {Object} - 包含主题名称和是否为深色模式的对象
 */
export function loadThemePreference() {
  const storedTheme = localStorage.getItem('theme-name') || themes[0].name;
  const storedPreference = localStorage.getItem('dark-mode');
  const isDarkMode = storedPreference !== null ? storedPreference === 'true' : getSystemThemePreference();
  
  return {
    themeName: storedTheme,
    isDarkMode
  };
}

/**
 * 保存主题偏好到本地存储
 * @param {string} themeName - 主题名称
 * @param {boolean} isDarkMode - 是否使用深色主题
 */
export function saveThemePreference(themeName, isDarkMode) {
  localStorage.setItem('theme-name', themeName);
  localStorage.setItem('dark-mode', isDarkMode);
}

/**
 * 获取当前主题的类名
 * @param {string} themeName - 主题名称
 * @param {boolean} isDarkMode - 是否使用深色主题
 * @returns {string} - 主题类名
 */
export function getThemeClassName(themeName, isDarkMode) {
  const theme = themes.find(t => t.name === themeName);
  if (!theme) return themes[0].light;
  return isDarkMode ? theme.dark : theme.light;
}

/**
 * 获取主题对应的颜色值
 * @param {string} themeName - 主题名称
 * @returns {string} - 主题颜色值
 */
export function getThemeColor(themeName) {
  return themeColors[themeName] || themeColors.Green;
}

/**
 * 获取所有可用主题
 * @returns {Array} - 主题列表
 */
export function getThemes() {
  return themes;
}

export default {
  themes,
  themeColors,
  getSystemThemePreference,
  loadThemePreference,
  saveThemePreference,
  getThemeClassName,
  getThemeColor,
  getThemes
};