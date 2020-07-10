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
        medicine_name: "",
        medicine_id: 159332570586,
        value:"片碱",
        start_time:"2020-07-01",
        end_time:"2020-07-07",
        showStart:false,
        showEnd:false,
        "dosage_period":"",
        "categories": [],
        "periodData": [],
        "one_dosage_period_max":"",
        "one_dosage_period_min":"",
        "relative_ration_max_str":"",
        "relative_ration_min_str":"",
    },
    onChange(event){
        this.setData({medicine_id:Number(event.detail)})
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
    onReady: function (e) {
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
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
                name: '40%',
                color: '#4A4A4A',
                fontSize: 15
            },
            subtitle: {
                name: '片碱',
                color: '#4A4A4A',
                fontSize: 10
            },
            series: [{
                name: '片碱',
                data: 100,
                stroke: true,
                color:'#64C676'
            }, {
                name: 'PAC',
                data: 35,
                stroke: false,
                color:'#669AFF'
            }, {
                name: 'PAM(阳离子)',
                data: 78,
                stroke: false,
                color:'#5553CE'
            }, {
                name: 'PAM(阴离子)',
                data: 63,
                 stroke: false,
                 color:'#F65050'
            }, {
                name: '葡萄糖',
                data: 63,
                 stroke: false,
                 color:'#FF9100'
            }, {
                name: '活性炭',
                data: 63,
                 stroke: false,
                 color:'#F8C322'
            },
            {
                name: 'NaCO3',
                data: 63,
                stroke: true,
                color:'#FFFF03'
            }],
            disablePieStroke: true,
            width: 200,
            height: 150,
            dataLabel: false,
            legend: false,
            background: '#f5f5f5',
            padding: 0
        });
        ringChart.addEventListener('renderComplete', () => {
            console.log('renderComplete');
        });
        setTimeout(() => {
            ringChart.stopAnimation();
        }, 500);
    },
    // 柱状图
    columnShow: function (type, c1, c2) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
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
                    return val + 'L';
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
            width: windowWidth, //图表展示内容宽度
            height: 220, //图表展示内容高度
        })
    },
    getMothElectro: function (e) {
        console.log(this.data.categories)
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
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
                    name: '环比分析图',
                    //data: yuesimulationData.data,
                    data: this.data.periodData,
                    format: function (val, name) {
                        return val.toFixed(2) + 'kWh';
                    }
                },
                // {
                //     name: '电池供电量',
                //     data: [0, 6, 2, 2, 7, 6, 2, 5, 8, 1, 8, 4, 0, 9, 7, 2, 5, 2, 8, 2, 5, 2, 9, 4, 4, 9, 8, 5, 5, 5, 6],
                //     format: function (val, name) {
                //         return val.toFixed(2) + 'kWh';
                //     }
                // },
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
        var start_time = this.data.start_time
        var end_time = this.data.end_time
        //加载接口
        var params = {
            "start_time": this.data.start_time,
            "end_time": this.data.end_time,
            "company_id": 1,
            "medicine_id": this.data.medicine_id
        };
        var that = this;
        http.Post('/app/dosage_review/dosage/period', params, function (res) {
            var dosage_period = res.data.data.dosage_period
            var medicineList =[]
            for (var i = 0; i < dosage_period.length; i++) {
                // that.setData({medicine_id:Number(dosage_period[0].id)})
                // that.setData({medicine_name:dosage_period[0].medicine_name})
                medicineList.push({value: dosage_period[i].id,text: dosage_period[i].medicine_name});
            }
            that.setData({"option":medicineList})
            console.log(that.data.option)
            // for (var i = 0; i < res.data.data.one_dosage_period.length; i++) {
            //     data.push(res.data.data.one_dosage_period[i]);
            // }
            // that.setData({"categories":res.data.data.x_date})
            // that.setData({"periodData":res.data.data.one_dosage_period})
            // that.lineChart.data
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
                "relative_ration_max_str": res.data.data.relative_ration_max_str
            })
            that.setData({
                "relative_ration_min_str": res.data.data.relative_ration_min_str
            })
            that.columnShow();
            that.getMothElectro();
        })

    }
})