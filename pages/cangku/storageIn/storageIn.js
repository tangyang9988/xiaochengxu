
let app = getApp();
Page({
  data: {
    medicinelist:[],
    medicine_name:"",
    medicine_count:"",
    supplier:"",
    show: false,
    columns: [],
    supplierColumns: ['供应商1', '供应商2', '供应商3', '供应商4'],
  },
  onChange(event) {
    const { picker, value, index } = event.detail;

    const { medicinelist } = this.data
    this.setData({medicine_name :event.detail.value,supplier: medicinelist[index].supplier})
    console.log(event.detail)
  },
  onChange2(event) {
    this.setData({supplier :event.detail.value})
  },
  onChange3(event) {
    this.setData({medicine_count :event.detail.value})
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
    wx.request({
      url: 'http://172.20.0.70:8088/app/storage/query',//和后台交互的地址，默认是json数据交互，由于我的就是json，这里就没有对header进行编写
      data: {
        "user_id":usr_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },  
      success: function (res) {
        var datas=res.data;//res.data就是从后台接收到的值
        // var list=[];
        // for(var i=0;i<datas.data.length;i++){
        //   debugger
        //   console.log(datas.data.medicine_name)
        //   // list.add(datas.data.medicine_name); 
        // }
        console.log(that.list)
        console.log(datas)
        let list = []
        const { data } = datas
        for(let i =0;i<data.length;i++) {
          list.push(data[i].medicine_name)
        }
        that.setData({//循环完后，再对list进行赋值
          columns: list,
          medicinelist: data
        })
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },
  submit:function(){
    var usr_id = wx.getStorageSync('usr_id');
    var that=this;
    wx.request({  
    url: 'http://172.20.0.70:8088/app/storage/put_in_amount', 
    data:{
      medicine_name:that.data.medicine_name,
      user_id:usr_id,
      supplier:that.data.supplier,
    },
    method:'POST',
    header: {  
      'content-type': 'application/json'
    },  
    success: function (res) {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000//持续的时间
      })
    },
  })
}

});
