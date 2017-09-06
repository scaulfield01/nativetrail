import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';
import { styles } from './Main';

export default class Dashboard extends Component {
	render(){
		return (
			<View style={styles.mainContainer}>
				<Text>Dashboard</Text>
				<Text>{this.props.userInfo.toString()}</Text>
			</View>
		)
	}

};