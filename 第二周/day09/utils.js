// 获取时间差
function diffTime(t1, t2) {
  var sub = Math.ceil(Math.abs(t2 - t1) / 1000)
  return {
    day: parseInt(sub / (60 * 60 * 24)),
    hours: parseInt(sub % (60 * 60 * 24) / (60 * 60)),
    minutes: parseInt(sub % (60 * 60) / 60),
    seconds: sub % 60
  }
}
