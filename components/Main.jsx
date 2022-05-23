import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Login from "./Login";
import { grabData } from "../api";
import {Routes, Route} from "react-router-dom"

const Main = () => {
    const [theUser, setTheUser] = useState({
    messages: [],
    username: "",
    _id: "",
  });
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    if (myToken) {
      setToken(myToken);
    }
  }, [token]);

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        const response = await grabData(token);
        setTheUser({
          messages: response.data.messages,
          username: response.data.username,
          _id: response.data._id,
        });
      }
    };
    getUser();
  }, [token]);

  return (
      <div className="main_page_container">
        <Routes>
          <Route
            path="/SignUp"
            element={<SignUp token={token} setToken={setToken} />}
          >
          </Route>

          <Route path="/Login" element={<Login setToken={setToken} />}></Route>

          <Route path="/CreatePost" element={<CreatePost token={token} setToken={setToken} />}></Route>

          <Route
            path="/Posts"
            element={
              <Posts
              theUser={theUser}
              token={token}
              setToken={setToken}
              posts={posts}
              setPosts={setPosts}
              />
            }
          ></Route>
            <Route
              path="/Profile"
              element={
                <Profile
                  token={token}
                  setToken={setToken}
                  theUser={theUser}
                  setTheUser={setTheUser}
                />
              }
            ></Route>
        </Routes>
      </div>
  );
};

export default Main;

