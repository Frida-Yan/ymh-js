// 工具库
function move(ele, options, cb = () => {}) {
  // 计数器
  let count = 0;
  // options 是一个对象
  for (let k in options) {
    // 计数器++
    count++;
    // k是对象的键名
    const type = k;
    let target = options[k];
    // 如果是opacity 那么目标放大100
    if (type === "opacity") {
      target *= 100;
    }
    const timer = setInterval(() => {
      // 1. 获取当前的值
      // 1-1 如果是opacity 当前值放大100
      let current;
      if (type === "opacity") {
        current = window.getComputedStyle(ele)[type] * 100;
      } else {
        current = parseInt(window.getComputedStyle(ele)[type]);
      }
      // 2. 计算剩余路程的1/10 ，也就是本次运动的距离， 向上取整
      // 2-1 判断是不是opacity
      let duration = (target - current) / 10;
      duration =
        duration > 0
          ? Math.ceil((target - current) / 10)
          : Math.floor((target - current) / 10);

      // 3. 判断当前的位置要不要停止定时器
      if (current === target) {
        clearInterval(timer);
        // 每关闭一个 计数器就少一个
        count--;
        // 当计数器为0 的时候，运动真正结束
        if (count === 0) {
          // console.log('运动结束');
          // 执行回调函数
          cb();
        }
      } else {
        // 判断type是不是opacity
        if (type === "opacity") {
          ele.style[type] = (current + duration) / 100;
        } else {
          ele.style[type] = current + duration + "px";
        }
      }
    }, 20);
  }
}
