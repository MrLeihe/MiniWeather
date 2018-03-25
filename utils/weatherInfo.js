
var weatherIconMap = { 100: '../../img/status/100.png', 101: '../../img/status/101.png', 102: '../../img/status/102.png', 103: '../../img/status/103.png', 104: '../../img/status/104.png', 200: '../../img/status/200.png', 201: '../../img/status/201.png', 202: '../../img/status/202.png', 203: '../../img/status/203.png', 204: '../../img/status/204.png', 205: '../../img/status/205.png', 206: '../../img/status/206.png', 207: '../../img/status/207.png', 208: '../../img/status/208.png', 209: '../../img/status/209.png', 210: '../../img/status/210.png', 211: '../../img/status/211.png', 212: '../../img/status/212.png', 213: '../../img/status/213.png', 300: '../../img/status/300.png', 301: '../../img/status/301.png', 302: '../../img/status/302.png', 303: '../../img/status/303.png', 304: '../../img/status/304.png', 305: '../../img/status/305.png', 306: '../../img/status/306.png', 307: '../../img/status/307.png', 309: '../../img/status/309.png', 310: '../../img/status/310.png', 311: '../../img/status/311.png', 312: '../../img/status/312.png', 313: '../../img/status/313.png', 400: '../../img/status/400.png', 401: '../../img/status/401.png', 402: '../../img/status/402.png', 403: '../../img/status/403.png', 404: '../../img/status/404.png', 405: '../../img/status/405.png', 406: '../../img/status/406.png', 407: '../../img/status/407.png', 500: '../../img/status/500.png', 501: '../../img/status/501.png', 502: '../../img/status/502.png', 503: '../../img/status/503.png', 504: '../../img/status/504.png', 507: '../../img/status/505.png', 508: '../../img/status/506.png', 900: '../../img/status/900.png', 901: '../../img/status/901.png', 999: '../../img/status/999.png', }

var weatherEssayMap = { 100: '你若安好，便是晴天~', 101: '光芒透过云缝，撒向大地~', 104: '天暗下来，你就是阳光~', 300: '今天有阵雨，出门记得带伞~', 301: '今天有强阵雨，出门记得带伞~', 302: '今天有雷阵雨，出门记得带伞~', 303: '今天有强雷阵雨，出门注意安全~', 400: '今天有小雪，出门多穿衣服~', 502: '雾霾天，出门记得戴口罩~', 901: '天冷了，多穿点衣服~', }

var weatherDaytimeBg = { 100: 'https://cdn.dribbble.com/users/780072/screenshots/2227157/attachments/414101/Sun.png'}

var weatherNightBg = { 100: 'https://cdn.dribbble.com/users/780072/screenshots/2227157/attachments/414100/Moon.png'}

function getWeatherIcon(params) {
  if (weatherIconMap.hasOwnProperty(params)) {
    return weatherIconMap[params]
  }
}

function getWeatherEssay(params){
  if (weatherEssayMap.hasOwnProperty(params)) {
    return weatherEssayMap[params]
  }
}

function getWeatherBg(params){
  var date = new Date()
  var hour = date.getHours()
  if (hour > 18 || hour < 8) {
    if (weatherNightBg.hasOwnProperty(params)){
      return weatherNightBg[params]
    }else{
      return weatherNightBg[100]
    }
  } else {
    if (weatherDaytimeBg.hasOwnProperty(params)) {
      return weatherDaytimeBg[params]
    } else {
      return weatherDaytimeBg[100]
    }
  }
}

module.exports = {
  getWeatherIcon: getWeatherIcon,
  getWeatherEssay: getWeatherEssay,
  getWeatherBg: getWeatherBg,
}