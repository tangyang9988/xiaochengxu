var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data: {
    medicinelist:[],
    medicine_name:"",
    medicine_id:"",
    medicine_count:"",
    supplier:"",
    show: false,
    columns: [],
    supplierColumns: ['供应商1', '供应商2', '供应商3', '供应商4'],
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    const { medicinelist } = this.data
    this.setData({medicine_id :event.detail.value.value,medicine_name :event.detail.value.text,supplier: medicinelist[index].supplier})
    console.log(event.detail)
  },
  onChange2(event) {
    this.setData({supplier :event.detail.value})
  },
  onChange3(event) {
    if (!/^-?\d+\.?\d{0,5}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多5位小数',
        icon: 'none'
      })
    } else {
      this.setData({medicine_count :event.detail})
    }
  },
  showPopup() {
    this.setData({ show: true });
  },
  showPopup2() {
    this.setData({ show2: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onClose2() {
    this.setData({ show2: false });
  },
  onLoad: function () {
    var usr_id = wx.getStorageSync('usr_id');
    var that = this       //很重要，一定要写
    let params={
      "user_id":usr_id
    }
    http.Post('/app/storage/active/query', params, function (res) {
      var datas=res.data.data;//res.data就是从后台接收到的值
      let list = []
      for(let i =0;i<datas.length;i++) {
        list.push({text:datas[i].medicine_name,value:datas[i].id})
      }
      that.setData({//循环完后，再对list进行赋值
        columns: list,
        medicinelist: datas
      })
    },
    )},
  submit:function(){
    var usr_id = wx.getStorageSync('usr_id');
    var params={
      "medicine_id":this.data.medicine_id,
      "in_amount":parseFloat(this.data.medicine_count),
      "user_id":usr_id
    }
    wx.showModal({
      title: '提示',
      content: '是否入库',
      success(res){
        if (res.confirm) {
          http.Post('/app/storage/put_in_amount', params, function (res) {
            const { data } = res
            if (data.code === 200) {
              wx.showToast({ title: '入库成功', icon :'success',duration: 1000 })
            } else  wx.showToast({title: "入库失败", icon :"none" })
          })
          wx.navigateBack({
          })
        }
      },
      fail(res){ wx.showToast({title: '入库失败', icon :"none"}) }
    })
  },
  cancle:function(){
    wx.navigateBack({
    })
  }

});
