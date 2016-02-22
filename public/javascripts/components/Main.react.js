import React from 'react';
import ReactDOM from 'react-dom';
import DomModule from '../utilities/DomModule';

//component
import Hero from './Hero.react';
import MessageForm from './MessageForm.react';
import Messages from './Messages.react';
import ThreadHeader from './ThreadHeader.react';


class Main extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isShowHero: true,
			styleDummy: {},
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
		DomModule.setWindowHeight(window.innerHeight);
		diffHeight = DomModule.getDiffHeight(ReactDOM.findDOMNode(this.refs['message-global']).scrollHeight);
		this.setState({
			styleDummy:{
				display: diffHeight ? 'block' : 'none',
				height: diffHeight
			}
		});
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
					<div className='thread__wrapper'>
						<div className='message-dummy' style={this.state.styleDummy}></div>
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
module.exports = Main;