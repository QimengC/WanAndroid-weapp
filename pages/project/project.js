// pages/project/project.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectList:[],
    hasMore:false,
    pageNo:1,
    hasMore: false,
    isLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData('down')
  },

  getData(type) {
    console.log("pageNo",this.data.pageNo)
    this.setData({
      isLoading: true,
      hasMore: true
    }),
    app.api
      .listProject(
        {"cid":"294"},
        this.data.pageNo)
      .then(res =>{
        if (res.data.datas.length) {
          res.data.datas.map(v => {
            return v.desc = v.desc.substring(0,79)
          })
          if (type === 'up') {
            this.setData({
              isLoading: false,
              pageNo: res.data.curPage + 1,
              projectList: this.data.projectList.concat(res.data.datas)
            })
          } else {
            wx.stopPullDownRefresh();
            this.setData({
              isLoading: false,
              pageNo: res.data.curPage + 1,
              projectList: res.data.datas,
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
        wx.stopPullDownRefresh()
        wx.showToast({ title: `网络错误!`, duration: 1000, icon: "none" })
        this.setData({
          isLoading: false,
          hasMore: false
        })
      })
  },

  onItemClick: function (e) {
    var link = e.currentTarget.dataset.link;
    console.log('home:' + link)
    wx.navigateTo({
      url: '../content/content?link=' + link,
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNo: 0,
    })
    this.getData('down');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLoading) {
      return;
    }
    this.getData('up')
  },

})