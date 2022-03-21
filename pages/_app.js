import "../styles/globals.css";
import "../styles/global.scss";
import Axios from "axios";
import { Socket_uri } from "../utils/request";
const debug = process.env.NODE_ENV === "development";
Axios.defaults.baseURL = debug ? "https://localhost:5001" : Socket_uri;

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
