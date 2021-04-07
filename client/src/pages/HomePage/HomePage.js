import SinglePost from "../../components/SinglePost/SinglePost";
import "./HomePage.scss";
import { getUser, getToken, useAuthUser } from "../../utils/auth";
import { Pane } from "evergreen-ui";
import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

const HomePage = ({ uri }) => {
  const [posts, setPosts] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(`${API_BASE_URL}${uri}`, {
        headers: getToken()
          ? {
              Authorization: `Bearer ${getToken()}`,
            }
          : {},
      })
      .then((response) => setPosts(response.data));
  }, [setPosts, uri]);
  return (
    <Pane>
      <div className="posts-cards">
        {posts &&
          posts.map((post) => {
            return <SinglePost posts={post} />;
          })}
      </div>
    </Pane>
  );
};
export default HomePage;
