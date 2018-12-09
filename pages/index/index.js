//获取应用实例
const app = getApp();
Page({
  data: {
    navBar: ["推荐", "歌手", "排行", "搜索"],
    navIndex: 0,
    autoplay: true,
    interval: 3000,
    duration: 400,
    recommendList: [],
    sliderData: [],
    singerData: [],
    searchData: [],
    phDataList: '',
    searchTitle:'',
    searchBody:'',
    musicLink:'',
  },
  onLoad() {
    
    /*=================================
     *          首页数据请求模块           
     =================================*/

    let that = this;

    //  请求首页列表数据
    wx.request({
      url: "http://ustbhuangyi.com/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.9519853334085604",
      method: "GET",
      success(res) {
        that.setData({
          recommendList: res.data.data.list
        })
      }
    })

    // 请求轮播图
    wx.request({
      url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1&jsonpCallback',
      method: "GET",
      success(res) {
        that.setData({
          sliderData: res.data.data
        })
      }
    })
    // 请求歌手数据 
    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0',
      method: "GET",
      success(res) {
        that.setData({
          singerData: res.data.data.list
        })
      }
    })

    // 搜索数据请求
    wx.request({
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback',
      method: "GET",
      success(res) {
        that.setData({
          searchData: res.data.data.hotkey.splice(0, 10),
        })
      }
    })
    // 排行
    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=data',
      method: "GET",
      success(res) {
        let datas = res.data;
        const spliceData = datas.substring(5, datas.lastIndexOf(')'));
        that.setData({
          phDataList: JSON.parse(spliceData).data,
        })
      }
    })
  },


  /*=================================
   *             事件模块            
   =================================*/

  // 导航栏事件
  navBarIndex(e) {
    this.setData({
      navIndex: e.currentTarget.dataset.index
    })
  },

  // swiper
  clickSwiper(e) {
    this.setData({
      navIndex: e.detail.current,
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onShareAppMessage: function () {

  },
  addVal(e){
    let sub = e.currentTarget.dataset.searchtitle;
    this.setData({
      searchTitle: sub.substr(0, sub.length - 1)
    })
    let postData = this.data.searchTitle
    let that = this;
    wx.request({
      url: 'http://ustbhuangyi.com/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=' + postData + '&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5',
      success(res) {
        that.setData({
          searchBody: res.data
        })
      }
    })
  },
  clearInputVal(){
    this.setData({
      searchTitle:''
    })
  },
  // 搜索页面 搜索功能
  putSearch(e){
    // 设置状态
    this.setData({
      searchTitle: e.detail.value
    })

    // 每输入一次就请求一次
    let that = this;
    wx.request({
      url: 'http://ustbhuangyi.com/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=' + e.detail.value + '&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5',
      success(res) {
        that.setData({
          searchBody: res.data
        })
      }
    })
  },
 
  /*=================================
   *             路由模块            
   =================================*/

  // 首页列表路由
  duration(e) {
    wx.navigateTo({
      url: "../details/details?id=" + e.currentTarget.dataset.id,
    })
  },
  // 歌手列表路由
  singerList(e) {
    wx.navigateTo({
      url: "../details/details?id=" + e.currentTarget.dataset.singerid,
    })
  },
  // 排行路由
  ph_routers(e) {
    wx.navigateTo({
      url: "../details/details?id=" + e.currentTarget.dataset.id
    })
  },
goToPlay({currentTarget:{dataset:val}}){
    this.setData({
      musicLink: val.musiclink,
    })

    // 库存
    app.globalData.playArrs.push({
      musicLink: val.musiclink,
      musicImg: val.musicimg,
      musicName: val.name,
      musicZz: val.zz,
    })

    // 传值
    app.globalData.musicLink = val.musiclink;
    app.globalData.musicImg = val.musicimg;
    app.globalData.musicName = val.name;
    app.globalData.musicZz = val.zz;
    wx.switchTab({
      url: '../play/play'
    })
  }
})
