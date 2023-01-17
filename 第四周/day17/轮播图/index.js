// 0 准备元素
const imgBox = document.querySelector(".imgBox");
const banner = document.querySelector(".banner");
const pointBox = document.querySelector(".pointerBox");
// 0 准备变量
// 获取banner这个盒子的宽度
// 元素.offsetWidth      内容 + padding + border
// 元素.clientWidth      内容 + padding
const banner_width = banner.clientWidth;
// 当前在第几张
let index = 1;
// 准备定时器的返回值
let timer = null;
// 准备变量 表示运动的开关
let flag = true;

// 1. 复制元素
copyEle();
function copyEle() {
  // 1-1 复制两个元素
  // 获取第一个子元素复制  元素.firstElementChild
  // 获取最后一个子元素复制  元素.lastElementChild
  // 克隆元素 元素.cloneNode(true/false) true 克隆后代 false 不克隆后代
  const first = imgBox.firstElementChild.cloneNode(true);
  const last = imgBox.lastElementChild.cloneNode(true);
  // 1-2
  // 把first插入到最后 父元素.appendChild(子)
  // 把last插入到最前  父元素.insertBefore(子, 谁的前面)
  imgBox.appendChild(first);
  imgBox.insertBefore(last, imgBox.firstElementChild);
  // 1-3 根据li的数量，修改imgBox的宽度
  // 获取子元素 元素.children
  imgBox.style.width = imgBox.children.length * 100 + "%";
  // 1-4 根据当前li的索引 调整ul的定位位置
  // 向左走一个banner的宽度
  imgBox.style.left = -index * banner_width + "px";
}

// 2. 生成焦点
setPoint();
function setPoint() {
  // 2-1 要生成多少个焦点
  // 有几个图片 生成几个焦点
  // imgBox有几个子元素，减去2 就是多少个图片
  const pointNum = imgBox.children.length - 2;
  // 2-2 根据pointNum生成焦点，插入到ol
  for (let i = 0; i < pointNum; i++) {
    // 2-2-1 创建一个li标签
    // document.createElement('标签名')
    const li = document.createElement("li");
    li.classList.add("item");
    // 2-2-2 指定第0个li有active名字
    if (i === 0) {
      li.classList.add("active");
    }
    // 2-2-3  把索引通过自定义属性绑定到li上面
    li.dataset.i = i;
    // 2-2-4 把这个li插入到ol
    pointBox.appendChild(li);
  }
  // 2-3 调整一下ol的宽度
  pointBox.style.width = pointNum * (20 + 10) + "px";
}

// 3 自动轮播
/* 
    每间隔一段时间（2000ms）  切换到下一张
    =>0     假的最后一张
    =>1     第一张
    =>2     第二张
    =>3     第3张
    =>4     第4张
    =>5     第5张
    =>6     假的第一张

    假设当前是 [1] 这一张
    - 2000ms过后 [2] 这张 imgBox 的 left 为 -1200
    - 4000ms过后 [3] 这张 imgBox 的 left 为 -1800
    - 6000ms过后 [4] 这张 imgBox 的 left 为 -2400

    找规律 
    - 。。。    [x] 这一张， imgBox 的left   -x*banner_width(banner盒子的宽度)

    核心思路 index++

*/
autoPlay();
function autoPlay() {
  timer = setInterval(() => {
    // 3-1 设置index
    index++;
    move(imgBox, { left: -index * banner_width }, moveEnd);
  }, 2000);
}

// 4. 运动结束
// 在第5张运动结束后，需要手动把盒子拉到第一张的位置

function moveEnd() {
  // 4-1 判断当前是最后一张（视觉上的第五张）运动结束后
  // 手动拉回到index=1的位置
  // 需要判断 index 为（视觉上的第五张，也就是视觉上的最后一张）
  // 需要index动态判断为视觉上的最后一张
  if (index === imgBox.children.length - 1) {
    index = 1;
    imgBox.style.left = -index * banner_width + "px";
  }

  // 4-2 判断当前是[0]
  if (index === 0) {
    index = imgBox.children.length - 2;
    imgBox.style.left = -index * banner_width + "px";
  }

  // 4-3 设置焦点
  // [1] 的图片显示  [0] 焦点 active
  // [2] 的图片显示  [1] 焦点 active
  // [3] 的图片显示  [2] 焦点 active
  for (let i = 0; i < pointBox.children.length; i++) {
    pointBox.children[i].classList.remove("active");
  }
  pointBox.children[index - 1].classList.add("active");
  // 代码执行到这里，说明当前这个图片运动结束了，可以做下一个运动
  flag = true;
}

// 5. 移出移出
// 移入的时候 停止自动轮播
// 移出的时候 继续自动轮播
overOut();
function overOut() {
  // 5-1移入
  banner.onmouseover = function () {
    // 停止轮播
    clearInterval(timer);
  };
  // 5-2 移出
  banner.onmouseout = function () {
    autoPlay();
  };
}

// 6. 点击事件
// 事件委托
bindEvent();
function bindEvent() {
  // 6-1 做事件委托
  banner.onclick = function (e) {
    // 6-2 左箭头
    if (e.target.className === "left") {
      if (flag === false) {
        // 如果代码进入到这里，就说明有个点击事件正在进行，不允许继续点击
        return;
      }
      // 如果代码进入到这里，说明当前可以点击
      flag = false;
      index--;
      move(imgBox, { left: -index * banner_width }, moveEnd);
    }
    // 6-3 右箭头
    if (e.target.className === "right") {
      if (flag === false) {
        // 如果代码进入到这里，就说明有个点击事件正在进行，不允许继续点击
        return;
      }
      // 如果代码进入到这里，说明当前可以点击
      flag = false;
      index++;
      move(imgBox, { left: -index * banner_width }, moveEnd);
    }
    // 6-4 焦点
    if (e.target.className === "item") {
      if (flag === false) {
        // 如果代码进入到这里，就说明有个点击事件正在进行，不允许继续点击
        return;
      }
      // 如果代码进入到这里，说明当前可以点击
      flag = false;
      // 给index赋值
      // 点击[0] 的焦点  对应的是index为1
      // 点击[1] 的焦点  对应的是index为2
      // 获取当前点击的点的索引，设置index
      // 自定义属性
      index = +e.target.dataset.i + 1;
      move(imgBox, { left: -index * banner_width }, moveEnd);
    }
  };
}

/* 
    7. 解决问题
        当我们离开当前页面再回来的时候，会抖动
        原因  离开页面的时候
              定时器会继续走
              dom不会走
        解决 
            当离开页面的时候 停止自动轮播
            回到页面的时候， 继续自动轮播
*/
changeTab();
function changeTab() {
  // 7-1 监听是否离开页面的事件
  document.onvisibilitychange = function () {
    // document.visibilityState 页面的状态
    // hidden 不可见
    // visible 可见
    console.log(document.visibilityState);
    if (document.visibilityState === "hidden") {
      clearInterval(timer);
    } else {
      autoPlay();
    }
  };
}

/* 
    8. 又一个问题
    点击左 运动没结束的时候，又开启下一个运动
*/
