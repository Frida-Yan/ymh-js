function isPrime(n) {
  // 先假设传入的数字是质数
  var flag = true
  for (var i = 2; i <= n / 2; i++) {
    if (n % i === 0) {
      //进入这个判断，就说明不是质数
      flag = false
      break
    }
  }
  // 循环结束，得到flag的最终结果
  return flag
}
