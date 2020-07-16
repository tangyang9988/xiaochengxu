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
  onLoad: function (options) {
    //options专门用于接受数据的
    console.log(options)
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
  onChange1(event) {
    // event.detail 为当前输入的值
    var form1 = this.data.form;
    form1.dosing_time = String(event.detail);
    this.setData("form", form1)
  },
  onChange2(event) {
    // event.detail 为当前输入的值
    var form2 = this.data.form;
    form2.position = event.detail;
    this.setData("form", form2)
  },
  onChange3(event) {
    // event.detail 为当前输入的值
    var form3 = this.data.form;
    form3.medicine_id = Number(event.detail);
    this.setData("form", form3)
  },
  onChange4(event) {
    // event.detail 为当前输入的值
    var form4 = this.data.form;
    form4.medicine_count = Number(event.detail);
    this.setData("form", form4)
  },
  onPicker(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onClickButtonSubmit: function (e, dosing_time) {
    console.log(dosing_time)
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
              that.clearData()
            } else wx.showToast({
              title: '修改库存失败',
            })
          })
        }
        that.changeParentData()
      }
    })
  },
  changeParentData: function () {
    var pages = getCurrentPages();//当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
      beforePage.onLoad();//触发父页面中的方法
    }
    wx.navigateBack({
      delta: 1
    });

  },
  cancle() {
    wx.navigateBack({})
  }
});