import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import domModule from '../utilities/domModule';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as messageDummyAction from '../actions/messageDummyAction';
import * as messagesActions from '../actions/messagesActions';
//component
import Hero from '../components/Hero.react';
import MessageForm from '../components/MessageForm.react';
import Messages from '../components/Messages.react';
import ThreadHeader from '../components/ThreadHeader.react';

class App extends Component {
	constructor (props) {
		super(props);
		
		this.messageGlobalHeight;
		this.setDummyStyle = this.setDummyStyle.bind(this);
	}
	componentWillMount () {
		window.scrollTo(0,0);
	}
	componentDidMount () {
		domModule.setWindowHeight(window.innerHeight);
		this.messageGlobalHeight = ReactDOM.findDOMNode(this.refs['message-global']).scrollHeight;
		this.setDummyStyle();
	}
	componentDidUpdate () {
		let _height = ReactDOM.findDOMNode(this.refs['message-global']).scrollHeight;
		if(this.messageGlobalHeight === _height)return;
		this.messageGlobalHeight = _height;
		this.setDummyStyle();
	}
	setDummyStyle () {
		let diffHeight = domModule.getDiffHeight(this.messageGlobalHeight);
		this.props.dummyMessageAction.setSizeHeight(diffHeight);
		//Most Scroll down
		domModule.scroll_most_bottom(this.messageGlobalHeight)
	}
	render () {
		return (
			<div className='main'>
				<Hero />
				<div className='thread'>
					<ThreadHeader />
					<div className='thread__wrapper'>
						<div className='message-dummy' style={this.props.styleDummy}></div>
						<ul className='message-global' ref='message-global'>
							{this.props.messages.map((items,index) => {
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
					<MessageForm
						addMessage={this.props.messageActions.addMessage}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		styleDummy: state.messageDummyReducer,
		messages: state.messageReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dummyMessageAction: bindActionCreators(messageDummyAction,dispatch),
		messageActions: bindActionCreators(messagesActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
