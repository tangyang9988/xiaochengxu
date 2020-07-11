var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    listData:[],
    screenHeight:''
  },
  onLoad: function () {
    var usr_id = wx.getStorageSync('usr_id');
    var that = this //很重要，一定要写
    var params={ "user_id":usr_id}
    http.Post('/app/storage/log/query', params, function (res) {
        var resData =res.data.data

        console.log(resData)
        that.setData({//循环完后，再对list进行赋值
          listData: res.data.data,
          loading: false
        })

    })

  },getSystemInfo() {
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
        this.setData({ screenHeight: result.windowHeight})
      },
    })
  },
  
})
