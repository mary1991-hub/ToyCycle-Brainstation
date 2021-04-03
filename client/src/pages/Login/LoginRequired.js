import { Redirect } from "react-router";
import { isAuthenticated } from "../../utils/auth";

const LoginRequired = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  } else {
    return <Redirect to="/login" />;
  }
};

export default LoginRequired;
