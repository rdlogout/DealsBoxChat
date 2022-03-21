import axios from "axios";
import { useEffect } from "react";
import { connect } from "react-redux";
import indexActions from "../redux/actions/indexAction";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { LocalDate } from "../utils/utility";
const ChatIndex = (props) => {
  const { loading, chatLists } = props;
  console.log(props);
  useEffect(() => {
    props.loadData();
  }, []);

  console.log(props);

  return (
    <div className="chat-list">
      {loading ? (
        <p>Loading ...</p>
      ) : (
        chatLists?.map((s) => (
          <Link href={"/" + s.id}>
            <div role="button">
              <div className="chat-list-item">
                <Row>
                  <Col xs="8">
                    <p className="fw-600 fs-6 mb-1">{s.title}</p>
                  </Col>
                  <Col xs="4">
                    <span className="font-sm text-grey">
                      {LocalDate(s.message?.date, "HH:mm A")}
                    </span>
                  </Col>
                  <Col sm="12">
                    <p className="font-lg mb-0">
                      {s.message?.content || "Waiting For Messages ..."}
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

// export async function getServerSideProps({ req }) {
//   const res = await axios.get("", {
//     headers: {
//       Cookie: req.headers.cookie,
//     },
//   });
//   const data = await res.data;
//   return { props: { data } };
// }
export default connect((s) => s.index, indexActions)(ChatIndex);
