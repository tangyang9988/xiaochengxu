
// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data: {
    "selectId":"",
    "position":"蓝创大厦1",
    "dosing_time":"2020-07-03 10:00:00",
    "medicine_id":159332570586,
    "medicine_name":"片碱",
    "medicine_count":10,
    "showTime":false,
    "showPosition":false,
    "showName":false,
    "currentDate": new Date().getTime(),
    "columns": ['无锡市点位', '苏州市点位', '上海点位'],
    // "option":[{key:159332570586,text:'片碱'},{key:159280864452,text:'PAM(阴离子)'},{key:159280152053,text:'PAM(阳离子)'},]
    "option":[]
  },
  list:"",
  // formSubmit: function (e) {
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value);
  // },
  // formSubmit: function(e) {
  //   console.log(e.detail.value)
  //   var medicine_id = e.detail.value.medicine_id;
  //   var medicine_count = e.detail.value.medicine_count;
  //   wx.request({  
  //     url: 'http://172.20.0.70:8088/app/dosage/add', 
  //     data:{
  //       "medicine_id":medicine_id,
  //       "medicine_count":55.0000,
  //       "position":"蓝创大厦5楼",
  //       "dosing_time":"2020-06-16 12:55:00",
  //       "status":1,
  //       "user_id":5
  //     },
  //     method:'POST',
  //     header: {  
  //       'content-type': 'application/json'
  //     },  
  //     success: function (res) {
  //       console.log(res.data)
  //     }  
  //   })
  // },


  // onChange1(event) {
  //   this.setData({"dosing_time":event.detail})
  // },
  // onChange2(event) {
  //   this.setData({"position":event.detail})
  // },
  onChange3(event) {
    this.setData({"medicine_id":Number(event.detail)})
  },
  onChange4(event) {
    // var regNum=new RegExp('/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/');
    // var rsNum=regNum.exec(event.detail);
    // /^(\d+|\d+\.\d{1,4})$/

    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    }else{
      this.setData({"medicine_count":event.detail})
    }
    // if (!/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/.test(event.detail)) {
    //   wx.showToast({
    //     title: '请输入数字值,最多4位小数',
    //     icon: 'none'
    // })
    // }
  //   if(!rsNum){
  //     setTimeout(()=>{
  //         wx.showToast({
  //             title: '只能输入数字',
  //             icon: 'none'
  //         })
  //     },1000);
  //     return
  // }
  },
  onPicker(event) {

    var keyId = event.detail.value.key;
    var text= event.detail.value.name;
    this.setData({"medicine_name":event.detail.value.text})
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
    var params={
      "user_id":1
    }
    //http 请求是异步的，必须重新赋值this
    let  that =this;
    http.Post('/app/storage/query', params, function (res) {
      // var medicineList = [ {kkey:'1111',text:'选项1'}];
      var storage =res.data.data;
      var medicineList=[];
      for(var i=0;i<storage.length;i++){
        medicineList.push({key: storage[i].id,text: storage[i].medicine_name});
        // this.setData({
        //   "option[i].text":storage[i].medicine_name,
        //   "option[i].key":storage[i].id
        // })

      // }
      // this.data.option=medicineList

      // this.setData({option:medicineList})
      // this.setData({medicineList})
      // console.log(this.data.option)
      }
      that.setData({"option":medicineList})
  })
  },
  submit:function(){
    var that = this
    var params ={
      "dosing_time":this.data.dosing_time,
      "position":this.data.position,
      "medicine_id":this.data.medicine_id,
      "medicine_count":Number(this.data.medicine_count),
      "status":1,
      "user_id":1
    };
    wx.showModal({
      title: '提示',
      content: '是否确认提交加药单',
      success(res){
        if (res.confirm) {
          http.Post('/app/dosage/add', params, function (res) {
            const { data } = res
            if (data.code === 200) {
              wx.showToast({ title: '提交加药单成功', icon :'success',duration: 2000 })
              that.clearData()
            } else  wx.showToast({ title: '提交加药单失败', })
          })
        } 
      },
      fail(res){ wx.showToast({ title: '提交加药单失败', }) }
    })
  },
  cancle: function(){
    this.clearData()
  },
  clearData() {
    this.setData({
      dosing_time:'',
      position:'',
      medicine_name:'',
      medicine_count:''
    })
  }
});
