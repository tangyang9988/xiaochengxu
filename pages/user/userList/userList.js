var http = require("../../../utils/httpUtil.js")
Page({
  data: {
    listData:[],
    maotaiData:[],
    screenHeight:'',
    role_id:"",
    selectName:"",
    selectId:"",
  },
  onLoad: function (options) {
    var usr_id = wx.getStorageSync('usr_id');
    var role_id = wx.getStorageSync('role_id');
    this.setData({role_id:role_id})
    var that = this //很重要，一定要写
    var params={ "user_id":usr_id}
    if(role_id == 2){
      http.Post('/app/user/subordinate/query', params, function (res) {
          var resData =res.data.data
          that.setData({//循环完后，再对list进行赋值
            listData: res.data.data,
            loading: false
          })
      })
    }else if(role_id == 3){
      var selectName = options.selectName
      var selectId = Number(options.selectId)
      that.setData({selectName:selectName,selectId:selectId})
      http.Post('/app/user/subordinate/query', params, function (res) {
          var resData =res.data.data
          var company_id;
          var userList=[]
          for (var i = 0; i < resData.length; i++) {
            company_id=resData[i].company_id
            if(selectId==company_id){
              userList.push(resData[i])
            }
          }
          that.setData({//循环完后，再对list进行赋值
            listData: userList,
            loading: false
          })
      })
    }
  },
  Edit(e) {
    debugger
      const { gid } = e.currentTarget.dataset
      const url = `../editUser/editUser?id=${gid.id}&name=${gid.name}&cellphone=${gid.cellphone}&role_id=${gid.role_id}&selectRole_name=${gid.role_id==1?'加药员':'化验员'}&selectName=${this.data.selectName}&selectId=${this.data.selectId}`
      this.onNavigateTo(url)
  },
  Delete(e) {
    var that =this;
    const { gid } = e.currentTarget.dataset
    var id = gid.id
    var params={
      id:id
    }
    wx.showModal({
      title: '提示',
      content: '是否确认删除用户',
      success(res){
        if (res.confirm) {
          http.Post('/app/user/del', params, function (res) {
            const { data } = res
            if (data.code === 200) {
              wx.showToast({ title: '删除用户成功！', icon :'success',duration: 2000 })
            } else  wx.showToast({title: '删除用户失败！', icon :"none" })
          })
         wx.navigateBack({
           complete: (res) => {},
         })
        } 
      }
    })
},
  onAddUser() {
    this.onNavigateTo(`../addUser/addUser?selectName=${this.data.selectName}&selectId=${this.data.selectId}`)
  },
  onNavigateTo(url) {
    wx.navigateTo({ url })
  },
  getSystemInfo() {
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
        this.setData({ screenHeight: result.windowHeight})
      },
    })
  },
  
})
