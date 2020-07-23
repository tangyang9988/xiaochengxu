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
     loading: true,
      selectId:""
  },
  onChange(event) {
    this.setData({radio: event.detail});
    this.onWater(this.data.selectId);
  },
  onWater(selectId){
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    var that = this //很重要，一定要写
    that.setData({usr_id:usr_id})
    that.setData({role_id:role_id})
    // 判断是运维还是茅台url
    var url;
    var params;
    if(role_id==2){
      params={
        "user_id":usr_id
      }
      url = "/app/dosage_review/dosage/query";
    }else if(role_id==3){
        params={
          "user_id":usr_id,
          "company_id":Number(selectId)
        }
      url = "/app/maotai/dosage/company/query";
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
  },
  onLoad: function (options) {
    var role_id = wx.getStorageSync('role_id');
    this.setData({role_id:role_id})
    var selectId = options.selectId
      this.setData({selectId:selectId})
      this.onWater(selectId)
  }
})