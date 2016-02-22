import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import domModule from '../utilities/domModule';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as messageDummyAction from '../actions/messageDummyAction'
//component
import Hero from '../components/Hero.react';
import MessageDummy from '../components/MessageDummy.react';
import MessageForm from '../components/MessageForm.react';
import Messages from '../components/Messages.react';
import ThreadHeader from '../components/ThreadHeader.react';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isShowHero: true,
			messages: [
				{value: 'こんちはっす\nお話しするっす',isMyself: 0},
				{value: '近くのお店', isMyself: 1}
			]
		};
	}
	componentWillMount () {
		window.scrollTo(0,0);
	}
	componentDidMount () {
		domModule.setWindowHeight(window.innerHeight);
		domModule.setHeight(ReactDOM.findDOMNode(this.refs['message-global']).scrollHeight);
	}
	render () {
		return (
			<div className='main'>
				{this.state.isShowHero
					? <Hero />
					: null
				}
				<div className='thread'>
					<ThreadHeader />
					<MessageDummy 
						actions={this.props.actions}
					/>
					<div className='thread__wrapper'>
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
)(App)
