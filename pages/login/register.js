
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "open_id": "",
    // "userInfo":{},
    "raw_data": "",
    "signature": "",
    "encrypted_data": "",
    "iv": "",
    "phone_encrypted_data": "",
    "phone_iv": "",
    loginstate: "0",
    userEntity: null,
    terminal: "",
    osVersion: "",
    phoneNumber: "",
    showModal: false, //定义登录弹窗
    isLogin:false
  },
  //在页面加载的时候，判断缓存中是否有内容，如果有，存入到对应的字段里
  onLoad: function () {
    var isLogin =wx.getStorageSync('isLogin')
      this.setData({isLogin:isLogin})
  },
  onGotUserInfo: function (e) {
    if(!this.data.isLogin){
      wx.navigateTo({
        url: '../login/invite/invite',
      })
    }
  },

  // 显示一键获取手机号弹窗
  showDialogBtn: function () {
    this.setData({
      showModal: true //修改弹窗状态为true，即显示
    })
  },
  // 隐藏一键获取手机号弹窗
  hideModal: function () {
    this.setData({
      showModal: false //修改弹窗状态为false,即隐藏
    });
  },
  //绑定手机
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: 'https://wx.jslcznkj.cn/maotai/app/region/bind_phone', //自己的解密地址
        data: {
          "open_id": wx.getStorageSync('open_id'),
          // "user_info":this.data.userInfo,
          "raw_data": wx.getStorageSync('raw_data'),
          "signature": wx.getStorageSync('signature'),
          "encrypted_data": wx.getStorageSync('encrypted_data'),
          "iv": wx.getStorageSync('iv'),
          "phone_encrypted_data": e.detail.encryptedData,
          "phone_iv": e.detail.iv
        },
        method: "post",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.setStorage({
            key: 'name',
            data: res.data.data.user.name
          });
          wx.setStorage({
            key: 'company_name',
            data: res.data.data.user.company_name
          });
          wx.setStorage({
            key: 'cellphone',
            data: res.data.data.user.cellphone
          });
            wx.setStorage({
              key: 'usr_id',
              data: res.data.data.user.id
            });
            wx.setStorage({
              key: 'role_id',
              data: res.data.data.user.role_id
            });  
            wx.navigateTo({
              url: '../index/index',
            })
        }
      })
      that.hideModal()
    }
  },
})