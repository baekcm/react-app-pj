import React, { Component } from 'react';

class TOC extends Component {

    //--- render() 함수 실행 이전에 실행되도록 약속된 함수이다.
    //--- render() 함수가 불 필요하게 reload 되는 것을 return boolean 값으로 방지할 수 있다.
    shouldComponentUpdate = (newProps, newState) => {
      //console.log(this.props.data, newProps.data);

      //--- 기존 props 값과 변경된 props 값이 같은 경우 render() 를 실행시키지 않음(false)
      if(this.props.data === newProps.data) {
        return false;
      }

      return true;
    }

    onTocClick = (selId, e) => {
      
      //console.log(e.target.dataset.id);
      e.preventDefault();
      
      //--- data-attribute 사용 방법.
      // const id = e.target.dataset.id;
      // this.props.onTocClickEvent(id);

      this.props.onTocClickEvent(selId);
    }

    render() {

      console.log('TOC render() ==========================')

        var lists = [];
        const data = this.props.data;
        for(let i = 0, len = this.props.data.length; i < len; i++) {
            //--- data-attribute 사용 방법.
            // lists.push(<li key={data[i].id}><a href={"/content/" + data[i].id} data-id={data[i].id} onClick={ this.onTocClick }>{data[i].title}</a></li>);

            //--- bind() this 객체 및 id 를 전달하는 방법.
            lists.push(<li key={data[i].id}><a href={"/content/" + data[i].id} onClick={ this.onTocClick.bind(this, data[i].id) }>{data[i].title}</a></li>);
        }
      return (
        <nav>
            <ul>
                {lists}
            </ul>
        </nav>
      );
    }
  }

  export default TOC;