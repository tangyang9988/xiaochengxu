var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    invitation: '',
    modalHidden: true,
  },
  changeInput: function (e) {
    if (/[^a-zA-Z0-9]/.test(e.detail.value)) {
      wx.showToast({
        title: '请输入数字或英文',
        icon: 'none'
      })
    } else {
      this.setData({
        invitation: e.detail.value
      })
    }

  },
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  next: function () {
    var invitation = this.data.invitation;
    // if (/^[A-Za-z0-9]{24}$/.test(invitation)) {
    // if (invitation) {
      var params={
        invite_code:this.data.invitation
      }
      var that =this;
      http.Post('/v1.1/app/region/invite_code/info', params, function (res) {
        if(res.data.code==200){
          var role_id=res.data.data.role_id;
          var company_id=res.data.data.company_id;
          var company_name=res.data.data.company_name;
          var count=res.data.data.count;
          if(count ==0){
            wx.showToast({
              title: '邀请码已超过使用次数',
              icon:"none",
              duration: 2000,
            })
          }else if(count>0){
            wx.navigateTo({
              url: '/pages/login/addUser/addUser?invitation=' + invitation + '&role_id=' + role_id + '&company_id=' + company_id + '&company_name=' + company_name
            })
          }
        }else{
          that.setData({
            modalHidden: false
        });
        }

      })
    // }
  }
})