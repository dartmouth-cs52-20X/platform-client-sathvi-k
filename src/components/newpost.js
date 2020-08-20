import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, TextArea } from 'semantic-ui-react';
import { createPost } from '../actions';
import { uploadImage } from '../s3';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
      artist: '',
      errorMessage: '',
      imageError: '',
    };
    this.onTitleInput = this.onTitleInput.bind(this);
    this.onTagsInput = this.onTagsInput.bind(this);
    this.onContentInput = this.onContentInput.bind(this);
    // this.onCoverUrlInput = this.onCoverUrlInput.bind(this);
    this.onArtistInput = this.onArtistInput.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
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

  /* onCoverUrlInput = (event) => {
    this.setState({ coverUrl: event.target.value });
  } */

  onArtistInput = (event) => {
    this.setState({ artist: event.target.value });
  }

  onImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    if (file) {
      this.setState({ preview: window.URL.createObjectURL(file), file });
    }
  }

  onCreateNewPost = () => {
    if (this.state.file) {
      uploadImage(this.state.file).then((url) => {
        // use url for content_url and
        // either run your createPost actionCreator
        // or your updatePost actionCreator
        this.setState({ coverUrl: url });
        const postInfo = {
          title: this.state.title,
          tags: this.state.tags.trim(),
          content: this.state.content,
          coverUrl: this.state.coverUrl,
          artist: this.state.artist,
        };
        createPost(postInfo, this.props.history);
      }).catch((error) => {
        // handle error
        console.log(error);
        // history.push('/');
      });
    }
  }

  // onCreateNewPost = () => {
  //   const titleLen = this.state.title.length;
  //   const tagsLen = this.state.tags.length;
  //   const contentLen = this.state.content.length;
  //   const coverUrlLen = this.state.coverUrl.length;
  //   const artistLen = this.state.artist.length;

  //   if (titleLen > 0 && tagsLen > 0 && contentLen > 0 && artistLen > 0 && coverUrlLen > 0) {
  //     const imgUrl = this.state.coverUrl;
  //     if (imgUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) { // everything is valid
  //       this.setState({ errorMessage: '' });
  //       this.setState({ imageError: '' });
  //       const postInfo = {
  //         title: this.state.title,
  //         tags: this.state.tags.trim(),
  //         content: this.state.content,
  //         coverUrl: this.state.coverUrl,
  //         artist: this.state.artist,
  //       };
  //       createPost(postInfo, this.props.history);
  //     } else { // invalid image url
  //       this.setState({ imageError: 'Please use a valid image URL!' });
  //     }
  //   } else { // at least one field is not filled out
  //     this.setState({ errorMessage: 'Please fill out all fields!' });
  //   }
  // }

  render() {
    return (
      <div className="create-container">
        <div className="create">
          <div className="error">{this.state.errorMessage}</div>
          <div className="input">
            <Input placeholder="Album Title" onChange={this.onTitleInput} value={this.state.title} />
            <Input placeholder="Album Artist" onChange={this.onArtistInput} value={this.state.artist} />
            <div className="img-error">{this.state.imageError}</div>
            <img id="preview" alt="preview" src={this.state.preview} />
            <br />
            <input type="file" name="coverImage" onChange={this.onImageUpload} />
            {/* <Input placeholder="URL to Album Artwork" onChange={this.onCoverUrlInput} value={this.state.coverUrl} /> */}
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
