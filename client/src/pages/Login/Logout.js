import { Redirect } from "react-router";
import { logout } from "../../utils/auth";
function Logout() {
  logout();
  return <Redirect to="/login" />;
}

export default Logout;
