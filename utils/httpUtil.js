var baseURL = "https://wx.jslcznkj.cn/maotai"; 
function Post(api, params, success) {
  wx.request({
    url: baseURL +api,
    method: 'POST',
    header: {  
      'content-type': 'application/json'
    },  
    data: params,
    success: function(res) {
      success(res)
     wx.showToast({
        title: '成功!',
        icon: 'success',
        duration: 1000//持续的时间
      })
    },
    fail: function() {
      wx.showToast({
        title: '失败!',
        icon: 'fail',
        duration: 1000//持续的时间
      })
    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}
module.exports = {
  Post: Post,
  baseURL: baseURL
}