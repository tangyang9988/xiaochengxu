//声明js
var time=require('../../utils/util.js')
var http = require("../../utils/httpUtil.js")
var app = getApp();
Page({
  data: {
     usr_id:"",
     totalList: [],
     pendingList: [],
     disapproveList: [],
     approveList: [],
     radio:"药剂审核",
    //加载样式是否显示
     loading: true
  },
  onChange(event) {
    this.setData({radio: event.detail.title});
    this.onLoad();
  },
  onLoad: function (options) {
    debugger
    if(options==undefined){
      var usr_id=this.data.usr_id
    }else{
      var usr_id=Number(options.usr_id)
    }
    var that = this //很重要，一定要写
    that.setData({usr_id:usr_id})
    var params={
      "user_id":usr_id
    }
    // 判断是运维还是茅台url
    var url;
    if(usr_id==2){
      url = "/app/dosage_review/dosage/query";
    }else if(usr_id==3){
      url = "/app/maotai/dosage/query";
    }
    http.Post(url, params, function (res) {
        var dosageList=res.data.data.dosage;//res.data就是从后台接收到的值
        var waterList=res.data.data.water_quality;//res.data就是从后台接收到的值
        var pendingListCP=[];
        var disapproveListCP=[];
        var approveListCP=[];
        if(that.data.radio=='药剂审核'){
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
        }else if(that.data.radio=='水质审核'){
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