// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getList();
  },

  getList() {
    app.api
      .listAll({})
      .then(res =>{
        this.setData({
          list: res.data
        })
      })
      .catch(e =>{

      })
  },


  chapterClick:function(e) {
    var name = e.currentTarget.dataset.name;
    var content = e.currentTarget.dataset.content;
    wx.navigateTo({
      url: '../chapter/chapter?name=' + name + '&content=' + JSON.stringify(content),
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
})