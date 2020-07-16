
// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data:{
    id:"",
    usr_id:"",
    role_id:"",
    status:"",
    is_dosage:"",
    cod:"",
    bod5:"",
    ammonia_nitrogen:"",
    phosphorus:"",
    nitrogen:"",
    ss:"",
    chromaticity:"",
    ph:"",
    advice:""
  },
  showPopup() {
    this.setData({ show: true });
  },
  onChange1(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({cod :event.detail})
    }
  },
  onChange2(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({bod5 :event.detail})
    }

  },
  onChange3(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({ammonia_nitrogen :event.detail})
    }

  },
  onChange4(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({phosphorus :event.detail})
    }

  },
  onChange5(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({nitrogen :event.detail})
    }

  },
  onChange6(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({ss :event.detail})
    }
  },
  onChange7(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({chromaticity :event.detail})
    }

  },
  onChange8(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({ph :event.detail})
    }
  },
  onChange(event) {
    this.setData({advice :event.detail})
  },
  onClose() {
    this.setData({ show: false });
  },
  onLoad: function (options) {
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
      this.setData({
        id: Number(options.id),
        usr_id: Number(usr_id),
        role_id: role_id,
        status: Number(options.status),
        is_dosage:Number(options.is_dosage),
        cod: Number(options.cod),
        bod5: Number(options.bod5),
        ammonia_nitrogen: Number(options.ammonia_nitrogen),
        phosphorus: Number(options.phosphorus),
        nitrogen: Number(options.nitrogen),
        ss: Number(options.ss),
        chromaticity: Number(options.chromaticity),
        ph: Number(options.ph),
        advice: ""
      })


  },
  agree:function(e){
    if(this.data.role_id ==5){
      var params ={
        "id":this.data.id,
        "user_id":this.data.usr_id,
        "status":3,
        "cod":Number(this.data.cod),
        "bo5":Number(this.data.bod5),
        "ammonia_nitrogen":Number(this.data.ammonia_nitrogen),
        "phosphorus":Number(this.data.phosphorus),
        "nitrogen": Number(this.data.nitrogen),
        "ss":Number(this.data.ss),
        "chromaticity":Number(this.data.chromaticity),
        "ph":Number(this.data.ph)
    }
    wx.showModal({
      title: '提示',
      content: '是否重新提交化验单',
      success(res){
        if (res.confirm) {
          http.Post('/app/water_quality/modify', params, function (res) {
            const { data } = res
            if( data.code === 200 ){
              wx.showToast({ title: '重新提交成功！', icon:'success',duration:2000 })
              setTimeout(() => {
              wx.navigateBack({})
              }, 2000);
            }else wx.showToast({ title: '重新提交失败！',duration:2000 })
          })
        } 
      },
      fail(res){ wx.showToast({title: '提交化验单失败', icon :"none"}) }
    })
    }
    if(this.data.role_id ==2){
      var params={
        "dosage_id":this.data.id,
        "content":this.data.advice,
        "user_id":this.data.usr_id,
        "review_status":4,
        "is_dosage":this.data.is_dosage
      };
      http.Post('/app/dosage_review/add', params, function (res) {
        const { data } = res
      if( data.code === 200 ){
        wx.showToast({ title: '已审批', icon:'success',duration:2000 })
        setTimeout(() => {
        wx.navigateBack({})
        }, 2000);
      }else wx.showToast({ title: '审批失败',duration:2000 })
      })
    }
    if(this.data.role_id ==3){
      var params={
        "water_quality_id":this.data.id,
        "cod":this.data.cod,
        "bod5":this.data.bod5,
        "ammonia_nitrogen":this.data.ammonia_nitrogen,
        "phosphorus":this.data.phosphorus,
        "nitrogen":this.data.nitrogen,
        "ss":this.data.ss,
        "chromaticity":this.data.chromaticity,
        "ph":this.data.ph,
        "user_id":this.data.usr_id,
        "review_status":5,
      };
      http.Post('/app/maotai/modify_water', params, function (res) {
        const { data } = res
      if( data.code === 200 ){
        wx.showToast({ title: '已审批', icon:'success',duration:2000 })
        setTimeout(() => {
        wx.navigateBack({})
        }, 2000);
      }else wx.showToast({ title: '审批失败',duration:2000 })
      })
    }

  },
  reject:function(){
    var params={
      "dosage_id":this.data.id,
      "content":this.data.advice,
      "user_id":this.data.usr_id,
      "review_status":2,
      "is_dosage":this.data.is_dosage
    };
    wx.showModal({
      title: '提示',
      content: '是否驳回',
      success(res){
        if (res.confirm) {
          http.Post('/app/dosage_review/add', params, function (res) {
            const { data } = res
            if (data.code === 200) {
              wx.showToast({ title: '驳回成功', icon :'success',duration: 2000 })
              that.clearData()
              setTimeout(() => {
                wx.navigateBack({})
              }, 2000);
            } else  wx.showToast({ title: '驳回失败', })
          })
        } 
      },
      fail(res){ wx.showToast({ title: '驳回失败', }) }
    })
  }
});
