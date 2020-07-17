//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // wx.request({  
    //   url: 'http://172.20.0.70:8088', 
    //   data:{},  
    //   method:'POST',  
    //   header: {  
    //     'content-type': 'application/json'  
    //   },  
    //   success: function (res) {  
    //     console.log(res.data)  
    //   }  
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow:function(){
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
            wx.showToast({ title: '用户已登录', icon :'success',duration: 1000 })
            if(res.data.data.user){
              wx.setStorage({
                key: 'usr_id',
                data: res.data.data.user.id
              }); 
              wx.setStorage({
                key: 'role_id',
                data: res.data.data.user.role_id
              });
              wx.setStorage({
                key: 'avatar_url',
                data: res.data.data.user.avatar_url
              }); 
              wx.setStorage({
                key: 'name',
                data: res.data.data.user.name
              }); 
              wx.setStorage({
                key: 'cellphone',
                data: res.data.data.user.cellphone
              });
              wx.setStorage({
                key: 'company_id',
                data: res.data.data.user.company_id
              });  
              setTimeout(function () {
                wx.reLaunch({
                url: '../index/index'
                })
                }, 500)
              // wx.redirectTo ({
              //   url: '../index/index',
              // })
            }else{
              wx.showToast({ title: '用户未登录', icon :'fail',duration: 2000 })
            }
            wx.setStorage({
              key: "open_id",
              data: res.data.data.open_id
            })
          }
        })
      }
    })

  }
})