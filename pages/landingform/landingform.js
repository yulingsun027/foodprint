// pages/landing form/landingform.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  formSubmit: function (event){
    console.log('update user profile', event);
    let Profile = new wx.BaaS.TableObject('_userprofile');
    let myProfile = Profile.create();
    console.log(this.data);
    let data = {
        // review's content and rating
        userName: this.data.currentUser.nickname,
        userAvatar: this.data.currentUser.avatar,
        gender: this.data.gender,
        age:this.data.age,
        height: this.data.height,
        weight: this.data.weight,
    };

    myProfile.set(data).save().then(res => {
      console.log('save userprofile', res);
      wx.switchTab({
        url: '/pages/profile/profile',
      })                                          
    })
  },
  
  onLoad: function (options) {

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