
// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data:{
    id:"",
    usr_id:"",
    user_name:"",
    name:"",
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
    advice:"",
    domesticSewageAmount:"",
    wastewaterAmount:"",
    dewateredSludgeAmount:"",
    moistureSludge:"",
    sludgeAmount:""
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
  onChange71(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({domesticSewageAmount :event.detail})
    }
  },
  onChange72(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({wastewaterAmount :event.detail})
    }
  },
  onChange73(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({dewateredSludgeAmount :event.detail})
    }
  },
  onChange74(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({moistureSludge :event.detail})
    }
  },
  onChange75(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({sludgeAmount :event.detail})
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
    var user_name;
    if(role_id ==2 ||role_id ==3){
      user_name =options.user_name
    }
    var name = wx.getStorageSync('name');
      this.setData({
        id: Number(options.id),
        usr_id: Number(usr_id),
        name:name,
        user_name:user_name,
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
        advice: options.advice
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
    var that =this
    wx.showModal({
      title: '提示',
      content: '是否重新提交化验单',
      success(res){
        if (res.confirm) {
          http.Post('/app/water_quality/modify', params, function (res) {
            const { data } = res
            if( data.code === 200 ){
              wx.showToast({ title: '重新提交成功！', icon:'success',duration:2000 })
              that.changeLocalData()
            }else wx.showToast({ title: '重新提交失败！',icon: 'none',duration:2000 })
          })
        } 
      }
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
      var that =this
      wx.showModal({
        title: '提示',
        content: '是否同意',
        success(res){
          if (res.confirm) {
            http.Post('/app/dosage_review/add', params, function (res) {
              const { data } = res
            if( data.code === 200 ){
              wx.showToast({ title: '已同意', icon:'success',duration:2000 })
              that.changeParentData()
            }else wx.showToast({ title: '同意失败',icon: 'none',duration:2000 })
            })
          } 
        }
      })
    }
    if(this.data.role_id ==3){
      var params={
        "water_quality_id":Number(this.data.id),
        "cod":Number(this.data.cod),
        "bod5":Number(this.data.bod5),
        "ammonia_nitrogen":Number(this.data.ammonia_nitrogen),
        "phosphorus":Number(this.data.phosphorus),
        "nitrogen":Number(this.data.nitrogen),
        "ss":Number(this.data.ss),
        "chromaticity":Number(this.data.chromaticity),
        "ph":Number(this.data.ph),
        "user_id":Number(this.data.usr_id),
        "review_status":5,
      };
      var that =this
      wx.showModal({
        title: '提示',
        content: '是否归档',
        success(res){
          if (res.confirm) {
            http.Post('/app/maotai/modify_water', params, function (res) {
              const { data } = res
            if( data.code === 200 ){
              wx.showToast({ title: '已归档', icon:'success',duration:2000 })
              that.changeParentData()
            }else wx.showToast({ title: '归档失败',icon: 'none',duration:2000 })
            })
          } 
        }
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
    var that =this
    wx.showModal({
      title: '提示',
      content: '是否驳回',
      success(res){
        if (res.confirm) {
          http.Post('/app/dosage_review/add', params, function (res) {
            const { data } = res
            if (data.code === 200) {
              wx.showToast({ title: '驳回成功', icon :'success',duration: 2000 })
              that.changeParentData()
            } else  wx.showToast({ title: '驳回失败', icon: 'none'})
          })
        } 
      },
      fail(res){ wx.showToast({ title: '驳回失败', icon: 'none'}) }
    })
  },
  cancle() {
    wx.navigateBack({})
  },
  // 返回自己审核页面刷新
  changeLocalData() {
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.onLoad();//触发父页面中的方法
    }
    wx.navigateBack({
      delta: 1
    });
  },
  // 返回上层页面刷新
  changeParentData() {
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.onWater();//触发父页面中的方法
    }
    wx.navigateBack({
      delta: 1
    });
  },
});
