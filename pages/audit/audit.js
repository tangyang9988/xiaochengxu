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
     selectStatus:"",
     lastpage:0,
     page: 1,										//当前请求数据是第几页
     pageSize: 10,								//每页数据条数
     hasMoreData: true,	        //上拉时是否继续请求数据，即是否还有更多数据
  },
  onChange(event) {
    this.setData({radio: event.detail});
    this.onWater(this.data.selectId);
    this.setData({hasMoreData: true,totalList:[]});
    this.setData({page: 1,pageSize:10});
    this.setData({pendingList:[],disapproveList:[],approveList:[]})
  },
  approveChange(event) {
    this.setData({selectStatus: event.detail.name})
    this.onWater()
  },
    /**
   * 列表子项点击事件
   * @param { item子项 }
   */
  disItemClick(e) {
    var usr_id = wx.getStorageSync('usr_id');
    var selectStatus =this.data.selectStatus
    const { gid } = e.currentTarget.dataset
    var advice="";
    if(gid.reviews.length>0){
    advice = gid.reviews[0].content
    }else{
      advice =""
    }
    const url = `../edit/edit?usr_id=${usr_id}&user_name=${gid.user_name}&id=${gid.id}&dosing_time=${gid.dosing_time}&position=${gid.position}&medicine_id=${gid.medicine_id}&medicine_name=${gid.medicine_name}&medicine_count=${gid.medicine_count}&unit_name=${gid.unit_name}&wait=${selectStatus}&advice=${advice}`
    this.onNavigateTo(url)
  },
  /**
   * 列表子项点击事件
   * @param { item子项 }
   */
  huayanDisItemClick(e) {
    var usr_id = wx.getStorageSync('usr_id');
    // var wait =this.data.wait
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
  onWater:function(){
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    this.setData({usr_id:usr_id})
    this.setData({role_id:role_id})
    var that = this //很重要，一定要写
    var params;
    if(role_id==2){
      if(that.data.radio=='1'){
        if(this.data.selectStatus=='wait'){
          params={
            "company_id":wx.getStorageSync('company_id'),
            "user_id":usr_id,
            "page":that.data.page,
            "page_size":that.data.pageSize
          }
          http.Post('/app/dosage_review/dosage/company/page/status/to_audit', params, function (res) {
            var contentlistTem = that.data.pendingList;
            if (res.data.data.length > 0) {
              if (that.data.page == 1) {
                contentlistTem = []
              }
              var pendingList=res.data.data;
              if (pendingList.length < that.data.pageSize) {
                that.setData({
                  pendingList: contentlistTem.concat(pendingList),
                  hasMoreData: false
                })
              }else{
                that.setData({
                  pendingList: contentlistTem.concat(pendingList),
                  hasMoreData: true,
                  page: that.data.page + 1
                })
              }
            }else{
              that.setData({
                hasMoreData: false
              })
            }
            })
        }else if(this.data.selectStatus=='disapprove'){
          params={
            "company_id":wx.getStorageSync('company_id'),
            "user_id":usr_id,
            "status":2,
            "page":that.data.page,
            "page_size":that.data.page_size
          }
          http.Post('/app/dosage_review/dosage/company/page/status', params, function (res) {
            var contentlistTem = that.data.disapproveList;
            if (res.data.data.length > 0) {
              if (that.data.page == 1) {
                contentlistTem = []
              }
              var disapproveList=res.data.data;
              if (disapproveList.length < that.data.pageSize) {
                that.setData({
                  disapproveList: contentlistTem.concat(disapproveList),
                  hasMoreData: false
                })
              }else{
                that.setData({
                  disapproveList: contentlistTem.concat(disapproveList),
                  hasMoreData: true,
                  page: that.data.page + 1
                })
              }
            }else{
              that.setData({
                hasMoreData: false
              })
            }
            // var disapproveList=res.data.data;//res.data就是从后台接收到的值
            // that.setData({disapproveList: disapproveList})
            })
        }else if(this.data.selectStatus=='approve'){
          params={
            "company_id":wx.getStorageSync('company_id'),
            "user_id":usr_id,
            "status":4,
            "page":that.data.page,
            "page_size":that.data.page_size
          }
          http.Post('/app/dosage_review/dosage/company/page/status', params, function (res) {
            var contentlistTem = that.data.approveList;
            if (res.data.data.length > 0) {
              if (that.data.page == 1) {
                contentlistTem = []
              }
              var approveList=res.data.data;
              if (approveList.length < that.data.pageSize) {
                that.setData({
                  approveList: contentlistTem.concat(approveList),
                  hasMoreData: false
                })
              }else{
                that.setData({
                  approveList: contentlistTem.concat(approveList),
                  hasMoreData: true,
                  page: that.data.page + 1
                })
              }
            }else{
              that.setData({
                hasMoreData: false
              })
            }
            // var approveList=res.data.data;//res.data就是从后台接收到的值
            // that.setData({approveList: approveList})
            })
        }
      }else if(that.data.radio=='2'){
        if(this.data.selectStatus=='wait'){
          params={
            "company_id":wx.getStorageSync('company_id'),
            "user_id":usr_id,
          }
          http.Post('/app/dosage_review/water_quality/company/status/to_audit', params, function (res) {
            var pendingList=res.data.data;//res.data就是从后台接收到的值
            that.setData({pendingList: pendingList})
            })
        }else if(this.data.selectStatus=='disapprove'){
          params={
            "company_id":wx.getStorageSync('company_id'),
            "user_id":usr_id,
            "status":2
          }
          http.Post('/app/dosage_review/water_quality/company/status', params, function (res) {
            var disapproveList=res.data.data;//res.data就是从后台接收到的值
            that.setData({disapproveList: disapproveList})
            })
        }else if(this.data.selectStatus=='approve'){
          params={
            "company_id":wx.getStorageSync('company_id'),
            "user_id":usr_id,
            "status":4
          }
          http.Post('/app/dosage_review/water_quality/company/status', params, function (res) {
            var approveList=res.data.data;//res.data就是从后台接收到的值
            that.setData({approveList: approveList})
            })
        }
      }
    }else if(role_id==3){
        params={
          "company_id":Number(that.data.selectId),
          "page": that.data.page,
          "page_size": that.data.pageSize
        }
        if(that.data.radio=='1'){
          http.Post('/app/maotai/dosage/company/all/query/page', params, function (res) {
            var contentlistTem = that.data.totalList;
            if (res.data.data.length > 0) {
              if (that.data.page == 1) {
                contentlistTem = []
              }
              var totalList=res.data.data;
              if (totalList.length < that.data.pageSize) {
                that.setData({
                  totalList: contentlistTem.concat(totalList),
                  hasMoreData: false
                })
              }else{
                that.setData({
                  totalList: contentlistTem.concat(totalList),
                  hasMoreData: true,
                  page: that.data.page + 1
                })
              }
            }else{
              that.setData({
                hasMoreData: false
              })
            }
          // var dosageList=res.data.data;//res.data就是从后台接收到的值
          // that.setData({totalList: dosageList})
          })
        }else if(that.data.radio=='2'){
          that.setData({page:1,page_size:10})
          var param={
            "company_id":Number(that.data.selectId),
            "page": that.data.page,
            "page_size": that.data.pageSize
          }
          http.Post('/app/maotai/dosage/company/water/query/page', param, function (res) {
            var contentlistTem = that.data.totalList;
            if (res.data.data.length > 0) {
              if (that.data.page == 1) {
                contentlistTem = []
              }
              var totalList=res.data.data;
              if (totalList.length < that.data.pageSize) {
                that.setData({
                  totalList: contentlistTem.concat(totalList),
                  hasMoreData: false
                })
              }else{
                that.setData({
                  totalList: contentlistTem.concat(totalList),
                  hasMoreData: true,
                  page: that.data.page + 1
                })
              }
            }else{
              that.setData({
                hasMoreData: false
              })
            }
            // var waterList=res.data.data;//res.data就是从后台接收到的值
            // that.setData({totalList: waterList})
            })
        }
    }
    // var oldlists = this.data.totalList;
    // http.Post(url, params, function (res) {
    //     var dosageList=res.data.data.dosage;//res.data就是从后台接收到的值
    //     var waterList=res.data.data.water_quality;//res.data就是从后台接收到的值
    //     var pendingListCP=[];
    //     var disapproveListCP=[];
    //     var approveListCP=[];
    //     if(that.data.radio=='1'){
    //       for(var i=0;i<dosageList.length;i++){
    //         if(dosageList[i].status==1||dosageList[i].status==3){
    //           pendingListCP.push(dosageList[i])
    //         }else if(dosageList[i].status==2){
    //           disapproveListCP.push(dosageList[i])
    //         }else if(dosageList[i].status==4){
    //           approveListCP.push(dosageList[i])
    //         }
    //       }
    //       that.setData({totalList: dosageList})
    //     }else if(that.data.radio=='2'){
    //       for(var i=0;i<waterList.length;i++){
    //         if(waterList[i].status==1||waterList[i].status==3){
    //           pendingListCP.push(waterList[i])
    //         }else if(waterList[i].status==2){
    //           disapproveListCP.push(waterList[i])
    //         }else if(waterList[i].status==4){
    //           approveListCP.push(waterList[i])
    //         }
    //       }
    //       that.setData({
    //         totalList: waterList
    //       })
    //     }
    //     that.setData({
    //       pendingList:pendingListCP,
    //       disapproveList:disapproveListCP,
    //       approveList:approveListCP,
    //       loading: false,
    //     })
    //     var newlists = oldlists.concat(res.data) //合并数据 res.data 你的数组数据
    //     setTimeout(() => {
    //       that.setData({
    //         lists: newlists,
    //         lastpage: res.data.pagecount //你的总页数
    //       });
    //     //隐藏 加载中的提示
    //       wx.hideLoading();
    //     }, 1500)
    // })
  },
  onLoad: function (options) {
    var role_id = wx.getStorageSync('role_id');
    this.setData({role_id:role_id})
    var selectId = options.selectId
    this.setData({selectId:selectId})
    this.setData({selectStatus:'wait'})
    var that = this
    that.onWater(this)
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    this.data.page = 1
    this.onWater()
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.onWater()
    } else {
      wx.showToast({
        title: '数据已加载完！',
      })
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
    var role_id = wx.getStorageSync('role_id');
    const { gid } = e.currentTarget.dataset
    var advice="";
    var url;
    if(gid.reviews.length>0){
    advice = gid.reviews[0].content
    }else{
      advice =""
    }
    if(role_id==2){
       url = `../edit/edit?usr_id=${usr_id}&user_name=${gid.user_name}&id=${gid.id}&dosing_time=${gid.dosing_time}&position=${gid.position}&medicine_id=${gid.medicine_id}&medicine_name=${gid.medicine_name}&medicine_count=${gid.medicine_count}&unit_id=${gid.unit_id}&unit_name=${gid.unit_name}&advice=${advice}`
    }else if(role_id==3){
      var selectId =this.data.selectId
       url = `../edit/edit?usr_id=${usr_id}&user_name=${gid.user_name}&id=${gid.id}&dosing_time=${gid.dosing_time}&position=${gid.position}&medicine_id=${gid.medicine_id}&medicine_name=${gid.medicine_name}&medicine_count=${gid.medicine_count}&unit_id=${gid.unit_id}&unit_name=${gid.unit_name}&advice=${advice}&selectId=${selectId}`
    }
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