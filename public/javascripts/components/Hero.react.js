import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';

class Hero extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			heroMsg: '',
			isShowUnderScore: true,
			isShowHero: true,
		};
		//declear variable
		this.$body = document.body;
		this.$hero;
		this.heroHeight;
		this.showCharCount = 0;
		//auto scroll;
		this.distance;
		this.timeLapsed = 0;
		this.autoScrollInterval = 200;
		this.isActionMove = false;
		//declare function
		this.clickToScrollHero = this.clickToScrollHero.bind(this);
		this.movingDisplayHero = this.movingDisplayHero.bind(this);
		this.scrollHero = this.scrollHero.bind(this);
		//timer
		this.resizeTimer;
	}
	componentWillMount () {
		this.typewriterAnima();
		this.underScoreAnima();
	}
	componentDidMount () {
		this.defineVariable();
		window.addEventListener('scroll',this.scrollHero);
		window.addEventListener('resize',this.defineResize);
	}
	componentWillUnmount () {
		window.removeEventListener('scroll',this.scrollHero);
		window.removeEventListener('resize',this.defineResize);
	}
	clickToScrollHero () {
		if(!this.isActionMove){
			this.movingDisplayHero();
		}
	}
	defineFuncExecutedByResize () {
		clearTimeout(this.resizeTimer);
		let self = this;
		if(!this.state.isShowHero){
			this.resizeTimer = setTimeout(() => {
					self.defineVariable();
			},350);
		}
	}
	defineVariable () {
		this.$hero = ReactDOM.findDOMNode(this.refs.hero);
		this.heroHeight = this.$hero.scrollHeight;
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
					this.setState({isShowHero: false});
				}
				window.scrollTo(0,Math.floor(position));
			},16);
		}
	}
	scrollHero () {
		if(!this.isActionMove){
			this.movingDisplayHero();
		}
		window.removeEventListener('scroll',this.scrollHero);
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
		this.setState({isShowUnderScore: !this.state.isShowUnderScore});
		setTimeout(this.underScoreAnima.bind(this),750);
	}
	underScoreClsName () {
		return ClassNames({
			'hero__msg__underscore': true,
			'is-hide': !this.state.isShowUnderScore
		});
	}
	render () {
		return (
			this.state.isShowHero
				?<div className='hero'
					ref='hero'
				>
					<p className='hero__msg'>
						{this.state.heroMsg}
						<span className={this.underScoreClsName()}>_</span>
					</p>
					<div className='hero-scroll' onClick={this.clickToScrollHero}>
						<small className='hero-scroll__small'>welcome to my gocci</small>
						<span className='hero-scroll__arrow'></span>
					</div>
				</div>
				:null
		);
	}
}
module.exports = Hero;