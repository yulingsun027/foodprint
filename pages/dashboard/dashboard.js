// pages/dashboard/dashboard.js
const app = getApp();
const moment = require("moment");
Page({

  /**
   * Page initial data
   */
  data: {
    currentUser:{},
    dailyMeals:[],
    dailyHomePercentage:0
    
    
  },

  /**
   * Lifecycle function--Called when page load
   */

  subtractDay:function(){
    let tableName = "meals";
    let Meal = new wx.BaaS.TableObject(tableName);
    //set daily filter 
    let daily = moment().subtract(1, 'days')._d;
    //convert the format to YYYY-MM-DD
    let yesterday = daily.getFullYear() + '-' + (daily.getMonth() + 1) + '-' + daily.getDate(); 

    let query = new wx.BaaS.Query();
    query.compare('date', '>', yesterday);
    Meal.setQuery(query).find().then((res) =>{
      console.log('daily meal', res);
      this.setData({
        dailyMeals: res.data.objects
      })

      const homecookObject = res.data.objects.filter(item => item.location === 'Home-cooked').length;
      console.log(homecookObject);
      let homepercentage = Math.round(homecookObject/res.data.objects.length * 100);
      console.log(homepercentage);
      this.setData({
        dailyHomePercentage: homepercentage
      });
      
    })
  },

  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo,
    });
    this.subtractDay();
    
    /*
    let tableName = "meals";
    let Meal = new wx.BaaS.TableObject(tableName);
    let daily = moment().subtract(1, 'days')._d;
    let daily_value = daily.getFullYear() + '-' + (daily.getMonth() + 1) + '-' + daily.getDate(); 
    console.log('daily',daily);
    console.log('daily_value',daily_value);
    // let query = new wx.BaaS.Query();
    // query.compare('date','=', daily);
    console.log(this.data.dailyMeals)
    */
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