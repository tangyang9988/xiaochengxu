// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data: {
    medicine_name: "",
    medicine_name: "",
    is_active: false,
    minimum: "",
    supplier: "",
    storage_amount: "",
  },
  onChange1(event) {
    this.setData({
      medicine_name: event.detail
    })
  },
  onChange2(event) {
    this.setData({
      supplier: event.detail
    })
  },
  onChange3(event) {
    this.setData({
      storage_amount: event.detail
    })
  },
  onFieldChange({
    detail
  }) {
    this.setData({
      minimum: detail
    });
  },
  onChange({
    detail
  }) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      is_active: detail
    });
  },
  supplierChange(event) {
    this.setData({
      supplier: event.detail
    })
  },
  add: function () {
    var usr_id = wx.getStorageSync('usr_id');
    var company_id = wx.getStorageSync('company_id');
    //http 请求是异步的，必须重新赋值this
    var that = this;
    if (that.data.is_active) {
      that.setData({
        is_active: 1
      })
    } else {
      that.setData({
        is_active: 0
      })
    }
    var params = {
      "medicine_name": that.data.medicine_name,
      "company_id": company_id ,
      "supplier": that.data.supplier,
      "is_active": that.data.is_active,
      "minimum": parseFloat(that.data.minimum),
      "user_id": usr_id
    }
    wx.showModal({
      title: '提示',
      content: '是否新增药品',
      success(res) {
        if (res.confirm) {
          http.Post('/app/storage/medicine/add', params, function (res) {
            const {
              data
            } = res
            if (data.code === 200) {
              wx.showToast({
                title: '添加药品成功',
                icon: 'success',
                duration: 1000
              })
              that.clearData()
            } else wx.showToast({
              title: '添加药品失败',
              icon: 'none'
            })
          })
        }
        that.changeParentData()
      }
    })
  },
  changeParentData: function () {
    var pages = getCurrentPages(); //当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
      beforePage.onLoad(); //触发父页面中的方法
    }
    wx.navigateBack({
      delta: 1
    });

  },
  cancle() {
    wx.navigateBack({})
  }
});