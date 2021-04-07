import { Heading, Pane, TabNavigation, Tab } from "evergreen-ui";
import { Link } from "react-router-dom";
import { getUser } from "../../utils/auth";
import "./Header.scss";

export default function App(props) {
  const user = getUser();
  return (
    <Pane>
      <Pane
        is="header"
        elevation={2}
        height={72}
        display="flex"
        justifyContent="space-between"
      >
        <Pane
          width={960}
          display="flex"
          alignItems="center"
          marginLeft={85}
          marginRight="auto"
        >
          <Pane>
            <Link className="header__logo" to={"/posts"}>
              <Heading
                className="header__heading"
                size={600}
                letterSpacing="2px"
                fontWeight={700}
              >
                ToyCycle
                {/* <img src="../../assets/Logo/Free_Sample_By_Wix(1).jpeg" /> */}
              </Heading>
            </Link>
          </Pane>
          <Pane>
            <TabNavigation className="header__tab">
              <Link className="header__logo" to={"/posts/add"}>
                <Tab
                  key={"Upload Post"}
                  is="a"
                  href="http://localhost:8080/posts/add"
                  id={"Upload Post"}
                >
                  {"Upload Post"}
                </Tab>
              </Link>
              {/* <Link className="header__logo" to={"/posts"}>
                <Tab
                  key={"Posts"}
                  is="a"
                  href="http://localhost:8080/posts"
                  id={"Posts"}
                >
                  {"Posts"}
                </Tab>
              </Link> */}
              <Link className="header__logo" to={"/posts/my"}>
                <Tab
                  key={"My Posts"}
                  is="a"
                  href="http://localhost:8080/posts/my"
                  id={"My Posts"}
                >
                  {"My Posts"}
                </Tab>
              </Link>
              <Link className="header__logo" to={"/offers/my"}>
                <Tab
                  key={"My Offers"}
                  is="a"
                  href="http://localhost:8080/offers/my"
                  id={"My Offers"}
                >
                  {"My Offers"}
                </Tab>
              </Link>
              <Link className="header__logo" to={"/offers/me"}>
                <Tab
                  key={"Offers to me"}
                  is="a"
                  href="http://localhost:8080/offers/me"
                  id={"Offers to me"}
                >
                  {"Offers to me"}
                </Tab>
              </Link>
              <Link className="header__logo" to={"/profile"}>
                <Tab
                  key={"Profile"}
                  is="a"
                  href="http://localhost:8080/profile"
                  id={"Profile"}
                >
                  {"Profile"}
                </Tab>
              </Link>
              {user ? (
                <Link className="header__logo" to={"/logout"}>
                  <Tab
                    key={"Logout"}
                    is="a"
                    href="http://localhost:8080/logout"
                  >
                    {"Logout"}
                  </Tab>
                </Link>
              ) : (
                <>
                  <Link className="header__logo" to={"/login"}>
                    <Tab
                      key={"login"}
                      is="a"
                      href="http://localhost:8080/login"
                    >
                      {"Login"}
                    </Tab>
                  </Link>
                  <Link className="header__logo" to={"/signup"}>
                    <Tab
                      key={"signup"}
                      is="a"
                      href="http://localhost:8080/signup"
                    >
                      {"Sign up"}
                    </Tab>
                  </Link>
                </>
              )}
            </TabNavigation>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}
