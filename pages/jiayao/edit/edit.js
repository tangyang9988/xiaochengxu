// edit.js
//获取应用实例
var http = require("../../../utils/httpUtil.js")
const app = getApp()

Page({
  data: {
    id:"",
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
    "columns": ['无锡市点位', '苏州市点位', '上海点位'],
    // "option":[{key:159332570586,text:'片碱'},{key:159280864452,text:'PAM(阴离子)'},{key:159280152053,text:'PAM(阳离子)'},]
    "option":[]
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
  onLoad: function (options) {     //options专门用于接受数据的
    var usr_id = wx.getStorageSync('usr_id');
    var params={
      "user_id":usr_id
    }
    let  that =this;
    if(Number(options.status)==2){
      //http 请求是异步的，必须重新赋值this
      http.Post('/app/storage/query', params, function (res) {
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
      status: Number(options.status),
      content: options.content,
      dosing_time: options.dosing_time,
      position: options.position,
      medicine_id: Number(options.medicine_id),
      medicine_name:options.medicine_name,
      medicine_count: parseFloat(options.medicine_count)
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
  }
  http.Post('/app/dosage/modify', params,function (res) {
    var datas=res.data;//res.data就是从后台接收到的值
     this.setData({//循环完后，再对list进行赋值
       List: datas.data,
       loading: false
     })
   })

}
})