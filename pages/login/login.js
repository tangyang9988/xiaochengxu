var http = require("../../utils/httpUtil.js")
Page({
  data: {
    phone: '',
    password: ''
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录 
  login: function () {
    let usr_id = Number(this.data.phone);
    wx.setStorage({
      key: 'usr_id',
      data: usr_id
    });
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面 
      // wx.showToast({ 
      // title: '登录成功', 
      // icon: 'success', 
      // duration: 2000 
      // })
      wx.navigateTo({
        url: '../index/index?id=' + usr_id
      })
    }
  },
  // 微信一键登录
  loginWeiXin:function(){
    wx.getSetting({
      success (res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true, // true已授权 false未授权
        //   "scope.userLocation": true
        //    ...
        // }
      }
    })
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })
    wx.login({
      success: function(res) {
        debugger
          // 得到了code
          if (res.code) {
              wx.request({
                  url: 'https://wx.jslcznkj.cn/maotai/app/region/openid', // 后端提供的验证登录接口
                  data:{
                    open_id:res.code
                  },
                  success: function(response) {
                   // 验证成功，保存cookies, 封装在全局统一的请求方法中，如get, post
                      wx.setStorage({
                       key: 'open_id',
                       data: response.data.open_id
                      })
                      wx.getUserInfo({
                       withCredentials: true,
                          success: function(res) {
                              // 取得用户微信信息，调用后端接口更新用户信息
                              const userInfo = res.userInfo
                              const encryptedData = res.encryptedData
                           const iv = res.iv
                              
                              const params = {
                                nick_name: userInfo.nickName,
                                gender: userInfo.gender,
                                province: userInfo.province,
                                city: userInfo.city,
                                country: userInfo.country,
                                avatar_url: userInfo.avatarUrl,
                                encrypted_data: encryptedData,
                                encrypt_iv: iv
                              }
  
                              server.get(api.user.updateBaseInfo(), params, () => {
                               // 成功保存用户信息
                              })
                          }
                      })
               }
              })
          }
      }
  })

  }
})