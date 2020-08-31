/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import './App.css';

import TOC from './components/TOC';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';

class App extends Component {
  constructor(props) {
    super(props);

    //--- state 값이 변경될 때 해당 Component 의 render() 함수가 재 호출된다.
    this.state = {
      mode : 'welcome',
      selected_id : 1,
      asyncTitleDesc : [
        {idx : 1, title : 'Welcome', desc : 'Async Welcome !!!'},
        {idx : 2, title : 'Read', desc : 'Async Read !!!'},
        {idx : 3, title : 'Default', desc : 'Async Default !!!'}
      ],
      subject : {title : 'WEB', sub : 'World Wide Web ~ !!!'},
      content : {title : 'HTML', desc : 'HTML is HyperText Markup Language.'},
      links : [
        {id : 1, title : 'HTML', desc : 'HTML is for information'},
        {id : 2, title : 'CSS', desc : 'CSS is for design'},
        {id : 3, title : 'JavaScript', desc : 'JavaScript is for interactive'}
      ]
    }
    this.max_content_id = this.state.links.length;
  }

  handleClick = (e) => {
    console.log(e);
    e.preventDefault();
    this.setState({
      mode: 'welcome'
    });
  }

  subjectClick = _ => {
    this.setState({
      mode : 'welcome'
    });
  }

  tocClick = id => {
    this.setState({
      mode : 'read',
      selected_id : Number(id)
    });
  }

  controlClick = mode => {

    if(mode === 'delete') {
      if(window.confirm('정말 삭제하시겠습니까?')) {
        let newLinks = Array.from(this.state.links);
        for(var i = 0, len = this.state.links.length; i < len; i++) {
          var data = this.state.links[i];
          if(this.state.selected_id === data.id) {
            newLinks.splice(i, 1);
            this.max_content_id--;
          }
        }
        this.setState({
          mode : 'welcome',
          links : newLinks
        });
      }
    } else {
      this.setState({
        mode : mode
      });
    }

  }

  doSubmit = (_title, _desc) => {
    console.log(_title, _desc);
    // this.setState({
    //   links : {id : links.length + 2, title : _title, }
    // });
    
    this.max_content_id++;

    //--- 아래와 같이 links 배열의 값을 추가하는것은 바람직하지 않다.
    //--- shouldComponentUpdate() 함수 사용 시 원본을 건드리기 때문에 변경된 props 와 기존 props 확인이 되지 않는다.
    // this.state.links.push({
    //   id : this.max_content_id,
    //   title : _title,
    //   desc : _desc
    // });
    // this.setState({
    //   links : this.state.links
    // });

    //--- 아래와 같이 concat 함수를 사용하여(복제된 배열을 이용하여), 추가하는 것이 좋다.
    // const _links = this.state.links.concat({
    //   id : this.max_content_id,
    //   title : _title,
    //   desc : _desc
    // });
    // this.setState({
    //   links : _links
    // });

    //--- 기존 links 배열의 값에 push 방식으로 처리하고 싶은 경우 아래와 같이 처리한다.
    //--- 기존 links 배열값을 복제한 새로운 배열인 newLinks 를 Array.from(복제배열) 함수를 통해 만든다.
    //--- 새로운 배열에 push 를 통해 기존 값과 변경된 값을 비교할 수 있다.
    let newLinks = Array.from(this.state.links);
    newLinks.push({
      id : this.max_content_id,
      title : _title,
      desc : _desc
    });
    this.setState({
      links : newLinks,
      mode : 'read',
      selected_id : this.max_content_id
    });
    //--- 객체를 복제하고 싶은 경우 Object.assign(새로운 객체 또는 빈 객체, 복제 대상 객체) 함수를 사용.
    //let obj = {name : 'baekcm'};
    //let newObj = Object.assign({}, obj);
  }

  doUpdateSubmit = (_id, _title, _desc) => {
    console.log(_id, _title, _desc);
    let newLinks = Array.from(this.state.links);

    for(var i = 0, len = this.state.links.length; i < len; i++) {
      var data = this.state.links[i];
      if(this.state.selected_id === data.id) {
        newLinks[i] =   {
                          id : _id,
                          title : _title,
                          desc : _desc
                        };
      }
    }
    this.setState({
      links : newLinks,
      mode : 'read'
    });
  }

  getLink = _ => {
    let _article = null;
    
    if(this.state.mode === 'welcome') {
      _article = <ReadContent title={this.state.asyncTitleDesc[0].title} desc={this.state.asyncTitleDesc[0].desc}></ReadContent>;
    } else if(this.state.mode === 'read') {
      const link = this.selectedLink();
      _article = <ReadContent title={link.title} desc={link.desc}></ReadContent>;
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmitEvent={ this.doSubmit }></CreateContent>;
    } else if(this.state.mode === 'update') {
      const link = this.selectedLink();
      //console.log(link);
      _article = <UpdateContent data={link} onSubmitEvent={ this.doUpdateSubmit }></UpdateContent>;
    } else {
      
    }
    return _article;
  }

  selectedLink = _ => {
    for(var i = 0, len = this.state.links.length; i < len; i++) {
      var data = this.state.links[i];
      if(this.state.selected_id === data.id) {
        return data;
      }
    }
  }

  //--- state 값이 변경됨에 따라 render() 함수가 다시 호출되고, 해당 컴포넌트의 render() 함수 또한 모두 재 호출된다.
  //--- 재 호출됨으로 화면이 다시 그려지게 된다.
  render() {
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub} onSubjectClickEvent={ this.subjectClick }></Subject>
        <TOC data={this.state.links} onTocClickEvent={ this.tocClick }></TOC>
        <Control onChangeModeEvent={ this.controlClick }></Control>
        {/* <ReadContent title={_title} desc={_desc}></ReadContent> */}
        {this.getLink()}
      </div>
    );
  }

}

export default App;
