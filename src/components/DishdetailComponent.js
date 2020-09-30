import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
const dishDetail = (props) => {
  const renderComments = (comments) => {
    let comment = null;
    if (comments) {
      comment = comments.map((comment) => {
        return (
          <div key={comment.id}>
            <li>{comment.comment}</li>
            <li>
              --{comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </li>
          </div>
        );
      });
      return (
        <React.Fragment>
          <h4>Comments</h4>
          <ul className="list-unstyled">{comment}</ul>
        </React.Fragment>
      );
    } else return <div></div>;
  };
  const renderDish = (dish) => {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  };

  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row ">
          <div className="col-12 col-md-5 m-1">{renderDish(props.dish)}</div>

          <div className="col-12 col-md-5 m-1">
            {renderComments(props.comments)}
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default dishDetail;
