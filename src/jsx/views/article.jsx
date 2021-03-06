/** @jsx React.DOM */

'use strict';

var React = require('react');
var cx = require('react-classset');

module.exports = React.createClass({
  getDefaultProps: function() {
    return { data: {} };
  },

  getInitialState: function(){
    return { loaded: false }
  },

  shouldComponentUpdate: function(nextProps, nextState){
    if (this.state.loaded && this.state.loaded === nextState.loaded) {
      return false;
    }

    return true;
  },

  componentDidUpdate: function(){
    if (!this.refs.iframe) {
      return;
    }

    // way too slow on mobile
    // this.refs.iframe.getDOMNode().addEventListener('load', this.handleLoad.bind(this));
    setTimeout(this.handleLoad.bind(this), 1000);
  },

  render: function(){
    var data = this.props.data;

    if (!data){
      return null;
    }

    return (
      <div className={this.getClassNames()}>
        <header className="article-view__header">
          <h1 className="article-view__title">{data.name}</h1>

          <span className="touch-icon touch-icon--close" onClick={this.handleCloseClick}>Close</span>
        </header>

        <iframe ref="iframe" className="article-view__remote-content" src={data.url} sandbox="allow-scripts allow-same-origin" async></iframe>

        <footer className="article-view__footer">

        </footer>
      </div>
    );
  },

  handleCloseClick: function(event){
    this.setState({ loaded: false });

    event.data.action = 'article.close';
  },

  handleLoad: function(){
    this.setState({ loaded: true });
  },

  getClassNames: function(){
    return cx(
      'article-view',
      this.state.loaded && 'article-view--loaded'
    );
  }
});