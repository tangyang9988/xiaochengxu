//声明js
var time=require('../../../utils/util.js')
var http = require("../../../utils/httpUtil.js")
var app = getApp();
Page({
  data: {
    //全局变量
     List: [],
    //加载样式是否显示
     loading: true,
     usr_id:"",
     name:"",
     status:""
  },
    /**
   * 列表子项点击事件
   * @param { item子项 } e 
   */
  onItemClick(e) {
    const { usr_id } = this.data 
    const { gid } = e.currentTarget.dataset
    var advice="";
    if(gid.reviews.length>0){
    advice = gid.reviews[0].content
    }else{
      advice =""
    }
    const url = `../edit/edit?id=${gid.id}&status=${gid.status}&usr_id={{usr_id}}&user_name={{gid.user_name}}&cod=${gid.cod}&bod5=${gid.cod}&ammonia_nitrogen=${gid.ammonia_nitrogen}&phosphorus=${gid.phosphorus}&nitrogen=${gid.nitrogen}&ss=${gid.ss}&chromaticity=${gid.chromaticity}&ph=${gid.ph}&advice=${advice}`
    this.onNavigateTo(url)
  },
  onLoad: function (options) {
    var usr_id = wx.getStorageSync('usr_id');
    var name = wx.getStorageSync('name');
    this.setData({usr_id:Number(usr_id),name:name})
    this.setData({status:Number(options.status)})
    var params={
      "user_id":usr_id
    }
    var that = this //很重要，一定要写
    http.Post('/app/water_quality/query', params, function (res) {
          that.setData({//循环完后，再对list进行赋值
          List: res.data.data,
          loading: false
        })
    })
  },
    /**
   * 页面跳转
   * @param { 路由地址 } url 
   */
  onNavigateTo(url) {
    wx.navigateTo({ url })
  },
})