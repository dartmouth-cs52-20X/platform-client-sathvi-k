import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, TextArea } from 'semantic-ui-react';
import { sanitize } from 'dompurify';
import marked from 'marked';
import { fetchPost, deletePost, updatePost } from '../actions/index';
import TagLabel from './taglabels';
import { uploadImage } from '../s3';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
      artist: '',
      editing: false,
      errorMessage: '',
      imageError: '',
    };
    this.onTitleInput = this.onTitleInput.bind(this);
    this.onTagsInput = this.onTagsInput.bind(this);
    this.onContentInput = this.onContentInput.bind(this);
    this.onCoverUrlInput = this.onCoverUrlInput.bind(this);
    this.onArtistInput = this.onArtistInput.bind(this);
    this.editPost = this.editPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.goToHomePage = this.goToHomePage.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  onTitleInput = (event) => {
    this.setState({ title: event.target.value });
  }

  onTagsInput = (event) => {
    this.setState({ tags: event.target.value.split(' ') });
  }

  onContentInput = (event) => {
    this.setState({ content: event.target.value });
  }

  onCoverUrlInput = (event) => {
    this.setState({ coverUrl: event.target.value });
  }

  onArtistInput = (event) => {
    this.setState({ artist: event.target.value });
  }

  editPost = () => {
    this.setState({
      title: this.props.currentPost.title,
      tags: this.props.currentPost.tags,
      content: this.props.currentPost.content,
      coverUrl: this.props.currentPost.coverUrl,
      artist: this.props.currentPost.artist,
      editing: true,
    });
  }

  deletePost = () => {
    this.props.deletePost(this.props.match.params.postID, this.props.history);
  }

  onImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState({ preview: window.URL.createObjectURL(file), file });
    }
  }

  updatePost = () => {
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
        this.setState({ coverUrl: url });
        const postInfo = {
          title: this.state.title,
          tags: this.state.tags.join(' ').trim(),
          content: this.state.content,
          coverUrl: this.state.coverUrl,
          artist: this.state.artist,
        };
        this.props.updatePost(this.props.match.params.postID, postInfo, this.props.history);
        this.setState({
          title: '',
          tags: '',
          content: '',
          coverUrl: '',
          artist: '',
          editing: false,
        });
        this.props.fetchPost(this.props.match.params.postID);
      }).catch((error) => {
        // handle error
        console.log(error);
      });
    }
  }

  /* updatePost = () => {
    const titleLen = this.state.title.length;
    const tagsLen = this.state.tags.length;
    const contentLen = this.state.content.length;
    const coverUrlLen = this.state.coverUrl.length;
    const artistLen = this.state.artist.length;

    if (titleLen > 0 && tagsLen > 0 && contentLen > 0 && coverUrlLen > 0 && artistLen > 0) {
      const imgUrl = this.state.coverUrl;
      if (imgUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) { // everything is valid
        this.setState({ errorMessage: '' });
        this.setState({ imageError: '' });

        const postInfo = {
          title: this.state.title,
          tags: this.state.tags.join(' ').trim(),
          content: this.state.content,
          coverUrl: this.state.coverUrl,
          artist: this.state.artist,
        };
        this.props.updatePost(this.props.match.params.postID, postInfo, this.props.history);
        this.setState({
          title: '',
          tags: '',
          content: '',
          coverUrl: '',
          artist: '',
          editing: false,
        });
        this.props.fetchPost(this.props.match.params.postID);
      } else { // invalid image url
        this.setState({ imageError: 'Please use a valid image URL!' });
      }
    } else { // 1 or more empty fields
      this.setState({ errorMessage: 'Please fill out all fields!' });
    }
  } */

  // https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
  goToHomePage = () => {
    this.props.history.push('/');
  }

  // eslint-disable-next-line consistent-return
  showButtons() {
    if (this.props.user) {
      if (this.props.user.email === this.props.currentPost.author.email) {
        // console.log('i have editing and deleting persmission');
        return (
          <div className="buttons">
            <button onClick={this.goToHomePage} type="button"> <i className="fa fa-arrow-left" /> </button>
            <button onClick={this.editPost} type="button"> <i className="fas fa-pen" /> </button>
            <button onClick={this.deletePost} type="button"> <i className="fas fa-trash-alt" /> </button>
          </div>
        );
      } else {
        return (
          <div className="buttons">
            <button onClick={this.goToHomePage} type="button"> <i className="fa fa-arrow-left" /> </button>
          </div>
        );
      }
    } else {
      // console.log('i didnt make this post so i cant edit or delete it!!');
      return (
        <div className="buttons">
          <button onClick={this.goToHomePage} type="button"> <i className="fa fa-arrow-left" /> </button>
        </div>
      );
    }
  }

  render() {
    if (!this.props.currentPost.tags) {
      return null;
    }
    if (this.state.editing) {
      return (
        <div className="edit-container">
          <div className="editor">
            <div className="error">{this.state.errorMessage}</div>
            <div className="input">
              <div className="justified-left">Album Title</div>
              <Input placeholder="Album Title" onChange={this.onTitleInput} value={this.state.title} />
              <div className="justified-left">Album Artist</div>
              <Input placeholder="Album Artist" onChange={this.onArtistInput} value={this.state.artist} />
              <div className="img-error">{this.state.imageError}</div>
              {/* <div className="justified-left">Album Artwork</div>
              <Input placeholder="URL to Album Artwork" onChange={this.onCoverUrlInput} value={this.state.coverUrl} /> */}
              <img id="preview" alt="preview" src={this.state.preview} />
              <br />
              <input type="file" name="coverImage" onChange={this.onImageUpload} />
              <div className="justified-left">Tags</div>
              <Input placeholder="Tags" onChange={this.onTagsInput} value={this.state.tags.join(' ')} />
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
      // console.log(this.props.currentPost.author);
      // console.log(this.props.user);
      return (
        <div className="detail-container">
          <div className="detail">
            <div className="left">
              <div className="author">Recommended By: {this.props.currentPost.author.fullname} (@{this.props.currentPost.author.username})</div>
              <img id="cover" src={this.props.currentPost.coverUrl} alt="cover-url" />
              <div className="alltags"><TagLabel tags={this.props.currentPost.tags} /></div>
            </div>
            <div className="right">
              <div className="title">{this.props.currentPost.title}</div>
              <div className="artist">By {this.props.currentPost.artist}</div>
              {/* learned how to sanitize here https://stackoverflow.com/questions/29044518/safe-alternative-to-dangerouslysetinnerhtml */}
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: marked(sanitize(this.props.currentPost.content || '')) }} />
              {this.showButtons()}
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
    user: reduxState.auth.user,
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
