
var lifestyleTypeMap = {comf: '舒适度', cw: '洗车', drsg: '穿衣', flu: '感冒', sport: '运动', trav: '旅游', uv: '紫外线', air: '空气污染'}

var lifestyleIconMap = {comf: '../../img/comfort.png', cw: '../../img/car_wash.png', drsg: '../../img/clothes.png', flu: '../../img/pill.png', sport: '../../img/sport.png', trav: '../../img/travel.png', uv: '../../img/sunshine.png', air: '../../img/air.png' }

var lifestyleColorMap = {comf: '#BCE3D8', cw: '#C3E1B0', drsg: '#D0ABC2', flu: '#DCCEB1', sport: '#DCD9AE', trav: '#86D0EC', uv: '#D9BCB8', air: '#43B06A'}

function formatLifestyleType(params){
  if (lifestyleTypeMap.hasOwnProperty(params)){
    return lifestyleTypeMap[params]
  }
}

function getLifeStyleIcon(params){
  if (lifestyleIconMap.hasOwnProperty(params)) {
    return lifestyleIconMap[params]
  }
}

function getLifestyleColor(params){
  if (lifestyleColorMap.hasOwnProperty(params)) {
    return lifestyleColorMap[params]
  }
}



module.exports = {
  formatLifestyleType: formatLifestyleType,
  getLifeStyleIcon: getLifeStyleIcon,
  getLifestyleColor: getLifestyleColor,
}