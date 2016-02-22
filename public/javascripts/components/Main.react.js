import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import domModule from '../utilities/domModule';
import * as messageDummyAction from '../actions/messageDummyAction'
//component
import Hero from '../components/Hero.react';
import MessageForm from '../components//MessageForm.react';
import Messages from '../components//Messages.react';
import ThreadHeader from '../components/ThreadHeader.react';


class Main extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isShowHero: true,
			messages: [
				{value: 'こんちはっす\nお話しするっす',isMyself: 0},
				{value: '近くのお店', isMyself: 1}
			]
		};
		this.setSizeHeightDummy = this.setSizeHeightDummy.bind(this);
	}
	componentWillMount () {
		window.scrollTo(0,0);
	}
	componentDidMount () {
		this.setSizeHeightDummy();
	}
	setSizeHeightDummy () {
		let diffHeight;
		domModule.setWindowHeight(window.innerHeight);
		diffHeight = domModule.getDiffHeight(ReactDOM.findDOMNode(this.refs['message-global']).scrollHeight);
		this.props.actions.setSizeHeight(diffHeight)
	}
	render () {
		console.log(this.props.styleDummy)
		return (
			<div className='main'>
				{this.state.isShowHero
					? <Hero />
					: null
				}
				<div className='thread'>
					<ThreadHeader />
					<div className='thread__wrapper'>
						<div className='message-dummy' style={this.props.styleDummy}></div>
						<ul className='message-global' ref='message-global'>
							{this.state.messages.map((items,index) => {
								return (
									<Messages
										key={'message'+index}
										value={items.value}
										isMyself={items.isMyself}
									/>
								);
							})}
						</ul>
					</div>
					<MessageForm/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		styleDummy: state.mainReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(messageDummyAction, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main)
