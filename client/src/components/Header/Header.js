import { Heading, Pane, TabNavigation, Tab } from "evergreen-ui";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function App(props) {
  return (
    <Pane>
      <Pane is="header" elevation={2} height={72} display="flex">
        <Pane
          width={960}
          display="flex"
          alignItems="center"
          marginLeft={85}
          marginRight="auto"
        >
          <Link className="header__logo" to={"/posts"}>
            <Heading
              className="header__heading"
              size={600}
              letterSpacing="2px"
              fontWeight={700}
            >
              ToyCycle
            </Heading>
          </Link>
          <TabNavigation className="header__tab">
            {["Upload Post", "Profile", "Logout"].map((tab, index) => (
              <Tab key={tab} is="a" href="#" id={tab} isSelected={index === 0}>
                {tab}
              </Tab>
            ))}
          </TabNavigation>
        </Pane>
      </Pane>
    </Pane>
  );
}
