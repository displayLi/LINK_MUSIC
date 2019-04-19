// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onReady(){
    wx.setNavigationBarTitle({
      title: '用户反馈'
    })
  },

  formSubmit({detail:{value:val}}){
    
    if (val.users !== '' && val.numbers !== '' && val.textarea !== ''){
      console.log(val);
      wx.request({
        url: 'http://api.link97.com:8087/linkMusic',
        data: val,
        header: {"Content-Typt":"application/json"},
        method: 'POST',
        success: function(res) {
          console.log(res);
          wx.showToast({
            title: '提交成功,跳转中~',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() =>{
            wx.switchTab({
              url: '../index/index'
            })
          },1000)
        }
      })
    }else {
      console.log("三个都是必填项不能为空")
    }
    
  }
})