
var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    listData:[],
    screenHeight:'',
    usr_id: '',
    role_id: '',
    selectId:"",
    selectName:"",
  },
  onLoad: function (options) {
    if(options){
    var selectId =Number(options.selectId)
    var selectName =options.selectName
    }

    this.setData({selectId:selectId,selectName:selectName})
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    this.setData({role_id:role_id})
    this.setData({usr_id},()=>{console.log(this.data.usr_id)})
    this.getSystemInfo()
    var that = this       //很重要，一定要写
    var params;
    if(role_id ==3){
      params={
        "company_id":that.data.selectId
      }

    }else{
      params={
        "company_id":wx.getStorageSync('company_id')
      }
    }
    http.Post('/app/storage/company/all/query', params, function (res) {
        var datas=res.data;          //res.data就是从后台接收到的值
        console.log(datas)
        that.setData({               //循环完后，再对list进行赋值
          listData: datas.data,
        })
    })
  },
  getSystemInfo() {
    const { role_id } = this.data 
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
        this.setData({ screenHeight: role_id ===2 ? result.windowHeight - 80 : result.windowHeight - 20 })
      },
    })
  },
  /**
   * 列表子项点击事件
   * @param { item子项 }
   */
  onItemClick(e) {
    const { role_id } = this.data 
    var line = e.currentTarget.dataset.gid
    if(role_id === 2){
      const { gid } = e.currentTarget.dataset
      const url = `../storageBasic/storageBasic?storage_id=${gid.id}&medicine_id=${gid.medicine_id}&medicine_name=${gid.medicine_name}&supplier=${gid.supplier}&minimum=${gid.minimum}&is_active=${gid.is_active}&storage_amount=${gid.storage_amount}`
      this.onNavigateTo(url)
    }
  },
  /**
   * 新增药品点击事件
   */
  onAddMedicine() {
    this.onNavigateTo(`../newDosage/newDosage`)
  },
  /**
   * 页面跳转
   * @param { 路由地址 } url 
   */
  onNavigateTo(url) {
    wx.navigateTo({ url })
  },
})
