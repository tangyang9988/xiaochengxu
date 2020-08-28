var http = require("/utils/httpUtil.js")
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
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  onShow:function(){
    wx.login({
      success: res => {
        var params={
          "code": res.code
      }
      http.Post('/app/region/openid', params, function (res) {
        if(res.data.data.user){
          wx.showToast({ title: '用户已登录', icon :'success',duration: 1000 })
          wx.setStorage({
            key: 'isLogin',
            data: true
          }); 
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
          wx.setStorage({
            key: 'company_name',
            data: res.data.data.user.company_name
          });
          wx.setStorage({
            key: 'tenant_id',
            data: res.data.data.user.tenant_id
          });
          wx.setStorage({
            key: 'tenant_name',
            data: res.data.data.user.tenant_name
          });
          setTimeout(function () {
            wx.reLaunch({
            url: '../index/index'
            })
            }, 500)
        }else{
          wx.showToast({ title: '用户未登录', icon :'none',duration: 1000 })
          wx.setStorage({
            key: 'isLogin',
            data: false
          }); 
        }
        wx.setStorage({
          key: "open_id",
          data: res.data.data.open_id
        })
      })
      }
    })

  }
})