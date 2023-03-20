class Tabs {
  // 构造器里面写的就是 原来ES5中构造函数里面的代码
  constructor(name, options = {}) {
    this.options = options;
    this.box = document.querySelector(name);
    this.btns = this.box.querySelectorAll("ul>li");
    this.container = this.box.querySelectorAll("ol>li");
    this.init();
  }

  // 原型上的方法
  init() {
    const type = this.options.type || "click";
    for (let i = 0; i < this.btns.length; i++) {
      this.btns[i].addEventListener(type, () => {
        this.btns.forEach((item) => {
          item.classList.remove("active");
        });
        this.btns[i].classList.add("active");

        this.container.forEach((item) => {
          item.classList.remove("show");
        });
        this.container[i].classList.add("show");
      });
    }
  }
}
export default Tabs;
