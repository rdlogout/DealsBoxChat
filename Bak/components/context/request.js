import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { GET } from "../../utils/request";
import { SubmitButton } from "../shared/input";
import FormSubmit from "../shared/submit";

const RequestContext = ({ id, router }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (id) Fetch();
  }, [id]);
  const Fetch = async () => setData(await GET("/api/request/" + id));
  if (!data) return null;

  console.log(data);
  const { owner, status } = data;

  if (!data) return null;

  if (status === "Completed")
    return (
      <p className="font-md text-center text-success pt-3 border-top">
        Task Is Completed Successfully
      </p>
    );

  if (owner)
    return (
      <OwnerContext
        refresh={() => Fetch()}
        chatId={router.query.id}
        {...data}
      />
    );

  return (
    <NormalContext chatId={router.query.id} refresh={() => Fetch()} {...data} />
  );
  return null;
};

const OwnerContext = ({ events, chatId, status, refresh }) => {
  if (status === "Completed") return null;
  const isAssigned = events.find(
    (s) => (s.type === "Assigned") & (s.status === "Completed")
  );

  if (!isAssigned)
    return (
      <FormSubmit url={"/api/request/assign/" + chatId} callback={refresh}>
        <SubmitButton title="Assign Job" variant="success" />
      </FormSubmit>
    );

  return (
    <Row>
      <Col>
        <FormSubmit
          url={"/api/request/CancelAssign/" + chatId}
          callback={refresh}
        >
          <SubmitButton title="Callout Assign" variant="danger" />
        </FormSubmit>
      </Col>
      <Col>
        <FormSubmit url={"/api/request/Completed/" + chatId} callback={refresh}>
          <SubmitButton title="Job Completed" variant="success" />
        </FormSubmit>
      </Col>
    </Row>
  );

  return null;
};

const NormalContext = ({ events, refresh, assigned, status, chatId }) => {
  const isAssigned = events.find(
    (s) => (s.type === "Assigned") & (s.status === "Completed")
  );
  console.log(assigned, isAssigned, status);

  if (assigned && status === "Active")
    return (
      <FormSubmit
        url={"/api/request/CancelAssign/" + chatId}
        callback={refresh}
      >
        <SubmitButton title="Callout Assigned" variant="danger" />
      </FormSubmit>
    );
  if (assigned && status === "Completed")
    return (
      <p className="fw-bold text-center">You Successfully Completed The Job</p>
    );
  return null;
};

export default withRouter(RequestContext);
