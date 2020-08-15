//app.js
App({
  onLaunch: function () {

    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)
    let clientID = '98ad8501ff3f35324114'  // 应用名称: foodprint
    wx.BaaS.init(clientID)

    // wx.BaaS.auth.loginWithWechat().then(user => {
    //   wx.setStorageSync('userInfo', user.toJSON());
    //   this.globalData.userInfo = user.toJSON();
    //   console.log('current user login',user)
    // }, err => {
    //   console.log('fail login')
    // })
  },
  globalData: {
    userInfo: wx.getStorageSync('userInfo') || null,
  }
})