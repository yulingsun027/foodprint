// pages/profile/profile.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: { 
    currentUser:{},
    gender:'',
    age:0,
    height:0,
    weight:0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo,
    });
    let tableName = "updateuser";
  
    let Profile = new wx.BaaS.TableObject(tableName);
    let query = new wx.BaaS.Query();

    query.compare('userid', '=',app.globalData.userInfo.id);
    Profile.setQuery(query).expand(['userid']).find().then((res) =>{
      console.log('userinfo', res);
      this.setData({
        gender: res.data.objects[0].customgender,
        age:res.data.objects[0].age,
        height:res.data.objects[0].height,
        weight:res.data.objects[0].weight,
      })
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

    this.setData({
      currentUser: app.globalData.userInfo,
    });
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})