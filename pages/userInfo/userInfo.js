
Page({
  data: {
    usr_id:"",
    role_id:"",
    avatar_url:"",
    name:"",
    cellphone:"",
    company_name:"",
  },
  onLoad: function (options) {
    // var usr_id = Number(options.usr_id)
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    var avatar_url = wx.getStorageSync('avatar_url');
    var name = wx.getStorageSync('name');
    var cellphone = wx.getStorageSync('cellphone');
    var company_name = wx.getStorageSync('company_name');
    this.setData({usr_id:usr_id})
    this.setData({role_id:role_id})
    this.setData({avatar_url:avatar_url})
    this.setData({name:name})
    this.setData({cellphone:cellphone})
    this.setData({company_name:company_name})

  }
})
