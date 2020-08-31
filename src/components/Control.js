import React, { Component } from 'react';

class Control extends Component {

    onChangeMode = (mode, e) => {
      e.preventDefault();
      //--- 아래의 방법으로는 상위의 application.js 의 mode 값을 변경할 수 없다.
      //this.setState({mode : mode});
      //--- 상위의 application.js 의 mode 값을 변경하기 위해 사용자 정의 함수 onChangeModeEvent 를 이용한다.
      this.props.onChangeModeEvent(mode);
    }

    render() {
      return (
        <ul>
          <li><a href="/" onClick={ this.onChangeMode.bind(this, 'create') }>Create</a></li>
          <li><a href="/" onClick={ this.onChangeMode.bind(this, 'update') }>Update</a></li>
          <li><button onClick={ this.onChangeMode.bind(this, 'delete') }>Delete</button></li>
        </ul>
      );
    }
  }

  export default Control;