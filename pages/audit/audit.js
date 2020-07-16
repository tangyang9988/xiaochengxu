//声明js
var time=require('../../utils/util.js')
var http = require("../../utils/httpUtil.js")
var app = getApp();
Page({
  data: {
     usr_id:"",
     role_id:"",
     totalList: [],
     pendingList: [],
     disapproveList: [],
     approveList: [],
     radio:'1',
    //加载样式是否显示
     loading: true
  },
  onChange(event) {
    this.setData({radio: event.detail});
    this.onLoad();
  },
  onLoad: function (options) {
    // if(options==undefined){
    //   var usr_id=this.data.usr_id
    // }else{
    //   var usr_id=Number(options.usr_id)
    // }
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    var that = this //很重要，一定要写
    that.setData({usr_id:usr_id})
    that.setData({role_id:role_id})
    var params={
      "user_id":usr_id
    }
    // 判断是运维还是茅台url
    var url;
    if(role_id==2){
      url = "/app/dosage_review/dosage/query";
    }else if(role_id==3){
      url = "/app/maotai/dosage/query";
    }
    http.Post(url, params, function (res) {
        var dosageList=res.data.data.dosage;//res.data就是从后台接收到的值
        var waterList=res.data.data.water_quality;//res.data就是从后台接收到的值
        var pendingListCP=[];
        var disapproveListCP=[];
        var approveListCP=[];
        if(that.data.radio=='1'){
          for(var i=0;i<dosageList.length;i++){
            if(dosageList[i].status==1||dosageList[i].status==3){
              pendingListCP.push(dosageList[i])
            }else if(dosageList[i].status==2){
              disapproveListCP.push(dosageList[i])
            }else if(dosageList[i].status==4){
              approveListCP.push(dosageList[i])
            }
          }
          that.setData({totalList: dosageList})
        }else if(that.data.radio=='2'){
          for(var i=0;i<waterList.length;i++){
            if(waterList[i].status==1||waterList[i].status==3){
              pendingListCP.push(waterList[i])
            }else if(waterList[i].status==2){
              disapproveListCP.push(waterList[i])
            }else if(waterList[i].status==4){
              approveListCP.push(waterList[i])
            }
          }
          that.setData({
            totalList: waterList
          })
        }
        that.setData({
          pendingList:pendingListCP,
          disapproveList:disapproveListCP,
          approveList:approveListCP,
          loading: false,
        })

    })
  }
})