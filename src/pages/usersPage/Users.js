import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../thunks/usersSlice";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handlePostsClick = (userId, username) => {
    navigate(`/posts/${userId}`);
  };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Spin></Spin>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    onClick={() => handlePostsClick(user.id, user.username)}
                  >
                    Posts
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
