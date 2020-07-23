//声明js
var http = require("../../utils/httpUtil.js")
var time = require('../../utils/util.js')
var app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var ringChart = null;

Page({
  data: {
    selectId:"",
    selectName:"",
    avatar_url:"",
    information: {},
    daily_not_finish_count: 0,
    medicineSimpleList: [],
    medicineList: [],
    echartMedicineList: [],
    companyOption: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    companyValue: 0,
    companyDropMenu: [],
    companySelectValue: 0,
    disabled:true,
    canvsRing:'',
    "transCanvs":false
  },
  onOpen(){
    console.log("true")
    this.setData({transCanvs:true})
  },
  onCloseDropdown(){
    console.log("false")
    this.setData({transCanvs:false})
    //this.onLoad()
  },

  onLoad: function (options) {
    var role_id = wx.getStorageSync('role_id');
    var company_id = wx.getStorageSync('company_id');
    var that = this//很重要，一定要写
    var informationStore = {}
    var avatar_url = wx.getStorageSync('avatar_url');
    that.setData({avatar_url:avatar_url})
    var selectId =options.selectId
    var selectName =options.selectName
    that.setData({selectId:selectId,selectName:selectName})
    var params;
    if(role_id == 2){
      params = {
        "company_id": Number(company_id)
      }
    }else if(role_id == 3){
      params = {
        "company_id": Number(that.data.selectId)
      }
    }
      //获取信息仓数据
      http.Post('/app/dosage_review/today', params, function (res) {
        var storage = res.data.data;
        var storageList = res.data.data.DailyEveryMedicineConsume

        informationStore = storage
        that.daily_not_finish_count = informationStore.daily_not_finish_count
        var storageMedicine = [];
        var j = 0;
        var len = 0;
        
        for (j = 0, len = storageList.length; j < len; j++) {
          storageMedicine.push({
            name: storageList[j].medicine_name,
            data: storageList[j].daily_consume,
            stroke: false,
            color: '#64C676'
          });
          switch (storageList[j].medicine_name) {
            case "活性炭": storageMedicine[j].color = '#F8C322'; break;
            case "PAM(阳离子)": storageMedicine[j].color = '#5553CE'; break;
            case "PAM(阴离子)": storageMedicine[j].color = '#F65050'; break;
            case "片碱": storageMedicine[j].color = '#64C676'; break;
            case "PAC": storageMedicine[j].color = '#669AFF'; break;
            case "葡萄糖": storageMedicine[j].color = '#FF9100'; break;
            case "NaCO3": storageMedicine[j].color = '#FFFF03'; break;
            case "聚合硫酸铁": storageMedicine[j].color = '#DCC4F3'; break;
            case "硫酸亚铁": storageMedicine[j].color = '#CFF1F0'; break;
            case "次氯酸钠": storageMedicine[j].color = '#FFB8AA'; break;
          }
          that.data.medicineSimpleList.push(storageList[j].medicine_name)
        }

        if (storageMedicine.length == 0) {
          //没有数据赋值默认值，防止程序崩溃
          storageMedicine.push({
            name: "",
            data: 0,
            stroke: false,
            color: '#64C676'
          });
        }

        that.setData({//循环完后，再对list进行赋值
          information: res.data.data,
          medicineList: storageList,
          echartMedicineList: storageMedicine,
          loading: false
        })
       
        //渲染饼状图数据
        var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
        var windowWdithHalf = windowWidth / 5*2;
        ringChart = new wxCharts({
          animation: true,
          canvasId: 'ringCanvas',
          type: 'ring',
          extra: {
            ringWidth: 25,
            pie: {
              offsetAngle: -45
            }
          },
          title: {
            name: storage.daily_max_medicine_percentage,
            color: '#7cb5ec',
            fontSize: 12
          },
          subtitle: {
            name: storage.daily_max_medicine_name,
            color: '#666666',
            fontSize: 8
          },
          series: storageMedicine,
          disablePieStroke: true,
          width: windowWdithHalf,
          height: 200,
          dataLabel: false,
          legend: false,
          background: '#f5f5f5',
          padding: 0
        });
        ringChart.addEventListener('renderComplete', () => {
          
        });
        setTimeout(() => {
          ringChart.stopAnimation();
        }, 500);
      })
      // }


    
    this.getCanvsRing()
  },

  onChange(event) {
   
    this.setData({ companySelectValue: event.detail })
  
    this.initDraw();
    //this.onLoad();
  },

  touchHandler: function (e) {
    var that = this;
   
    var medicineIndex = ringChart.getCurrentDataIndex(e);
   
    // console.log(this.data.information);
    ringChart.opts.subtitle.name = this.data.medicineList[medicineIndex].medicine_name;
   
    ringChart.opts.title.name = this.data.medicineList[medicineIndex].daily_consume_percentage_number;
   
  },
  updateData: function () {
    ringChart.updateData({
      title: {
        name: '80%'
      },
      subtitle: {
        color: '#ff0000'
      }
    });
  },
  onReady: function (e) {

  },
  initDraw: function () {
    var that = this//很重要，一定要写
    var params = {
      "company_id": that.data.selectId
    }

    //获取信息仓数据
    http.Post('/app/dosage_review/today', params, function (res) {
      
      console.log("query:",res.data)
      var storage = res.data.data;
      var storageList = res.data.data.DailyEveryMedicineConsume
      var storageMedicine = [];
      var j = 0;
      var len = 0;
      
      for (j = 0, len = storageList.length; j < len; j++) {
        storageMedicine.push({
          name: storageList[j].medicine_name,
          data: storageList[j].daily_consume,
          stroke: false,
          color: '#64C676'
        });
        switch (storageList[j].medicine_name) {
          case "活性炭": storageMedicine[j].color = '#F8C322'; break;
          case "PAM(阳离子)": storageMedicine[j].color = '#5553CE'; break;
          case "PAM(阴离子)": storageMedicine[j].color = '#F65050'; break;
          case "片碱": storageMedicine[j].color = '#64C676'; break;
          case "PAC": storageMedicine[j].color = '#669AFF'; break;
          case "葡萄糖": storageMedicine[j].color = '#FF9100'; break;
          case "NaCo3": storageMedicine[j].color = '#FFFF03'; break;
        }
        that.data.medicineSimpleList.push(storageList[j].medicine_name)
      }

      if (storageMedicine.length == 0) {
        //没有数据赋值默认值，防止程序崩溃
        storageMedicine.push({
          name: "",
          data: 0,
          stroke: false,
          color: '#64C676'
        });
      }
      

      that.setData({//循环完后，再对list进行赋值
        information: res.data.data,
        medicineList: storageList,
        echartMedicineList: storageMedicine,
        daily_not_finish_count: res.data.data.daily_not_finish_count,
        loading: false
      })
      
      //渲染饼状图数据
      var windowWidth = 320;
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
        console.log("屏幕宽度：",windowWidth)
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      var windowWdithHalf = windowWidth / 5*2;
      
      ringChart = new wxCharts({
        animation: true,
        canvasId: 'ringCanvas',
        type: 'ring',
        extra: {
          ringWidth: 25,
          pie: {
            offsetAngle: -45
          }
        },
        title: {
          name: storage.daily_max_medicine_percentage,
          color: '#7cb5ec',
          fontSize: 12
        },
        subtitle: {
          name: storage.daily_max_medicine_name,
          color: '#666666',
          fontSize: 8
        },
        series: storageMedicine,
        disablePieStroke: true,
        width: windowWdithHalf,
        height: 250,
        dataLabel: false,
        legend: false,
        background: '#f5f5f5',
        padding: 0
      });

      setTimeout(() => {
        ringChart.stopAnimation();
      }, 500);
    })
  },
  getCanvsRing(){
    var that = this
    setTimeout(() => {
        wx.canvasToTempFilePath({
            canvasId: 'ringCanvas',
            success: function(res) {
              that.setData({ canvsRing: res.tempFilePath});
            },
            fail:function(res){
                console.log(res)
            }
          },this)
    }, 2000);
  }
})
