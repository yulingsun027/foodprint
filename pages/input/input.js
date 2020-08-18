// pages/input/input.js
const app = getApp();
const moment = require("../../utils/moment");
Page({
  /**
   * Page initial data
   */
  data: {
    currentUser:{},
    meal:['Breakfast', 'Lunch', 'Dinner'],
    usermeal:'',
    type:['Delivery', 'Home-cooked', 'Restaurant'],
    usertype:'',
    mood:['1', '2', '3', '4', '5'],
    usermood:0,
    usercost:0,
    date: moment().format('YYYY-MM-DD')
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  pickMeal: function(event) {
    let index = event.detail.value;
    console.log(index);
    this.setData({
      usermeal: this.data.meal[index]
    })
  },
  pickType: function(event) {
    let index = event.detail.value;
    console.log(index);
    this.setData({
      usertype: this.data.type[index]
    })
  },
  pickMood: function(event) {
    let index = event.detail.value;
    console.log(index);
    this.setData({
      usermood: this.data.mood[index]
    })
  },

sliderchange: function (event){
  console.log(event.detail.value);
  this.setData({
    usermood:event.detail.value
  })
},

bindCostInput: function(e){
  this.setData({
    usercost: parseInt(e.detail.value)
  })
  }, 
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo,
    });
  },
  viewTab: function(e){
    let name = e.currentTarget.dataset.name;
    this.setData({
      tabName: name
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  formSubmit:function(event){
    console.log('mealinfo', event);
    let Meal = new wx.BaaS.TableObject('meals');
    let mealinfo = Meal.create();
    console.log(this.data);
    let data = {
        // review's content and rating
        meal: this.data.usermeal,
        location:this.data.usertype,
        cost: this.data.usercost,
        date: this.data.date,
        mood:this.data.usermood,
        userid: this.data.currentUser.id
    };
    mealinfo.set(data).save().then(res => {
      console.log('log a meal', res);
      wx.showToast({
        title: 'meal logged!',
        icon:'success',
        duration:2000,
        mask: true
      })
      this.setData({
      usermeal:'',
      usertype:'',
      usermood:0,
      usercost:0,
      date: moment().format('YYYY-MM-DD')
      })
    })
  },

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