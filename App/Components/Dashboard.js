import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Repositories from './Repositories';
import Profile from './Profile';
import { api } from '../Utils/api';


var styles = StyleSheet.create({
	container: {
		marginTop: 65,
		flex: 1,
		backgroundColor: '#48BBEC'
	},
		image: {
		height: 350,
	},
	buttonText: {
		fontSize: 24,
		color: 'white',
		alignSelf: 'center'
	}
});


export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.makeBackground = this.makeBackground.bind(this);
		this.goToProfile = this.goToProfile.bind(this);
		this.goToNotes = this.goToNotes.bind(this);
		this.goToRepos = this.goToRepos.bind(this);
	}
	makeBackground(btn) {

		let obj = {
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center',
			flex: 1
		}
		switch(btn) {
			case 'Profile':
				obj.backgroundColor = '#48BBEC';
			break;
			case 'Repos':
				obj.backgroundColor = '#e77aae';
			break;
			case 'Notes':
				obj.backgroundColor = '#758BF4';
			break;
		}
		return obj
	}
	goToRepos(){
		api.getRepos(this.props.userInfo.login)
			.then((res)=> {
				this.props.navigator.push({
					title:'Repos Page',
					component: Repositories,
					passProps: {
						userInfo: this.props.userInfo,
						repos: res
					}
				});
			})
	}
	goToNotes(){
		console.log('got to notes');
	}
	goToProfile(){
		console.log('got to profile');
		this.props.navigator.push({
			title:'Profile Page',
			component: Profile,
			passProps: {userInfo: this.props.userInfo}
		});
	}

	render(){
		let buttonTypes = ['Profile','Repos','Notes'];
		let self = this;
		return (
			<View style={styles.container}>
				<Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
				{
					buttonTypes.map(function(type){
						return (
							<TouchableHighlight
								key={type} 
								onPress={self['goTo'+ type]}
								underlayColor={'#88d4f5'}
								style={self.makeBackground(type)}
							>
								<Text style={styles.buttonText}>{`View ${type}`}</Text>
							</TouchableHighlight>
						)
					})
				}
			</View>
		)
	}

};
