import routers from "./router.js";
// 1. 捕获浏览器地址栏 hash 值的改变
hashchange();
window.onhashchange = hashchange;
function hashchange() {
  console.log("地址栏 hash 值改变了");

  // 解构赋值: 等价于 const hash = window.location.hash
  let { hash } = window.location;
  hash = hash.slice(1) || "/";

  // 只要判断 hash 值, 进行不同结构的渲染
  const info = routers.find((item) => item.name === hash);
  console.log(info);

  if (!info) {
    window.location.hash = "/404";
    return;
  }

  // 重定向
  if (info.redirect) {
    window.location.hash = info.redirect;
    return;
  }
  info.component();
}
