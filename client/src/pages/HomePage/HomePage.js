import SinglePost from "../../components/SinglePost/SinglePost";
import "./HomePage.scss";
import { getUser, useAuthUser } from "../../utils/auth";
import { Pane } from "evergreen-ui";

const HomePage = (props) => {
  return (
    <Pane>
      {/* <Pane className="posts-container">
        <SearchInput type="text" placeholder="Search..." />
      </Pane> */}

      <div className="posts-cards">
        {props.posts &&
          props.posts.map((post) => {
            return <SinglePost {...props} posts={post} />;
          })}
      </div>
    </Pane>
  );
};
export default HomePage;
