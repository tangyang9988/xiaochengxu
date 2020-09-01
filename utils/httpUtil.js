var baseURL = "https://wx.jslcznkj.cn/maotai"; 
// var baseURL = "http://172.20.0.70:8089";
function Post(api, params, success) {
  wx.request({
    url: baseURL +api,
    method: 'POST',
    header: {  
      'content-type': 'application/json',
      // 'token':
    },  
    data: params,
    success: function(res) {
      success(res)
    },
    fail: function() {
      wx.showToast({
        title: '失败!',
        icon: 'none',
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