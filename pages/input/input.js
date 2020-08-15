// pages/input/input.js
Page({
  /**
   * Page initial data
   */
  data: {
    meals:['Breakfast', 'Lunch', 'Dinner'],
    usermeal:'',
  },

  pickMeal: function(event) {
    let index = event.detail.value;
    console.log(index);
    this.setData({
      userMeal: this.data.meal[index]
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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