var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    listData:[]
  },
  onLoad: function () {
    var usr_id = wx.getStorageSync('usr_id');
    var that = this //很重要，一定要写
    var params={ "user_id":usr_id}
    http.Post('/app/storage/log/query', params, function (res) {

    })

  }
  
})
