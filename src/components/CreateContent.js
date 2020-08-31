import React, { Component } from 'react';

class CreateContent extends Component {

    doAction = (e) => {
      e.preventDefault();
      //console.log(e.target.title.value, e.target.desc.value);
      const title = e.target.title.value;
      const desc = e.target.desc.value;
      this.props.onSubmitEvent(title, desc);
    }

    render() {
      return (
        <article>
            <h2>Create</h2>
            <form action="create_process" method="post" onSubmit={ this.doAction.bind(this) }>
              <p><input type="text" name="title" placeholder="title"></input></p>
              <p><textarea name="desc" placeholder="description"></textarea></p>
              <p><input type="submit"></input></p>
            </form>
        </article>
      );
    }
  }

  export default CreateContent;