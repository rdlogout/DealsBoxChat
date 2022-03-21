import { Col, Container, Row } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

export default ({ title }) => {
  return (
    <div id="top-bar" className="chat-title py-4 px-5">
      <Container>
        <Row>
          <Col sm="1">
            <Link href="/">
              <div role="button">
                <BiArrowBack />
              </div>
            </Link>
          </Col>
          <Col sm="11">
            <p className="mb-0 text-dark fw-bold fs-6 text-truncate text-capitalize">
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
