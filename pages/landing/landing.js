//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentUser: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  userInfoHandler: function(data){
    wx.BaaS.auth.loginWithWechat(data).then(user =>{
      app.globalData.userInfo = user;
      wx.setStorageSync('userInfo', user);
      this.setData({
        currentUser: user
      })
    });
    wx.switchTab({
      url: '/pages/profile/profile',
    })
  },

  onLoad: function () {
    this.setData({
      currentUser: app.globalData.userInfo,
    });
  },
  
  onShow: function () {
    this.setData({
      currentUser: app.globalData.userInfo,
    });

  },



})