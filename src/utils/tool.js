export const debounce = (func, wait, immediate) => {
  let timer;
  let localImmediate = immediate;

  return function () {
    const context = this;
    const args = arguments;

    if (localImmediate) {
      // 标记为，用于标记第一次是否立即执行
      localImmediate = false;
      func.apply(context, args);
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
};
