// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '关于我们'
    })
  },

  feedback(){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  myLike(){
    wx.navigateTo({
      url: '../mylike/mylike',
    })
  },
  mySc(){
    wx.navigateTo({
      url: '../mysc/mysc',
    })
  },
  about(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})