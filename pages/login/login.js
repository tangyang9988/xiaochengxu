
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
  },
  //在页面加载的时候，判断缓存中是否有内容，如果有，存入到对应的字段里
  onLoad: function () {
    // var open_id =wx.getStorageSync('open_id')
    // if(open_id){
    //   wx.request({
    //     url: 'https://wx.jslcznkj.cn/maotai/app/region/refresh', //自己的解密地址
    //     data:{
    //       openid:open_id
    //     },
    //     method: "post",
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success: function (res) {
    //     }
    //   })
    // }else{
    // }
  },
  onGotUserInfo: function (e) {
    debugger
    var role_id = wx.getStorageSync('role_id')
    if(role_id){
      this.hideModal();
      setTimeout(function () {
        wx.reLaunch({
        url: '../index/index'
        })
        }, 500)
    }else{
      wx.setStorage({
        key: 'avatar_url',
        data: e.detail.userInfo.avatarUrl
      });
      wx.setStorage({
        key: 'raw_data',
        data: e.detail.rawData
      });
      wx.setStorage({
        key: 'signature',
        data: e.detail.signature
      });
      wx.setStorage({
        key: 'encrypted_data',
        data:e.detail.encryptedData
      });
      wx.setStorage({
        key: 'iv',
        data: e.detail.iv
      });
      var that = this;
      if (e.detail.errMsg == "getUserInfo:ok") {
        wx.login({
          success: res => {
            wx.request({
              url: 'https://wx.jslcznkj.cn/maotai/app/region/openid', //仅为示例，并非真实的接口地址
              data: {
                "code": res.code
              },
              method: "POST",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                wx.setStorage({
                  key: "open_id",
                  data: res.data.data.open_id
                })
              }
            })
          }
        })
        // this.setData({ phone_iv: e.phone_iv });
        that.showDialogBtn(); //调用一键获取手机号弹窗（自己写的）//
      }

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
      debugger
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
  // getPhoneNumber: function (e) {
  //   var that = this;
  //   that.hideModal();
  //   wx.checkSession({
  //     success: function (e) {
  //       wx.login({
  //         success: res => {
  //           this.setData({ phone_encrypted_data: e.detail.encrypted_data });
  //           this.setData({ phone_iv: e.detail.iv });
  //         }
  //       })


  //     },
  //     fail: function () {
  //       wx.login({
  //         success: res => {
  //           wx.request({
  //             url: '自己的登录接口', //仅为示例，并非真实的接口地址
  //             data: {
  //               account: '1514382701',
  //               jscode: res.code
  //             },
  //             method: "POST",
  //             header: {
  //               'content-type': 'application/json' // 默认值
  //             },
  //             success(res) {
  //               if (res.data.r == "T") {
  //                 wx.setStorage({
  //                   key: "openid",
  //                   data: res.data.openid
  //                 })
  //                 wx.setStorage({
  //                   key: "sessionkey",
  //                   data: res.data.sessionkey
  //                 })
  //                 wx.request({
  //                   url: '自己的解密接口',//自己的解密地址
  //                   data: {
  //                     encryptedData: e.detail.encryptedData,
  //                     iv: e.detail.iv,
  //                     code: res.data.sessionkey
  //                   },
  //                   method: "post",
  //                   header: {
  //                     'content-type': 'application/json'
  //                   },
  //                   success: function (res) {
  //                     that.onshow(that.data.openid, that.data.userInfo, res.data.d.phoneNumber);//调用onshow方法，并传递三个参数
  //                   }
  //                 })
  //               }
  //             }
  //           })
  //         }
  //       })
  //     }
  //   }
  // },
})