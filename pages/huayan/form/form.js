
// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data:{
    is_in:1,
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
  onChange(event) {
    this.setData({
      columns_name :event.detail.value,
      is_in :event.detail.value.index
    })
  },
  onChange1(event) {
    this.verification(event.detail)
    this.setData({cod:Number(event.detail)})
  },
  onChange2(event) {
    this.verification(event.detail)
    this.setData({bod5:Number(event.detail)})
  },
  onChange3(event) {
    this.verification(event.detail)
    this.setData({ammonia_nitrogen:Number(event.detail)})
  },
  onChange4(event) {
    this.verification(event.detail)
    this.setData({phosphorus:Number(event.detail)})
  },
  onChange5(event) {
    this.verification(event.detail)
    this.setData({nitrogen:Number(event.detail)})
  },
  onChange6(event) {
    this.verification(event.detail)
    this.setData({ss:Number(event.detail)})
  },
  onChange7(event) {
    this.verification(event.detail)
    this.setData({chromaticity:Number(event.detail)})
  },
  onChange8(event) {
    this.verification(event.detail)
    this.setData({ph:Number(event.detail)})
  },
  // verification:function(value){
  //   const reg = /[^\d+(,\d\d\d)*.\d+$]/g;
  //   if (reg.test(value)) {
  //     setTimeout(()=>{
  //       wx.showToast({
  //           title: '只能输入数字',
  //           icon: 'none'
  //       })
  //   },1000);
  //   return
  //   }
  // },
  onClose() {
    this.setData({ show: false });
  },
  submit:function(e){
    var usr_id = wx.getStorageSync('usr_id');
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
        "ph_name":"ph"
    };
    wx.showModal({
      title: '提示',
      content: '是否确认提交化验单',
      success(res){
        if (res.confirm) {
          http.Post('/app/water_quality/add', params, function (res) {
            const { data } = res
            if (data.code === 200) {
              wx.showToast({ title: '提交化验单成功', icon :'success',duration: 2000 })
              that.clearData()
            } else  wx.showToast({ title: '提交化验单失败', })
          })
        } 
      },
      fail(res){ wx.showToast({ title: '提交化验单失败', }) }
    })

  },
  cancle: function(){
    debugger
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
