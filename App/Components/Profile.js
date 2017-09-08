import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native';

import Badge from './Badge';
import Separator from './Helpers/Separator';


var styles = StyleSheet.create({
	container: {
		flex: 1
	},
		buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
		rowContainer: {
		padding: 10
	},
	rowTitle: {
		color: '#48BBEC',
		fontSize: 16
	},
	rowContent: {
		fontSize: 19
	}
});

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.getRowTitle = this.getRowTitle.bind(this)
	}
	getRowTitle(user, item){
		prepString = item.indexOf('_') !== -1 ? item.replace(/_/g, " ") : item;	
		return prepString[0] ? prepString[0].toUpperCase() + prepString.slice(1) : prepString;
	}
	render(){
		let userInfo = this.props.userInfo;
		let topicArr = ['company', 'locations', 'followers', 'following', 'email', 'bio', 'public_repos'];
		let list = topicArr.map((item, index) => {
			if(!userInfo[item]){
				return <View key={index}/>
			} else {
				return (
					<View key={index}>
						<View style={styles.rowContainer}>
							<Text style={styles.rowTitle}>{this.getRowTitle(userInfo, item)}</Text>
							<Text style={styles.rowContent}>{userInfo[item]}</Text>
						</View>
						<Separator/>
					</View>
				)
			}
		})
		return (
			<ScrollView style={styles.container}>
				<Badge userInfo={this.props.userInfo} />
				{list}
			</ScrollView>
		)	
	}
	
}