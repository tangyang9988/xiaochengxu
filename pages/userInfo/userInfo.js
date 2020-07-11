
Page({
  data: {
    usr_id:""
  },
  onLoad: function (options) {
    // var usr_id = Number(options.usr_id)
    var usr_id = wx.getStorageSync('usr_id');
    this.setData({usr_id:usr_id})

  }
})
