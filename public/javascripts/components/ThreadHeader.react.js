import React from 'react';

class ThreadHeader extends React.Component {
	render () {
		return (
			<header className='thread-header'>
				<div className='thread-header__pair-profile'>
					<img className='thread-header__pair-profile__img' src="./images/ic_gocci_want.png"/>
					<p className='thread-header__pair-profile__name'>gocci</p>
				</div>
			</header>
		);
	}
}
module.exports = ThreadHeader;