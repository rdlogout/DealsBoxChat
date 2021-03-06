import axios from "axios";
import toast from "react-hot-toast";
const debug = process.env.NODE_ENV === "development";
export const Socket_uri = debug
  ? "https://localhost:5001"
  : "https://socket.dealsonopenbox.com";

export const GET = async (url, alert = false, msg = "Loading ...") => {
  let data;
  let id = "";
  if (alert) id = toast.loading(msg);
  try {
    const resp = await axios(url, { withCredentials: true });
    if (resp.status === 200) data = resp.data;
  } catch (ex) {
    LogError(ex);
  }

  toast.dismiss(id);
  return data;
};

export const POST = async (url, body, alert = true, msg = "Loading ...") => {
  let btn, btnBody;
  if (document.activeElement.getAttribute("type") === "submit")
    btn = document.activeElement;
  if (btn) {
    btnBody = btn.innerHTML;
    btn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    btn.disabled = true;
  }

  let data;
  let id = "";
  if (alert) id = toast.loading(msg);
  try {
    const resp = await axios.post(url, body, { withCredentials: true });
    if (resp.status === 200)
      if (alert)
        if (resp.data.status)
          toast.success(resp.data.msg, { id, duration: 4000 });
        else toast.error(resp.data.msg, { id, duration: 4000 });

    data = resp?.data;
  } catch (ex) {
    LogError(ex);
  }

  if (data?.status === undefined) toast.dismiss(id);

  if (btn) {
    btn.innerHTML = btnBody;
    btn.disabled = false;
  }
  return data;
};

export const POSTFORM = async (
  e,
  url,
  alert = true,
  msg = "Hold up a sec ..."
) => {
  e.preventDefault();
  const form = e.target;
  console.log(form.getAttribute("url"));
  return await POST(
    url || form.getAttribute("url"),
    new FormData(form),
    alert,
    msg
  );
};

export const ACTIONFORM = async (url, e, router, next) => {
  e.preventDefault();
}; //'https://send.dealsonopenbox.com'

export const LogEvent = (data) => {
  axios
    .post("https://send.dealsonopenbox.com", data)
    .then((s) => console.log(s))
    .catch((s) => console.log(s));
};

export const LogError = (err) => {};
