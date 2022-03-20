import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import { POST } from "../../utils/request";

const FormSubmit = ({ url, next, children, callback }) => {
  const router = useRouter();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const x = await POST(url, new FormData(e.target));
    if (x?.status && next) router.push(next);
    if (x?.status && callback) callback(x.data);
  };

  return <Form onSubmit={HandleSubmit}>{children}</Form>;
};

export default FormSubmit;
