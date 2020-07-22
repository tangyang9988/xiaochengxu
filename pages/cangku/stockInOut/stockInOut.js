var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    listData:[],
    screenHeight:''
  },
  onLoad: function (options) {
    var role_id = wx.getStorageSync('role_id');
    var company_id;
    if(role_id ==2){
      company_id= wx.getStorageSync('company_id');
    }else if(role_id ==3){
      company_id= Number(options.selectId)
    }
    var that = this //很重要，一定要写
    var params={ "company_id":company_id}
    http.Post('/app/storage/log/company/query', params, function (res) {
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
