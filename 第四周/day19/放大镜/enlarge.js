/* 
    分析
    需要什么属性(准备的变量和元素)
        1. 元素
            - ele 范围盒子，最大的盒子
            - mask 遮罩
            - show 展示图片的盒子（直接找盒子）
            - enlarge 放大的盒子
            - list 切换图片的盒子

            
        2. 变量
            - mask 的宽度和高度
            - show 的宽度和高度
            - bg   放大图片的宽度和高度
            - enlarge 的尺寸
    需要什么方法
        1. 调整比例
            计算enlarge的尺寸
        2. 移入移出
            移入 enlarge mask 展示
            移出 enlarge mask 消失
        3. 列表切换
            点击列表元素的时候，切换list展示的图片 和 show的图片
        4. 光标移动
            mask跟着移动
            计算比例展示enlarge里面的img的位置

    当我们以后使用的时候，数据是动态渲染的，需要根据一段数据，展示该页面的该商品放大镜及相关内容
*/

const info = {
  name: "iphone14promax",
  price: 10000,
  color: ["远峰蓝", "暗夜紫"],
  storage: ["1TB", "256G"],
  list: [
    {
      show: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/18904/18/18085/49736/6349508aEbd93bbb2/a4b15b221755ccf1.jpg",
      small:
        "https://img10.360buyimg.com/n5/s54x54_jfs/t1/18904/18/18085/49736/6349508aEbd93bbb2/a4b15b221755ccf1.jpg",
      enlarge:
        "https://img10.360buyimg.com//n0/jfs/t1/24761/24/20097/64283/635c8432E29018c66/1f40553e2e9565d6.jpg",
    },
    {
      show: "https://img10.360buyimg.com/n1/s450x450_jfs/t1/142916/7/30119/41391/6349508aE5ca549ff/7096c3777eaf6133.jpg",
      small:
        "https://img10.360buyimg.com/n5/s54x54_jfs/t1/142916/7/30119/41391/6349508aE5ca549ff/7096c3777eaf6133.jpg",
      enlarge:
        "https://img10.360buyimg.com//n0/jfs/t1/142916/7/30119/41391/6349508aE5ca549ff/7096c3777eaf6133.jpg",
    },
  ],
};

class Enlarge {
  // 构造函数的属性
  constructor(selector) {
    this.ele = document.querySelector(selector);
    this.mask = this.ele.querySelector(".mask");
    this.show = this.ele.querySelector(".show");
    this.enlarge = this.ele.querySelector(".enlarge");
    this.list = this.ele.querySelector(".list");

    this.bindHtml();

    this.show_width = this.show.clientWidth;
    this.show_height = this.show.clientHeight;

    // display: none 的元素 无法获取client 尺寸
    // 通过css获取
    this.mask_width = parseInt(window.getComputedStyle(this.mask).width);
    this.mask_height = parseInt(window.getComputedStyle(this.mask).height);
    this.bg_width = parseInt(
      window.getComputedStyle(this.enlarge.firstElementChild).width
    );
    this.bg_height = parseInt(
      window.getComputedStyle(this.enlarge.firstElementChild).height
    );

    // 准备enlarge的尺寸
    this.enlarge_width = 0;
    this.enlarge_height = 0;

    this.setScale();
    this.overOut();
    this.listChange();
    this.move();
  }
  // 原型上的方法
  // 0 渲染页面结构
  bindHtml() {
    // 放置show的图片
    let show_img = document.createElement("img");
    show_img.src = info.list[0]["show"];
    this.show.insertBefore(show_img, this.show.firstElementChild);
    // 放置list里面的图片
    let str = "";
    info.list.forEach((item, index) => {
      str += `
        <li class="${index === 0 ? "active" : ""}" data-show='${
        item.show
      }' data-enlarge='${item.enlarge}'>
            <img src="${item.small}" alt="">
        </li>
      `;
    });
    this.list.innerHTML = str;
    // 放置enlarge里面的大图
    let enlarge_img = document.createElement("img");
    enlarge_img.src = info.list[0]["enlarge"];
    this.enlarge.appendChild(enlarge_img);
  }
  // 1. 调整比例
  // mask/show = enlarge/bg
  // enlarge = mask/show*bg
  setScale() {
    // 计算
    this.enlarge_width = (this.mask_width / this.show_width) * this.bg_width;
    this.enlarge_height =
      (this.mask_height / this.show_height) * this.bg_height;
    // 赋值
    this.enlarge.style.width = this.enlarge_width + "px";
    this.enlarge.style.height = this.enlarge_height + "px";
  }

  // 2. 移入移出
  overOut() {
    this.show.addEventListener("mouseover", () => {
      this.mask.style.display = "block";
      this.enlarge.style.display = "block";
    });
    this.show.addEventListener("mouseout", () => {
      this.mask.style.display = "none";
      this.enlarge.style.display = "none";
    });
  }

  // 3. 列表切换
  listChange() {
    // 给每个li绑定事件---通过事件委托操作
    this.list.addEventListener("click", (e) => {
      if (e.target.nodeName === "LI") {
        // 点击了li
        // 给当前的加上名字，给别的去掉名字
        for (let i = 0; i < this.list.children.length; i++) {
          this.list.children[i].classList.remove("active");
        }
        e.target.classList.add("active");
        // 切换图片 show里面的img的src
        this.show.firstElementChild.src = e.target.dataset.show;
        // 切换enlarge 里面的img的src
        this.enlarge.firstElementChild.src = e.target.dataset.enlarge;
      }
    });
  }

  // 4. 光标移动
  move() {
    this.show.addEventListener("mousemove", (e) => {
      // 设置mask的位置
      let x = e.offsetX - this.mask_width / 2;
      let y = e.offsetY - this.mask_height / 2;
      // 设置x 和 y 的边界
      if (x <= 0) {
        x = 0;
      }
      if (y <= 0) {
        y = 0;
      }
      if (x >= this.show_width - this.mask_width) {
        x = this.show_width - this.mask_width;
      }
      if (y >= this.show_height - this.mask_height) {
        y = this.show_height - this.mask_height;
      }

      this.mask.style.left = x + "px";
      this.mask.style.top = y + "px";

      // 设置enlarge图片移动位置
      // 比例
      // mask 移动距离    mask 尺寸
      // ------------- = -----------------
      // bg 移动距离      show 尺寸
      // bg 移动距离 = mask移动距离 * show尺寸 / mask尺寸
      this.enlarge.firstElementChild.style.left =
        (-x * this.show_width) / this.mask_width + "px";
      this.enlarge.firstElementChild.style.top =
        (-y * this.show_height) / this.mask_height + "px";
    });
  }
}
