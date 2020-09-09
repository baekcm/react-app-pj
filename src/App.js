import React, { Component } from 'react';

class Sub extends Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.desc}
      </header>
    );
  }
}

class Nav extends Component {

  selectedNavigation = (id, e) => {
    e.preventDefault();
    //console.log(id);
    this.props.onChangeNav(id);
  }

  render() {

    //--- for in 사용법.
    // let list = [];
    // for(let i in this.props.items) {
    //   list.push(<li key={this.props.items[i].id}><a href="/">{this.props.items[i].title}</a></li>)
    // }

    //--- map 사용법.
    let list = this.props.items.map( item => <li key={item.id}><a href="/" onClick={ this.selectedNavigation.bind(this, item.id) }>{item.title}</a></li> );

    //--- reduce 사용법. reduce((누적값, 현잿값, 인덱스, 요소) => )
    //let list = this.props.items.reduce( (acc, cur, index, item) => {
    //  acc.push(<li key={cur.id}><a href="/">{cur.title}</a></li>);
    //  return acc;
    //}, []);

    return (
      <nav>
        <ul>
          {list}
        </ul>
      </nav>
    );
  }
}

class Article extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    //--- state 값이 변경될 때 해당 Component 의 render() 함수가 재 실행된다.
    this.state = {
      selected_id : 0,
      subject : {title : 'WEB', desc : "World Wide Web~!!!"},
      links : [
        {id : 1, title : 'HTML', desc : 'HTML is for information'},
        {id : 2, title : 'CSS', desc : 'CSS is for design'},
        {id : 3, title : 'JavaScript', desc : 'JavaScript is for interactive'}
      ]
    }
  }

  changeNavigation = id => {
    this.setState({
      selected_id : Number(id - 1)
    });
  }

  //--- state 값이 변경됨에 따라 render() 함수가 다시 호출되고, 해당 컴포넌트의 render() 함수 또한 모두 재 호출된다.
  //--- 재 호출됨으로 화면이 다시 그려지게 된다.
  render() {
    return (
      <div className="App">
        <Sub title={this.state.subject.title} desc={this.state.subject.desc}></Sub>
        <Nav items={this.state.links} onChangeNav={ this.changeNavigation }></Nav>
        <Article title={this.state.links[this.state.selected_id].title} desc={this.state.links[this.state.selected_id].desc}></Article>
      </div>
    );
  }
}

export default App;