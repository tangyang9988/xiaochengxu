// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data: {
    storage_id: "",
    medicine_name: "",
    is_active: false,
    minimum: "",
    supplier: "",
    storage_amount: "",
  },
  onChange1(event) {
    this.setData({"medicine_name":event.detail})
  },
  onLoad: function (options) {
    this.setData({
      storage_id: Number(options.storage_id),
      medicine_name: options.medicine_name,
      is_active: options.is_active === "0" ? false : true,
      minimum: options.minimum,
      supplier: options.supplier,
      storage_amount: options.storage_amount
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
  supplierChange(event){
    this.setData({supplier:event.detail})
  },
  modify: function () {
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
      "storage_id": that.data.storage_id,
      "medicine_name": that.data.medicine_name,
      "is_active": that.data.is_active,
      "supplier": that.data.supplier,
      "minimum": parseFloat(that.data.minimum)
    }
    wx.showModal({
      title: '提示',
      content: '是否确认修改库存信息',
      success(res) {
        if (res.confirm) {
          http.Post('/app/storage/medicine/modify', params, function (res) {
            const {
              data
            } = res
            if (data.code === 200) {
              wx.showToast({
                title: '修改库存成功',
                icon: 'success',
                duration: 1000
              })
            } else wx.showToast({
              title: '修改库存失败',
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