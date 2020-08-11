
// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data:{
    id:"",
    show:false,
    name:"",
    cellphone:"",
    roleName: "",
    selectRole_id:"",
    selectRole_name:"",
    selectName:"",
    role_id: "",
    company_name:"",
    company_id:"",
    selectId:"",
    columns:[ {text:'加药员',role_id:1}, {text:'化验员',role_id:5}],
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
  onChange(event) {
    this.setData({name:event.detail})
  },
  onChange1(event) {
    this.setData({cellphone:event.detail})
  },
  onLoad: function (options) {     //options专门用于接受数据的
    var role_id = wx.getStorageSync('role_id');
    this.setData({role_id:role_id })
    this.setData({
      id: options.id,
      name: options.name,
      cellphone: options.cellphone,
      selectRole_id: options.role_id,
      selectRole_name :options.selectRole_name
    })
    if(role_id == 3){
      this.setData({selectName: options.selectName})
      this.setData({selectId: options.selectId})
    }
  },
  changeParentData: function () {
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.onShow();//触发父页面中的方法
    }
    wx.navigateBack({
    });
  },
  submit:function(e){
    var that = this
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    if(role_id == 2){
      var company_id = wx.getStorageSync('company_id');
      var params ={
          "id":Number(that.data.id),
          "superior_id":usr_id,
          "company_id":company_id,
          "name":that.data.name,
          "cellphone":that.data.cellphone,
          "role_id":that.data.selectRole_id,
      };
      wx.showModal({
        title: '提示',
        content: '是否确认修改用户',
        success(res){
          if (res.confirm) {
            http.Post('/app/user/modify', params, function (res) {
              const { data } = res
              if (data.code === 200) {
                wx.showToast({ title: '修改用户成功', icon :'success',duration: 2000 })
                that.changeParentData()
              } else  wx.showToast({title: data.msg, icon :"none" })
            })
          } 
        }
      })
    }else if(role_id == 3){
      var selectId =Number(this.data.selectId);
      var params ={
          "id":Number(that.data.id),
          "superior_id":usr_id,
          "company_id":selectId,
          "name":that.data.name,
          "cellphone":that.data.cellphone,
          "role_id":2,
      };
      wx.showModal({
        title: '提示',
        content: '是否确认修改用户',
        success(res){
          if (res.confirm) {
            http.Post('/app/user/modify', params, function (res) {
              const { data } = res
              if (data.code === 200) {
                wx.showToast({ title: '修改用户成功', icon :'success',duration: 2000 })
                that.changeParentData()
              } else  wx.showToast({title: data.msg, icon :"none" })
            })
          } 
        }
      })
    }

  },
  cancle: function(){
    wx.navigateBack()
  },
  
});
