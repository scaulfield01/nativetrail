import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import WebRepoView from  './Helpers/WebRepoView';

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }
});

export default class Repositories extends Component {
    constructor(props) {
        super(props);
        this.openPage = this.openPage.bind(this);
    }

    openPage(url) {
        debugger
        this.props.navigator.push({
            component: WebRepoView,
            title: 'Web View',
            passProps: {url}
        })
    }

    render() {
    	let repos = this.props.repos;  
    	let list = repos.map((item, index) => {
		      let desc = repos[index].description ? <Text style={styles.description}>{repos[index].description}</Text> : <View />
                return (
                    <View key={index}>
                        <View style={styles.rowContainer}>
                            <TouchableHighlight
                                onPress={() => this.openPage(repos[index].html_url)}
                                underLayColor='transparent'
                            >
                                <Text style={styles.name}>{repos[index].name}</Text>
                            </TouchableHighlight>
                            <Text style={styles.stars}>Stars: {repos[index].stargazers_count}</Text>
                            {desc}
                            <Separator />
                        </View>
                    </View>
    		  )
    	})
    	return (
    		<ScrollView style={styles.container}>
    			<Badge userInfo={this.props.userInfo}/>
                {list}
    		</ScrollView>
    	)
    }
}

Badge.proptypes = {
userInfo: React.PropTypes.object.isRequired,
repos: React.PropTypes.array.isRequired
}


