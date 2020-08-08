import React, { Component } from 'react';
import { connect } from 'react-redux';
// import TextareaAutosize from 'react-textarea-autosize';
import { Input, Form, TextArea } from 'semantic-ui-react';
import { createPost } from '../actions';

// title --> <album title> by <artist name>
// tags --> artists, genre
// content --> tracklist/review
// coverURL --> album art!

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
    };
    this.onTitleInput = this.onTitleInput.bind(this);
    this.onTagsInput = this.onTagsInput.bind(this);
    this.onContentInput = this.onContentInput.bind(this);
    this.onCoverUrlInput = this.onCoverUrlInput.bind(this);
    this.onCreateNewPost = this.onCreateNewPost.bind(this);
  }

  onTitleInput = (event) => {
    this.setState({ title: event.target.value });
  }

  onTagsInput = (event) => {
    this.setState({ tags: event.target.value });
  }

  onContentInput = (event) => {
    this.setState({ content: event.target.value });
  }

  onCoverUrlInput = (event) => {
    this.setState({ coverUrl: event.target.value });
  }

  onCreateNewPost = () => {
    const postInfo = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
      coverUrl: this.state.coverUrl,
    };
    createPost(postInfo, this.props.history);
  }

  render() {
    return (
      <div className="create-container">
        <div className="create">
          <div className="input">
            <Input placeholder="Album Title" onChange={this.onTitleInput} value={this.state.title} />
            {/* <div className="ui focus input"><input type="text" placeholder="Search..." /></div> */}
            <Input placeholder="URL to Album Artwork" onChange={this.onCoverUrlInput} value={this.state.coverUrl} />
            <Input placeholder="Tags" onChange={this.onTagsInput} value={this.state.tags} />
            <Form>
              <TextArea placeholder="Your thoughts on this album" onChange={this.onContentInput} value={this.state.content} />
            </Form>
          </div>
          <button onClick={this.onCreateNewPost} type="button"> <i className="fas fa-check" /> </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { createPost })(NewPost);
