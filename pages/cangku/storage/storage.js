
var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    listData:[],
    screenHeight:''
  },
  onLoad: function () {
    var usr_id = wx.getStorageSync('usr_id');
    this.getSystemInfo()
    var that = this       //很重要，一定要写
    var params={
      "user_id":usr_id
    };
    http.Post('/app/storage/query', params, function (res) {
        var datas=res.data;          //res.data就是从后台接收到的值
        console.log(datas)
        that.setData({               //循环完后，再对list进行赋值
          listData: datas.data,
        })
    })

  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
        this.setData({ screenHeight: result.windowHeight})
      },
    })
  },
  onNavigateTo(e){
    console.log(e)
    const { gid } = e.currentTarget.dataset
    const url = `../storageBasic/storageBasic?storage_id=${gid.id}&medicine_id=${gid.medicine_id}&medicine_name=${gid.medicine_name}&supplier=${gid.supplier}&minimum=${gid.minimum}&is_process=${gid.is_process}&storage_amount=${gid.storage_amount}`
    wx.navigateTo({ url })
  }
})
