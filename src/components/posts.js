import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class Posts extends Component {
  /* constructor(props) {
    super(props);

  } */

  componentDidMount() {
    this.props.fetchPosts();
  }

  /* maybe ask about this in office hours */
  render() {
    // console.log(this.props.postsAll);
    // got an error about not having a key prop, fixed using https://reactjs.org/docs/lists-and-keys.html#keys
    return (
      <div className="home">
        <div className="welcome">
          Looking for new music? See recommendations from other people!
        </div>
        <div className="tiles">
          {this.props.postsAll.map((post) => (
            <div className="tile" key={post.id}>
              <div className="image">
                <img src={post.coverUrl} alt="cover-url" />
              </div>
              <div className="info">
                <Link to={`posts/${post.id}`} className="title">{post.title}</Link>
                <div className="tags-all">{post.tags}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* <div>
        {this.props.postsAll.map((post) => (
          { post.id },
            { post.title },
            { post.coverUrl },
            { post.tags },
          < Link to = { posts/ ${ post.id }}>
            )
    );
    }
      </div>
  ) */
}

// return all posts if at least 1, return empty list if no posts --> use length of posts to determine if empty or not
const mapStateToProps = (state) => (
  {
    postsAll: state.posts.all || [],
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
