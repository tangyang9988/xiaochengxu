//声明js
var time=require('../../utils/util.js')
var http = require("../../utils/httpUtil.js")
var app = getApp();
var page = 1  //初始化页数
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
     selectId:"",
     wait:"wait",
     lastpage:0,
  },
  onChange(event) {
    this.setData({radio: event.detail});
    this.onWater(this.data.selectId);
  },
  approveChange(event) { 
    this.setData({wait: event.detail.name})
  },
    /**
   * 列表子项点击事件
   * @param { item子项 }
   */
  disItemClick(e) {
    var usr_id = wx.getStorageSync('usr_id');
    var wait =this.data.wait
    const { gid } = e.currentTarget.dataset
    var advice="";
    if(gid.reviews.length>0){
    advice = gid.reviews[0].content
    }else{
      advice =""
    }
    const url = `../edit/edit?usr_id=${usr_id}&user_name=${gid.user_name}&id=${gid.id}&dosing_time=${gid.dosing_time}&position=${gid.position}&medicine_id=${gid.medicine_id}&medicine_name=${gid.medicine_name}&medicine_count=${gid.medicine_count}&unit_name=${gid.unit_name}&wait=${wait}&advice=${advice}`
    this.onNavigateTo(url)
  },
  /**
   * 列表子项点击事件
   * @param { item子项 }
   */
  huayanDisItemClick(e) {
    var usr_id = wx.getStorageSync('usr_id');
    var wait =this.data.wait
    const { gid } = e.currentTarget.dataset
    var advice="";
    if(gid.reviews.length>0){
    advice = gid.reviews[0].content
    }else{
      advice =""
    }
    const url = `../huayan/edit/edit?id=${gid.id}&is_in=${gid.is_in}&user_name=${gid.user_name}&status=${gid.status}&is_dosage=${gid.is_dosage}&usr_id=${usr_id}&cod=${gid.cod}&bod5=${gid.bod5}&ammonia_nitrogen=${gid.ammonia_nitrogen}&phosphorus=${gid.phosphorus}&nitrogen=${gid.nitrogen}&ss=${gid.ss}&chromaticity=${gid.chromaticity}&ph=${gid.ph}&sewage=${gid.sewage}&production_wastewater=${gid.production_wastewater}&sludge_dewatering=${gid.sludge_dewatering}&sludge_moisture_content=${gid.sludge_moisture_content}&sludge_treatment_capacity=${gid.sludge_treatment_capacity}&advice=${advice}`
    this.onNavigateTo(url)
  },
  onWater:function(page){
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
        "company_id":wx.getStorageSync('company_id'),
        "user_id":usr_id,
        "status":1,
        "page":2,
        "page_size":4
      }
      url = "/app/dosage_review/dosage/company/query";
    }else if(role_id==3){
        params={
          "company_id":Number(this.data.selectId),
          "page": 1,
          "page_size": 4
        }
      url = "/app/maotai/dosage/company/all/query/page";
    }
    var oldlists = this.data.totalList;
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
        var newlists = oldlists.concat(res.data) //合并数据 res.data 你的数组数据
        setTimeout(() => {
          that.setData({
            lists: newlists,
            lastpage: res.data.pagecount //你的总页数
          });
        //隐藏 加载中的提示
          wx.hideLoading();
        }, 1500)
    })
  },
  onLoad: function (options) {
    var role_id = wx.getStorageSync('role_id');
    this.setData({role_id:role_id})
    var selectId = options.selectId
    this.setData({selectId:selectId})
    let that = this;
   //数据 初始化调用
   that.onWater(1)
  },
  onReachBottom: function () {
    page++
    if(this.data.lastpage > page){
      this.loadData(page); 
    }else{
      wx.showToast({title: "到底了！", icon :"none" })
    }
  },
     /**
   * 列表子项点击事件
   * @param { item子项 }
   */
  onItemClick(e) {
    var selectId =this.data.selectId;
    var usr_id = wx.getStorageSync('usr_id');
    const { gid } = e.currentTarget.dataset
    var advice="";
    if(gid.reviews.length>0){
    advice = gid.reviews[0].content
    }else{
      advice =""
    }
    const url = `../huayan/edit/edit?id=${gid.id}&is_in=${gid.is_in}&selectId=${selectId}&user_name=${gid.user_name}&status=${gid.status}&is_dosage=${gid.is_dosage}&usr_id=${usr_id}&cod=${gid.cod}&bod5=${gid.bod5}&ammonia_nitrogen=${gid.ammonia_nitrogen}&phosphorus=${gid.phosphorus}&nitrogen=${gid.nitrogen}&ss=${gid.ss}&chromaticity=${gid.chromaticity}&ph=${gid.ph}&sewage=${gid.sewage}&production_wastewater=${gid.production_wastewater}&sludge_dewatering=${gid.sludge_dewatering}&sludge_moisture_content=${gid.sludge_moisture_content}&sludge_treatment_capacity=${gid.sludge_treatment_capacity}&advice=${advice}`
    this.onNavigateTo(url)
  },
       /**
   * 药剂列表子项点击事件
   * @param { item子项 } e 
   */
  yaoItemClick(e) {
    var usr_id = wx.getStorageSync('usr_id');
    const { gid } = e.currentTarget.dataset
    var advice="";
    if(gid.reviews.length>0){
    advice = gid.reviews[0].content
    }else{
      advice =""
    }
    const url = `../edit/edit?usr_id=${usr_id}&user_name=${gid.user_name}&id=${gid.id}&dosing_time=${gid.dosing_time}&position=${gid.position}&medicine_id=${gid.medicine_id}&medicine_name=${gid.medicine_name}&medicine_count=${gid.medicine_count}&unit_id=${gid.unit_id}&unit_name=${gid.unit_name}&advice=${advice}`
    this.onNavigateTo(url)
  },
      /**
   * 页面跳转
   * @param { 路由地址 } url 
   */
  onNavigateTo(url) {
    wx.navigateTo({ url })
  }
})