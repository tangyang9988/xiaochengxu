
// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data:{
    is_in:1,
    columns_name:"进水",
    show: false,
    columns:[ '进水','出水'],
    status:0
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
    this.setData({BOD5:Number(event.detail)})
  },
  onChange3(event) {
    this.verification(event.detail)
    this.setData({ammonia:Number(event.detail)})
  },
  onChange4(event) {
    this.verification(event.detail)
    this.setData({phosphorus:Number(event.detail)})
  },
  onChange5(event) {
    this.verification(event.detail)
    this.setData({ss:Number(event.detail)})
  },
  onChange6(event) {
    this.verification(event.detail)
    this.setData({chroma:Number(event.detail)})
  },
  verification:function(value){
    var regNum=new RegExp('^[0-9]*$');
    var rsNum=regNum.exec(value);
    if(!rsNum){
      setTimeout(()=>{
          wx.showToast({
              title: '只能输入数字',
              icon: 'none'
          })
      },1000);
      return
  }
  },
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
        "bod5":Number(this.data.BOD5),
        "bod5_name":"bod5",
        "ammonia_nitrogen":Number(this.data.ammonia),
        "ammonia_nitrogen_name":"ammonia_nitrogen",
        
        "phosphorus":Number(this.data.phosphorus),
        "ss":Number(this.data.ss),
        "chroma":Number(this.data.chroma)
    };
    http.Post('/app/water_quality/add', params, function (res) {
      console.log(res)
    })

    //   wx.request({  
    //   url: 'http://172.20.0.70:8088/app/water_quality/add', 
    //   data:{
    //     is_in:this.data.is_in,
    //     cod:Number(this.data.cod),
    //     BOD5:Number(this.data.BOD5),
    //     ammonia:Number(this.data.ammonia),
    //     phosphorus:Number(this.data.phosphorus),
    //     ss:Number(this.data.ss),
    //     chroma:Number(this.data.chroma),
    //   },
    //   method:'POST',
    //   header: {  
    //     'content-type': 'application/json'
    //   },  
    //   success: function (res) {
    //     wx.showToast({
    //       title: '填报成功',
    //       icon: 'success',
    //       duration: 2000//持续的时间
    //     })
    //   },
    // })

  }
});
