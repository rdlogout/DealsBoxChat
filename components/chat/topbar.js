import { Col, Container, Row } from "react-bootstrap";

export default ({ title }) => {
  return (
    <div id="top-bar" className="chat-title py-4 px-5">
      <Container>
        <Row>
          <Col sm="11">
            <p className="mb-0 text-dark fw-bold fs-6 text-truncate">
              {title || "Loading ...."}
            </p>
          </Col>
          {/* <Col sm="1">
            <ChatContext {...data} />
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};
