
Page({
  data: {
    usr_id:"",
    role_id:""
  },
  onLoad: function (options) {
    // var usr_id = Number(options.usr_id)
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    this.setData({usr_id:usr_id})
    this.setData({role_id:role_id})

  }
})
