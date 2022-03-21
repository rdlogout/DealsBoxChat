import { Col, Dropdown, Row, Container } from "react-bootstrap";
import { HiOutlineEmojiHappy } from "react-icons/hi";

export default ({ state, setState }) => {
  return (
    <Dropdown drop="up" align="end">
      <Dropdown.Toggle>
        <HiOutlineEmojiHappy />
      </Dropdown.Toggle>

      <Dropdown.Menu className="border-0 shadow-lg emoji-menu">
        <Container>
          <Row>
            {emojis
              .map((x) => String.fromCodePoint(x))
              .map((x, i) => (
                <Col key={i}>
                  <div
                    role="button"
                    onClick={() =>
                      setState({ ...state, message: state.message + x })
                    }
                  >
                    {x}
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const emojRange = [
  [128513, 128591],
  [128640, 128704],
  [9986, 10160],
];

const emojis = emojRange
  .map(([start, end]) =>
    Array.from({ length: end - start }, (x, i) => i + start)
  )
  .flat();
