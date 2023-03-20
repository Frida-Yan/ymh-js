import Tabs from "../utils/tab.js";
let template = `
  first
  <div id='box'>
  <ul>
      <li class="active">蔬菜</li>
      <li>水果</li>
      <li>零食</li>
      <li>药品</li>
  </ul>
  <ol>
      <li>
          <div>土豆</div>
          <div>黄瓜</div>
          <div>西红柿</div>
      </li>
      <li class="show">
          <div>苹果</div>
          <div>香蕉</div>
          <div>橘子</div>
      </li>
      <li>
          <div>薯片</div>
          <div>可乐</div>
          <div>炸鸡</div>
      </li>
      <li>
          <div>连花清瘟</div>
          <div>999</div>
          <div>布洛芬</div>
      </li>
  </ol>
  </div>
`;

let renderDom = document.querySelector(".router-view");

function render() {
  renderDom.innerHTML = template;
  console.log(document.querySelector("#box"));
  renderTab();
}

function renderTab() {
  new Tabs("#box");
}
export default render;
