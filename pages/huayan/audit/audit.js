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
     status:""
  },
  onLoad: function (options) {
    this.setData({usr_id:Number(options.usr_id)})
    this.setData({status:Number(options.status)})
    var params={
      "user_id":10
    }
    var that = this //很重要，一定要写
    http.Post('/app/water_quality/query', params, function (res) {
          that.setData({//循环完后，再对list进行赋值
          List: res.data.data,
          loading: false
        })
    })

    // wx.request({
    //   url: 'http://172.20.0.70:8088/app/water_quality/query',//和后台交互的地址，默认是json数据交互，由于我的就是json，这里就没有对header进行编写
    //   data: {
    //     "user_id":10
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json'
    //   },  
    //   success: function (res) {
    //     var datas=res.data;//res.data就是从后台接收到的值
    //     // for(var i=0;i<datas.length;i++){//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
    //     //   datas[i]["consumption_date"] = time.formatTime(new Date(datas[i]["consumption_date"]))
    //     // }
    //     that.setData({//循环完后，再对list进行赋值
    //       List: datas.data,
    //       loading: false
    //     })
    //   },
    //   fail: function (res) {
    //     console.log('submit fail');
    //   },
    // })
  }
})