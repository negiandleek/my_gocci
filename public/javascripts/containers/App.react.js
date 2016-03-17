import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import domModule from '../utilities/domModule';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as message_dummy_action from '../actions/messageDummyAction';
import * as messages_actions from '../actions/messagesActions';
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
		this.props.message_dummy_action.setSizeHeight(diffHeight);
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
							{this.props.data.message.map((items,index) => {
								return (
									<Messages
										key={'message'+index}
										value={items.value}
										is_myself={items.is_myself}
										is_invalidate={items.is_invalidate}
									/>
								);
							})}
						</ul>
					</div>
					<MessageForm
						add_message={this.props.message_actions.add_message}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		styleDummy: state.messageDummyReducer,
		data: state.messageReducer
	}
}

function mapDispatchToProps(dispatch) {
	return {
		message_dummy_action: bindActionCreators(message_dummy_action,dispatch),
		message_actions: bindActionCreators(messages_actions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
