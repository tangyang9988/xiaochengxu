// edit.js
//获取应用实例
const app = getApp()
var http = require("../../utils/httpUtil.js")
Page({
  data: {
    id:"",
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
  // onChange1(event) {
  //   // event.detail 为当前输入的值
  //   this.setData({cod:event.detail})
  // },
  // onChange2(event) {
  //   this.setData({bod5:event.detail})
  // },
    onChange(event) {
    this.setData({advice:event.detail})
  },
  onLoad: function (options) {      //options专门用于接受数据的
    var that = this                 //很重要，一定要写
    that.setData({
      id: Number(options.id),
      cod: Number(options.cod),
      bod5: Number(options.bod5),
      ammonia_nitrogen: Number(options.ammonia_nitrogen),
      phosphorus: Number(options.phosphorus),
      nitrogen: Number(options.nitrogen),
      ss: Number(options.ss),
      chromaticity: Number(options.chromaticity),
      ph: Number(options.ph)
    })
  },

agree:function(){
  var usr_id = wx.getStorageSync('usr_id');
  var params={
    "dosage_id":this.data.id,
    "content":this.data.advice,
    "user_id":usr_id,
    "review_status":4,
    "is_dosage":0
  };
  http.Post('/app/water_quality/add', params, function (res) {
  })

}
})