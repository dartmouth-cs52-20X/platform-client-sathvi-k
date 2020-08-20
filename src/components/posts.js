/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';
import { fetchPosts } from '../actions';
import TagLabel from './taglabels';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      // searched: false,
    };

    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  updateSearch = (event) => {
    this.setState({ search: event.target.value });
  }

  render() {
    // search/filtering help from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const filteredPosts = this.props.postsAll.filter(
      (post) => {
        return post.tags.join(' ').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || post.artist.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || post.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      },
    );

    return (
      // got an error about not having a key prop, fixed using https://reactjs.org/docs/lists-and-keys.html#keys
      <div className="home">
        <div className="welcome">
          Looking for new music?&nbsp;See recommendations from other people!
        </div>
        <Input type="text" value={this.state.search} onChange={this.updateSearch} placeholder="Search by album title, artist, or tags" />
        <div className="tiles">
          {filteredPosts.map((post) => (
            <div className="tile" key={post.id}>
              <div className="image">
                <img src={post.coverUrl} alt="cover-url" />
              </div>
              <div className="info">
                <Link to={`posts/${post.id}`} className="title">{post.title}</Link>
                <div className="artist">{post.artist}</div>
                <div className="alltags"><TagLabel tags={post.tags} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    /* return (
      <div className="home">
        <SearchBar onSearch={this.searched} onReturn={this.returned} />
        <div className="welcome">
          Looking for new music?&nbsp;See recommendations from other people!
        </div>
        <div className="tiles">
          {this.props.postsAll.map((post) => (
            <div className="tile" key={post.id}>
              <div className="image">
                <img src={post.coverUrl} alt="cover-url" />
              </div>
              <div className="info">
                <Link to={`posts/${post.id}`} className="title">{post.title}</Link>
                <div className="artist">{post.artist}</div>
                <div className="alltags"><TagLabel tags={post.tags} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ); */
  }
}

// return all posts if at least 1, return empty list if no posts
const mapStateToProps = (state) => (
  {
    postsAll: state.posts.all || [],
    // searchResults: state.posts.searched,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
