import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getIndexAction, getFriendLinkAction } from './actionCreator';
import { View as CanvasClock } from './components/CanvasClock/';
import Swiper from 'swiper';

class Index extends Component {
	
	render() {
		const list = this.props.list.map((item, index) => {
			return( 
				<li className="index-item" key={item.id}>
					<Link to={item.link}><font className="index-item-class" color={item.color1}>[{item.category}]</font> <font className="index-item-title" color={item.color2}>{item.title} ({item.time})</font></Link>
				</li>
			)
		})
		const linklist = this.props.linklist.map((item, index) => {
			return( 
				<li className="friendlink-item" key={item.id}>
					<a href={item.link} target="_blank">{item.title}</a>
				</li>
			)
		})
		return(
			<div>
				<div className="index-content">
					<h3 className="index-title">VOA（美国之音）慢速英语,常速英语,官网最新内容在线收听。</h3>
					<ul className="index-list">
						{list}
					</ul>
					<CanvasClock/>
					<div ref={(elem) => {this.swiperContainer=elem}}>
					    <div className="swiper-wrapper">
					        <div className="swiper-slide">Slide 1</div>
					        <div className="swiper-slide">Slide 2</div>
					    </div>
				  	</div>
				</div>
				<div className="index-friendlink">
					<h3 className="index-friendlink-title">VOA友情链接</h3>
					<ul>
						{linklist}
					</ul>
				</div>
			</div>
		)
	}
	componentDidMount() {
		if (!this.props.list.length) {
			this.getIndexInfo();
		}
		var swiper = new Swiper(this.swiperContainer,{
			autoplay: true
		});
	}
	getIndexInfo() {
		axios.get('/index.json')
			.then(this.props.handleGetInfoSucc.bind(this));
	}
}

const mapStateToProps = (state) => ({
	list: state.index.list,
	linklist: state.index.linklist
})
const mapDispatchToProps = (dispatch) => ({
	handleGetInfoSucc:(response) => {
		const {list} = response.data.data;
		const {linklist} = response.data.data;
		dispatch(getIndexAction(list));
		dispatch(getFriendLinkAction(linklist));
	}
})
export default connect(mapStateToProps,mapDispatchToProps)(Index)