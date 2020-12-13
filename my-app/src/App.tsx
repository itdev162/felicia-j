import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PostList from './components/PostList/PostList';
import Post from './components/Post/Post';


class App extends React.Component {
  state = {
    posts: [],
    post: null
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
    .then((response) => {
      this.setState({
        posts: response.data
      })
    })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      })
  } 

  viewPost = (post) => {
    console.log(`view ${post.title}`);
    this.setState({
      post: post
    });
  }

  render() {

    const { posts, post} = this.state;

    return (
      <Router>
        <div className="App">
        <header className="App-header">
          BlogBox
        </header>
        <main className="App-content">
          <Switch>
            <Route exact path="/">
              <PostList 
              posts={posts}
              clickPost={this.viewPost}/>
            </Route>
            <Route path="/posts/:postId">
              <Post post={post}/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
      
    );
  }
}

export default App;
