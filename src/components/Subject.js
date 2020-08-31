import React, { Component } from 'react';

class Subject extends Component {

    onChangPage = (e) => {
        //console.log(e);
        e.preventDefault();
        this.setState({mode : 'welcome'});
    }

    onSubjectClick = (e) => {
      e.preventDefault();
      this.props.onSubjectClickEvent();
    }

    render() {
      return (
        <header>
              {/* <h1><a href="/" onClick={ this.onChangPage }>{this.props.title}</a></h1> */}
              <h1><a href="/" onClick={ this.onSubjectClick }>{this.props.title}</a></h1>
              {this.props.sub}
        </header>
      );
    }
  }

  export default Subject;