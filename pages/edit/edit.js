// edit.js
//获取应用实例
const app = getApp()
var http = require("../../utils/httpUtil.js")
Page({
  data: {
    "user_id":"",
    "user_name":"",
    "role_id ":"",
    "dosage_id":"",
    "dosing_time":"",
    "position":"",
    "medicine_id":"",
    "medicine_name":"",
    "medicine_count":"",
    "content":"",
    "review_status":"",
    "showTime":false,
    "showPosition":false,
    "showName":false,
    "advice":"",
    "currentDate": new Date().getTime(),
    "columns": ['高效多功能净水器', '脱水机', '清水池','初沉池','好氧池','高密沉淀池','污泥脱水间','混凝反应池','氧化沟/a/o池1','氧化沟/a/o池2','氧化沟/a/o池3'],
    "option":[],
    "unitOption": [{
      text: 'kg',
      value: 15953129609
  },
  {
      text: '袋',
      value: 159531299950
  },
  {
      text: '桶',
      value: 15965954342777
  }
],
    "unit_name":"",
    "unit_id":"",
    "approveStatus":""
  },
  positionChange(event){
    this.setData({
      position: event.detail
    });
  },
  onChange4(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(Number(event.detail))) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({"medicine_count":event.detail})
    }
  },
  onChange5(event) {
    this.setData({"content":event.detail})
  },
  showTimePop() {
    this.setData({ showTime: true });
  },
  showPositionPop() {
    this.setData({ showPosition: true });
  },
  showNamePop() {
    this.setData({ showName: true });
  },
  // 加药时间选择器
  confirm(event) {
    var date = this.formatDate(event.detail)
    this.setData({dosing_time: date});
    this.setData({ showTime: false });
  },
  onClose() {
    this.setData({ showTime: false });
  },
  // 加药点位选择器
  onConfirm(event) {
    this.setData({position: event.detail.value});
    this.setData({ showPosition: false });
  },
  onCancel() {
    this.setData({ showPosition: false });
  },
  // 加药名称选择器
  nameConfirm(event) {
    this.setData({"medicine_name":event.detail.value.text})
    this.setData({"medicine_id": event.detail.value.key});
    this.setData({ "showName": false });
  },
  nameCancel() {
    this.setData({ "showName": false });
  },
  //时间戳转换方法    date:时间戳数字
 formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD +" "+hh + mm + ss;
 },
 unitChange:function(event){
  this.setData({
    "unit_id": event.detail
  })
},
  onLoad: function (options) {  //options专门用于接受数据的
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    var company_id
    if(role_id==2){
      company_id = wx.getStorageSync('company_id');
    }else if(role_id==3){
      company_id = Number(options.selectId);
    }
    var approveStatus = options.wait;
    if(approveStatus=="wait"){
      this.setData({approveStatus:approveStatus})
    }else{
      this.setData({approveStatus:"none"})
    }
    if(options.advice){
      this.setData({advice:options.advice})
    }
    var params = {
      "company_id": company_id
    }
    this.setData({
      user_id:usr_id,
      user_name:options.user_name,
      role_id:role_id,
      dosage_id: Number(options.id),
      dosing_time: options.dosing_time,
      position: options.position,
      medicine_id: Number(options.medicine_id),
      medicine_name:options.medicine_name,
      medicine_count: parseFloat(options.medicine_count),
      unit_id:Number(options.unit_id),
      unit_name:options.unit_name,
    })
    //http 请求是异步的，必须重新赋值this
    let that = this;
    http.Post('/app/storage/company/query', params, function (res) {
      var storage = res.data.data;
      var medicineList = [];
      if (storage.length > 0) {
        for (var i = 0; i < storage.length; i++) {
          medicineList.push({
            key: storage[i].id,
            text: storage[i].medicine_name
          });
        }
        that.setData({
          "option": medicineList
        })
      }

    })
  },
  // 返回自动刷新
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
agree:function(){
  var that =this
  var tenant_id = wx.getStorageSync('tenant_id');
  if(that.data.role_id==2){
    var params ={
      "dosage_id":that.data.dosage_id,
      "content":that.data.content,
      "user_id":that.data.user_id,
      "review_status":4,
      "is_dosage":1,
      "tenant_id":tenant_id
    }
    wx.showModal({
      title: '提示',
      content: '是否同意',
      success(res){
        if (res.confirm) {
          http.Post('/app/dosage_review/add', params, function (res) {
            const { data } = res
            if (data.code === 200) {
              wx.showToast({ title: '已同意', icon :'success',duration: 2000 })
            } else  wx.showToast({ title: data.msg,icon: 'none',duration: 2000 })
          })
          that.changeParentData()
        } 
      }
    })
  }else if(that.data.role_id==3){
    var params ={
      "dosage_id":that.data.dosage_id,
      "review_status":5,
      "user_id":that.data.user_id,
      "medicine_id":Number(that.data.medicine_id),
      "medicine_count":parseFloat(that.data.medicine_count),
      "dosing_time":that.data.dosing_time,
      "position":that.data.position,
      "content":that.data.content,
      "unit_id":that.data.unit_id,
      "tenant_id":tenant_id
    }
    wx.showModal({
      title: '提示',
      content: '是否同意归档',
      success(res){
        if (res.confirm) {
          http.Post('/app/maotai/modify_dosage', params, function (res) {
            const { data } = res
            if( data.code === 200 ){
              wx.showToast({ title: '已归档', icon:'success',duration:2000 })
              that.changeParentData()
            }else wx.showToast({ title: data.msg,icon: 'none',duration:2000 })
          })
        } 
      },
      fail(res){ wx.showToast({ title: '归档失败',icon: 'none' }) }
    })
  }
},
reject:function(){
  var params ={
    "dosage_id":this.data.dosage_id,
    "content":this.data.content,
    "user_id":this.data.user_id,
    "review_status":2,
    "is_dosage":1
  };
  var that=this
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
            } else{
              wx.showToast({ title: data.msg,icon: 'none' ,duration: 2000})
              that.changeParentData()
            }  
          })
        } 
      },
    })
}
})