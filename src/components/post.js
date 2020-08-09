import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, TextArea } from 'semantic-ui-react';
import { sanitize } from 'dompurify';
import marked from 'marked';
import { fetchPost, deletePost, updatePost } from '../actions/index';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
      editing: false,
      errorMessage: '',
      imageError: '',
    };
    this.onTitleInput = this.onTitleInput.bind(this);
    this.onTagsInput = this.onTagsInput.bind(this);
    this.onContentInput = this.onContentInput.bind(this);
    this.onCoverUrlInput = this.onCoverUrlInput.bind(this);
    this.editPost = this.editPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.goToHomePage = this.goToHomePage.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
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

  editPost = () => {
    this.setState({
      title: this.props.currentPost.title,
      tags: this.props.currentPost.tags,
      content: this.props.currentPost.content,
      coverUrl: this.props.currentPost.coverUrl,
      editing: true,
    });
  }

  deletePost = () => {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  updatePost = () => {
    const titleLen = this.state.title.length;
    const tagsLen = this.state.tags.length;
    const contentLen = this.state.content.length;
    const coverUrlLen = this.state.coverUrl.length;

    if (titleLen > 0 && tagsLen > 0 && contentLen > 0 && coverUrlLen > 0) {
      const imgUrl = this.state.coverUrl;
      if (imgUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) { // everything is valid
        this.setState({ errorMessage: '' });
        this.setState({ imageError: '' });
        const postInfo = {
          title: this.state.title,
          tags: this.state.tags,
          content: this.state.content,
          coverUrl: this.state.coverUrl,
        };
        this.props.updatePost(this.props.match.params.postID, postInfo);
        this.setState({
          title: '',
          tags: '',
          content: '',
          coverUrl: '',
          editing: false,
        });
        this.props.fetchPost(this.props.match.params.postID);
      } else { // invalid image url
        this.setState({ imageError: 'Please use a valid image URL!' });
      }
    } else { // 1 or more empty fields
      this.setState({ errorMessage: 'Please fill out all fields!' });
    }
  }

  // https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  goToHomePage = () => {
    this.props.history.push('/');
  }

  render() {
    if (this.state.editing) {
      return (
        <div className="edit-container">
          <div className="editor">
            <div className="error">{this.state.errorMessage}</div>
            <div className="input">
              <div className="justified-left">Album Title</div>
              <Input placeholder="Album Title" onChange={this.onTitleInput} value={this.state.title} />
              <div className="img-error">{this.state.imageError}</div>
              <div className="justified-left">Album Artwork</div>
              <Input placeholder="URL to Album Artwork" onChange={this.onCoverUrlInput} value={this.state.coverUrl} />
              <div className="justified-left">Tags</div>
              <Input placeholder="Tags" onChange={this.onTagsInput} value={this.state.tags} />
              <div className="justified-left">Your thoughts</div>
              <Form>
                <TextArea placeholder="Why do you like this album?" onChange={this.onContentInput} value={this.state.content} />
              </Form>
            </div>
            <button onClick={this.updatePost} type="button"> <i className="fas fa-check" /> </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="detail-container">
          <div className="detail">
            <div className="left">
              <img id="cover" src={this.props.currentPost.coverUrl} alt="cover-url" />
              <div className="tags">{this.props.currentPost.tags}</div>
            </div>
            <div className="right">
              <div className="title">{this.props.currentPost.title}</div>
              {/* learned how to sanitize here https://stackoverflow.com/questions/29044518/safe-alternative-to-dangerouslysetinnerhtml */}
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: marked(sanitize(this.props.currentPost.content || '')) }} />
              <div className="buttons">
                <button onClick={this.goToHomePage} type="button"> <i className="fa fa-arrow-left" /> </button>
                <button onClick={this.editPost} type="button"> <i className="fas fa-pen" /> </button>
                <button onClick={this.deletePost} type="button"> <i className="fas fa-trash-alt" /> </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
