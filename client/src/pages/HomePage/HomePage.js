// import { Link } from "react-router-dom";
import SinglePost from "../../components/SinglePost/SinglePost";


const HomePage = (props) => {

  return (
    <section>
      <div className="home-page">
        <div className="home-page__header">
          <h1 className="home-page__title">Posts</h1>
          <div className="home-page__cta">
            <input className="home-page__cta-search" image="" type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
      <div>
        {props.posts && props.posts.map((post) => {
          return (
            <SinglePost{...props} posts={post}/>
          );
        })}
      </div>
    </section>
  );
};
export default HomePage;