
Page({ 
  data: { 
  phone: '', 
  password:'' 
  }, 
 // 获取输入账号 
  phoneInput :function (e) { 
  this.setData({ 
  phone:e.detail.value 
  }) 
  }, 
  
 // 获取输入密码 
  passwordInput :function (e) { 
  this.setData({ 
  password:e.detail.value 
  }) 
  }, 
  
 // 登录 
  login: function () { 
  let usr_id = this.data.phone;
  if(this.data.phone.length == 0 || this.data.password.length == 0){ 
    wx.showToast({ 
      title: '用户名和密码不能为空', 
      icon: 'loading', 
      duration: 2000 
    }) 
  }else {
  // 这里修改成跳转的页面 
  // wx.showToast({ 
  // title: '登录成功', 
  // icon: 'success', 
  // duration: 2000 
  // }) 
  wx.setStorage({
    data: usr_id,
    key: 'usr_id',
  })

  wx.navigateTo({
    url: '../index/index?id='+usr_id
  })
  } 
  } 
 }) 