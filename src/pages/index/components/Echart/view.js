import React, { Component } from 'react';
import Echarts from 'echarts';
import style from './style.mcss';

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}
	render() {
		return (
			<div className={style['index-echart']}>
				<div className={style['index-echart-main']} ref="indexEchart" style={{width: 600+'px',height:400+'px'}}></div>
			</div>
		)
	}
	componentDidMount() {
		this.createEchart();
	}
	
	createEchart() {
		var myChart = Echarts.init(this.refs.indexEchart);
		var option = {
            title: {
                text: 'ECharts 柱状图'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart.setOption(option);
	}
	
}
