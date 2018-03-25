//logs.js
const util = require('../../utils/util.js')
const lifestyleUtil = require('../../utils/lifestyle.js')
const weatherInfoUtil = require('../../utils/weatherInfo.js')
const stringUtil = require('../../utils/stringUtil.js')
const dateUtils = require('../../utils/dateUtils.js')
const colorUtils = require('../../utils/colorUtils.js')
const app = getApp

Page({
  data: {
    //实况天气api
    nowUrl: 'https://free-api.heweather.com/s6/weather/now?',
    //空气质量api
    airUrl: 'https://free-api.heweather.com/s6/air/now?', 
    //生活指数
    LifestyleUrl: 'https://free-api.heweather.com/s6/weather/lifestyle?',
    //3-10天天气预报
    forecastUrl: 'https://free-api.heweather.com/s6/weather/forecast?',
    //24小时内逐三小时的预报数据
    hourlyUrl: 'https://free-api.heweather.com/s6/weather/hourly?',

    //背景图片
    bgSrc: '',
    //是否显示弹框
    showModel: false,
    //经纬度
    location: "",
    key: 'f2205ce5e6a1448eb0711e53581f559c', 
    //地址
    location_area: "",
    //温度
    tmp_str:0,
    //天气
    cond_str: "",
    //风
    swiperList: [],
    //空气质量分数
    airScore: "",
    //空气质量等级
    airLayer: "",
    pm25: '',
    pm10: '',
    so2: '',
    no2: '',
    o3: '',
    co: '',
    essayList: [],
    essay_str: '你若安好，便是晴天~',
    airColor: '#ebcd55',

    //今明两天天气
    today_weather: '',
    today_temp: '',
    today_weather_icon: '../../img/status/100.png',
    tomorrow_weather: '',
    tomorrow_temp: '',
    tomorrow_weather_icon: '../../img/status/100.png',

    //逐三小时的预报
    hourlyList: [],

    //七天天气预报
    forecastList:[],

    //生活指数
    lifestyleList: [],
    showLifestyleModel: false,
    lifestyleTitle: '舒适度',
    lifestyleContent: '很舒服',
    lifestyleDialogColor: '#',
  },

  onLoad: function () {
    this.getWeather()
  },

  //获取地址以及天气信息
  getLocation: function(){
    
    //that代表当前Page实例
    var that = this
    wx.getLocation({
      type: '',
      altitude: true,
      success: function(res) {
        console.log("获取地理位置成功" + ", 经度：" + res.longitude + "，纬度：" + res.latitude)
        that.setData({
          location: res.longitude + "," + res.latitude
        })
        that.loadWeatherInfo(that.data.location)
      },
      fail: function(res) {
        wx.showToast({
          title: '获取地理位置失败',
        })
      },
      complete: function(res) {},
    })
  },

  loadWeatherInfo: function(locationParams){
    var requestParams = "location=" + locationParams + "&key=" + this.data.key
    var weatherUrl = this.data.nowUrl + requestParams
    console.log(weatherUrl)
    var lifeUrl = this.data.LifestyleUrl + requestParams
    var forecastRealUrl = this.data.forecastUrl + requestParams
    var hourlyRealUrl = this.data.hourlyUrl + requestParams
    this.requestNowWeather(weatherUrl)
    this.requestLifestyle(lifeUrl)
    this.requestForecast(forecastRealUrl)
    this.requestHourly(hourlyRealUrl)
  },

  //加载当前实况天气
  requestNowWeather: function(nowWeatherUrl){
    var that = this
    wx.request({
      url: nowWeatherUrl,
      success: function (res) {
        console.log("加载实况天气成功")
        console.log(res)
        var weatherBean = res.data.HeWeather6[0]
        that.setData({
          location_area: weatherBean.basic.parent_city + " " + weatherBean.basic.location,
          tmp_str: weatherBean.now.tmp + "°",
          cond_str: weatherBean.now.cond_txt,
          swiperList: [weatherBean.now.wind_dir + " " + weatherBean.now.wind_sc, '湿度 ' + weatherBean.now.hum + '%'],
          essay_str: weatherInfoUtil.getWeatherEssay(weatherBean.now.cond_code),
          bgSrc: weatherInfoUtil.getWeatherBg(weatherBean.now.cond_code),
        })
        //获取到城市名后加载空气质量
        var airRealUrl = that.data.airUrl + "location=" + weatherBean.basic.parent_city + "&key=" + that.data.key
        that.requestAir(airRealUrl)
      },
      fail: function (res) {
        console.log(res.data)
      },

    })
  },

  //加载空气质量
  requestAir: function (airRealUrl){
    var that = this
    wx.request({
      url: airRealUrl,
      success: function (res) {
        console.log("加载空气信息成功")
        console.log(res)
        var weatherAirBean = res.data.HeWeather6[0]
        that.setData({
          airScore: weatherAirBean.air_now_city.aqi,
          airLayer: weatherAirBean.air_now_city.qlty,
          pm25: weatherAirBean.air_now_city.pm25,
          pm10: weatherAirBean.air_now_city.pm10,
          so2: weatherAirBean.air_now_city.so2,
          no2: weatherAirBean.air_now_city.no2,
          o3: weatherAirBean.air_now_city.o3,
          co: weatherAirBean.air_now_city.co,
          airColor: colorUtils.changeAirColor(weatherAirBean.air_now_city.qlty)
        })
      },
      fail: function(res){
        console.log("加载空气信息失败")
      },
      
      complete: function(res){
        //关闭下拉刷新
        console.log("关闭下拉刷新")
        wx.stopPullDownRefresh()
      },
      
    })
  },

  //生活指数
  requestLifestyle: function(lifeUrl){
    var that = this
    wx.request({
      url: lifeUrl,
      success: function (res) {
        console.log("加载生活指数成功")
        console.log(res)
        var lifestyleArray = res.data.HeWeather6[0].lifestyle
        for (var key in lifestyleArray){
          var lifestyleBean = lifestyleArray[key]
          lifestyleBean.icon = lifestyleUtil.getLifeStyleIcon(lifestyleBean.type)
          lifestyleBean.color = lifestyleUtil.getLifestyleColor(lifestyleBean.type)
          //放在最后
          lifestyleBean.type = lifestyleUtil.formatLifestyleType(lifestyleBean.type)
          lifestyleBean.id = key
        }
        that.setData({
          lifestyleList: res.data.HeWeather6[0].lifestyle
        })
      },
      fail: function (res) {

      }
    })
  },

  //未来三天天气
  requestForecast: function(forecastRealUrl){
    var that = this
    wx.request({
      url: forecastRealUrl,
      success: function (res) {
        console.log("加载未来三天天气成功")
        console.log(res)
        var foreBean = res.data.HeWeather6[0]
        that.setData({
          //今明两天预报
          today_weather: foreBean.daily_forecast[0].cond_txt_d, 
          today_temp: foreBean.daily_forecast[0].tmp_max + '/' + foreBean.daily_forecast[0].tmp_min + '°C',
          today_weather_icon: weatherInfoUtil.getWeatherIcon(foreBean.daily_forecast[0].cond_code_d),
          tomorrow_weather: foreBean.daily_forecast[1].cond_txt_d,
          tomorrow_temp: foreBean.daily_forecast[1].tmp_max + '/' + foreBean.daily_forecast[1].tmp_min + '°C',
          tomorrow_weather_icon: weatherInfoUtil.getWeatherIcon(foreBean.daily_forecast[1].cond_code_d),
        })
        //七天预报
        var dailyForecast = res.data.HeWeather6[0].daily_forecast
        for(var key in dailyForecast){
          var forecastBean = dailyForecast[key]
          forecastBean.day = dateUtils.formatDay(forecastBean.date, key)
          forecastBean.date = stringUtil.splitTime(forecastBean.date)
          forecastBean.forecastIcon = weatherInfoUtil.getWeatherIcon(forecastBean.cond_code_d)
          forecastBean.tmp = forecastBean.tmp_max + "/" + forecastBean.tmp_min + "°C"
          forecastBean.wind_sc = stringUtil.appendStr(forecastBean.wind_sc)
        }
        that.setData({
          forecastList: dailyForecast
        })
      },
      fail: function (res) {

      }
    })
  },

  //加载24小时内逐三小时的预报数据
  requestHourly: function(hourlyRealUrl){
    var that = this
    wx.request({
      url: hourlyRealUrl,
      success: function(res){
        console.log('加载24小时内逐三小时数据成功')
        console.log(res)
        var hourlyBeanArray = res.data.HeWeather6[0].hourly
        for(var key in hourlyBeanArray){
          var hourlyBean = hourlyBeanArray[key]
          hourlyBean.time = stringUtil.splitStr(hourlyBean.time)
          hourlyBean.hourlyIcon = weatherInfoUtil.getWeatherIcon(hourlyBean.cond_code)
          hourlyBean.tmp = hourlyBean.tmp + '°'
        }
        that.setData({
          hourlyList: hourlyBeanArray,
        })
      },
      fail: function(){

      },
    })
  },

  //显示空气质量显示框
  showAirModel: function(e){
    this.setData({
      showModel: true
    })
  },

  //隐藏空气质量显示框
  hideModel: function(e){
    this.setData({
      showModel: false
    })
  },

  //显示生活指数详情dialog
  showLifestyleDialog: function (event) {
    var index = event.currentTarget.dataset.id
    this.setData({
      lifestyleTitle: this.data.lifestyleList[index].type + '指数',
      lifestyleContent: this.data.lifestyleList[index].txt,
      lifestyleDialogColor: this.data.lifestyleList[index].color,
      showLifestyleModel: true,
    })
  },

  hideLifestyleModel: function(e){
    this.setData({
      showLifestyleModel: false,
    })
  },

  onPullDownRefresh: function(){
    this.getWeather()
  },

  onShareAppMessage: function(){

  },

  //选择地址后回调
  chooseLocation: function(){
    var that = this
    wx.chooseLocation({
      success: function (res) {
        var choosedLocation = res.longitude + ',' + res.latitude
        console.log("chooseLocation------------>" + res.longitude + ',' + res.latitude)
        that.loadWeatherInfo(choosedLocation)
      },
    })
  },

  //打赏
  award: function(){
    wx.previewImage({
      urls: ['https://upload-images.jianshu.io/upload_images/4240944-0065fd6f185c9276.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700'],
    })
  },

  //分享
  share: function(){
    
  },

  //联系作者
  contact: function(){
    wx.navigateTo({
      url: '../../pages/author/author',
    })
  },
  
  getWeather: function(){
    this.getLocation()
  },

})
