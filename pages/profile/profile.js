const { relativeTimeRounding } = require("../../utils/moment");

// pages/profile/profile.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: { 
    currentUser:{},
    gender:['female', 'male', 'neutral'],
    userGender:'',
    // customGender:'',
    age:0,
    height:0,
    weight:0,
    showReport: false,
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
    const page = this;
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
      const { userGender, age, height, weight } = page.data;
      page.checkUserData( userGender, age, height, weight)                              
    })
  },

  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo,
    });
    let tableName = "updateuser";
  
    let Profile = new wx.BaaS.TableObject(tableName);
    let query = new wx.BaaS.Query();

    query.compare('userid', '=',app.globalData.userInfo.id);
    Profile.setQuery(query).expand(['userid']).find().then((res) => {
      console.log('userinfo', res);
      const { customgender, age, height, weight } = res.data.objects[0];

      this.setData({
        userGender: customgender,
        age: age,
        height: height,
        weight: weight,
      });
      
      this.checkUserData(customgender, age, height, weight);
    });
  },

  checkUserData: function(customgender, age, height, weight) {
    if(customgender && age && height && weight) {
      this.setData({
        showReport: true
      });
      return;
    }
    this.setData({
      showReport: false
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