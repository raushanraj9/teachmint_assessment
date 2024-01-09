import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountryDropdown from "../../components/countryDropdown/CountryDropdown";
// import Clock from "../../components/clock/clock";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { PostsContext } from "../../context/postsContext";
import PostCard from "../../components/postCard/PostCard";
import Modal from "../../components/modal/Modal";
import ModalBox from "../../components/modal/ModalBox";
import UserDetails from "./UserDetails";

import styles from './ProfilePage.module.css'

function ProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Profile page component", id);

  const userList = useContext(UserContext);
  const postsList = useContext(PostsContext);
  const [user] = userList?.filter((user) => user.id == id);
  const posts = postsList.filter((post) => post.userId == id);

  const [selectedPost, setSelectedPost] = useState({});

  function handleBackClick() {
    navigate("/");
  }
  return (
    <>
      <div className={styles.header} >
        <button
          style={{ margin: "0.5em 1em", fontSize: "1em", backgroundColor:"lightblue", borderRadius: "0.5em", padding: "0.5em" }}
          onClick={handleBackClick}
        >
          Back
        </button>
        <CountryDropdown />
      </div>
      <UserDetails user={user} />
        <div className={styles.MainContent}>
      <ModalBox>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.body}
              setSelectedPost={setSelectedPost}
            />
          ))}
          
          <Modal
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
          />
      </ModalBox>
        </div>
    </>
  );
}

export default ProfilePage;
