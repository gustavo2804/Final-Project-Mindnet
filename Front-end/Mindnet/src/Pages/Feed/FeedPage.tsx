import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../global.css';
import './FeedStyle.css';
import CreatePost from '../components/createpost';
import SocialMediaPost from '../components/post';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/navbar';

interface Comment {
  id: number;
  text: string;
  user: {
    name: string;
    profilePicture: string;
  };
}

interface Post {
  id: number;
  image: string;
  likes: number;
  comments: Comment[];
  shares: number;
  caption: string;
  poster: {
    id: number;
    name: string;
    profilePicture: string;
  };
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // State to store the posts

  useEffect(() => {
    fetchPosts(); // Fetch posts when the component mounts
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts'); // Replace '/api/posts' with the actual endpoint to retrieve all posts
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSubmit = async (post: Post) => {
    try {
      const response = await axios.post('/api/posts', post); // Replace '/api/posts' with the actual endpoint to create a post
      setPosts([...posts, response.data]); // Append the new post to the existing posts
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handlePostDelete = async (postId: number) => {
    try {
      await axios.delete(`/api/posts/${postId}`); // Replace '/api/posts/:id' with the actual endpoint to delete a post
      setPosts(posts.filter((post) => post.id !== postId)); // Update the state by removing the deleted post
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // ...

  return (
    <div id="feed">
      <Sidebar />
      <NavBar/>
      <div className="feed-container">
        <CreatePost onSubmit={handlePostSubmit} /> {/* Pass the handlePostSubmit function as a prop */}
        {/* Render existing posts */}
        {posts.map((post) => (
          <SocialMediaPost
            key={post.id}
            id={post.id}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
            caption={post.caption}
            poster={post.poster}
            onDelete={() => handlePostDelete(post.id)} // Add a onDelete prop to handle post deletion
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
