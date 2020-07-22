//index.js
//获取应用实例
var util = require('../../utils/storage.js');

const app = getApp()
Page({
  data: {
    showName:false,
    usr_id:"",
    role_id:"",
    avatar_url:"",
    name:"",
    cellphone:"",
    company_name:"",
    selectName:"中华7000吨污水处理厂",
    selectId:"159529682355",
    columns:[ {text:'中华7000吨污水处理厂',cp_id:159529682355}, {text:'4000吨污水处理厂',cp_id:159529683730}, {text:'二合301厂5000吨污水处理厂',cp_id:159529684975}, {text:'201厂新寨4000吨污水处理厂',cp_id:159529686074}, {text:'201厂大地3000吨污水处理厂',cp_id:159529687331}],
    desc:"",
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
    // var usr_id = Number(options.id)
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    var avatar_url = wx.getStorageSync('avatar_url');
    var name = wx.getStorageSync('name');
    var cellphone = wx.getStorageSync('cellphone');
    var company_name = wx.getStorageSync('company_name');
    if(role_id==1){
      this.setData({desc:"加药员"})
    }else if(role_id==2){
      this.setData({desc:"运维审核员"})
    }else if(role_id==3){
      this.setData({desc:"茅台审核员"})
    }
    // else if(usr_id==7){
    //   userName="张智中";
    //   title = "库管员";
    //   desc = "南京市运维公司";
    else if(role_id==5){
      this.setData({desc:"化验员"})
    }
    wx.setNavigationBarTitle({
      title: this.data.desc 
    })
    this.setData({usr_id:usr_id})
    this.setData({role_id:role_id})
    this.setData({avatar_url:avatar_url})
    this.setData({name:name})
    this.setData({cellphone:cellphone})
    this.setData({company_name:company_name})
  
  },
  showNamePopup() {
    this.setData({ showName: true });
  },
  confirmName(event) {
    this.setData({
      selectName :event.detail.value.text,
    })
    this.setData({
      selectId :event.detail.value.cp_id,
    })
    this.setData({ showName: false });
  },
  onCloseName() {
    this.setData({ showName: false });
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


