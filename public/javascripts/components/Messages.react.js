import React from 'react';
import ClassNames from 'classnames';

class Messages extends React.Component {
	constructor (props){
		super(props);
		this.nl2br = this.nl2br.bind(this);
	}
	messageClsName () {
		if(this.props.isMyself === 1){
			return ClassNames({
				'message-body__content--myself': true
			});
		}else{
			return ClassNames({
				'message-body__content--pair': true
			});
		}
	}
	//TODO: \nのときkeyを付与する
	nl2br (text) {
		let regex = /(\n)/g;
        return text.split(regex).map((line) => {
            if(line.match(regex)){
                return React.createElement('br')
            }else{
                return line;
            }
        });
	}
	render () {
		return (
			<li className='message-body'>
				<div className={this.messageClsName()}>
					<span className='message-body__content__value'>
						{this.nl2br(this.props.value)}
					</span>
				</div>
			</li>
		);
	}
}
module.exports = Messages;