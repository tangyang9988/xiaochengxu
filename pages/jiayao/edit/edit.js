// edit.js
//获取应用实例
var http = require("../../../utils/httpUtil.js")
const app = getApp()

Page({
  data: {
    id:"",
    name:"",
    status:"",
    content:"",
    dosing_time:"",
    position:"",
    medicine_id:"",
    medicine_count:"",
    "showTime":false,
    "showPosition":false,
    "showName":false,
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
    "unit_id":"",
    "unit_name":"",
  },
  positionChange(event){
    this.setData({
      position: event.detail
    });
  },
  // onChange1(event) {
  //   this.setData({dosing_time:event.detail})
  // },
  // onChange2(event) {
  //   this.setData({position:event.detail})
  // },
  // onChange3(event) {
  //   this.setData({medicine_id:Number(event.detail)})
  // },
  onChange4(event) {
  if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
    wx.showToast({
      title: '请输入数字值,最多2位小数',
      icon: 'none'
    })
  }else{
    this.setData({"medicine_count":event.detail})
  }
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
    "unit": event.detail
  })
  wx.setStorage({
    key: 'unit',
    data: this.data.unit
  });
},
  onLoad: function (options) {     //options专门用于接受数据的
    var usr_id = wx.getStorageSync('usr_id');
    var name = wx.getStorageSync('name');
    var unit = wx.getStorageSync('unit');
    this.setData({unit:unit})  
    var params={
      "user_id":usr_id
    }
    let  that =this;
    if(Number(options.status)==2){
      //http 请求是异步的，必须重新赋值this
      http.Post('/app/storage/active/query', params, function (res) {
        var storage =res.data.data;
        var medicineList=[];
        for(var i=0;i<storage.length;i++){
          medicineList.push({key: storage[i].id,text: storage[i].medicine_name});
        }
        that.setData({"option":medicineList})
      })
    }
    that.setData({
      id: Number(options.id),
      name:name,
      status: Number(options.status),
      content: options.content,
      dosing_time: options.dosing_time,
      position: options.position,
      medicine_id: Number(options.medicine_id),
      medicine_name:options.medicine_name,
      medicine_count: parseFloat(options.medicine_count),
      unit_id:Number(options.unit_id),
      unit_name:options.unit_name
    })
  },
agree:function(){
  var usr_id = wx.getStorageSync('usr_id');
  var params={
    "dosage_id":this.data.id,
    "review_status":3,
    "user_id":usr_id,
    "dosing_time":this.data.dosing_time,
    "position":this.data.position,
    "medicine_id":Number(this.data.medicine_id),
    "medicine_count":parseFloat(this.data.medicine_count),
    "unit_id":Number(this.data.unit)
  }
  var that =this
   wx.showModal({
    title: '提示',
    content: '是否重新提交加药单',
    success(res){
      if (res.confirm) {
        http.Post('/app/dosage/modify', params, function (res) {
          const { data } = res
          if (data.code === 200) {
            wx.showToast({ title: '重新提交成功', icon :'success',duration: 2000 })
          } else  wx.showToast({ title: '重新提交成功失败',icon: 'none' })
        })
        that.changeParentData()
      } 
    }
  })
},
reject:function(){
  wx.navigateBack({
    complete: (res) => {},
  })
},
  // 返回自动刷新
  changeParentData() {
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.onLoad();//触发父页面中的方法
    }
    wx.navigateBack({
      delta: 1
    });
  },
})