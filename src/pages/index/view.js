import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './style.mcss';
import axios from 'axios';
import { connect } from 'react-redux';
import { getIndexAction, getFriendLinkAction } from './actionCreator';
import { View as CanvasClock } from './components/CanvasClock/';
import { View as Echart } from './components/Echart/';
import Swiper from '../../../node_modules/swiper/dist/js/swiper.js';

class Index extends Component {
	
	render() {
		const list = this.props.list.map((item, index) => {
			return( 
				<li className={style['index-item']} key={item.id}>
					<Link to={item.link}><font className={style['index-item-class']} color={item.color1}>[{item.category}]</font> <font className={style['index-item-title']} color={item.color2}>{item.title} ({item.time})</font></Link>
				</li>
			)
		})
		const linklist = this.props.linklist.map((item, index) => {
			return( 
				<li className={style['friendlink-item']} key={item.id}>
					<a href={item.link} target="_blank">{item.title}</a>
				</li>
			)
		})
		return(
			<div>
				<div className={style['index-content']}>
					<div ref={(elem) => {this.swiperContainer=elem}}>
					    <div className='swiper-wrapper'>
					        <div className='swiper-slide'><img src={require('../../statics/images/1.jpg')}/></div>
					        <div className='swiper-slide'><img src={require('../../statics/images/2.jpg')}/></div>
					    </div>
				  	</div>
					<h3 className={style['index-title']}>VOA（美国之音）慢速英语,常速英语,官网最新内容在线收听。</h3>
					<ul className={style['index-list']}>
						{list}
					</ul>
					<CanvasClock/>
					<Echart/>
				</div>
				<div className={style['index-friendlink']}>
					<h3 className={style['index-friendlink-title']}>VOA友情链接</h3>
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
