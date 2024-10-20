export default {
  // eslint-disable-next-line @typescript-eslint/ban-types
  debounce: (func: Function, wait = 300) => {
    let timeoutId: number | null;
    return function (this: unknown, ...args: unknown[]) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func.apply(this, args);
        timeoutId = null;
      }, wait);
    };
  },

  formatNumber(num: number): string {
    const numStr = num.toString();
    let result = '';
    // 从最后一个字符开始遍历，逆序插入逗号
    for (let i = numStr.length - 1, j = 1; i >= 0; i--, j++) {
      result = numStr[i] + result;
      if (j % 3 === 0 && i !== 0) {
        result = ',' + result;
      }
    }
    return result;
  },

  getRgbaVar(color: string, alpha = 1): string {
    let r,
      g,
      b = 0;
    if (color.startsWith('#')) {
      r = parseInt(color[1] + color[2], 16);
      g = parseInt(color[3] + color[4], 16);
      b = parseInt(color[5] + color[6], 16);
    } else if (color.startsWith('rgb')) {
      const values = color
        .replace(/[^\d,]/g, '')
        .split(',')
        .map((item) => parseInt(item));
      [r, g, b] = values; // 提取前三个值 (r, g, b)
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
};
