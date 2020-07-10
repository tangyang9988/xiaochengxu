//index.js
//获取应用实例
var util = require('../../utils/storage.js');

const app = getApp()
Page({
  data: {
    usr_id:"",
    title:"",
    desc:"",
    userName:"",
    motto: '污⽔⼚加药监控小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../form/form'
    })
  },
  bindViewTapLine: function() {
    wx.navigateTo({
      url: '../line/line'
    })
  },
  bindViewTapLogs: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function (options) {
    var userName;
    var title;
    var desc;
    var usr_id = Number(options.id)
    if(usr_id==1){
      userName="张晓明";
      title = "加药员";
      desc = "无锡市运维公司";
    }else if(usr_id==2){
      userName="刘万能";
      title = "运维审核员";
      desc = "江阴市运维公司";
    }else if(usr_id==3){
      userName="王武";
      title = "茅台审核员";
      desc = "茅台总部";
    }else if(usr_id==7){
      userName="张智中";
      title = "库管员";
      desc = "南京市运维公司";
    }else if(usr_id==10){
      userName="宋保国";
      title = "化验员";
      desc = "徐州市运维公司";
    }
    wx.setNavigationBarTitle({
      title: title 
    })
    this.setData({usr_id:usr_id})
    this.setData({title:title})
    this.setData({desc:desc})
    this.setData({userName:userName})
  
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  onShow:function(){
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  return: function (options) {
         wx.navigateTo({
        url: '../login/login',              //这个是要加载的页面的路径
        })
    
    }
})


