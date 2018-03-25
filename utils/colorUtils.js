//优，良，轻度污染，中度污染，重度污染，严重污染


function changeAirColor(params){
  switch(params){
    case '优':
      return '#ADD574'
    case '良':
      return '#ebcd55'
    case '轻度污染':
      return '#E8AD6F'
    case '中度污染':
      return '#E3857B'
    case '重度污染':
      return '#AD8EC7'
    case '严重污染':
      return '#A67A89'
  }
}

module.exports = {
  changeAirColor: changeAirColor,
}