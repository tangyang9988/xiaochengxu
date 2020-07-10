//声明js
var http = require("../../../utils/httpUtil.js")
var time=require('../../../utils/util.js')
var app = getApp();
Page({
  data: {
    //全局变量
     List: [],
    //加载样式是否显示
     loading: true
  },
  onLoad: function (option) {
    var that = this//很重要，一定要写
    var params={
      "user_id":1
    }

    http.Post('/app/dosage/query', params,function (res) {
       var datas=res.data;//res.data就是从后台接收到的值
        that.setData({//循环完后，再对list进行赋值
          List: datas.data,
          loading: false
        })
      })

    // wx.request({
    //   url: 'http://172.20.0.70:8088/maotai/app/dosage_review/dosage/query',//和后台交互的地址，默认是json数据交互，由于我的就是json，这里就没有对header进行编写
    //   data: {
    //     "user_id":2
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json'
    //   },  
    //   success: function (res) {
    //     var datas=res.data;//res.data就是从后台接收到的值
    //     that.setData({//循环完后，再对list进行赋值
    //       List: datas.data,
    //       loading: false
    //     })
    //   },
    //   fail: function (res) {
    //     console.log('submit fail');
    //   },
    //   complete: function (res) {
    //     console.log('submit complete');
    //   }
    // })
  }
})