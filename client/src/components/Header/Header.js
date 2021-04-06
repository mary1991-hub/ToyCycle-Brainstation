import { Heading, Pane, TabNavigation, Tab } from "evergreen-ui";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function App(props) {
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
              <Link className="header__logo" to={"/offers"}>
                <Tab
                  key={"My Trades"}
                  is="a"
                  href="http://localhost:8080/offers"
                  id={"My Trades"}
                >
                  {"My Trades"}
                </Tab>
              </Link>
              <Link className="header__logo" to={"/logout"}>
                <Tab key={"Logout"} is="a" href="http://localhost:8080/logout">
                  {"Logout"}
                </Tab>
              </Link>
            </TabNavigation>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}
