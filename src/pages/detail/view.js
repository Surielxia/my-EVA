import React, { Component } from 'react';
import axios from 'axios';
import style from './style.mcss';

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
		this.state = {
			title: "正在加载中",
			content: "<p>正在加载中</p>",
		}
	}
	render() {
		return (
			<div className={style['detail']}>
				<div className={style['detail-title']}>{this.state.title}</div>
				<audio className={style['detail-audio']} controls="controls" ref="detailAudio">
					<source src={require("./1.mp3")} type="audio/mpeg" />
				</audio>
				<button id="palyOrPause" onClick={this.click}>播音</button>
				<div className="detail-content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
			</div>
		)
	}
	componentDidMount() {
		this.getDetailInfo();
		this.isPlaying=false;
	}
	
	click(e) {
		var audio = this.refs.detailAudio;
		if (this.isPlaying) {
			audio.pause();
			e.target.innerHTML = "播音";
		}else {
			audio.play();
			e.target.innerHTML = "暂停";
	    }
		this.isPlaying = !this.isPlaying;
	}
	
	getDetailInfo() {
		const id = this.props.params.id;
		//console.log(this.props);
		axios.get("/detail1.json?id=" + id)
			.then(this.handleGetInfoSucc.bind(this));
	}
	handleGetInfoSucc(response) {
		const {detail} = response.data.data;
		this.setState({
			title: detail.title,
			content: detail.content
		})
	}
}
