// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data: {
    invitation:"",
    name: "",
    cellphone: "",
    password: "",
    roleName: "",
    selectRole_id: "",
    selectRole_name: "",
    selectName: "",
    role_id: "",
    company_name: "",
    company_id: "",
    selectId: "",
    radio:"",
    checked:false
  },
  onChange(event) {
    this.setData({
      name: event.detail
    })
  },
  onChange1(event) {
    this.setData({
      password: event.detail
    })
  },
  onChange2(event) {
    this.setData({
      cellphone: event.detail
    })
  },
  onChang3(event) {
    if (event.detail == "1") {
      this.setData({
        role_id: 1,
        radio:"1"
      })
    } else if (event.detail == "2") {
      this.setData({
        role_id: 5,
        radio:"2"
      })
    }
  },
  inviteChange:function(event){
    if(event.detail.value ==''){
    this.setData({checked:false})
    }else{
      this.setData({checked:true})
    }
  }, 
  onLoad: function (options) { //options专门用于接受数据的
    var invitation =options.invitation
    var role_id =Number(options.role_id)
    var role_name;
    if(role_id==1){
      role_name="加药员"
    }else if(role_id==5){
      role_name="化验员"
    }else if(role_id==2){
      role_name="运维"
    }
    var company_id =options.company_id
    var company_name =options.company_name
    this.setData({
      invitation: invitation,
      role_id: role_id,
      role_name:role_name,
      company_id: company_id,
      company_name: company_name,
    })
  },
  onGotUserInfo: function (e) {
    var role_id = wx.getStorageSync('role_id')
    // if(role_id){
      // this.hideModal();
      // setTimeout(function () {
      //   wx.reLaunch({
      //   url: '../index/index'
      //   })
      //   }, 500)
    // }else{
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
        // that.showDialogBtn(); //调用一键获取手机号弹窗（自己写的）//
      }
      wx.request({
        url: 'https://wx.jslcznkj.cn/maotai/v1.1/app/region/invite_code', 
        data: {
        "open_id":wx.getStorageSync("open_id"),
        "name":that.data.name,
        "cellphone":that.data.cellphone,
        "role_id":Number(this.data.role_id),
        "password":that.data.password,
        "invite_code":this.data.invitation,
        "avatarurl":wx.getStorageSync("avatar_url")
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
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
              url: '../../index/index',
            })
        }
      })

  },
  goToUserLicence: function(){
    wx.navigateTo({
      url: '../login/licence',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
});