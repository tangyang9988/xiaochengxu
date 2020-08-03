// import Toast from '/@vant/weapp/dist/toast/toast';
var http = require("../../../utils/httpUtil.js")
let app = getApp();
Page({
  data: {
    "usr_id": "",
    "name": "",
    "selectId": "",
    "position": "无锡市点位",
    "dosing_time": "2020-07-30 10:00:00",
    "medicine_id": "",
    "medicine_name": "",
    "medicine_count": 10,
    "showTime": false,
    "showPosition": false,
    "showName": false,
    "currentDate": new Date().getTime(),
    "columns": ['无锡市点位', '苏州市点位', '上海点位'],
    // "option":[{key:159332570586,text:'片碱'},{key:159280864452,text:'PAM(阴离子)'},{key:159280152053,text:'PAM(阳离子)'},]
    "option": [],
    "unitOption": [{
            text: '桶',
            value: '桶'
        },
        {
            text: '吨',
            value: '吨'
        },
        {
            text: '包',
            value: '包'
        }
    ],
    unit:""
  },
  list: "",
  onChange3(event) {
    this.setData({
      "medicine_id": Number(event.detail)
    })
  },
  onChange4(event) {
    if (!/^-?\d+\.?\d{0,2}$/.test(event.detail)) {
      wx.showToast({
        title: '请输入数字值,最多2位小数',
        icon: 'none'
      })
    } else {
      this.setData({
        "medicine_count": event.detail
      })
    }
  },
  onPicker(event) {
    var keyId = event.detail.value.key;
    var text = event.detail.value.name;
    this.setData({
      "medicine_name": event.detail.value.text
    })
  },
  showTimePop() {
    this.setData({
      showTime: true
    });
  },
  showPositionPop() {
    this.setData({
      showPosition: true
    });
  },
  showNamePop() {
    this.setData({
      showName: true
    });
  },
  // 加药时间选择器
  confirm(event) {
    var selectDate = this.formatDate(event.detail)
    var currentDate=this.formatDate(new Date())
    if(selectDate>currentDate){
      wx.showToast({ title: '不能选择未来时间', icon :'none',duration: 1000 })
      this.setData({
        dosing_time: currentDate
      });
    }else{
      this.setData({
        dosing_time: selectDate
      })
    }

    this.setData({
      showTime: false
    });
  },
  onClose() {
    this.setData({
      showTime: false
    });
  },
  // 加药点位选择器
  onConfirm(event) {
    this.setData({
      position: event.detail.value
    });
    this.setData({
      showPosition: false
    });
  },
  onCancel() {
    this.setData({
      showPosition: false
    });
  },
  // 加药名称选择器
  nameConfirm(event) {
    this.setData({
      "medicine_name": event.detail.value.text
    })
    this.setData({
      "medicine_id": event.detail.value.key
    });
    this.setData({
      "showName": false
    });
  },
  nameCancel() {
    this.setData({
      "showName": false
    });
  },
  unitChange:function(event){
    this.setData({
      "unit": event.detail
    })
    wx.setStorage({
      key: 'unit',
      data: this.data.unit
    });
  },
  //时间戳转换方法    date:时间戳数字
  formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
  },
  onLoad: function (options) {
    var usr_id = wx.getStorageSync('usr_id');
    var company_id = wx.getStorageSync('company_id');
    var name = wx.getStorageSync('name');
    this.setData({
      usr_id: usr_id,
      name: name
    })
    var params = {
      "company_id": company_id
    }
    //http 请求是异步的，必须重新赋值this
    let that = this;
    http.Post('/app/storage/company/query', params, function (res) {
      var storage = res.data.data;
      var medicineList = [];
      if (storage.length > 0) {
        for (var i = 0; i < storage.length; i++) {
          medicineList.push({
            key: storage[i].id,
            text: storage[i].medicine_name
          });
          that.setData({
            medicine_id: storage[0].id,
            medicine_name: storage[0].medicine_name
          })
        }
        that.setData({
          "option": medicineList
        })
      }

    })
  },
  submit: function () {
    var that = this
    var params = {
      "dosing_time": this.data.dosing_time,
      "position": this.data.position,
      "medicine_id": this.data.medicine_id,
      "medicine_count": Number(this.data.medicine_count),
      "status": 1,
      "user_id": this.data.usr_id
    };
    wx.showModal({
      title: '提示',
      content: '是否确认提交加药单',
      success(res) {
        if (res.confirm) {
          http.Post('/app/dosage/add', params, function (res) {
            const {
              data
            } = res
            if (data.code === 200) {
              wx.showToast({
                title: '提交加药单成功',
                icon: 'success',
                duration: 2000
              })
              that.clearData()
            } else wx.showToast({
              title: '提交加药单失败',
              icon: 'none',
              duration: 2000
            })
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '提交加药单失败',
          icon: 'none'
        })
      }
    })
  },
  cancle: function () {
    this.clearData()
  },
  clearData() {
    this.setData({
      dosing_time: '',
      position: '',
      medicine_name: '',
      medicine_count: ''
    })
  }
});