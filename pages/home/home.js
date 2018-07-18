// pages/home/home.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper 图片 
    bannerList: [],
    // swiper 点 
    indicatorDots: true,
    // swiper 自动切换
    autoplay: true,
    // swiper 自动播放时长
    interval: 3000,
    // swiper 切换时长
    duration: 500,

    // 文章列表
    articleList: [],
    page: 0,
    hasMore: true,
    // 判断是不是在加载数据
    isLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner();
    this.getArticle('down');
  },

  getBanner() {
    app.api
      .banner({})
      .then(res => {
        this.setData({
          bannerList: res.data
        })
      })
      .catch(e => {
        // 错误流展示
        wx.showToast({ title: `网络错误!`, duration: 1000, icon: "none" })
      })
  },

  // type  up/down
  getArticle(type) {
    // var params = {}
    this.setData({
      isLoading: true,
      hasMore: true
    })
    app.api
      .article({},this.data.page) 
      .then(res =>{
        if(res.data.datas.length) {
          res.data.datas.map(v => {
            return v.publishTime = util.formatTime(new Date(v.publishTime))
          })
          if (type === 'up') {
            this.setData({
              isLoading: false,
              page: res.data.curPage,
              articleList: this.data.articleList.concat(res.data.datas)
            })
          } else {
            this.setData({
              isLoading: false,
              page: res.data.curPage,
              articleList: res.data.datas,
            })
          }
        } else {
          this.setData({
            isLoading: false,
            hasMore: false
          })
        }
      })
      .catch(e =>{
        // 错误流展示
        wx.stopPullDownRefresh()
        wx.showToast({ title: `网络错误!`, duration: 1000, icon: "none" })
      })
  },

  onItemClick: function(e) {
    var link = e.currentTarget.dataset.link;
    console.log('home:' + link)
    wx.navigateTo({
      url: '../content/content?link='+link,
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page:0,
    })
    this.getBanner();
    this.getArticle('down');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 如果正在加载数据就不重复加载 
    if(this.data.isLoading) {
      return;
    }
    this.getArticle('up')
  },

})