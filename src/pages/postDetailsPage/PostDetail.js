import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../thunks/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Card, Popconfirm, Spin, message } from "antd";
import EditPostModal from "../../components/modals/EditPostModal";
import axios from "axios";
import CommentComponent from "../../components/Comment";
import { NAVIGATE_BACK } from "../../constants";

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const foundPost = useSelector((state) =>
    state.posts.posts.find((post) => post.id === +postId)
  );
  const [post, setPost] = useState(foundPost);
  const [loading, setLoading] = useState(true);

  const loadComments = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      setComments(response.data);
    } catch (error) {
      message.error("Error loading comments");
    } finally {
      setLoading(false);
    }
  };
  const loadPost = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPost(response.data);
    } catch (error) {
      message.error("Error loading post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!post) {
      loadPost();
    }
    loadComments();
  }, []);

  const handleDelete = () => {
    dispatch(deletePost(postId));
    navigate(NAVIGATE_BACK);
    message.info("Post deleted");
  };

  if (loading) return <Spin />;

  return (
    <Card title={post.title} bordered={false}>
      <p>{post.body}</p>
      <br />
      {comments.map((comment) => (
        <CommentComponent
          name={comment.name}
          email={comment.email}
          body={comment.body}
        />
      ))}
      <hr />
      <div className="actions-container">
        <Button info onClick={() => setIsEditModalVisible(true)}>
          Edit
        </Button>
        <Popconfirm
          title="Delete the task"
          onConfirm={handleDelete}
          description="Are you sure to delete this task?"
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
        <Button onClick={() => navigate(NAVIGATE_BACK)}>Back</Button>
        <EditPostModal
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          post={post}
          setPost={setPost}
        />
      </div>
    </Card>
  );
};

export default PostDetail;
