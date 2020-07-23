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
                text: 'COD',
                value: 'cod'
            },
            {
                text: 'BOD5',
                value: 'bod5'
            },
            {
                text: '氨氮',
                value: 'ammonia_nitrogen'
            },
            {
                text: '总磷',
                value: 'phosphorus'
            }
            ,
            {
                text: '总氮',
                value: 'nitrogen'
            },
            {
                text: 'SS',
                value: 'ss'
            },
            {
                text: '色度',
                value: 'chromaticity'
            },
            {
                text: 'PH',
                value: 'ph'
            }
        ],
        option1: "COD",
        detection_name: 'cod',
        currentDate: new Date().getTime(),
        start_time: "2020-07-01",
        end_time:"2020-07-07",
        showStart:false,
        showEnd:false,
        "categories": [],
        "in_relative_ratio": [],
        "out_relative_ratio":[],
        "in_max":"",
        "in_min":"",
        "out_max":"",
        "out_min":"",
        "in_data":[],
        "out_data":[],
        "windowWidth":"",
        "canvsYueEle":"",
        "canvsColumn":"",
        "transCanvs":false,
        selectId:"",
        selectName:"",
    },
    onOpen(){
        console.log("true")
        this.setData({transCanvs:true})
    },
    onCloseDropdown(){
        console.log("false")
        this.setData({transCanvs:false})
        this.onGetInfo()
    },
    onInput(event) {
        this.setData({
          currentDate: event.detail,
        });
      },
    onChange(event){
        this.data.detection_name=event.detail
        this.onGetInfo()
    },
    showStartPop() {
        this.setData({ showStart: true, transCanvs:true });
      },
      showEndPop() {
        this.setData({ showEnd: true ,transCanvs:true});
      },
      // 开始时间
      confirm(event) {
        var date = this.formatDate(event.detail)
        // var dateCount=(end_time.getTime()-start_time.getTime())/(1000*60*60*24);/*不用考虑闰年否*/
        // if(Number(dateCount)>7){
        // }
        this.setData({start_time: date,transCanvs:false });
        this.setData({ showStart: false });
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
        this.setData({end_time: date,transCanvs:false });
        this.setData({ showEnd: false });
        const { start_time } = this.data
        if ( this.validStr(start_time) ) {
            var str = this.companyDateTime(start_time,date)
            console.log(str)
            if ( this.validStr(str)) {
                wx.showToast({
                  title: str, icon : 'none', duration: 2000,
                })
            } else this.onGetInfo()
        }
      },
      onCancel() {
        this.setData({ showEnd: false,transCanvs:false  });
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
            series: [
                {
                name: '进水',
                color: "#628DFC", //柱子的颜色
                data: this.data.in_data,
                format: function (val, name) {
                    // return val + 'L';
                    return val ;
                    // return val.toFixed(1) + ‘L’;
                }
            },
            {
                name: '出水',
                color: "#F8C322", //柱子的颜色
                data: this.data.out_data,
                format: function (val, name) {
                    return val;
                    // return val.toFixed(1) + ‘L’;
                }
            }
        ],
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
    // 折线图
    getMothElectro: function (e) {
        yuelineChart = new wxCharts({ //当月用电折线图配置
            canvasId: 'yueEle',
            type: 'line',
            categories: this.data.categories, //categories X轴
            animation: true,
            // background: '#f5f5f5',
            series: [{
                    name: '进水口',
                    //data: yuesimulationData.data,
                    data: this.data.in_relative_ratio,
                    format: function (val, name) {
                        return val.toFixed(2) + 'kWh';
                    }
                },
                {
                    name: '出水口',
                    data: this.data.out_relative_ratio,
                    format: function (val, name) {
                        return val.toFixed(2) + 'kWh';
                    }
                },
                // {
                //     name: '光伏供电量',
                //     data: [6, 4, 9, 7, 1, 4, 5, 1, 1, 8, 8, 6, 6, 2, 2, 2, 0, 5, 5, 8, 8, 8, 8, 9, 0, 4, 6, 9, 2, 1, 6],
                //     format: function (val, name) {
                //         return val.toFixed(2) + 'kWh';
                //     }
                // },
                // {
                //     name: '市电供电量',
                //     data: [0, 4, 3, 3, 1, 7, 7, 7, 9, 9, 3, 3, 0, 0, 5, 6, 0, 4, 1, 2, 0, 1, 3, 9, 2, 5, 1, 8, 3, 4, 2],
                //     format: function (val, name) {
                //         return val.toFixed(2) + 'kWh';
                //     }
                // }
            ],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '环比值',
                format: function (val) {
                    return val.toFixed(2);
                },
                max: 3,
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
    onLoad: function (options) {
        var selectId =Number(options.selectId)
        var selectName =options.selectNamedsss
        this.setData({selectId:selectId,selectName:selectName})
        this.setData({
            start_time:this.getStartDate(),
            end_time:this.dateFormat(new Date())
           })
        this.getSystemInfo()
        this. onGetInfo()
        this.setCanvsYueEle()
        this.setCanvsColumn()
    },
    getSystemInfo(){
        wx.getSystemInfo({
            success: (result) => {
              this.setData({
                  windowWidth:result.windowWidth-10
              })
            },
          })
    },
    onGetInfo(){
        var role_id = wx.getStorageSync('role_id')
        var company_id
        if(role_id == 2){
            company_id = wx.getStorageSync('company_id')
        }else if(role_id == 3){
            company_id = this.data.selectId
        }
        //加载接口
        var params = {
            "start_time":this.data.start_time,
            "end_time": this.data.end_time,
            "company_id": company_id,
            "detection_name": this.data.detection_name
        };
        var that = this;
        http.Post('/app/dosage_review/water_quality/period', params, function (res) {
            // console.log(res)
            // for (var i = 0; i < res.data.data.x_date.length; i++) {
            //     categories.push(res.data.data.x_date[i]);
            // }
            // for (var i = 0; i < res.data.data.one_dosage_period.length; i++) {
            //     data.push(res.data.data.one_dosage_period[i]);
            // }
            // that.setData({"categories":res.data.data.x_date})
            // that.setData({"periodData":res.data.data.one_dosage_period})
            // that.lineChart.data
            that.setData({
                "categories": res.data.data.x_date
            })
            var in_relative_ratio = res.data.data.period_relative_ratio.in_relative_ratio
            that.setData({
                "in_relative_ratio": in_relative_ratio
            })
            var out_relative_ratio = res.data.data.period_relative_ratio.out_relative_ratio
            that.setData({
                "out_relative_ratio": out_relative_ratio
            })
            that.setData({
                "in_data": res.data.data.period_data.in_data
            })
            that.setData({
                "out_data": res.data.data.period_data.out_data
            })
            that.setData({
                "in_max": Math.round(res.data.data.period_relative_ratio.in_max* 10) / 10
            })
            that.setData({
                "in_min": Math.round(res.data.data.period_relative_ratio.in_min* 10) / 10
            })
            that.setData({
                "out_max": Math.round(res.data.data.period_relative_ratio.out_max* 10) / 10
            })
            that.setData({
                "out_min": Math.round(res.data.data.period_relative_ratio.out_min* 10) / 10
            })
            that.columnShow();
            that.getMothElectro();
        })
    },
    setCanvsYueEle(){
        var that = this
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: 'yueEle',
                success: function(res) {
                  that.setData({ canvsYueEle: res.tempFilePath},()=>{console.log(that.data.canvsYueEle)});
                },
                fail:function(res){ console.log(res) }
              },this)
        }, 2000);
    },
    setCanvsColumn(){
        var that = this
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId: 'columnCanvas',
                success: function(res) {
                  that.setData({ canvsColumn: res.tempFilePath});
                },
                fail:function(res){ console.log(res) }
              },this)
        }, 2000);
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
        else if (day < 0 || day > 30) str = '时间跨度不得大于一月'
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
    validStr(str){
        if( str === '' || str === null || typeof(str) === undefined) return false
        else return true
    }
})