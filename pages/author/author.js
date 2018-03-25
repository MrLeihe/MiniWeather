// pages/author/author.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  copy_wechat: function(){
    wx.setClipboardData({
      data: 'hl1484542698',

      success(res){
        wx.showToast({
          title: '已复制到剪切板',
        })
      },
    })
  },

  rewardAuthor: function(res){
    wx.previewImage({
      urls: ['https://upload-images.jianshu.io/upload_images/4240944-0065fd6f185c9276.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700'],
    })
  }
})