var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    invitation: '',
    modalHidden: true,
  },
  changeInput: function (e) {
    this.setData({
      invitation: e.detail.value
    })
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
          wx.navigateTo({
            url: '/pages/login/addUser/addUser?invitation=' + invitation + '&role_id=' + role_id + '&company_id=' + company_id + '&company_name=' + company_name
          })
        }else{
          that.setData({
            modalHidden: false
        });
        }

      })
    // }
  }
})