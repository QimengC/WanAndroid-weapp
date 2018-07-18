// pages/me/me.js
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

  blogClick: function() {
    wx.navigateTo({
      url: '../content/content?link=https://www.jianshu.com/u/2b048d34e968'
    })
  },

  githubClick: function() {
    wx.navigateTo({
      url: '../content/content?link=https:https://github.com/QimengC/WanAndroid-weapp'
    })
  }
})