var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    listData:[]
  },
  onLoad: function () {
    var that = this //很重要，一定要写
    var params={ "user_id":7}
    http.Post('/app/storage/log/query', params, function (res) {

    })
    // wx.request({
    //   url: 'http://172.20.0.70:8088/app/storage/log/query',
    //   data:{
    //     "user_id":1
    //   },
    //   method:'POST',
    //   header: {  
    //     'content-type': 'application/json'
    //   },  
    //   success: function (res) {
    //     var datas=res.data;          //res.data就是从后台接收到的值
    //     that.setData({               //循环完后，再对list进行赋值
    //       listData: datas.data,
    //     })
    //   },
    //   fail: function (res) {
    //     wx.showToast({
    //       title: '失败',
    //       icon: 'fail',
    //       duration: 2000//持续的时间
    //     })
    //   },
    // })

  }
  
})
