import { Spinner, Col } from "react-bootstrap";

const LoadingSpinner = () => (
  <Col className="d-flex justify-content-center">
    <Spinner animation="border" />
  </Col>
);

export default LoadingSpinner;
