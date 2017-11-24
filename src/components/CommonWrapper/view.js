import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './style.mcss';
import axios from 'axios';

export default class CommonWrapper extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			standard: [],
			standardlist: [],
			slow: [],
			slowlist: [],
			teaching: [],
			teachinglist: [],
			tagslist: []
		}
		this.handleGetHeaderDataSucc = this.handleGetHeaderDataSucc.bind(this)
	}
	
	render() {

		const list = this.state.list.map((item, index) => {
			return <li className={style['header-item']} key={item.id}><Link to={item.url}>{item.title}</Link></li>
		})
		const standardlist = this.state.standardlist.map((item, index) => {
			return <li className={style['nav-item']} key={item.id}><Link to={item.url}>{item.title}</Link></li>
		})
		const slowlist = this.state.slowlist.map((item, index) => {
			return <li className={style['nav-item']} key={item.id}><Link to={item.url}>{item.title}</Link></li>
		})
		const teachinglist = this.state.teachinglist.map((item, index) => {
			return <li className={style['nav-item']} key={item.id}><Link to={item.url}>{item.title}</Link></li>
		})
		const tagslist = this.state.tagslist.map((item, index) => {
			return <li className={style['tags-item']} key={item.id}><Link to={item.url}>{item.title}</Link></li>
		})
		return(
			<div>
				<div className={style['header']}>
					<Link to="/">
						<img alt="logo" className={style['header-logo']} src={require('../../statics/images/logo.png')}/>
					</Link>
						<ul className={style['header-list']}>
							{list}
						</ul>
				</div>
				
				<div className={style['nav']}>
					<div className={style['nav-left']}>
						<h3 className={style['nav-title']}>{this.state.standard.title}</h3>
						<ul className={style['nav-list']}>
							{standardlist}
						</ul>
					</div>
					<div className={style['nav-center']}>
						<h3 className={style['nav-title']}>{this.state.slow.title}</h3>
						<ul className={style['nav-list']}>
							{slowlist}
						</ul>
					</div>
					<div className={style['nav-right']}>
						<h3 className={style['nav-title']}>{this.state.teaching.title}</h3>
						<ul className={style['nav-list']}>
							{teachinglist}
						</ul>
					</div>
				</div>
				<div className={style['tags']}>
					<h4 className={style['tags-left']}>热门标签:</h4>
					<div className={style['google']}>Goole提供的广告</div>
					<ul>
						{tagslist}
					</ul>
				</div>
				<div>{this.props.children}</div>
				<div className={style['footer']}>
					<p className={style['footer-words']}>本网站由 <a className={style['footer-pclink']} href="http://www.easyvoa.com" target="_blank">EasyVOA</a> 开发上线 © 2011-2014   <a className={style['footer-mlink']} href="http://m.easyvoa.com">手机版EasyVOA</a></p>
					<p className={style['footer-words']}>网站所有内容，均来自VOA官方网站，所有资料均只作为英文学习资料使用。 站长QQ:1801785742 欢迎联系合作</p>
					<p className={style['footer-words']}><img alt="51.La 网站流量统计系统" src={require('../../statics/images/icon_9.gif')}/></p>
				</div>
			</div>
		)
	}
	
	componentDidMount() {
		axios.get('/header.json').then(this.handleGetHeaderDataSucc);
	}
	
	handleGetHeaderDataSucc(response) {
		const {list} = response.data.data;
		const {standard} = response.data.data;
		const {standardlist} = response.data.data.standard;
		const {slow} = response.data.data;
		const {slowlist} = response.data.data.slow;
		const {teaching} = response.data.data;
		const {teachinglist} = response.data.data.teaching;
		const {tagslist} = response.data.data;
		console.log({tagslist});
		this.setState({
			list: list,
			standard: standard,
			standardlist: standardlist,
			slow: slow,
			slowlist: slowlist,
			teaching: teaching,
			teachinglist: teachinglist,
			tagslist: tagslist
		})
	}
}
