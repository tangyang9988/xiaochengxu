
var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    listData:[],
    screenHeight:'',
    usr_id: ''
  },
  onLoad: function () {
    var usr_id = wx.getStorageSync('usr_id');
    this.setData({usr_id},()=>{console.log(this.data.usr_id)})
    this.getSystemInfo()
    var that = this       //很重要，一定要写
    var params={
      "user_id":usr_id
    };
    http.Post('/app/storage/query', params, function (res) {
        var datas=res.data;          //res.data就是从后台接收到的值
        console.log(datas)
        that.setData({               //循环完后，再对list进行赋值
          listData: datas.data,
        })
    })
  },
  getSystemInfo() {
    const { usr_id } = this.data 
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
        this.setData({ screenHeight: usr_id === 7 ? result.windowHeight - 80 : result.windowHeight - 20 })
      },
    })
  },
  /**
   * 列表子项点击事件
   * @param { item子项 } e 
   */
  onItemClick(e) {
    console.log(e)
    const { gid } = e.currentTarget.dataset
    const url = `../storageBasic/storageBasic?storage_id=${gid.id}&medicine_id=${gid.medicine_id}&medicine_name=${gid.medicine_name}&supplier=${gid.supplier}&minimum=${gid.minimum}&is_process=${gid.is_process}&storage_amount=${gid.storage_amount}`
    this.onNavigateTo(url)
  },
  /**
   * 新增药品点击事件
   */
  onAddMedicine() {
    this.onNavigateTo(`../storageIn/storageIn`)
  },
  /**
   * 页面跳转
   * @param { 路由地址 } url 
   */
  onNavigateTo(url) {
    wx.navigateTo({ url })
  },
})
