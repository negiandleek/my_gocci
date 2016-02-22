import React from 'react';
import ReactDOM from 'react-dom';
import domModule from '../utilities/domModule';
class MessageDummy extends React.Component {
	constructor (props){
		super(props);
		this.setSizeHeightDummy = this.setSizeHeightDummy.bind(this);
	}
	componentDidMount () {
		this.setSizeHeightDummy();
	}
	setSizeHeightDummy () {
		this.props.actions.setSizeHeight(domModule.getDiffHeight())
	}
	render () {
		return (
			<div className='message-dummy' style={this.props.styleDummy}></div>
		);
	}
}
module.exports = MessageDummy;