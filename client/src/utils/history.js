import { createBrowserHistory } from "history";
const history = createBrowserHistory();
export const redirect = history.push;
export default history;
