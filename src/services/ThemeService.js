// 主题管理服务

// 主题列表
const themes = [
  { name: "Red", light: "red-light", dark: "red-dark" },
  { name: "Green", light: "green-light", dark: "green-dark" },
  { name: "Blue", light: "blue-light", dark: "blue-dark" },
  { name: "Yellow", light: "yellow-light", dark: "yellow-dark" },
  { name: "Purple", light: "purple-light", dark: "purple-dark" }
];

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
 * 获取所有可用主题
 * @returns {Array} - 主题列表
 */
export function getThemes() {
  return themes;
}

export default {
  themes,
  getSystemThemePreference,
  loadThemePreference,
  saveThemePreference,
  getThemeClassName,
  getThemes
};