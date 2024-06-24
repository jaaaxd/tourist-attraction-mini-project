import axios from "axios";
import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import Header from "../components/Header";

function Homepage() {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getPosts = async () => {
    const response = await axios.get(
      `https://travelpage-data-techup.up.railway.app/trips?keywords=${searchInput}`
    );
    setPosts(response.data.data);
  };

  useEffect(() => {
    getPosts();
  }, [searchInput]);

  return (
    <div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      </style>
      <Header
        posts={posts}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <PostList
        posts={posts}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default Homepage;
