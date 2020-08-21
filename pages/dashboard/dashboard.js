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
    restaurantCost:0,
    deliveryCost:0,
    mealsCost:0,
    homecostPerc:0,
    rescostPerc:0,
    delicostPerc:0,
    mood:0

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

  
  subtractDay:function(){
    let tableName = "meals";
    let Meal = new wx.BaaS.TableObject(tableName);
    //set daily filter 
    let daily = moment().subtract(1, 'days')._d;
    //convert the format to YYYY-MM-DD
    let yesterday = daily.getFullYear() + '-' + (daily.getMonth() + 1) + '-' + daily.getDate(); 

    let query1 = new wx.BaaS.Query();
    query1.compare('date', '>', yesterday);
    let query2 = new wx.BaaS.Query();
    query2.compare('userid', '=',app.globalData.userInfo.id);
    let andQuery = wx.BaaS.Query.and(query1, query2);
    Meal.setQuery(andQuery).find().then((res) =>{
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
      let homeTotal = 0;
      for (let i = 0; i< homeCost.length; i++){
        homeTotal += homeCost[i]
      };
      let avg = homeTotal / homeCost.length;
      this.setData({
        homeCost: homeTotal
      });
      console.log('homeavg', homeTotal);


      
//restuarant percentage
      const restaurantObject = res.data.objects.filter(item => item.location === 'Restaurant');
      console.log(restaurantObject);
      let restaurantpercentage = Math.round(restaurantObject.length/res.data.objects.length * 100);
      console.log(restaurantpercentage);
      this.setData({
        restaurantPercentage: restaurantpercentage
      });

//restautant cost
      let restaurantCost = restaurantObject.map(item => item.cost);
      let resTotal = 0;
      for (let i = 0; i< restaurantCost.length; i++){
        resTotal += restaurantCost[i]
      };
      let resAvg = resTotal / restaurantCost.length;
      this.setData({
        restaurantCost: resTotal
      })
      console.log('homeavg', resTotal);


//delivery percentage
      const deliveryObject = res.data.objects.filter(item => item.location === 'Delivery');
      console.log(deliveryObject);
      let deliverypercentage = Math.round(deliveryObject.length/res.data.objects.length * 100);
      console.log("DEL", deliverypercentage);
      this.setData({
        deliveryPercentage: deliverypercentage
      });

//delivery cost
      let deliveryCost = deliveryObject.map(item => item.cost);
      let deliTotal = 0;
      for (let i = 0; i< deliveryCost.length; i++){
        deliTotal += deliveryCost[i]
      };
      let deliAvg = deliTotal / deliveryCost.length;
      this.setData({
        deliveryCost: deliTotal
      })
      console.log('homeavg', deliTotal);

//calculate total cost and percentage
      let totalCost = homeTotal + resTotal + deliTotal;
      let homePerc = (homeTotal/totalCost)*100;
      let resPerc = (resTotal/totalCost)*100;
      let deliPerc = (deliTotal/totalCost)*100;
      console.log("perandcost", homePerc, resPerc, deliPerc, totalCost)
      this.setData({
        mealsCost:totalCost,
        homecostPerc: homePerc,
        rescostPerc: resPerc,
        delicostPerc: deliPerc
      })

//calculate satisfaction data
    let mood = res.data.objects.map(item => item.mood);
    let moodTotal = 0;
    for (let i = 0; i< mood.length; i++){
      moodTotal += mood[i]
    };
    let moodAvg = Math.floor(moodTotal / mood.length);
    this.setData({
      mood: moodAvg
    })
    console.log('moodsavg', moodAvg);
    })

    },

//weekly data
subtractWeek:function(){
  let tableName = "meals";
  let Meal = new wx.BaaS.TableObject(tableName);
  //set daily filter 
  let weekly = moment().subtract(7, 'days')._d;
  //convert the format to YYYY-MM-DD
  let lastWeek = weekly.getFullYear() + '-' + (weekly.getMonth() + 1) + '-' + weekly.getDate(); 

  let query1 = new wx.BaaS.Query();
    query1.compare('date', '>', lastWeek);
  let query2 = new wx.BaaS.Query();
    query2.compare('userid', '=',app.globalData.userInfo.id);
  let andQuery = wx.BaaS.Query.and(query1, query2);
  Meal.setQuery(andQuery).find().then((res) =>{
    console.log('weekly meal', res);
    this.setData({
      weeklyMeals: res.data.objects
    })
//home cooked percentage
    
    const homecookObject = res.data.objects.filter(item => item.location === 'Home-cooked');
    console.log(homecookObject);
    let homepercentage = Math.round(homecookObject.length/res.data.objects.length * 100);
    console.log(homepercentage);
    this.setData({
      homePercentage: homepercentage
    });

    let homeCost = homecookObject.map(item => item.cost);
      let homeTotal = 0;
      for (let i = 0; i< homeCost.length; i++){
        homeTotal += homeCost[i]
      };
      let avg = homeTotal / homeCost.length;
      this.setData({
        homeCost: homeTotal
      })
      console.log('homeavg', homeTotal);

//restuarant percentage
    const restaurantObject = res.data.objects.filter(item => item.location === 'Restaurant');
    console.log(restaurantObject);
    let restaurantpercentage = Math.round(restaurantObject.length/res.data.objects.length * 100);
    console.log(restaurantpercentage);
    this.setData({
      restaurantPercentage: restaurantpercentage
    });

    let restaurantCost = restaurantObject.map(item => item.cost);
      let resTotal = 0;
      for (let i = 0; i< restaurantCost.length; i++){
        resTotal += restaurantCost[i]
      };
      let resAvg = resTotal / restaurantCost.length;
      this.setData({
        restaurantCost: resTotal
      })
      console.log('homeavg', resTotal);


//delivery percentage
    const deliveryObject = res.data.objects.filter(item => item.location === 'Delivery');
    console.log(deliveryObject);
    let deliverypercentage = Math.round(deliveryObject.length/res.data.objects.length * 100);
    console.log("DEL", deliverypercentage);
    this.setData({
      deliveryPercentage: deliverypercentage
    });

    let deliveryCost = deliveryObject.map(item => item.cost);
      let deliTotal = 0;
      for (let i = 0; i< deliveryCost.length; i++){
        deliTotal += deliveryCost[i]
      };
      let deliAvg = deliTotal / deliveryCost.length;
      this.setData({
        deliveryCost: deliTotal
      })
      console.log('homeavg', deliTotal);

//calculate total cost and percentage
      let totalCost = homeTotal + resTotal + deliTotal;
      let homePerc = (homeTotal/totalCost)*100;
      let resPerc = (resTotal/totalCost)*100;
      let deliPerc = (deliTotal/totalCost)*100;
      console.log("perandcost", homePerc, resPerc, deliPerc, totalCost)
      this.setData({
        mealsCost:totalCost,
        homecostPerc: homePerc,
        rescostPerc: resPerc,
        delicostPerc: deliPerc
      });
    //calculate satisfaction data
    let mood = res.data.objects.map(item => item.mood);
    let moodTotal = 0;
    for (let i = 0; i< mood.length; i++){
      moodTotal += mood[i]
    };
    let moodAvg = Math.floor(moodTotal / mood.length);
    this.setData({
      mood: moodAvg
    })
    console.log('moodsavg', moodAvg);


  })

  },



  onLoad: function (options) {
    this.setData({
      currentUser: app.globalData.userInfo,
    });
  },

  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.setData({
      currentUser: app.globalData.userInfo,
    });
    this.subtractDay();
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