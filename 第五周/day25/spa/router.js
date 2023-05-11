import First from "./components/first.js";
import Second from "./components/second.js";
import notFount from './components/404.js'
const routers = [
  { name: "/first", component: First },
  { name: "/second", component: Second },
  { name: "/404", component: notFount },
  { name: "/", redirect: "/first" },
];
export default routers;
