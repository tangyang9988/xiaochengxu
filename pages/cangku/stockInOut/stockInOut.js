var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    listData:[],
    screenHeight:'',
    searchValue:"",
    company_id:0,

  },
  onLoad: function (options) {
    var role_id = wx.getStorageSync('role_id');
    var company_id;
    if(role_id ==2){
      company_id= wx.getStorageSync('company_id');
    }else if(role_id ==3){
      company_id= Number(options.selectId)
    }
    this.setData({company_id:company_id})

    var that = this //很重要，一定要写
    var params={ "company_id":company_id}
    http.Post('/app/storage/log/company/query', params, function (res) {
        var resData =res.data.data
        console.log(resData)
        that.setData({//循环完后，再对list进行赋值
          listData: res.data.data,
          loading: false
        })

    })

  },getSystemInfo() {
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
        this.setData({ screenHeight: result.windowHeight})
      },
    })
  },
  onSearch(){
    console.log("search value:",this.data.searchValue)
    var that = this
    var params={
      "user_id":this.data.userId,
    "research_name":this.data.searchValue
    }
    http.Post('/app/dosage/query/like', params,function (res) {
      var datas=res.data;//res.data就是从后台接收到的值
       that.setData({//循环完后，再对list进行赋值
         List: datas.data,
         loading: false
       })
     })
  },
  onChange(e) {
   
    this.setData({
      searchValue: e.detail,
    });
    this.storageLog();
    console.log("search value:",e.detail)
  },
  onCancel(){
    this.setData({
      searchValue: "",
    });
  },
  storageLog(){
    var that = this //很重要，一定要写
    //var valueStrArr=that.data.searchValue.split("")
    var params={ "company_id": that.data.company_id,"medicine_name":that.data.searchValue}
    http.Post('/app/storage/log/filter/query', params, function (res) {
        var resData =res.data.data
        console.log(resData)
        that.setData({//循环完后，再对list进行赋值
          listData: res.data.data,
          loading: false
        })

    })
  },
})
