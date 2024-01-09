import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import { UserContext } from "./context/userContext";
import { PostsContext } from "./context/postsContext";
import ProfilePage from "./pages/profilePage/ProfilePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  // console.log("App runs")
  const [userData, setUserData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/user/:id",
      element: <ProfilePage />,
    },
  ]);

  useEffect(() => {
  // console.log("useEffect runs");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((jsonData) => setUserData(jsonData));

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((jsonData) => setPostsData(jsonData));
  }, []);

  return (
    <div>
      <UserContext.Provider value={userData}>
        <PostsContext.Provider value={postsData}>
            <RouterProvider router={router} />
        </PostsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
