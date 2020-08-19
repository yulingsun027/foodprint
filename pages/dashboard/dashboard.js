// pages/dashboard/dashboard.js
const app = getApp();
const moment = require("../../utils/moment");
Page({
  /**
   * Page initial data
   */
  data: {
    currentUser:{},
  
    dailyMeals:[],
    weeklyMeals:[],
    homePercentage:0,
    restaurantPercentage:0,
    deliveryPercentage:0,
    homeCost:0,
    
    // weeklyHomePercentage:0,
    // weeklyRestaurantPercentage:0,
    // weeklyDeliveryPercentage:0

  },

  /**
   * Lifecycle function--Called when page load
   */
  userInfoHandler: function(data){
    wx.BaaS.auth.loginWithWechat(data).then(user =>{
      app.globalData.userInfo = user;
      wx.setStorageSync('userInfo', user);
      this.setData({
        currentUser: user
      })
      wx.switchTab({
        url: '/pages/profile/profile',
      })
    });
  },

  percentCalc: function(arg){
    
  },

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
//home cooked percentage
      
      const homecookObject = res.data.objects.filter(item => item.location === 'Home-cooked');
      console.log(homecookObject);
      let homepercentage = Math.round(homecookObject.length/res.data.objects.length * 100);
      console.log(homepercentage);
      this.setData({
        homePercentage: homepercentage
      });

//calculate the daily home cost

      let homeCost = homecookObject.map(item => item.cost);
      let total = 0;
      for (let i = 0; i< homeCost.length; i++){
        total += homeCost[i]
      };
      let avg = total / homeCost.length;
      this.setData({
        homeCost: avg
      })
      console.log('homeavg', avg);


      
//restuarant percentage
      const restaurantObject = res.data.objects.filter(item => item.location === 'Restaurant').length;
      console.log(restaurantObject);
      let restaurantpercentage = Math.round(restaurantObject/res.data.objects.length * 100);
      console.log(restaurantpercentage);
      this.setData({
        restaurantPercentage: restaurantpercentage
      });
//delivery percentage
      const deliveryObject = res.data.objects.filter(item => item.location === 'Delivery').length;
      console.log(deliveryObject);
      let deliverypercentage = Math.round(deliveryObject/res.data.objects.length * 100);
      console.log("DEL", deliverypercentage);
      this.setData({
        deliveryPercentage: deliverypercentage
      });

    })
  
  //delivery percentage
      
    },

//weekly data
subtractWeek:function(){
  let tableName = "meals";
  let Meal = new wx.BaaS.TableObject(tableName);
  //set daily filter 
  let weekly = moment().subtract(7, 'days')._d;
  //convert the format to YYYY-MM-DD
  let lastWeek = weekly.getFullYear() + '-' + (weekly.getMonth() + 1) + '-' + weekly.getDate(); 

  let query = new wx.BaaS.Query();
  query.compare('date', '>', lastWeek);
  Meal.setQuery(query).find().then((res) =>{
    console.log('weekly meal', res);
    this.setData({
      weeklyMeals: res.data.objects
    })
//home cooked percentage
    
    const homecookObject = res.data.objects.filter(item => item.location === 'Home-cooked').length;
    console.log(homecookObject);
    let homepercentage = Math.round(homecookObject/res.data.objects.length * 100);
    console.log(homepercentage);
    this.setData({
      homePercentage: homepercentage
    });
//restuarant percentage
    const restaurantObject = res.data.objects.filter(item => item.location === 'Restaurant').length;
    console.log(restaurantObject);
    let restaurantpercentage = Math.round(restaurantObject/res.data.objects.length * 100);
    console.log(restaurantpercentage);
    this.setData({
      restaurantPercentage: restaurantpercentage
    });
//delivery percentage
    const deliveryObject = res.data.objects.filter(item => item.location === 'Delivery').length;
    console.log(deliveryObject);
    let deliverypercentage = Math.round(deliveryObject/res.data.objects.length * 100);
    console.log("DEL", deliverypercentage);
    this.setData({
      deliveryPercentage: deliverypercentage
    });

  })

  },



  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo,
    });
    // this.subtractWeek();
    
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