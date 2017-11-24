import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {getListChangeAction} from './actionCreator';
import axios from 'axios';
import style from './style.mcss';

class List extends Component {
	
	render() {
		const list = this.props.list.map((item, index) => {
			return <li className={style['list-content-item']} key={item.id}><Link to={item.link}>{item.title}</Link></li>
		})
		return (
			<div className={style['list-content']}>
				<h3 className={style['list-content-title']}>列表页</h3>
				<ul className={style['list-content-list']}>
					{list}
				</ul>
			</div>
		)
	}
	componentDidMount() {
		this.getListInfo();
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.routeParams.id !== nextProps.routeParams.id) {
			this.getListInfo(nextProps.routeParams.id);
		}
	}
	getListInfo(val) {
		const id = val || this.props.params.id;
		console.log(id);
		axios.get('/list.json?id=' + id)
			.then(this.props.changeListData)
	}
}

const mapStateToProps = (state) => ({
	list: state.list.list
})
const mapDispatchToProps = (dispatch) => ({
	changeListData: (response) => {
		const {list} = response.data.data;
		dispatch(getListChangeAction(list));
	}
})
export default connect(mapStateToProps,mapDispatchToProps)(List);
