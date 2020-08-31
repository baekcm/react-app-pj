import React, { Component } from 'react';

class UpdateContent extends Component {

    constructor(props) {
      super(props);
      this.state = {
        id : this.props.data.id,
        title : this.props.data.title,
        desc : this.props.data.desc
      }
    }

    doAction = (e) => {
      e.preventDefault();
      //console.log(e.target.title.value, e.target.desc.value);
      // const id = e.target.id.value;
      // const title = e.target.title.value;
      // const desc = e.target.desc.value;

      const id = this.state.id;
      const title = this.state.title;
      const desc = this.state.desc;
      this.props.onSubmitEvent(id, title, desc);
    }

    inputFormHandler = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      });
    }

    render() {
      return (
        <article>
            <h2>Update</h2>
            <form action="update_process" method="post" onSubmit={ this.doAction.bind(this) }>
              <p>
                <input type="text" name="title" value={this.state.title} onChange={ this.inputFormHandler } placeholder="title"></input>
                <input type="hidden" name="id" value={this.state.id}></input>
              </p>
              <p><textarea name="desc" value={this.state.desc} onChange={ this.inputFormHandler } placeholder="description"></textarea></p>
              <p><input type="submit"></input></p>
            </form>
        </article>
      );
    }
  }

  export default UpdateContent;