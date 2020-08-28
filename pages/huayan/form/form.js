
// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data:{
    is_in:1,
    name:"",
    columns_name:"进水",
    show: false,
    columns:[ '进水','出水'],
    status:0,
    cod:"",
    bod5:"",
    ammonia_nitrogen:"",
    phosphorus:"",
    nitrogen:"",
    ss:"",
    chromaticity:"",
    ph:"",
  },
  showPopup() {
    this.setData({ show: true });
  },
  confirm(event) {
    this.setData({
      columns_name :event.detail.value,
      is_in :event.detail.value.index
    })
    this.setData({ show: false });
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange1(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({cod:event.detail})
    }
  },
  onChange2(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({bod5:event.detail})
    }
  },
  onChange3(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({ammonia_nitrogen:event.detail})
    }

  },
  onChange4(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({phosphorus:event.detail})
    }

  },
  onChange5(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({nitrogen:event.detail})
    }

  },
  onChange6(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({ss:event.detail})
    }

  },
  onChange7(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({chromaticity:event.detail})
    }
  },
  onChange8(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({ph:event.detail})
    }
  },
  onLoad: function (options) {
    var name = wx.getStorageSync('name');
    this.setData({name:name})
  },
  submit:function(e){
    var usr_id = wx.getStorageSync('usr_id');
    var company_id = wx.getStorageSync('company_id');
    var tenant_id = wx.getStorageSync('tenant_id');
    var params ={
        "user_id":usr_id,
        "is_in":this.data.is_in,
        "cod":Number(this.data.cod),
        "cod_name":"cod",
        "bod5":Number(this.data.bod5),
        "bod5_name":"bod5",
        "ammonia_nitrogen":Number(this.data.ammonia_nitrogen),
        "ammonia_nitrogen_name":"ammonia_nitrogen",
        "phosphorus":Number(this.data.phosphorus),
        "phosphorus_name":"phosphorus",
        "nitrogen":Number(this.data.nitrogen),
        "nitrogen_name":"nitrogen",
        "ss":Number(this.data.ss),
        "ss_name":"ss",
        "ss":Number(this.data.ss),
        "ss_name":"ss",
        "chromaticity":Number(this.data.chromaticity),
        "chromaticity_name":"chromaticity",
        "ph":Number(this.data.ph),
        "ph_name":"ph",
        "tenant_id":Number(tenant_id),
        "company_id":Number(company_id)
    };
    var that =this;
    wx.showModal({
      title: '提示',
      content: '是否确认提交化验单',
      success(res){
        if (res.confirm) {
          if(that.data.cod.length == 0 ||that.data.bod5.length==0||that.data.ammonia_nitrogen.length==0||that.data.phosphorus.length==0||that.data.nitrogen.length==0||that.data.ss.length==0||that.data.chromaticity.length==0||that.data.ph.length==0){
            wx.showToast({title:"请填写完整化验单", icon :"none",duration: 2000 })
          }else{
            http.Post('/app/water_quality/add', params, function (res) {
              const { data } = res
              if (data.code === 200) {
                wx.showToast({ title: '提交化验单成功', icon :'success',duration: 2000 })
                wx.navigateTo({
                  url: '../../index/index',
                })
              } else{
                wx.showToast({title: data.msg, icon :"none",duration: 2000 })
              }  
            })
          }
        } 
      },
      fail(res){ wx.showToast({title: '提交化验单失败', icon :"none"}) }
    })

  },
  cancle: function(){
    this.setData({
      cod:"",
      bod5:"",
      ammonia_nitrogen:"",
      phosphorus:"",
      nitrogen:"",
      ss:"",
      chromaticity:"",
      ph:"",
    })
  },
  
});
