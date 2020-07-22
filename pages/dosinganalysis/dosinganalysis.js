//声明js
var http = require("../../utils/httpUtil.js")
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
var yuelineChart = null;
var columnCanvas = null;
Page({
    data: {
        option: [{
                // text: 'PAM(阳离子)',
                // value: 159280152053
            },
            // {
            //     text: 'PAM(阴离子)',
            //     value: 159280864452
            // }
        ],
        medicine_name: "片碱",
        medicine_id:159332570586,
        medicine_count:"",
        color:"",
        consume_percentage:"",
        currentDate: new Date().getTime(),
        start_time:"",
        end_time:"",
        showStart:false,
        showEnd:false,
        windowWidth:'',
        "dosage_period":"",
        "categories": [],
        "periodData": [],
        echartMedicineList: [],
        "one_dosage_period_max":"",
        "one_dosage_period_min":"",
        "relative_ration_str":"",
        "relative_ration_max_str":"",
        "relative_ration_min_str":"",
        "canvsPie":"",
        "canvsLine":"",
        "canvsHistogram":"",
        "transCanvs":false,
         selectId:"",
         selectName:"",
    },
    onOpen(){
        console.log("true")
        this.setData({transCanvs:true})
    },
    onCloseDropdown(){
        this.setData({transCanvs:false})
        this.onGetInfo()
    },
    onChange(event){
        this.setData({medicine_id:Number(event.detail)})
        this.getNameAndColor(this.data.medicine_id)
        this.onGetInfo()
    },
    showStartPop() {
        this.setData({ showStart: true, transCanvs:true});
      },
      showEndPop() {
        this.setData({ showEnd: true,transCanvs:true });
      },
      // 开始时间
      confirm(event) {
        var date = this.formatDate(event.detail)
        this.setData({start_time: date});
        this.setData({ showStart: false,transCanvs:false });

        const { end_time } = this.data
        if ( this.validStr(end_time) ) {
            var str = this.companyDateTime(date,end_time)
            if ( this.validStr(str)) {
                wx.showToast({
                  title: str, icon : 'none', duration: 2000,
                })
            }  else this.onGetInfo()
        }
      },
      onClose() {
        this.setData({ showStart: false });
      },
      // 结束时间
      onConfirm(event) {
        var date = this.formatDate(event.detail)
        this.setData({end_time: date});
        this.setData({ showEnd: false,transCanvs:false });

        const { start_time } = this.data
        if ( this.validStr(start_time) ) {
            var str = this.companyDateTime(start_time,date)
            if ( this.validStr(str)) {
                wx.showToast({
                  title: str, icon : 'none', duration: 2000,
                })
            } else this.onGetInfo()
        }
      },
      onCancel() {
        this.setData({ showEnd: false,transCanvs:false });
      },
      getNameAndColor(medicine_id){
        var option = this.data.option
        for (var i = 0; i < option.length; i++) {
            if(medicine_id==option[i].value){
                this.setData({"medicine_name":option[i].text}) 
                this.setData({"medicine_count":option[i].medicine_count}) 
                this.setData({"color":option[i].color}) 
                this.setData({"consume_percentage":option[i].consume_percentage}) 
            }
      }
    },
      //时间戳转换方法    date:时间戳数字
     formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        // var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        // var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        // var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        // return YY + MM + DD +" "+hh + mm + ss;
        return YY + MM + DD;
     },
    // 环形图
    touchHandler: function (e) {
        console.log(ringChart.getCurrentDataIndex(e));
    },
    // updateData: function () {
    //     ringChart.updateData({
    //         title: {
    //             name: '80%'
    //         },
    //         subtitle: {
    //             color: '#ff0000'
    //         }
    //     });
    // }, 
    onPie: function () {
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
                name: this.data.medicine_name,
                color: '#9B9B9B',
                fontSize: 8
            },
            subtitle: {
                name: this.data.consume_percentage,
                color: '#4A4A4A',
                fontSize: 10
            },
            series: this.data.echartMedicineList,
            disablePieStroke: true,
            width: windowWdithHalf,
            height: 150,
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
    },
    // 柱状图
    columnShow: function (type, c1, c2) {
        
        // let column = {
        //     canvasId: 'columnGraph', // canvas-id
        //     type: 'column', // 图表类型，可选值为pie, line, column, area, ring
        //     series: [{ // 数据列表
        //         name: '捆包1', // 数据名称
        //         color: '#5AC59F' // 配色，不传入则使用系统默认配色方案
        //     }, {
        //         name: '捆包2',
        //         color: '#8AD2F5'
        //     }],
        //     yAxis: {
        //         min: 0 // Y轴起始值
        //     },
        //     width: 310, // 宽度，单位为px
        //     height: 200, // 高度，单位为px
        //     legend: false, // 是否显示图表下方各类别的标识
        //     dataLabel: true, // 是否在图表中显示数据内容值
        //     extra: {
        //         column: {
        //             width: 30 // 柱状图每项的图形宽度，单位为px
        //         }
        //     }
        // }
        // new CHARTS(column);
        columnCanvas = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            // title: {
            // name: ‘图表标题’,
            // fontSize: 20
            // },
            dataLabel: true,
            categories: this.data.categories,
            series: [{
                name: '日消耗量',
                color: "#628DFC", //柱子的颜色
                data: this.data.periodData,
                format: function (val, name) {
                    return val;
                    // return val.toFixed(1) + ‘L’;
                }
            }],
            dataItem: {
                color: '#628DFC' //数据颜色
            },
            yAxis: {
                fontColor: '#9B9B9B',
                disabled: false, //是否绘制Y轴
                format: function (val) { //返回数值
                    return val.toFixed(0);
                },
                min: 1, //最小值
                max: 7, //最大值
                disableGrid: true,
                gridColor: '',
            },
            xAxis: {
                fontColor: '', //数据颜色
                // min: 0, //最小值
                // max: 8, //最大值
                disableGrid: false, //不绘制X轴网格(去掉X轴的刻度)
                gridColor: '',
                fontColor: '#9B9B9B',
                type: 'acalibration' //刻度
            },
            extra: {
                column: {
                    width: 10
                }
            },
            // dataPointShape: true, //是否在图标上显示数据点标志
            width: this.data.windowWidth, //图表展示内容宽度
            height: 220, //图表展示内容高度
        })
    },
    getMothElectro: function (e) {
        yuelineChart = new wxCharts({ //当月用电折线图配置
            canvasId: 'yueEle',
            type: 'line',
            categories: this.data.categories, //categories X轴
            animation: true,
            // background: '#f5f5f5',
            series: [{
                    name: '环比分析图',
                    //data: yuesimulationData.data,
                    // data: this.data.periodData,
                    data: this.data.relative_ration_str,
                    format: function (val, name) {
                        return val.toFixed(2) + '%';
                    }
                },
            ],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '环比值',
                format: function (val) {
                    return val.toFixed(2);
                },
                max: 20,
                min: 0
            },
            width: this.data.windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    },
    onGetInfo(){
        var start_time = this.data.start_time
        var end_time = this.data.end_time
        var role_id = wx.getStorageSync('role_id')
        var company_id
        if(role_id == 2){
            company_id = wx.getStorageSync('company_id')
        }else if(role_id == 3){
            company_id = this.data.selectId
        }
        //加载接口
        var params = {
            "start_time": this.data.start_time,
            "end_time": this.data.end_time,
            "company_id": company_id,
            "medicine_id": this.data.medicine_id
        };
        var that = this;
        http.Post('/app/dosage_review/dosage/period', params, function (res) {
            var dosage_period = res.data.data.dosage_period
            var medicineList =[]
            var color;
            for (var i = 0; i < dosage_period.length; i++) {
                // that.setData({medicine_id:Number(dosage_period[0].id)})
                // that.setData({medicine_name:dosage_period[0].medicine_name})
                switch (dosage_period[i].medicine_name) {
                    case "活性炭": color = '#F8C322'; break;
                    case "PAM(阳离子)": color = '#5553CE'; break;
                    case "PAM(阴离子)": color = '#F65050'; break;
                    case "片碱": color = '#64C676'; break;
                    case "PAC": color = '#669AFF'; break;
                    case "葡萄糖": color = '#FF9100'; break;
                    case "NaCO3": color = '#FFFF03'; break;
                  }
                medicineList.push({text: dosage_period[i].medicine_name,value: dosage_period[i].id,color:color,consume_percentage:dosage_period[i].consume_percentage,medicine_count:dosage_period[i].consume});
            }
            that.setData({"option":medicineList})
            var storageMedicine = [];
            var j = 0;
            var len = 0;
        
            for (j = 0, len = dosage_period.length; j < len; j++) {
              storageMedicine.push({
                name: dosage_period[j].medicine_name,
                data: dosage_period[j].consume,
                stroke: false,
                color: '#64C676'
              });
              switch (dosage_period[j].medicine_name) {
                case "活性炭": storageMedicine[j].color = '#F8C322'; break;
                case "PAM(阳离子)": storageMedicine[j].color = '#5553CE'; break;
                case "PAM(阴离子)": storageMedicine[j].color = '#F65050'; break;
                case "片碱": storageMedicine[j].color = '#64C676'; break;
                case "PAC": storageMedicine[j].color = '#669AFF'; break;
                case "葡萄糖": storageMedicine[j].color = '#FF9100'; break;
                case "NaCO3": storageMedicine[j].color = '#FFFF03'; break;
              }
            }
            that.setData({
              echartMedicineList: storageMedicine
            })
            that.setData({
                "categories": res.data.data.x_date
            })
            that.setData({
                "periodData": res.data.data.one_dosage_period
            })
            that.setData({
                "one_dosage_period_max": res.data.data.one_dosage_period_max
            })
            that.setData({
                "one_dosage_period_min": res.data.data.one_dosage_period_min
            })
            that.setData({
                "relative_ration_str": res.data.data.relative_ration_str
            })
            that.setData({
                "relative_ration_max_str": res.data.data.relative_ration_max_str
            })
            that.setData({
                "relative_ration_min_str": res.data.data.relative_ration_min_str
            })
            that.getNameAndColor(that.data.medicine_id)
            that.onPie();
            that.columnShow();
            that.getMothElectro();
        })
    },
    onLoad: function (options) {
        var selectId =options.options
        var selectName =options.selectNamedsss
        this.setData({selectId:selectId,selectName:selectName})
       this.setData({
        start_time:this.getStartDate(),
        end_time:this.dateFormat(new Date())
       })
       this.getSystemInfo()
       this.onGetInfo()
     
       this.setCanvsPieImage()
       this.setCanvsLineImage()
       this.setCanvsHistogramImage()
    },
    getSystemInfo(){
        wx.getSystemInfo({
            success: (result) => {
              this.setData({
                  windowWidth:result.windowWidth-40
              })
            },
          })
    },
    validStr(str){
        if( str === '' || str === null || typeof(str) === undefined) return false
        else return true
    },
    companyDateTime(start_time,end_time){
        var str = ''
         //日期格式化
         var start_date = new Date(start_time.replace(/-/g, "/"))
         var end_date = new Date(end_time.replace(/-/g, "/"))
         //转成毫秒数
         var start = start_date.getTime()
         var end = end_date.getTime()
         var ms = end_date.getTime() - start_date.getTime()
          //转换成天数
         var day = parseInt(ms / (1000 * 60 * 60 * 24))
        if (start_date > end_date) str =  '开始时间不得大于结束时间'
        else if (day < 0 || day > 30) str = '时间跨度不得大于一周'
        else str = ''
        return str
    },
    getStartDate(){
        var span = new Date().getTime();
        var start = span - (1000 * 60 * 60 * 24 * 6)
        return this.formatDate(new Date(start))
    },
    dateFormat(dateFormat) {
        // date = (date + '').replace(/-/g, '/');
        const year = dateFormat.getFullYear() + '-';
        var monthformat = dateFormat.getMonth() + 1
        const month = (monthformat < 10 && monthformat != 0 ? '0' + monthformat : monthformat) + '-';
        const day = dateFormat.getDate() + '';
        return year + month + day;
    },
    setCanvsPieImage(){
        var that = this
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: 'ringCanvas',
                success: function(res) {
                    console.log("图片")
                    console.log(res)
                  that.setData({ canvsPie: res.tempFilePath});
                },
                fail:function(res){
                }
              },this)
        }, 2000);
    },
    setCanvsLineImage(){
        var that = this
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: 'yueEle',
                success: function(res) {
                    console.log("图片")
                    console.log(res)
                //   that.setData({ canvsLine: res.tempFilePath},()=>{console.log(that.data.canvsLine)});
                  that.setData({ canvsLine: res.tempFilePath});
                },
                fail:function(res){
                }
              },this)
        }, 2000);
    },
    setCanvsHistogramImage(){
        var that = this
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: 'columnCanvas',
                success: function(res) {
                //   that.setData({ canvsHistogram: res.tempFilePath},()=>{console.log(that.data.canvsLine)});
                  that.setData({ canvsHistogram: res.tempFilePath});
                },
                fail:function(res){
                    console.log(res)
                }
              },this)
        }, 2000);
    }
})