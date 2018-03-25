
function formatDay(time, index){
  var date = new Date(time)
  var day = date.getDay()
  if(index == 0){
    return '今天'
  }else if(index == 1){
    return '明天'
  }else if(index == 2){
    return '后天'
  }else{
    return getWeak(day)
  }
}

function getWeak(day){
  switch (day) {
    case 0:
      return '周日'
    case 1:
      return '周一'
    case 2:
      return '周二'
    case 3:
      return '周三'
    case 4:
      return '周四'
    case 5:
      return '周五'
    case 6:
      return '周六'
    default:
      break
  }
}

module.exports = {
  formatDay: formatDay,
}