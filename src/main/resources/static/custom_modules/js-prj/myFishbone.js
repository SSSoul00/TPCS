/**
 * 自定义 fishbone 插件
 * Created by hjl on 2016/1/20.
 */
$.fn.fishbone = function (fishBoneData, overHandler, outHandler) {
    console.log("fishbone() run...");

    var projectCaseName = fishBoneData.projectCaseName;
    var taskList = fishBoneData.taskList;

    var mainBoneStartX = 120; //20px为padding,100为项目案例名label最小宽度
    var titleHeight = 30; //图表标题高度
    var sectionCount = parseInt(taskList.length / 2); //鱼骨分为几段
    if (taskList.length % 2 != 0) {
        sectionCount++;
    }
    //console.log("sectionCount:" + parseInt(sectionCount));

    var belowSubBoneOffsetX = 80; //同一段中，下骨头相对上骨头的偏差
    var labelHeight = 30;

    this.highcharts({
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        chart: {
            //backgroundColor: 'yellow',
            events: {
                load: function () {

                    var chartHeight = this.chartHeight; //高度
                    var chartWidth = this.chartWidth; //宽度
                    //console.log("chartHeight:" + chartHeight);
                    //console.log("chartWidth:" + chartWidth);

                    var midPointY = (chartHeight - titleHeight) / 2 + titleHeight; //y轴中点
                    //console.log("midPointY:" + midPointY);

                    //var mainBoneLength = chartWidth - mainBoneStartX; //大骨头长度(todo...需要修剪)
                    var mainBoneLength = chartWidth - mainBoneStartX - 150; //大骨头长度
                    var sectionStepLen = mainBoneLength / sectionCount; //段长
                    var mainBoneLengthShow = mainBoneLength - (sectionStepLen - belowSubBoneOffsetX); //实际显示长度为 mainBoneLength - 段长减偏差

                    // Draw the flow chart
                    var ren = this.renderer;
                    var mainArrow = ['M', mainBoneLengthShow, 0, 'L', 0, 0];
                    //var mainArrow = ['M', mainBoneLength, 0, 'L', 0, 0]; //todo...调试用

                    //sin45 = 小骨头的长度 / 高度的一半
                    var zhiJiaoBian = (chartHeight - titleHeight) / 2 - labelHeight;
                    var shortArrowLen = zhiJiaoBian / Math.sin(Math.PI / 4);
                    var shortArrow = ['M', shortArrowLen, 0, 'L', 0, 0];

                    //大骨头
                    ren.path(mainArrow)
                        .attr({
                            'stroke-width': 2,
                            stroke: '#73A1BF'
                        })
                        .translate(mainBoneStartX, midPointY)
                        .add();

                    // 项目案例名 label
                    ren.label(projectCaseName, 50, midPointY - (labelHeight / 2))
                        .attr({
                            fill: '#73A1BF',
                            stroke: 'white',
                            'stroke-width': 2,
                            padding: 5,
                            r: 5
                        })
                        .css({
                            color: 'white',
                            fontSize: '18px'
                        })
                        .add();

                    //循环添加 path
                    var initRotation = 45;
                    for (var i = 0; i < taskList.length; i++) {
                        initRotation = initRotation * -1;
                        var currentX;
                        if (i % 2 == 0) {
                            //如果是上骨头，加上段长
                            currentX = mainBoneStartX + (i / 2) * sectionStepLen;
                        } else {
                            //如果是下骨头，加上belowSubBoneOffsetX
                            currentX = mainBoneStartX + (parseInt(i / 2)) * sectionStepLen + belowSubBoneOffsetX;
                        }
                        ren.path(shortArrow)
                            .attr({
                                'stroke-width': 1,
                                stroke: '#73A1BF',
                                rotation: initRotation + ''
                            })
                            .translate(currentX, midPointY)
                            .add();
                    }


                    //循环添加 任务单 label
                    var initY = titleHeight + labelHeight;
                    var initY2 = initY + zhiJiaoBian * 2;
                    for (var i = 0; i < taskList.length; i++) {
                        //初始化 x 坐标
                        var currentX;
                        var boneAbove = (i % 2 == 0);
                        if (boneAbove) {
                            //如果是上骨头，加上段长
                            currentX = mainBoneStartX + (i / 2) * sectionStepLen + zhiJiaoBian;
                        } else {
                            //如果是下骨头，加上belowSubBoneOffsetX
                            currentX = mainBoneStartX + (parseInt(i / 2)) * sectionStepLen + belowSubBoneOffsetX + zhiJiaoBian;
                        }
                        //校正x
                        currentX = currentX - 50;

                        //初始化 y 坐标
                        var currentY = initY;
                        if (!boneAbove) {
                            currentY = initY2;
                        }
                        //校正y
                        currentY = currentY - 15

                        //添加任务名 label
                        var task = taskList[i];
                        ren.label(task.name, currentX, currentY)
                            .attr({
                                fill: '#EEF3F6',
                                stroke: '#73A1BF',
                                'stroke-width': 1,
                                padding: 5,
                                r: 5
                            })
                            .css({
                                color: 'black',
                                fontSize: '14px'
                            })
                            .add();

                        //判断并添加任务 subName label
                        if (task.subName) {
                            //console.log("task.subName:"+task.subName);

                            if (boneAbove) {
                                //如果是上骨头
                                currentY += 50;
                            } else {
                                //如果是下骨头
                                currentY -= 50;
                            }

                            ren.label(task.subName, currentX + 50, currentY)
                                .attr({
                                    fill: getColorByClass(task.subNameClass),
                                    stroke: '#73A1BF',
                                    'stroke-width': 1,
                                    padding: 5,
                                    r: 5,
                                    id: task.id,
                                    class: boneAbove
                                })
                                .css({
                                    color: 'black',
                                    fontSize: '14px',
                                })
                                .on("mouseover", function (e) {
                                    overHandler(e);
                                })
                                .on("mouseout", function (e) {
                                    outHandler(e);
                                })
                                .add();
                        }
                    }
                }
            }
        },
        title: {
            text: '项目案例进度鱼骨图',
            style: {
                color: 'black'
            }
        }

    });
};

//根据样式返回背景色
function getColorByClass(className) {
    if (className === 'delayed') {
        return 'yellow';
    } else if (className === 'normal') {
        return '#a8f6f8';
    } else if (className === 'ahead') {
        return '#A5F83F'
    } else {
        return '#EEF3F6';
    }
}
