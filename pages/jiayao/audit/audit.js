//声明js
var http = require("../../../utils/httpUtil.js")
var time=require('../../../utils/util.js')
var app = getApp();
Page({
  data: {
    //全局变量
     List: [],
      searchValue:"",
      userId:"",
      name:"",

    //加载样式是否显示
     loading: true
  },
  onLoad: function (option) {
    var name = wx.getStorageSync('name');
    var that = this//很重要，一定要写
    var usr_id = wx.getStorageSync('usr_id');
    that.setData({//循环完后，再对list进行赋值
      userId: usr_id,
      name:name,
      loading: false
    })
    var params={
      "user_id":usr_id
    }
    http.Post('/app/dosage/query', params,function (res) {
       var datas=res.data;//res.data就是从后台接收到的值
        that.setData({//循环完后，再对list进行赋值
          List: datas.data,
          loading: false
        })
      })
  },
  onSearch(){
    var that = this
    var params={
      "user_id":this.data.userId,
    "research_name":this.data.searchValue
    }
    http.Post('/app/dosage/query/like', params,function (res) {
      var datas=res.data;//res.data就是从后台接收到的值
       that.setData({//循环完后，再对list进行赋值
         List: datas.data,
         loading: false
       })
     })
  },
  onChange(e) {
    this.setData({
      searchValue: e.detail,
    });
    this.onSearch()
  },
  onCancel(){
    this.setData({
      searchValue: "",
    });
  }
})