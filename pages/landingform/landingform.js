// pages/landing form/landingform.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    currentUser:{},
    gender:['female', 'male', 'neutral'],
    userGender:'',
    age:0,
    height:0,
    weight:0

  },

  /**
   * Lifecycle function--Called when page load
   */
 pickGender: function(event) {
    let index = event.detail.value;
    console.log(index);
    this.setData({
      userGender: this.data.gender[index]
    })
  },

  bindAgeInput: function(e){
    this.setData({
      age: parseInt(e.detail.value)
    })
  }, 
  bindHeightInput: function(e){
    this.setData({
      height: parseInt(e.detail.value)
    })
  }, 
  bindWeightInput: function(e){
    this.setData({
      weight: parseInt(e.detail.value)
    })
  }, 

  formSubmit: function (event){
    console.log('update user profile', event);
    let Profile = new wx.BaaS.TableObject('updateuser');
    let myProfile = Profile.create();
    console.log(this.data);
    let data = {
        // update user profile
        // userName: this.data.currentUser.nickname,
        // userAvatar: this.data.currentUser.avatar,
        userid: this.data.currentUser.id,
        customgender: this.data.userGender,
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
    console.log(app.globalData)
    this.setData({
      currentUser: app.globalData.userInfo
    })
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