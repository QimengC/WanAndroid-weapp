//app.js
const api = require('./utils/api.js')
App({
  onLaunch: function () {

  },
  api: api,
  globalData: {
    userId: '',
  }
})