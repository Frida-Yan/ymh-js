// 这是一个正则的模块
function test(reg) {
  return function (str) {
    return reg.test(str);
  };
}
// 生成一个验证密码的函数
export const testPwd = test(/^\w{6,12}$/);
export const testName = test(/^\w{7,12}$/);
