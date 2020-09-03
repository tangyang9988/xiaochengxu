//index.js
//获取应用实例
var util = require('../../utils/storage.js');
var http = require("../../utils/httpUtil.js")
const app = getApp()
Page({
  data: {
    show:false,
    showName: false,
    showModal:false,
    invitation:"",
    selectRole_id:1,
    selectRole_name:"加药员",
    usr_id: "",
    role_id: "",
    avatar_url: "",
    name: "",
    cellphone: "",
    company_name: "",
    selectName: "无数据",
    selectId: "",
    columns: [
      // {
      //   text: '中华7000吨污水处理厂',
      //   cp_id: 159529682355
      // }, {
      //   text: '4000吨污水处理厂',
      //   cp_id: 159529683730
      // }, {
      //   text: '二合301厂5000吨污水处理厂',
      //   cp_id: 159529684975
      // }, {
      //   text: '201厂新寨4000吨污水处理厂',
      //   cp_id: 159529686074
      // }, {
      //   text: '中耀201厂3000吨污水处理厂',
      //   cp_id: 15964237533997
      // },{
      //   text: '贵州茅台301厂二合污水处理厂',
      //   cp_id: 15964239607284
      // },
  ],
    perColumns: [{text:'加药员',role_id:1}, {text:'化验员',role_id:5}],
    desc: "",
    motto: '污⽔⼚加药监控小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../form/form'
    })
  },
  bindViewTapLine: function () {
    wx.navigateTo({
      url: '../line/line'
    })
  },
  bindViewTapLogs: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showPopup() {
    this.setData({ show: true });
  },
  confirm(event) {
    this.setData({
      selectRole_name :event.detail.value.text,
    })
    this.setData({
      selectRole_id :event.detail.value.role_id,
    })
    this.setData({ show: false });
  },
  onClose() {
    this.setData({ show: false });
  },
  onLoad: function (options) {
    // var usr_id = Number(options.id)
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    var avatar_url = wx.getStorageSync('avatar_url');
    var name = wx.getStorageSync('name');
    var cellphone = wx.getStorageSync('cellphone');
    var company_name = wx.getStorageSync('company_name');
    var tenant_name = wx.getStorageSync('tenant_name');
    var tenant_id = wx.getStorageSync('tenant_id');
    if (role_id == 1) {
      this.setData({
        desc: "加药员"
      })
    } else if (role_id == 2) {
      this.setData({
        desc: "运维审核员"
      })
    } else if (role_id == 3) {
      company_name =tenant_name
      this.setData({
        desc: tenant_name +"审核员"
      })
      var params={
        "tenant_id":Number(tenant_id)
      }
      var that =this
      http.Post('/app/maotai/company/query', params, function (res) {
        var columns=res.data.data;
        if(columns.length==0){
          columns.push({ text: '无数据',
          cp_id: 0});
        }else{
          that.setData({"selectName":columns[1].name})
          that.setData({"selectId":columns[1].id})
          that.setData({"columns":columns})
        }

      })
    }
    else if (role_id == 5) {
      this.setData({
        desc: "化验员"
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.desc
    })
    this.setData({
      usr_id: usr_id
    })
    this.setData({
      role_id: role_id
    })
    this.setData({
      avatar_url: avatar_url
    })
    this.setData({
      name: name
    })
    this.setData({
      cellphone: cellphone
    })
    this.setData({
      company_name: company_name
    })

  },
  invite: function () {
    this.setData({
      showModal: true
    })  
    var usr_id = wx.getStorageSync('usr_id');
    var tenant_id = wx.getStorageSync('tenant_id');
    var company_id;
    var params;
    var role_id = wx.getStorageSync('role_id');
    if(role_id==2){
      company_id = wx.getStorageSync('company_id');
      params = {
        "role_id": Number(this.data.selectRole_id),
        "company_id":Number(company_id),
        "user_id": Number(usr_id)
      };
    }else if(role_id==3){
      company_id =Number(this.data.selectId);
      params = {
        "role_id": 2,
        "company_id": company_id,
        "user_id": usr_id,
        "tenant_id":Number(tenant_id)
      };
    }
    var that = this
    http.Post('/app/user/invite_code/add', params, function (res) {
      that.setData({
        invitation: res.data.data
      })
    })

  },
  toShowModal(e) {
    this.setData({
      showModal: true
    })
  },
  /**
   * 一键复制
   */
  copyBtn: function (e) {
    var that =this
    wx.setClipboardData({
      data: this.data.invitation,
      success: function (res) {
        setTimeout(() => {
          wx.hideToast();
        }, 500)
        // that.setData({showModal: false})
      }
    });
  },
  returnBtn:function(){
    this.setData({showModal: false})
  },
  showNamePopup() {
    this.setData({
      showName: true
    });
  },
  confirmName(event) {
    this.setData({
      selectName: event.detail.value.text,
    })
    this.setData({
      selectId: event.detail.value.cp_id,
    })
    this.setData({
      showName: false
    });
  },
  onCloseName() {
    this.setData({
      showName: false
    });
  },
  onShow: function () {},
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  return: function (options) {
    wx.navigateTo({
      url: '../login/invite/invite', //这个是要加载的页面的路径
    })

  }
})