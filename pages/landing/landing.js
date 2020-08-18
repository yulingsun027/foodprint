//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // currentUser: [],
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    movies:[  
      {url:'../images/Frame_1.jpg'}, 
      {url:'../images/Frame_2.jpg'}, 
      {url:'../images/Frame_3.jpg'}, 
      ]  
  },
  
  formSubmit:function(){
    wx.switchTab({
      url: '/pages/dashboard/dashboard',
    })
  },

  // userInfoHandler: function(data){
  //   wx.BaaS.auth.loginWithWechat(data).then(user =>{
  //     app.globalData.userInfo = user;
  //     wx.setStorageSync('userInfo', user);
  //     this.setData({
  //       currentUser: user
  //     })
  //     wx.navigateTo({
  //       url: '/pages/landingform/landingform',
  //     })
  //   });
  // },

  onLoad: function () {
    // this.setData({
    //   currentUser: app.globalData.userInfo,
    // });
  },
  
  onShow: function () {
    // this.setData({
    //   currentUser: app.globalData.userInfo,
    // });

  },
})

