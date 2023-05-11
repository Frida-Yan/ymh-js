let str = `<h1>404</h1>`
let renderDom = document.querySelector(".router-view");

function render() {
  renderDom.innerHTML = str;
}

export default render;
