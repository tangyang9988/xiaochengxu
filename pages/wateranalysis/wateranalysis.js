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
        ],
        option1: "COD",
        detection_name: 'cod',
        start_time:"2020-07-01",
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
        
    },
    onChange(event){
        this.data.detection_name=event.detail
        this.onLoad();
    },
    showStartPop() {
        this.setData({ showStart: true });
      },
      showEndPop() {
        this.setData({ showEnd: true });
      },
      // 开始时间
      confirm(event) {
        var date = this.formatDate(event.detail)
        this.setData({start_time: date});
        this.setData({ showStart: false });
        this.onLoad();
      },
      onClose() {
        this.setData({ showStart: false });
      },
      // 结束时间
      onConfirm(event) {
        var date = this.formatDate(event.detail)
        this.setData({end_time: date});
        this.setData({ showEnd: false });
        this.onLoad();
      },
      onCancel() {
        this.setData({ showEnd: false });
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
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
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
                    width: 15
                }
            },
            // dataPointShape: true, //是否在图标上显示数据点标志
            width: windowWidth, //图表展示内容宽度
            height: 220, //图表展示内容高度
        })
    },
    // 折线图
    getMothElectro: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            console.log()
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
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
                title: '环比值(kWh)',
                format: function (val) {
                    return val.toFixed(2);
                },
                max: 20,
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    },
    onLoad: function (e) {
        //加载接口
        var params = {
            "start_time":this.data.start_time,
            "end_time": this.data.end_time,
            "company_id": 1,
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

    }
})