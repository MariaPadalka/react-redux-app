import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../thunks/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import NewPostModal from "../../components/modals/NewPostModal";
import "../styles/Posts.css";
import { Button, Spin } from "antd";
import { fetchUser } from "../../thunks/usersSlice";

const Posts = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.users);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts(userId));
    }
    dispatch(fetchUser(userId));
  }, [posts.length]);

  return (
    <>
      <h1>Posts by User {currentUser?.username}</h1>
      <Button onClick={() => setIsModalVisible(true)}>ADD NEW</Button>
      {loading ? (
        <Spin></Spin>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <th>{post.body}</th>
                <td>
                  <Button onClick={() => navigate(`/post/${post.id}`)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <NewPostModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        userId={userId}
      />
    </>
  );
};

export default Posts;
