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

// 设置 cookie
function setCookie(key, value, expires) {
  if (expires) {
    var time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
  }
  document.cookie = `${ key }=${ value };expires=${ time }`
}

// 删除 cookie
function delCookie(key) {
  setCookie(key, '', -1)
}

// 获取 cookie
function getCookie() {
  var obj = {}
  document.cookie.split('; ').forEach(function (item) {
    var t = item.split('=')
    obj[t[0]] = t[1]
  })
  return obj
}
