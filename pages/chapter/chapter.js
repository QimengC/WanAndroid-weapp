// pages/chapter/chapter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabList
    tabList:[],
    // 选中的TabId
    selectedId : 0,
    articleList:[],
    pageNo:0,
    hasMore: true,
    // 判断是不是在加载数据
    isLoading: false,
    isShowBottom:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = options.name;
    wx.setNavigationBarTitle({
      title: name,
    })
    var content = JSON.parse(options.content);
    var list = [];
    for (var p in content) {
      var item = {};
      item['id'] = content[p].id;
      item['title'] = content[p].name; 
      list.push(item);
    }
    this.setData({
      tabList: list,
      selectedId:list[0].id
    })

    this.getData(list[0].id,'down');
  },

  getData(id,type) {
    
    this.setData({
      isLoading: true,
      hasMore:true,
      isShowBottom: true
    })
    wx.showLoading({
      title: '加载数据中...',
    })
    app.api
      .listChapter(
        {'cid':id},
        this.data.pageNo 
      )
      .then(res =>{
        wx.hideLoading();
        if (res.data.datas.length) {
          if (type === 'up') {
            this.setData({
              isLoading: false,
              pageNo: res.data.curPage,
              articleList: this.data.articleList.concat(res.data.datas)
            })
          } else {
            wx.stopPullDownRefresh(),
            this.setData({
              isLoading: false,
              pageNo: res.data.curPage,
              articleList: res.data.datas,
            })
            if (res.data.datas.length < 20) {
              this.setData({
                isShowBottom: false
              })
            }
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
        wx.hideLoading();
      })
  },

  onTabChanged(e) {
    // console.log(e.detail);
    this.setData({
      selectedId:e.detail
    })
    this.getData(e.detail,'down')
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
      page: 0,
    })
    this.getData(this.data.selectedId,'down')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 如果正在加载数据就不重复加载 
    if (this.data.isLoading) {
      return;
    }
    this.getData(this.data.selectedId,'up')
  },

})