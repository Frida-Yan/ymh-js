var cartList = [
  // 每一个对象就是一个购物车内容的数据
  {
    id: 111234, // 商品编号，每个商品的唯一标识
    status: false, // 是否选中
    pic: "https://img1.baidu.com/it/u=2511310783,721605137&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=332",
    name: "我是一个手机, 不知道是啥",
    price: 100,
    number: 3, // 购买3件
    total: 16, // 库存
  },
  {
    id: 123456,
    status: true,
    pic: "https://img1.baidu.com/it/u=1537709578,2453227648&fm=253&fmt=auto&app=120&f=JPEG?w=809&h=500",
    name: "我是一个电脑, 不知道是啥",
    price: 98.72,
    number: 1,
    total: 7,
  },
  {
    id: 965874,
    status: false,
    pic: "https://img2.baidu.com/it/u=3561506717,735421650&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
    name: "我是一个手纸, 不知道是啥",
    price: 356.21,
    number: 2,
    total: 22,
  },
];

// 数据驱动视图 ===>  前端看到的大部分内容都是由数组 对象组成的数据，动态展示在页面上
// 做的任何操作本质上都是操作数据，由数据改变页面

var content = document.querySelector(".content");

// 查 -- 整合数据，拼接在页面上 --- 渲染数据
function renderHTML() {
  // 拼接全选的数据
  // 拼接列表数据
  var str = "<ul>";
  cartList.forEach(function (item) {
    str += `
    <li>
    <div class="status">
      <input type="checkbox" ${item.status ? "checked" : ""} />
    </div>
    <div class="show">
      <img
        src="${item.pic}"
        alt=""
      />
    </div>
    <div class="title">${item.name}</div>
    <div class="price">单价￥ ${item.price}</div>
    <div class="number">
      <button>-</button>
      <input type="text" value="${item.number}" />
      <button class='add' data-id=${item.id}>+</button>
    </div>
    <div class="sub">总价￥ ${item.number * item.price}</div>
    <div class="destory">
      <button>删除</button>
    </div>
  </li>`;
  });
  // 拼接结算数据
  // 渲染
  content.innerHTML = "</ul>" + str;
}

renderHTML();

// 利用事件委托处理删改增
// 判断当前点击的元素的className是否是需要触发事件的元素
content.onclick = function (e) {
  /* 
     全选 
     修改数据
     渲染页面
  */
  /* 
     清空购物
     修改数据
     渲染页面
  */
  /* 
     结算
     修改数据
     渲染页面
  */
  /* 
    删除已经选中
    修改数据
    渲染页面
  */
  /* 
    每一项的+
    修改数据
    渲染页面
  */
  if (e.target.className === "add") {
    // console.log("加号");
    // 把当前这一项的number+1
    // 找到数组中对应的这一项 ---- 通过id去找当前这个项
    // 获取id--- 给+设置一个自定义属性id
    console.log(e.target.dataset);
    // 通过id找到数组中对应的这一项
    var id = e.target.dataset.id;
    var info = cartList.find(function (item) {
      return id == item.id;
    });
    info.number++;
    console.log(info);
    renderHTML();
  }
  /* 
    每一项的 -
    修改数据
    渲染页面
  */
  /* 
    每一项的勾选
    修改数据
    渲染页面
  */
  /* 
    每一项的删除
    修改数据
    渲染页面
  */
};
