export default {
  // eslint-disable-next-line @typescript-eslint/ban-types
  debounce: (func: Function, wait = 300) => {
    let timeoutId: NodeJS.Timeout | null;
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
};
