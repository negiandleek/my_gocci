const React = require('react');
const ReactDOM = require('react-dom');
const ClassNames = require('classnames');
const DomModule = require('../services/DomModule.js');
class Main extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			heroMsg: '',
			isHideUnderScore: false,
			isHideHero: false,
			isCurrentElmentHero: true,
			styleDummy: {}
		};
		//variable
		//dom 
		this.$body = document.body;
		this.$hero;
		this.heroHeight;
		//typewriter animation
		this.showCharCount = 0;
		//auto scroll;
		this.distance;
		this.timeLapsed = 0;
		this.autoScrollInterval = 200;
		this.isActionMove = false;
		
		//function
		this.clickToScrollHero = this.clickToScrollHero.bind(this);
		this.defineVariable = this.defineVariable.bind(this);
		this.focusMessageForm = this.focusMessageForm.bind(this);
		this.keyDownFunc = this.keyDownFunc.bind(this);
		this.movingDisplayHero = this.movingDisplayHero.bind(this);
		this.scrollHero = this.scrollHero.bind(this);
		this.tabbrowserFocus = this.tabbrowserFocus.bind(this);
	}
	componentWillMount () {
		this.typewriterAnima();
		this.underScoreAnima();
		window.scrollTo(0,0);
	}
	componentDidMount () {
		this.defineVariable();
		this.focusMessageForm();
		this.setSizeHeightDummy();
		window.addEventListener('scroll',this.scrollHero);
		window.addEventListener('resize',this.defineResize);
		window.addEventListener('keydown',this.keyDownFunc);
		window.addEventListener('focus',this.tabbrowserFocus);
	}
	componentWillUnmount () {
		window.removeEventListener('scroll');
		window.removeEventListener('resize');
		window.removeEventListener('keydown');
		window.removeEventListener('focus');
	}
	clickToScrollHero () {
		if(!this.isActionMove){
			this.movingDisplayHero();
		}
	}
	defineResize () {
		this.setSizeHeightDummy();
		this.defineVariable();
	}
	defineVariable () {
		// this.$hero = ReactDOM.findDOMNode(this.refs.hero);
		// this.heroHeight = this.$hero.scrollHeight;
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
	movingDisplayHero () {
		let percentage = 0;
		let position;
		let currentPosition = this.$body.scrollTop;
		this.distance = this.heroHeight - currentPosition;
		this.isActionMove = true;
		if(this.distance > 0 && this.isActionMove){
			let timer = setInterval(()=>{
				this.timeLapsed += 16;
				percentage = (this.timeLapsed / this.autoScrollInterval);
				percentage = (percentage > 1) ? 1: percentage;
				position = currentPosition + this.distance * percentage;
				if(position >= this.heroHeight){
					clearInterval(timer);
					this.setState({isHideHero: true});
				}
				window.scrollTo(0,Math.floor(position));
			},16);
		}
	}
	tabbrowserFocus () {
		if (document.webkitHidden) {
			this.focusMessageForm();
		};
	}
	typewriterAnima () {
		let _heroMsg = 'Hello!!';
		let timer;
		this.setState({heroMsg: _heroMsg.substr(0,this.showCharCount)});
		timer = setTimeout(this.typewriterAnima.bind(this),125);
		if(this.showCharCount !== _heroMsg.length){
			this.showCharCount = this.showCharCount + 1;
		}else{
			clearTimeout(timer);
		}
	}
	underScoreAnima () {
		this.setState({isHideUnderScore: !this.state.isHideUnderScore});
		setTimeout(this.underScoreAnima.bind(this),750);
	}
	scrollHero () {
		if(!this.isActionMove){
			this.movingDisplayHero();
		}
		window.removeEventListener('scroll',this.scrollHero);
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
	underScoreClsName () {
		return ClassNames({
			'hero__msg__underscore': true,
			'is-hide': this.state.isHideUnderScore
		});
	}
	render () {
		return (
			<div className='main'>
				{this.state.isHideHero
					? <div 
						className='hero'>
						<p className='hero__msg'>
							{this.state.heroMsg}
							<span className={this.underScoreClsName()}>_</span>
						</p>
						<div className='hero-scroll' onClick={this.clickToScrollHero}>
							<small className='hero-scroll__small'>welcome to my gocci</small>
							<span className='hero-scroll__arrow'></span>
						</div>
					</div>
					: null
				}
				<div className='thread'>
					<header className='thread-header'>
						<div className='thread-header__pair-profile'>
							<img className='thread-header__pair-profile__img' src="./images/ic_gocci_want.png"/>
							<p className='thread-header__pair-profile__name'>gocci</p>
						</div>
					</header>
					<div className='thread__wrapper'>
						<div className='message-dummy' style={this.state.styleDummy}></div>
						<ul className='message-global' ref='message-global'>
							<li className='message-body' key='1'>
								<div className='message-body__content--pair'>
									<span className='message-body__content__value'>
										こんちはっす<br />
										お話しするっす
									</span>
								</div>
							</li>
							<li className='message-body' key='2'>
								<div className='message-body__content--myself'>
									<span className='message-body__content__value'>
										近くのお店
									</span>
								</div>
							</li>
						</ul>
					</div>
					<form className='message-form'>
						<input 
							className='text-form'
							type='text' 
							placeholder='gocci君に指示を送る'
							ref='message'
						/>
					</form>
				</div>
			</div>
		);
	}
}
module.exports = Main;