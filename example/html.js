var React = require('react-native');
var {
  Image,
  Text,
  View,
} = React;

var _ = require('lodash');

var ReactHtml = React.createClass({
  componentWillMount: function() {
    this.renderer = function(html) {
      var images = html.match(/<img[^>]*>/);

      if (!images) 
        return React.createElement(Text, {}, html);

      // Instead of parsing HTML 
      // We simply use string splits function
      // To split different parts as a ast tree.
      var texts = html.split(/<img[^>]*>/);
      var ret = [];

      texts.forEach((text, index) => {
        var src;
        if (images[index]) {
          var srcWithQuotes = images[index].match(/src\=([^\s]*)\s/)[1]
          src = srcWithQuotes.substring(1,srcWithQuotes.length - 1);
        }

        if (text && text !== ' ') {
          ret.push(React.createElement(Text, {
            style: {
              flex: 1
            }
          }, text))
        }

        if (src) {
          ret.push(React.createElement(Image, { 
            source: { uri: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b6/sb_org.gif' },
            style: { 
              width: 10, 
              height: 10
            }
          }));
        }
      });

      return ret;
    }
  },

  render: function() {
    return <View style={{ flex: 1 }}>{ this.renderer(this.props.children) }</View>;
  }
});

module.exports = ReactHtml;
