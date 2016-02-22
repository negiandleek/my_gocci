import React from 'react';
import ReactDOM from 'react-dom';
class MessageForm extends React.Component {
	constructor (props){
		super(props);
		this.focusMessageForm = this.focusMessageForm.bind(this);
		this.keyDownFunc = this.keyDownFunc.bind(this);
		this.tabbrowserFocus = this.tabbrowserFocus.bind(this);
	}
	componentDidMount () {
		window.addEventListener('keydown',this.keyDownFunc);
		window.addEventListener('focus',this.tabbrowserFocus);
	}
	componentWillUnmount () {
		window.removeEventListener('keydown',this.keyDownFunc);
		window.removeEventListener('focus',this.tabbrowserFocus);
	}
	focusMessageForm () {
		ReactDOM.findDOMNode(this.refs.message).focus();
		this.refs.message.focus();
	}
	keyDownFunc (event) {
		//tab pressed
		if(event.keyCode === 9){
			event.preventDefault();
			this.focusMessageForm();
		}
	}
	tabbrowserFocus () {
		//Processing when tab of browser switch.
		if (document.webkitHidden) {
			this.focusMessageForm();
		};
	}
	render () {
		return (
			<form className='message-form'>
				<input 
					className='text-form'
					type='text' 
					placeholder='gocci君に指示を送る'
					ref='message'
				/>
			</form>
		);
	}
}
module.exports = MessageForm;