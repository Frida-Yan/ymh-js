import First from "./components/first.js";
import Second from "./components/second.js";
const routers = [
  { name: "/first", component: First },
  { name: "/second", component: Second },
  { name: "/", redirect: "/first" },
];
export default routers;
