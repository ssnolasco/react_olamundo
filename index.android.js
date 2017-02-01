/**
 * DeepThoughts App v 0.1
 */
'use strict';
 
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, ListView } from 'react-native';

var MOCKED_DATA = [
  {title: 'Deep Thought #1', content: "If there's no 'there' there, where is it and what's there?", movies: [
    { "title": "filme 1", "releaseYear": "1977"},
    { "title": "filme 2", "releaseYear": "2014"}
  ]},
];
// The URL for the `posts` endpoint provided by WP JSON API
var REQUEST_URL = 'https://facebook.github.io/react-native/movies.json';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var olamundo = React.createClass({
  getInitialState: function() {
    return {
      movies: [],
    };
  },
  // Automatically called by react when this component has finished mounting.
  componentDidMount: function() {
    this.fetchData();
  },
  // This is where the magic happens! Fetches the data from our API and updates the application state.
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // this.setState() will cause the new data to be applied to the UI that is created by the `render` function below
        this.setState({
          movies: responseData.movies,
        });
      })
      .done();
  },
  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={ds.cloneWithRows(this.state.movies)}
          renderRow={(rowData) => 
            <Text>{rowData.title} - {rowData.releaseYear}</Text>
          }
        />
      </View>
    );
  }
});
 
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer: {
    bottom: 0,
    flex: .1,
    width: windowSize.width,
    backgroundColor: '#eee',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: '#666666',
  },
});
 
AppRegistry.registerComponent('olamundo', () => olamundo);