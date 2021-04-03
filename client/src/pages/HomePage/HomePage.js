import SinglePost from "../../components/SinglePost/SinglePost";
import { useAuthUser } from "../../utils/auth";
import "./HomePage.css";
import { Button, Pane, Heading, SearchInput } from "evergreen-ui";

const HomePage = (props) => {
  return (
    <Pane>
      <Pane className="posts-container">
        <Heading size={900}>Posts</Heading>
        <SearchInput type="text" placeholder="Search..." />
      </Pane>

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
