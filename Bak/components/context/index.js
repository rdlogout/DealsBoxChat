import { useState } from "react";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { MdSettings } from "react-icons/md";
import RequestContext from "./request";

const ChatContext = ({ targetId, targetType, title, description, users }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <span role="button" onClick={(e) => setShow(true)}>
        <MdSettings className="text-success fs-4" />
      </span>
      <Offcanvas placement="end" show={show} onHide={() => setShow(false)}>
        <Offcanvas.Body className="py-5 px-4">
          <h1 className="fw-bold fs-6 text-dark mb-3">{title}</h1>
          <p className="font-lg text-grey mb-4">{description}</p>
          <div>
            <RequestContext id={targetId} />
          </div>
          <div className="pt-3 border-top">
            {users?.map((s, i) => (
              <Container key={i} className="mb-3 bg-light rounded py-2">
                <Row className="align-items-center">
                  <Col sm="3">
                    <img
                      className="rounded-circle w-100"
                      src="https://dealsonopenbox.azureedge.net/static/images/user-sm.png"
                    />
                  </Col>
                  <Col>
                    <p className="fw-600 mb-0 text-dark text-capitalize">
                      {s.name}
                    </p>
                    <p
                      className={`fw-600 font-sm mb-0 text-${
                        s.isActive ? "success" : "grey"
                      }`}
                    >
                      {s.isActive ? "Online" : "Offline"}
                    </p>
                  </Col>
                </Row>
              </Container>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ChatContext;
