import React from "react";
import { Button, Col, Row } from "reactstrap";
import { PreviewCard } from "../../../../components/Component";

const ColorProduct = ({ ...props }) => {
  return (
    <Row className="g-gs" style={{ marginTop: "30px" }}>
      <Col lg="6">
        <PreviewCard className="h-100">
          <div className="card-head">
            <h5 className="card-title">Product Color Info</h5>
          </div>
          <form>
            <div className="form-group">
              <label className="form-label" htmlFor="email-address">
                Product Color Name
              </label>
              <div className="form-control-wrap">
                <input className="form-control" type="text" id="email-address" />
              </div>
            </div>

            <div className="form-group">
              <Button color="primary" size="lg">
                Add Product Color
              </Button>
            </div>
          </form>
        </PreviewCard>
      </Col>
    </Row>
  );
};

export default ColorProduct;
