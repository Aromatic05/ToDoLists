// 主题管理服务

// 浅色主题颜色
const lightThemeColors = [
  { name: "默认浅灰", value: "#f8f9fa" },
  { name: "柔和米色", value: "#f5f5f0" },
  { name: "淡蓝色", value: "#f0f5fa" },
  { name: "淡粉色", value: "#faf0f5" },
  { name: "浅薄荷", value: "#f0faf5" },
  { name: "淡紫色", value: "#f5f0fa" },
  { name: "象牙白", value: "#fffff0" },
  { name: "淡黄色", value: "#fffaf0" }
];

// 深色主题颜色
const darkThemeColors = [
  { name: "深灰色", value: "#1a1a1a" },
  { name: "深蓝灰", value: "#1a1c25" },
  { name: "深紫色", value: "#25192e" },
  { name: "深绿色", value: "#192e25" },
  { name: "深橙色", value: "#2e1f19" },
  { name: "午夜蓝", value: "#10141f" },
  { name: "深褐色", value: "#231f1a" },
  { name: "石墨色", value: "#232323" }
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
 * @returns {boolean} - 是否为深色主题
 */
export function loadThemePreference() {
  const storedPreference = localStorage.getItem('dark-mode');
  if (storedPreference !== null) {
    return storedPreference === 'true';
  }
  return getSystemThemePreference();
}

/**
 * 保存主题偏好到本地存储
 * @param {boolean} isDarkMode - 是否使用深色主题
 */
export function saveThemePreference(isDarkMode) {
  localStorage.setItem('dark-mode', isDarkMode);
}

/**
 * 获取当前主题的背景颜色
 * @param {boolean} isDarkMode - 是否使用深色主题
 * @returns {string} - 背景颜色
 */
export function getBackgroundColor(isDarkMode) {
  if (isDarkMode) {
    const savedDarkColor = localStorage.getItem('dark-bg-color');
    return savedDarkColor || darkThemeColors[0].value;
  } else {
    const savedLightColor = localStorage.getItem('light-bg-color');
    return savedLightColor || lightThemeColors[0].value;
  }
}

/**
 * 保存背景颜色到本地存储
 * @param {string} color - 背景颜色值
 * @param {boolean} isDarkMode - 是否使用深色主题
 */
export function saveBackgroundColor(color, isDarkMode) {
  if (isDarkMode) {
    localStorage.setItem('dark-bg-color', color);
  } else {
    localStorage.setItem('light-bg-color', color);
  }
}

/**
 * 获取当前主题的颜色列表
 * @param {boolean} isDarkMode - 是否使用深色主题
 * @returns {Array} - 颜色列表
 */
export function getThemeColors(isDarkMode) {
  return isDarkMode ? darkThemeColors : lightThemeColors;
}

export default {
  lightThemeColors,
  darkThemeColors,
  getSystemThemePreference,
  loadThemePreference,
  saveThemePreference,
  getBackgroundColor,
  saveBackgroundColor,
  getThemeColors
};