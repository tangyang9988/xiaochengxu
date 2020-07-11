
// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data:{
    id:"",
    usr_id:"",
    status:"",
    is_dosage:"",
    cod:"",
    bod5:"",
    ammonia_nitrogen:"",
    phosphorus:"",
    ss:"",
    chromaticity:"",
    ph:"",
    advice:""
  },
  showPopup() {
    this.setData({ show: true });
  },
  onChange1(event) {
    console.log(event)
    this.setData({cod :event.detail})
  },
  onChange2(event) {
    this.setData({bod5 :event.detail})
  },
  onChange3(event) {
    this.setData({ammonia_nitrogen :event.detail})
  },
  onChange4(event) {
    this.setData({phosphorus :event.detail})
  },
  onChange5(event) {
    this.setData({nitrogen :event.detail})
  },
  onChange6(event) {
    this.setData({ss :event.detail})
  },
  onChange7(event) {
    this.setData({chromaticity :event.detail})
  },
  onChange7(event) {
    this.setData({ph :event.detail})
  },
  onChange(event) {
    this.setData({advice :event.detail})
  },
  onClose() {
    this.setData({ show: false });
  },
  onLoad: function (options) {  
    var usr_id = wx.getStorageSync('usr_id');
    this.setData({
      id: Number(options.id),
      usr_id: Number(usr_id),
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
      advice: options.content
    })
  },
  agree:function(e){
    if(this.data.usr_id ==10){
      var params ={
        "id":this.data.id,
        "user_id":this.data.usr_id,
        "status":3,
        "cod":Number(this.data.cod),
        "bo5":Number(this.data.bod5),
        "ammonia_nitrogen":Number(this.data.ammonia_nitrogen),
        "phosphorus":Number(this.data.phosphorus),
        "ss":Number(this.data.ss),
        "chromaticity":Number(this.data.chromaticity),
        "ph":Number(this.data.ph)
    };
    http.Post('/app/water_quality/modify', params, function (res) {
    })
    }
    if(this.data.usr_id ==2){
      var params={
        "dosage_id":this.data.id,
        "content":this.data.advice,
        "user_id":this.data.usr_id,
        "review_status":4,
        "is_dosage":this.data.is_dosage
      };
      http.Post('/app/water_quality/add', params, function (res) {
      })
    }
    if(this.data.usr_id ==3){
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
      })
    }

  }
});
