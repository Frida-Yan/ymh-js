let template = `
<div class="header">页面顶部</div>
<div class="content">
</div>
<div class="footer">页面底部</div>
`;
let renderDom = document.querySelector(".router-view");
function init() {
  var cartList = JSON.parse(localStorage.getItem("list")) || [
    // 每一个对象就是一个购物车内容的数据
    {
      id: 111234, // 商品编号，每个商品的唯一标识
      status: true, // 是否选中
      pic: "https://img1.baidu.com/it/u=2511310783,721605137&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=332",
      name: "我是一个手机, 不知道是啥",
      price: 100,
      number: 3, // 购买3件
      total: 16, // 库存
    },
    {
      id: 123456,
      status: false,
      pic: "https://img1.baidu.com/it/u=1537709578,2453227648&fm=253&fmt=auto&app=120&f=JPEG?w=809&h=500",
      name: "我是一个电脑, 不知道是啥",
      price: 98.72,
      number: 1,
      total: 7,
    },
    {
      id: 965874,
      status: true,
      pic: "https://img2.baidu.com/it/u=3561506717,735421650&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
      name: "我是一个手纸, 不知道是啥",
      price: 356.21,
      number: 2,
      total: 22,
    },
  ];

  // 设置本地缓存

  // 数据驱动视图 ===> 前端看到的大部分内容都是由数组 对象组成的数据，动态展示在页面上
  // 做的任何操作本质上都是操作数据，由数据改变页面
  /* 
   套路
    查 ===> 把数据渲染到页面上
    增删改
      => 所有的变化都是针对数组中对应数据进行修改 
      => 修改完毕，从新的数组中渲染页面
*/

  var content = document.querySelector(".content");

  renderHTML();
  // 查 -- 整合数据，拼接在页面上 --- 渲染数据
  function renderHTML() {
    // 1. 全选 选中状态取决于什么
    //    数组中的每一项的status，都为true ， 全选状态勾选上
    // 2. 结算的 总件数取决于什么
    //    勾选的数据 （status === true） 把当前这项的number加起来
    // 3. 总价取决于什么
    //    勾选的数据 （status === true） 把当前这项的number*price加起来
    // 4. 结算按钮  删除已选中按钮的禁用取决于什么
    //    数组中每一项的status 都为false, 就是禁用

    // 1-1 计算数据
    let totalSelect = 0; // 有几个项被勾选
    let totalNum = 0; // 总件数
    let totalPrice = 0; // 总价

    cartList.forEach((item) => {
      if (item.status) {
        totalSelect++;
        totalNum += item.number;
        totalPrice += item.number * item.price;
      }
    });

    // 1-2 组装数据
    let str = ``;
    // 拼接全选的数据
    str += `<div class="top"><input class="toggleAll" type="checkbox" ${
      totalSelect === cartList.length ? "checked" : ""
    } /> 全选</div> <ul>`;
    // 拼接列表数据
    cartList.forEach((item) => {
      str += `
    <li>
        <div class="status">
          <input type="checkbox" ${
            item.status ? "checked" : ""
          } class='checkbox' data-id='${item.id}' />
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
          <button class='sub' data-id='${item.id}'>-</button>
          <input type="text" value="${item.number}" />
          <button class='add' data-id='${item.id}'>+</button>
        </div>
        <div class="sub">总价￥ ${(item.number * item.price).toFixed(2)}</div>
        <div class="destory">
          <button class='destoryBtn' data-id='${item.id}'>删除</button>
        </div>
    </li>
    `;
    });
    // 拼接结算数据
    str += `</ul><div class="bottom">
          <div class="totalNum">总件数 : ${totalNum}</div>
          <div class="btns">
            <button class="clear">清空购物车</button>
            <button class="buy" ${
              !totalSelect ? "disabled" : ""
            } data-price='${totalPrice}' >去结算</button>
            <button class="removeComplete"  ${
              !totalSelect ? "disabled" : ""
            } >删除所有已选中</button>
          </div>
          <div class="totalPrice">总价格 : ￥ <span>${totalPrice.toFixed(
            2
          )}</span></div>
        </div>`;
    // 渲染
    content.innerHTML = str;

    // 把处理好的数据存在本地缓存中
    localStorage.setItem("list", JSON.stringify(cartList));
  }

  // 2. 事件处理
  // 利用事件委托处理删改增
  // 判断当前点击的元素的className是否是需要触发事件的元素
  // 事件委托的原则
  // 1. 就近原则，加给父级
  // 2. 尽量不要给到window
  content.onclick = function (e) {
    /* 
     全选 
     修改数据
     渲染页面
  */
    if (e.target.className === "toggleAll") {
      // console.log('全选');
      // console.log(e.target.checked);
      cartList.forEach((item) => {
        item.status = e.target.checked;
      });
      // console.log(cartList);
      renderHTML();
    }

    /* 
     清空购物
     修改数据
     渲染页面
  */
    if (e.target.className === "clear") {
      // 清空购物车 ===> 清空数组
      // cartList = []
      cartList.length = 0;
      renderHTML();
    }

    /* 
     结算
     修改数据
     渲染页面
  */
    if (e.target.className === "buy") {
      console.log("总价格", e.target.dataset.price);
    }
    /* 
    删除已经选中
    修改数据
    渲染页面
  */
    if (e.target.className === "removeComplete") {
      // 过滤 把 勾选的去掉，没勾选的留下来
      cartList = cartList.filter((item) => {
        return !item.status;
      });
      renderHTML();
    }

    /* 
    每一项的+
    修改数据
    渲染页面
  */
    if (e.target.className === "add") {
      // console.log(e.target.dataset.id);
      // 查找数组中需要修改的这一项
      let info = cartList.find((item) => {
        return item.id == e.target.dataset.id;
      });
      if (info.number < info.total) {
        info.number++;
      }
      // console.log(info);
      renderHTML();
    }
    /* 
    每一项的 -
    修改数据
    渲染页面
  */
    if (e.target.className === "sub") {
      // 查找数组中需要修改的这一项
      let info = cartList.find((item) => {
        return item.id == e.target.dataset.id;
      });
      if (info.number > 0) {
        info.number--;
      }
      renderHTML();
    }
    /* 
    每一项的勾选
    修改数据
    渲染页面
  */
    if (e.target.className === "checkbox") {
      // 查找数组中需要修改的这一项
      let info = cartList.find((item) => {
        return item.id == e.target.dataset.id;
      });
      info.status = !info.status;
      renderHTML();
    }

    /* 
    每一项的删除
    修改数据
    渲染页面
  */
    if (e.target.className === "destoryBtn") {
      // 获取id
      let id = e.target.dataset.id;
      if (window.confirm("确定要删除这一项吗?")) {
        cartList = cartList.filter((item) => {
          return item.id != id;
        });
        renderHTML();
      }
    }
  };
}
function render() {
  renderDom.innerHTML = template;
  init();
}
export default render;
