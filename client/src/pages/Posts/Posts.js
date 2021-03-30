// import { Link } from "react-router-dom";


const Posts = (props) => {

  return (
    <section>
      <div className="warehouse">
        <div className="warehouse__header">
          <h1 className="warehouse__title">Posts</h1>
          <div className="warehouse__cta">
            <input className="warehouse__cta-search" image="" type="text" placeholder="Search..." />
            {/* <Link to={`/addwarehouse`} className="warehouse__cta-button">+ Add New Warehouse</Link> */}
          </div>
        </div>
      </div>
      {/* <div>
        {props.posts && props.posts.map((post) => {
          return (
            <SingleWarehouse {...props} warehouse={warehouse}/>
          );
        })}
      </div> */}
    </section>
  );
};
export default Posts;