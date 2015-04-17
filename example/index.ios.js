/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var fetch = require('fetch');

var duoshuoQuery = {
  short_name: 'airpub'
};

var {
  Image,
  TextInput,
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  ListView,
  Text,
  View,
} = React;

var ReactHtml = require('./html');

var example = React.createClass({

  getInitialState: function() {
    return {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  componentDidMount: function() {
    this.loadingComments({
      thread_id: '1317492007005847590'
    })
  },

  render: function() {
    return (
      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={200}>
        <TextInput
          placeholder={ '说点什么...' }
          style={ styles.messageForm }
          onChangeText={(text) => this.setState({message: text})}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </ScrollView>
    );
  },

  loadingComments: function(query: object) {
    fetch('http://' + duoshuoQuery.short_name + '.duoshuo.com/' + 'api/threads/listPosts.json?thread_id=' + query.thread_id)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err)
    })
    .then((responseData) => {
      this.setState({
        isLoading: false,
        dataSource: this.getDataSource(responseData.parentPosts),
      });
    })
  },

  getDataSource: function(list: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(list);
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    return (
      <View>
        <View style={ styles.row }>
          <Image
            source={{ uri: rowData.author.avatar_url }}
            style={ styles.thumb } />
          <ReactHtml>
            { rowData.message }
          </ReactHtml>
        </View>
        <View style={styles.separator} />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#444444',
    height: 300,
  },
  messageForm: {
    height: 60, 
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    padding: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#DDDDDD',
  },
  text: {
    flex: 1,
    fontFamily: 'Helvetica',
  },
});

AppRegistry.registerComponent('example', () => example);
