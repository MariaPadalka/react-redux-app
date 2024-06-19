import "./App.css";
import { Route, Routes } from "react-router-dom";
import Users from "./pages/usersPage/Users";
import Posts from "./pages/postsTablePage/PostsTable";
import PostDetail from "./pages/postDetailsPage/PostDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/posts/:userId" element={<Posts />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
