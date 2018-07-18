module.exports = function (api, path, params) {
  console.log(`${api}${path}`)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}${path}`,
      data: params,
      // header: { 'Content-Type': 'json' },
      success: function (res) {
        console.log(res)
        checkCode(resolve, res.data)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * 验证返回的的code码问题
 * @param {*} resolve
 * @param {*} res 返回的data
 */
const checkCode = (resolve, res) => {
  if (res.errorCode === 0) {
    resolve(res)
  } else {
    wx.showToast({
      title: res.errorMsg,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  }
}